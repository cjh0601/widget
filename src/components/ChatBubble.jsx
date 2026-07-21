import React, { useState, useEffect, useRef } from 'react';
import { IconComment, IconClose } from '@douyinfe/semi-icons';
import './ChatBubble.scss';

export default function ChatBubble({ isOpen, onClick, onDragStart, isDragging, enableDrag, bubbleStyle, bubbleIcon, hasUnread }) {
  const [isBouncing, setIsBouncing] = useState(false);
  const prevHasUnread = useRef(false);

  useEffect(() => {
    // hasUnread 从 false → true 时触发跳动
    if (hasUnread && !prevHasUnread.current) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 600);
      prevHasUnread.current = true;
      return () => clearTimeout(timer);
    }
    if (!hasUnread) {
      prevHasUnread.current = false;
    }
  }, [hasUnread]);

  const renderIcon = () => {
    if (isOpen) return <IconClose size="large" />;
    if (bubbleIcon) {
      return <img src={bubbleIcon} alt="Chat" className="chat-bubble__custom-icon" />;
    }
    return <IconComment size="large" />;
  };

  return (
    <button
      className={`chat-bubble ${isOpen ? 'chat-bubble--active' : ''} ${isDragging ? 'chat-bubble--dragging' : ''} ${!enableDrag ? 'chat-bubble--no-drag' : ''} ${isBouncing ? 'chat-bubble--bounce' : ''}`}
      style={bubbleStyle}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onClick={onClick}
      aria-label={isOpen ? '关闭聊天' : '打开聊天'}
      title={isOpen ? '关闭聊天' : '打开聊天'}
    >
      {renderIcon()}
      {hasUnread && !isOpen && <span className="chat-bubble__badge" />}
    </button>
  );
}
