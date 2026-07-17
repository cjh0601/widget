import { createContact, createConversation, getShopify, updateShopify } from './chatWoot';

/**
 * 初始化聊天会话
 * 流程：本地缓存 -> 后端查询 -> 创建用户 -> 创建会话 -> 持久化
 *
 * @param {object} params
 * @param {string} params.inboxId    - 收件箱 ID
 * @param {string} params.visitorId  - 访客唯一标识
 * @returns {Promise<object|null>}   - { source_id, conversation_id, pubsub_token, inbox_identifier, visitor_id }
 */
export default async function initChatSession({ inboxId, visitorId }) {
  const STORAGE_KEY = `chat_session_${inboxId}_${visitorId}`;

  const getLocalSession = () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;
      const session = JSON.parse(data);
      if (Date.now() > session.expire_at) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return session;
    } catch {
      return null;
    }
  };

  const setLocalSession = (session) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...session,
        expire_at: Date.now() + 24 * 60 * 60 * 1000,
      })
    );
  };

  // 1. 本地缓存
  const localSession = getLocalSession();
  if (localSession && localSession.inbox_identifier === inboxId) {
    return localSession;
  }

  // 2. 查后端
  const shopifyRes = await getShopify(visitorId);
  if (
    shopifyRes.code === 200 &&
    shopifyRes.data &&
    shopifyRes.data.source_id &&
    shopifyRes.data.inbox_identifier === inboxId
  ) {
    const shopifyData = {
      conversation_id: shopifyRes.data.conversation_id,
      inbox_identifier: inboxId,
      pubsub_token: shopifyRes.data.pubsub_token,
      source_id: shopifyRes.data.source_id,
      visitor_id: visitorId,
    };
    setLocalSession(shopifyData);
    return shopifyData;
  }

  // 3. 创建用户
  const createUserRes = await createContact(inboxId, {
    name: visitorId,
    email: '',
    identifier: visitorId,
  });
  const source_id = createUserRes.source_id;
  const pubsub_token = createUserRes.pubsub_token;

  // 4. 创建会话
  const createConversationRes = await createConversation(inboxId, source_id, {});
  const conversation_id = createConversationRes.id;
  const sessionData = {
    inbox_identifier: inboxId,
    visitor_id: visitorId,
    source_id,
    conversation_id: conversation_id.toString(),
    pubsub_token,
  };

  // 5. 存后端
  await updateShopify(sessionData);

  // 6. 存本地
  setLocalSession(sessionData);

  return sessionData;
}
