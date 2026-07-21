import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { IconComment, IconHelpCircle, IconHome } from '@douyinfe/semi-icons';
import ChatBubble from './components/ChatBubble';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import HelpPage from './pages/HelpPage';
import './App.scss';

export default function App({ inboxId, visitorId, enableDrag, bubbleIcon }) {
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
  const bubbleRectRef = useRef(null); // 拖拽开始时气泡的屏幕位置（含已累积的偏移）

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

    // 记录气泡当前的屏幕位置，用于后续边界钳制
    const root = window.__CHAT_SHADOW_ROOT__ || document;
    const bubble = root.querySelector('.chat-bubble');
    bubbleRectRef.current = bubble ? bubble.getBoundingClientRect() : null;
  }, [enableDrag]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - dragStartRef.current.x;
      const dy = clientY - dragStartRef.current.y;

      // 基于气泡实际屏幕位置做边界钳制（兼容 left / center / right 任意初始位置）
      const MARGIN = 24;
      const rect = bubbleRectRef.current;
      const maxDx = rect ? window.innerWidth - MARGIN - rect.right : Infinity;
      const minDx = rect ? MARGIN - rect.left : -Infinity;
      const maxDy = rect ? window.innerHeight - MARGIN - rect.bottom : Infinity;
      const minDy = rect ? MARGIN - rect.top : -Infinity;

      const clampedDx = Math.min(maxDx, Math.max(minDx, dx));
      const clampedDy = Math.min(maxDy, Math.max(minDy, dy));

      const newOffset = {
        x: bubbleOffsetRef.current.x + clampedDx,
        y: bubbleOffsetRef.current.y + clampedDy,
      };
      bubbleOffsetRef.current = newOffset;
      setBubbleOffset(newOffset);
      dragStartRef.current = { x: clientX, y: clientY };

      // 更新 rect 引用，使后续 move 事件基于最新位置钳制
      if (rect) {
        bubbleRectRef.current = {
          left: rect.left + clampedDx,
          right: rect.right + clampedDx,
          top: rect.top + clampedDy,
          bottom: rect.bottom + clampedDy,
        };
      }

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

  // ---- 面板位置自适应：根据气泡在屏幕中的实际位置，动态调整面板弹出方向 ----
  const [panelAnchorStyle, setPanelAnchorStyle] = useState(undefined);

  useLayoutEffect(() => {
    if (!isOpen) return;
    // 未拖拽时使用 CSS 默认定位（气泡右下角，面板在上方）
    if (!enableDrag || (bubbleOffset.x === 0 && bubbleOffset.y === 0)) {
      setPanelAnchorStyle(undefined);
      return;
    }

    // 拖拽后根据气泡实际位置计算面板弹出方向
    // Shadow DOM 中 document.querySelector 无法穿透，需用 shadow root 查找
    const root = window.__CHAT_SHADOW_ROOT__ || document;
    const bubble = root.querySelector('.chat-bubble');
    if (!bubble) return;

    const rect = bubble.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const GAP = 16;
    const MARGIN = 24;
    const PANEL_W = isExpanded ? 600 : 420;
    const PANEL_H = isExpanded ? 800 : 720;

    const style = {};

    // 水平：气泡中心在左半屏 → 面板左对齐；在右半屏 → 面板右对齐
    const bubbleCenterX = rect.left + rect.width / 2;
    if (bubbleCenterX < vw / 2) {
      style.left = `${Math.max(MARGIN, rect.left)}px`;
      style.right = 'auto';
    } else {
      style.right = `${Math.max(MARGIN, vw - rect.right)}px`;
      style.left = 'auto';
    }
    style.maxWidth = `${Math.min(PANEL_W, vw - 2 * MARGIN)}px`;

    // 垂直：气泡中心在上半屏 → 面板在气泡下方；在下半屏 → 面板在气泡上方
    const bubbleCenterY = rect.top + rect.height / 2;
    if (bubbleCenterY < vh / 2) {
      style.top = `${rect.bottom + GAP}px`;
      style.bottom = 'auto';
      style.maxHeight = `${Math.min(PANEL_H, vh - rect.bottom - GAP - MARGIN)}px`;
    } else {
      style.bottom = `${vh - rect.top + GAP}px`;
      style.top = 'auto';
      style.maxHeight = `${Math.min(PANEL_H, rect.top - GAP - MARGIN)}px`;
    }

    setPanelAnchorStyle(style);
  }, [isOpen, isExpanded, bubbleOffset, enableDrag]);

  return (
    <>
      {/* 气泡始终显示 */}
      <ChatBubble
        isOpen={isOpen}
        onClick={handleBubbleClick}
        onDragStart={handleDragStart}
        isDragging={isDragging}
        enableDrag={enableDrag}
        bubbleStyle={bubbleStyle}
        bubbleIcon={bubbleIcon}
      />

      {/* 面板始终渲染，通过 CSS 控制显隐，避免 WebSocket 重复连接 */}
      <div
        className={`widget-panel ${isExpanded ? 'widget-panel--expanded' : ''} ${!isOpen ? 'widget-panel--hidden' : ''}`}
        style={panelAnchorStyle}
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
