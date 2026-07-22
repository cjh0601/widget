import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from '@douyinfe/semi-ui';
import { IconClose, IconSend, IconArrowUpLeft, IconArrowDownRight ,IconExpand ,IconShrink } from '@douyinfe/semi-icons';
import ChatItem from '../components/ChatItem';
import './ChatPage.scss';

import { sendMessage, getMessageHistory } from '../api/chatWoot';
import WebSocketClient from '../api/webSockts';
import initChatSession from '../api/initChatSession';

const wsURL = import.meta.env.VITE_WS_URL;

function formatToHM(time) {
  if (!time) return '';
  let date;
  if (typeof time === 'number' || /^\d+$/.test(time)) {
    const ts = Number(time);
    date = new Date(ts < 1e12 ? ts * 1000 : ts);
  } else {
    date = new Date(time);
  }
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

export default function ChatPage({ inboxId, visitorId, shopDomain, initialMessage, onInitialMessageSent, onClose, isExpanded, onToggleExpand, isPanelOpen, onNewAgentMessage }) {
  // ---- 会话状态 ----
  const [sourceId, setSourceId] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [pubsubToken, setPubsubToken] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);

  // ---- 消息状态 ----
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [followUp, setFollowUp] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [isInitLoading, setIsInitLoading] = useState(false);
  const [isMessagesVisible, setIsMessagesVisible] = useState(false);

  const messagesEndRef = useRef(null);
  const wsRef = useRef(null);
  const isPanelOpenRef = useRef(isPanelOpen);
  const onNewAgentMessageRef = useRef(onNewAgentMessage);
  isPanelOpenRef.current = isPanelOpen;
  onNewAgentMessageRef.current = onNewAgentMessage;

  // ---- 工具函数 ----
  const scrollToBottom = useCallback((instant = false) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: instant ? 'auto' : 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // ---- 发送消息 ----
  const doSendMessage = useCallback(
    async (text) => {
      if (!text?.trim() || isSending) return;
      if (!sourceId || !conversationId) return;

      const trimmed = text.trim();

      setMessages((prev) => {
        const next = [...prev];
        if (next.length > 0 && next[next.length - 1].loading) next.pop();
        return [
          ...next,
          { role: 'user', content: trimmed },
          { role: 'agent', content: '', loading: true },
        ];
      });
      setInput('');
      setFollowUp([]);
      setIsSending(true);

      try {
        await sendMessage(inboxId, sourceId, conversationId, {
          content: trimmed,
          echo_id: null,
          ext: {
            isAiReply: true,
            messages: [],
          },
        });
      } catch (err) {
        console.error('发送消息失败:', err);
        setMessages((prev) => {
          const next = [...prev];
          if (next.length > 0 && next[next.length - 1].loading) next.pop();
          return [...next, { role: 'agent', content: '发送失败，请稍后重试。' }];
        });
      } finally {
        setIsSending(false);
      }
    },
    [inboxId, sourceId, conversationId, isSending]
  );

  const onEnterPress = () => doSendMessage(input);
  const onQuickAction = (text) => doSendMessage(text);
  const onFollowUpClick = (text) => doSendMessage(text);

  // ---- 自动发送初始消息（来自 HomePage highlights） ----
  const initialSentRef = useRef(false);
  useEffect(() => {
    if (sessionReady && initialMessage && !initialSentRef.current) {
      initialSentRef.current = true;
      doSendMessage(initialMessage);
      onInitialMessageSent?.();
    }
  }, [sessionReady, initialMessage, doSendMessage, onInitialMessageSent]);

  // ---- WebSocket 连接 ----
  const connectWebSocket = useCallback(
    (token) => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      wsRef.current = new WebSocketClient(wsURL, {
        reconnectInterval: 5000,
        maxReconnectAttempts: 10,
        heartbeatInterval: 30000,
        heartbeatMessage: JSON.stringify({ command: 'ping' }),
        onMessage: (rawMessage) => {
          try {
            const parsed = JSON.parse(rawMessage);

            if (
              parsed?.message?.event === 'message.created' &&
              parsed?.message?.data?.content &&
              parsed?.message?.data?.sender_type !== 'Contact'
            ) {
              // 面板关闭时通知父组件有未读消息
              if (!isPanelOpenRef.current) {
                onNewAgentMessageRef.current?.();
              }

              const nextFollowUp = parsed?.message?.data?.outputs?.follow_up;
              setFollowUp(
                Array.isArray(nextFollowUp) ? nextFollowUp : []
              );

              setMessages((prev) => {
                const next = [...prev];
                if (next.length > 0 && next[next.length - 1].loading) {
                  next.pop();
                }
                return [
                  ...next,
                  {
                    role: 'agent',
                    content: parsed.message.data.content,
                    update: formatToHM(parsed.message.data.updated_at),
                  },
                ];
              });
            }
          } catch (err) {
            console.error('解析 WebSocket 消息失败:', err);
          }
        },
        onOpen: () => {
          wsRef.current.send(
            JSON.stringify({
              command: 'subscribe',
              identifier: JSON.stringify({
                channel: 'RoomChannel',
                pubsub_token: token,
              }),
            })
          );
        },
        onClose: () => console.log('WebSocket 已关闭'),
        onError: (err) => console.error('WebSocket 错误:', err),
      });
    },
    []
  );

  // ---- 获取历史消息 ----
  const loadHistory = useCallback(
    async (sid, cid) => {
      try {
        const history = await getMessageHistory(inboxId, sid, cid);
        if (!Array.isArray(history)) return;

        const lastFollowUp = [...history]
          .reverse()
          .find(
            (item) =>
              Array.isArray(item?.outputs?.follow_up) &&
              item.outputs.follow_up.length > 0
          );
        if (lastFollowUp) {
          setFollowUp(lastFollowUp.outputs.follow_up);
        }

        history.forEach((item) => {
          if (item.content && item.message_type === 0) {
            setMessages((prev) => [
              ...prev,
              { role: 'user', content: item.content },
            ]);
          } else if (item.content) {
            setMessages((prev) => [
              ...prev,
              {
                role: 'agent',
                content: item.content,
                update: formatToHM(item.created_at),
              },
            ]);
          }
        });
      } catch (err) {
        console.error('获取历史消息失败:', err);
      }
    },
    [inboxId]
  );

  // ---- 初始化会话 ----
  useEffect(() => {
    if (!inboxId || !visitorId) return;
    if (sessionReady) return;

    let cancelled = false;
    setIsInitLoading(true);

    (async () => {
      try {
        const session = await initChatSession({ inboxId, visitorId, shopDomain });
        if (cancelled || !session) {
          setIsInitLoading(false);
          return;
        }

        setSourceId(session.source_id);
        setConversationId(session.conversation_id);
        setPubsubToken(session.pubsub_token);

        await loadHistory(session.source_id, session.conversation_id);
        connectWebSocket(session.pubsub_token);

        if (!cancelled) {
          setSessionReady(true);
          setIsInitLoading(false);
          setTimeout(() => {
            scrollToBottom(true);
            setTimeout(() => setIsMessagesVisible(true), 100);
          }, 150);
        }
      } catch (err) {
        console.error('初始化会话失败:', err);
        if (!cancelled) setIsInitLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [inboxId, visitorId, sessionReady, loadHistory, connectWebSocket, scrollToBottom]);

  // 清理 WebSocket
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  // ---- 快捷操作 ----
  const quickActions = [
    { key: 'track_order', label: 'Track Order', text: 'Track Order' },
  ];

  return (
    <div className="chat-page">
      {/* Header */}
      <div className="chat-page__header">
        <div
          className="chat-page__expand-btn"
          onClick={onToggleExpand}
          role="button"
          tabIndex={0}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? (
            <IconShrink size="large" />
          ) : (
            <IconExpand size="large" />
          )}
        </div>
        <div className="chat-page__header-title"></div>
        <div className="chat-page__close-btn" onClick={onClose} role="button" tabIndex={0} aria-label="Close">
          <IconClose size="large" />
        </div>
      </div>

      {/* Messages */}
      <div className="chat-page__body">
        {isInitLoading && (
          <div className="chat-page__init-loading">Connecting...</div>
        )}
        <div
          className={`chat-page__messages ${isMessagesVisible ? 'chat-page__messages--visible' : ''}`}
        >
          {messages.map((msg, index) => (
            <ChatItem
              key={index}
              role={msg.role}
              content={msg.content}
              loading={msg.loading}
              update={msg.update}
              followUp={followUp}
              followUpFlag={messages.length > 0 && index === messages.length - 1}
              onFollowUpClick={onFollowUpClick}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Footer */}
      <div className="chat-page__footer">
        <div className="chat-page__quick-actions-float">
          {quickActions.map((action) => (
            <button
              key={action.key}
              type="button"
              className="chat-page__quick-btn"
              onClick={() => onQuickAction(action.text)}
            >
              {action.label}
            </button>
          ))}
        </div>
        <div className="chat-page__input-row">
          <Input
            className="chat-page__input"
            value={input}
            borderless
            onChange={(e) => setInput(e)}
            onEnterPress={onEnterPress}
            placeholder="Type a message..."
          />
          <button
            className="chat-page__send-btn"
            onClick={() => doSendMessage(input)}
            disabled={!input.trim() || isSending || !sessionReady}
          >
            <IconSend size="small" />
          </button>
        </div>
      </div>
    </div>
  );
}
