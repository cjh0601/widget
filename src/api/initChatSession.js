import { createContact, createConversation, getShopify, updateShopify } from './chatWoot';

/**
 * 初始化聊天会话（与 widget-loader 共用同一 localStorage key）
 * 流程：本地缓存 -> 后端查询 -> 创建用户 -> 创建会话 -> 持久化
 *
 * @param {object} params
 * @param {string} params.inboxId    - 收件箱 ID
 * @param {string} params.visitorId  - 访客唯一标识
 * @param {string} params.shopDomain - 店铺域名（与 widget-loader 共用 storage key）
 * @returns {Promise<object|null>}   - { source_id, conversation_id, pubsub_token, inbox_identifier, visitor_id }
 */
export default async function initChatSession({ inboxId, visitorId, shopDomain }) {
  const STORAGE_KEY = `upsello_chat_${shopDomain || 'default'}`;
  const SESSION_TTL = 24 * 60 * 60 * 1000;

  const getStored = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  const setStored = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // 1. 检查本地缓存（session 嵌套在统一 key 下，互不干扰）
  const stored = getStored();
  if (stored.session && stored.session.inbox_identifier === inboxId) {
    if (Date.now() <= stored.session.expire_at) {
      return stored.session;
    }
    // 会话过期，仅清除 session 字段，保留 visitor_id / customer_id
    delete stored.session;
    setStored(stored);
  }

  // 2. 查后端
  try {
    const shopifyRes = await getShopify(visitorId);
    if (
      shopifyRes.code === 200 &&
      shopifyRes.data &&
      shopifyRes.data.source_id &&
      shopifyRes.data.inbox_identifier === inboxId
    ) {
      const sessionData = {
        conversation_id: shopifyRes.data.conversation_id,
        inbox_identifier: inboxId,
        pubsub_token: shopifyRes.data.pubsub_token,
        source_id: shopifyRes.data.source_id,
        visitor_id: visitorId,
        expire_at: Date.now() + SESSION_TTL,
      };
      setStored({ ...stored, session: sessionData });
      return sessionData;
    }
  } catch (err) {
    console.warn('[Chat Widget] getShopify failed:', err);
  }

  // 3. 创建新会话
  try {
    const createUserRes = await createContact(inboxId, {
      name: visitorId,
      email: '',
      identifier: visitorId,
    });
    const source_id = createUserRes.source_id;
    const pubsub_token = createUserRes.pubsub_token;

    const createConversationRes = await createConversation(inboxId, source_id, {});
    const conversation_id = createConversationRes.id;
    if (!conversation_id) {
      throw new Error('createConversation returned empty id');
    }

    const sessionData = {
      inbox_identifier: inboxId,
      visitor_id: visitorId,
      source_id,
      conversation_id: String(conversation_id),
      pubsub_token,
      expire_at: Date.now() + SESSION_TTL,
    };

    // 4. 存后端（失败不阻塞，下次查后端时可重建）
    try {
      await updateShopify(sessionData);
    } catch (err) {
      console.warn('[Chat Widget] updateShopify failed:', err);
    }

    // 5. 存本地（保留原有 visitor_id / customer_id）
    setStored({ ...stored, session: sessionData });

    return sessionData;
  } catch (err) {
    console.error('[Chat Widget] initChatSession failed:', err);
    throw err;
  }
}
