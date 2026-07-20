import { createContext, useContext, useMemo } from 'react';
import { themePresets, defaultConfig } from './config';

const ConfigContext = createContext(defaultConfig);

/**
 * ConfigProvider
 * @param {object} props
 * @param {string} [props.theme] - 主题名，来自 Shopify settings，为空时用 default
 * @param {object} [props.settings] - 额外设置项 { fontFamily, posH, posV }
 */
export const ConfigProvider = ({ children, theme, settings }) => {
  const config = useMemo(() => {
    const preset = themePresets[theme] || defaultConfig;
    const extra = settings || {};
    return {
      ...preset,
      theme,
      fontFamily: extra.fontFamily || preset['font-family'] || 'Arial',
      positionH: extra.posH || 'right',
      positionV: extra.posV || 'low',
    };
  }, [theme, settings]);

  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);