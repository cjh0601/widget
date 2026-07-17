import './theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from './contest/ConfigProvider';
import { currentTheme, applyTheme } from './contest/config';
console.log("widget start");
// 检测是否运行在 Shadow DOM 中
function getMountRoot() {
  return window.__CHAT_SHADOW_ROOT__ || document;
}

// 从 Shadow DOM 中的挂载节点读取 inboxId 和 visitorId
function getConfig(mountNode) {
  const inboxId = mountNode?.dataset?.inboxId || '';
  const visitorId = mountNode?.dataset?.visitorId || '';
  return { inboxId, visitorId };
}

const root = getMountRoot();
const mountNode = root.querySelector('#chat-app');

if (mountNode) {
  const config = getConfig(mountNode);

  // 从 URL hash 中解析 #theme=xxx，用于测试切换主题
  function parseHashTheme() {
    const match = location.hash.match(/theme=(\w+)/);
    return match ? match[1] : null;
  }

  function syncThemeFromHash() {
    const hashTheme = parseHashTheme();
    const theme = hashTheme || currentTheme;
    applyTheme(theme, mountNode);
  }

  syncThemeFromHash();
  window.addEventListener('hashchange', syncThemeFromHash);

  ReactDOM.createRoot(mountNode).render(
    React.createElement(React.StrictMode, null,
      React.createElement(ConfigProvider, null,
        React.createElement(App, config)
      )
    )
  );
}
