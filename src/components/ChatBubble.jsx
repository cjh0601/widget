import React from 'react';
import { IconComment, IconClose } from '@douyinfe/semi-icons';
import './ChatBubble.scss';

export default function ChatBubble({ isOpen, onClick, onDragStart, isDragging, enableDrag, bubbleStyle }) {
  return (
    <button
      className={`chat-bubble ${isOpen ? 'chat-bubble--active' : ''} ${isDragging ? 'chat-bubble--dragging' : ''} ${!enableDrag ? 'chat-bubble--no-drag' : ''}`}
      style={bubbleStyle}
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
      onClick={onClick}
      aria-label={isOpen ? '关闭聊天' : '打开聊天'}
      title={isOpen ? '关闭聊天' : '打开聊天'}
    >
      {isOpen ? <IconClose size="large" /> : <IconComment size="large" />}
    </button>
  );
}
