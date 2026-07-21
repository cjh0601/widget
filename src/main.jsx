import './theme.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from './contest/ConfigProvider';
import { currentTheme, applyTheme, applySettings } from './contest/config';
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

  // 从 dataset 读取主题，无则用默认
  const datasetTheme = mountNode?.dataset?.theme;
  const theme = datasetTheme || currentTheme;
  applyTheme(theme, mountNode);

  // 字体和位置设置（传给 ConfigProvider，同时通过 CSS 变量落到 DOM）
  const widgetSettings = {
    fontFamily: mountNode?.dataset?.fontFamily,
    posH: mountNode?.dataset?.positionHorizontal,
    posV: mountNode?.dataset?.positionVertical,
  };
  applySettings(mountNode, widgetSettings);

  // 读取 enableDrag（Shopify checkbox 返回 "true" / "false" 字符串，为空时默认 true）
  const enableDragRaw = mountNode?.dataset?.enableDrag;
  const enableDrag = enableDragRaw === '' || enableDragRaw === 'true' || enableDragRaw == null;

  // 读取自定义气泡图标
  const bubbleIcon = mountNode?.dataset?.bubbleIcon || '';

  ReactDOM.createRoot(mountNode).render(
    React.createElement(React.StrictMode, null,
      React.createElement(ConfigProvider, { theme, settings: widgetSettings },
        React.createElement(App, { ...config, enableDrag, bubbleIcon })
      )
    )
  );
}
