import React, { useState, useRef, useCallback, useEffect } from 'react';
import { IconComment, IconHelpCircle, IconHome } from '@douyinfe/semi-icons';
import ChatBubble from './components/ChatBubble';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import HelpPage from './pages/HelpPage';
import './App.scss';

export default function App({ inboxId, visitorId, enableDrag }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  // ---- 气泡拖拽 ----
  const [bubbleOffset, setBubbleOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const bubbleOffsetRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  const handleClose = () => setIsOpen(false);

  const switchTab = (tab) => setActiveTab(tab);

  const handleSwitchToChat = (message) => {
    if (message) setInitialMessage(message);
    switchTab('chat');
  };

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const handleDragStart = useCallback((e) => {
    if (!enableDrag) return;
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartRef.current = { x: clientX, y: clientY };
  }, [enableDrag]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragStartRef.current.x;
      const dy = clientY - dragStartRef.current.y;
      const newOffset = {
        x: bubbleOffsetRef.current.x + dx,
        y: bubbleOffsetRef.current.y - dy,
      };
      bubbleOffsetRef.current = newOffset;
      setBubbleOffset(newOffset);
      dragStartRef.current = { x: clientX, y: clientY };
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        hasDraggedRef.current = true;
      }
    };

    const handleUp = () => setIsDragging(false);

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleUp);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleUp);
    };
  }, [isDragging]);

  // 气泡点击：没拖拽才算点击
  const handleBubbleClick = useCallback(() => {
    if (hasDraggedRef.current) return;
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
    }
  }, [isOpen]);

  const bubbleStyle = (bubbleOffset.x !== 0 || bubbleOffset.y !== 0)
    ? { transform: `translate(${bubbleOffset.x}px, ${bubbleOffset.y}px)` }
    : undefined;

  if (!isOpen) {
    return (
      <ChatBubble
        isOpen={false}
        onClick={handleBubbleClick}
        onDragStart={handleDragStart}
        isDragging={isDragging}
        enableDrag={enableDrag}
        bubbleStyle={bubbleStyle}
      />
    );
  }

  return (
    <>
      {/* 气泡始终显示，用于关闭面板 */}
      <ChatBubble
        isOpen={true}
        onClick={handleBubbleClick}
        onDragStart={handleDragStart}
        isDragging={isDragging}
        enableDrag={enableDrag}
        bubbleStyle={bubbleStyle}
      />

      {/* 面板：拖拽时跟随气泡 */}
      <div
        className={`widget-panel ${isExpanded ? 'widget-panel--expanded' : ''}`}
        style={enableDrag ? bubbleStyle : undefined}
      >
        {/* 页面内容区域 */}
        <div className="widget-panel__content">
          <div className={`widget-panel__tab ${activeTab === 'home' ? 'widget-panel__tab--active' : ''}`}>
            <HomePage
              onSwitchToChat={handleSwitchToChat}
              onClose={handleClose}
            />
          </div>

          <div className={`widget-panel__tab ${activeTab === 'chat' ? 'widget-panel__tab--active' : ''}`}>
            <ChatPage
              inboxId={inboxId}
              visitorId={visitorId}
              initialMessage={initialMessage}
              onInitialMessageSent={() => setInitialMessage('')}
              onClose={handleClose}
              isExpanded={isExpanded}
              onToggleExpand={toggleExpand}
            />
          </div>

          <div className={`widget-panel__tab ${activeTab === 'help' ? 'widget-panel__tab--active' : ''}`}>
            <HelpPage
              visitorId={visitorId}
              onClose={handleClose}
            />
          </div>
        </div>

        {/* 底部导航栏 */}
        <BottomNav activeTab={activeTab} onTabChange={switchTab} hidden={isExpanded} />
      </div>
    </>
  );
}

function BottomNav({ activeTab, onTabChange, hidden }) {
  return (
    <div className={`widget-panel__nav ${hidden ? 'widget-panel__nav--hidden' : ''}`}>
      <button
        className={`widget-panel__nav-item ${activeTab === 'home' ? 'widget-panel__nav-item--active' : ''}`}
        onClick={() => onTabChange('home')}
      >
        <IconHome className="tabbar_icon" />
        <span>HOME</span>
      </button>

      <button
        className={`widget-panel__nav-item ${activeTab === 'chat' ? 'widget-panel__nav-item--active' : ''}`}
        onClick={() => onTabChange('chat')}
      >
        <IconComment className="tabbar_icon" />
        <span>CHAT</span>
      </button>

      <button
        className={`widget-panel__nav-item ${activeTab === 'help' ? 'widget-panel__nav-item--active' : ''}`}
        onClick={() => onTabChange('help')}
      >
        <IconHelpCircle className="tabbar_icon" />
        <span>HELP</span>
      </button>
    </div>
  );
}
