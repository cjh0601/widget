import { createContext, useContext } from 'react';
import { defaultConfig } from './config';

const ConfigContext = createContext(defaultConfig);

export const ConfigProvider = ({ children }) => {
  return (
    <ConfigContext.Provider value={defaultConfig}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);