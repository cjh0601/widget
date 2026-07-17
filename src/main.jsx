import './theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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
  ReactDOM.createRoot(mountNode).render(
    React.createElement(React.StrictMode, null,
      React.createElement(App, config)
    )
  );
}
