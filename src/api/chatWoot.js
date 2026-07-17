import request from '../utils/request';

// ==================== Chatwoot 核心 API ====================

// 创建联系人
export const createContact = (inbox_identifier, data) => {
  return request({
    method: 'post',
    url: `/inboxes/${inbox_identifier}/contacts`,
    data,
  });
};

// 创建会话
export const createConversation = (inbox_identifier, source_id, data) => {
  return request({
    method: 'post',
    url: `/inboxes/${inbox_identifier}/contacts/${source_id}/conversations`,
    data,
  });
};

// 发送消息（文本）
export const sendMessage = (inbox_identifier, source_id, conversation_id, data) => {
  return request({
    method: 'post',
    url: `/inboxes/${inbox_identifier}/contacts/${source_id}/conversations/${conversation_id}/messages`,
    data,
  });
};

// 获取历史消息
export const getMessageHistory = (inbox_identifier, source_id, conversation_id) => {
  return request({
    method: 'get',
    url: `/inboxes/${inbox_identifier}/contacts/${source_id}/conversations/${conversation_id}/messages`,
  });
};

// ==================== Shopify 用户 API ====================

const shopifyBaseURL = import.meta.env.VITE_API_SHOPIFY_URL;

// 获取 shopify 用户信息
export const getShopify = (visitor_id) => {
  return request({
    baseURL: shopifyBaseURL,
    method: 'post',
    url: '/shopify/api/chat/customer/query',
    data: { visitor_id },
  });
};

// 修改 shopify 用户信息
export const updateShopify = (data) => {
  return request({
    baseURL: shopifyBaseURL,
    method: 'post',
    url: '/shopify/api/chat/customer/update',
    data,
  });
};

// 推荐开关
export const recommendToggle = (data) => {
  return request({
    baseURL: shopifyBaseURL,
    method: 'post',
    url: '/shopify/api/chat/customer/recommend-toggle',
    data,
  });
};
