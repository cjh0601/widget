import React, { useState } from 'react';
import { IconComment, IconHelpCircle, IconHome } from '@douyinfe/semi-icons';
import ChatBubble from './components/ChatBubble';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import HelpPage from './pages/HelpPage';
import './App.scss';

export default function App({ inboxId, visitorId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleClose = () => setIsOpen(false);

  const switchTab = (tab) => setActiveTab(tab);

  if (!isOpen) {
    return <ChatBubble isOpen={false} onClick={() => setIsOpen(true)} />;
  }

  return (
    <>
      {/* 气泡始终显示，用于关闭面板 */}
      <ChatBubble isOpen={true} onClick={handleClose} />

      {/* 面板 */}
      <div className="widget-panel">
        {/* 页面内容区域 */}
        <div className="widget-panel__content">
          <div className={`widget-panel__tab ${activeTab === 'home' ? 'widget-panel__tab--active' : ''}`}>
            <HomePage
              onSwitchToChat={() => switchTab('chat')}
              onClose={handleClose}
            />
          </div>

          <div className={`widget-panel__tab ${activeTab === 'chat' ? 'widget-panel__tab--active' : ''}`}>
            <ChatPage
              inboxId={inboxId}
              visitorId={visitorId}
              onClose={handleClose}
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
        <BottomNav activeTab={activeTab} onTabChange={switchTab} />
      </div>
    </>
  );
}

function BottomNav({ activeTab, onTabChange }) {
  return (
    <div className="widget-panel__nav">
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
