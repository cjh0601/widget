// ============================================================
// 主题预设配置
// ============================================================

/**
 * 预设主题定义
 * 每个主题包含 theme.css 中所有 --cw-* 变量的对应值（去掉 --cw- 前缀）
 */
export const themePresets = {
  // ---------- 默认（紫色） ----------
  default: {
    'font-family': 'Arial',
    'color-primary': '#684BFB',
    'color-primary-hover': '#5a3de8',
    'color-primary-disabled': '#c4b5fd',
    'color-primary-bg': '#F7F5FF',
    'color-primary-bg-hover': '#eee9ff',
    'color-primary-bg-alt': '#F2EEFF',
    'color-primary-border': '#BDB1FF',
    'color-bubble': '#4f46e5',
    'color-danger': '#ef4444',
    'color-success': '#4CAF50',
    'color-text': '#1a1a1a',
    'color-text-secondary': '#666',
    'color-text-body': '#594139',
    'color-text-hint': '#999',
    'color-text-marker': '#9ca3af',
    'color-text-disabled': '#d1d5db',
    'color-bg': '#fff',
    'color-surface': 'rgba(240, 240, 240, 0.3)',
    'color-surface-raised': 'rgba(255, 255, 255, 0.75)',
    'color-surface-glass': 'rgba(255, 255, 255, 0.55)',
    'color-border-soft': 'rgba(104, 75, 251, 0.10)',
    'color-bubble-agent-bg': '#f6f3f2',
    'color-bubble-agent-text': '#101427',
    'color-bubble-user-bg': '#684BFB',
    'color-bubble-user-text': '#fff',
    'shadow-button': '0 2px 5px rgba(0, 0, 0, 0.1)',
    'shadow-button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
    'shadow-card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
    'shadow-card': '0px 10.27px 13.4px rgba(145, 145, 145, 0.1)',
    'shadow-card-raised': '0px 10.27px 13.4px rgba(145, 145, 145, 0.15)',
    'shadow-highlight': '0 8px 20px rgba(145, 145, 145, 0.14)',
    'shadow-input': '0px 6px 25px rgba(145, 145, 145, 0.15)',
    'shadow-overlay': '0 28px 60px rgba(17, 24, 39, 0.18)',
    'shadow-nav': '0px -4px 12px rgba(0, 0, 0, 0.03)',
    'radius-sm': '8px',
    'radius-md': '12px',
    'radius-lg': '16px',
    'radius-xl': '20px',
    'radius-full': '50%',
    'gradient-home': `
     radial-gradient(circle at top left, rgba(104, 75, 251, 0.14) 0%, rgba(104, 75, 251, 0) 28%),
    linear-gradient(180deg, #E1DBFF 0%, #FFFFFF 30%)`,
    'gradient-chat': 'linear-gradient(180deg, #E1DBFF 0%, #FFFFFF 13%)',
    'shadow-bubble': '0 4px 16px rgba(79, 70, 229, 0.4)',
    'shadow-bubble-hover': '0 6px 20px rgba(79, 70, 229, 0.55)',
    'shadow-bubble-close': '0 4px 16px rgba(239, 68, 68, 0.4)',
    'nav-item-active-shadow': '0 10px 24px rgba(104, 75, 251, 0.12)',
  },
  // ---------- 海蓝 ----------
  ocean: {
    'font-family': 'Arial',
    'color-primary': '#0EA5E9',
    'color-primary-hover': '#0284C7',
    'color-primary-disabled': '#a5d8f3',
    'color-primary-bg': '#F0F9FF',
    'color-primary-bg-hover': '#E0F2FE',
    'color-primary-bg-alt': '#EAF6FC',
    'color-primary-border': '#7DD3FC',
    'color-bubble': '#0284c7',
    'color-danger': '#ef4444',
    'color-success': '#10B981',
    'color-text': '#0f172a',
    'color-text-secondary': '#475569',
    'color-text-body': '#334155',
    'color-text-hint': '#94a3b8',
    'color-text-marker': '#94a3b8',
    'color-text-disabled': '#cbd5e1',
    'color-bg': '#fff',
    'color-surface': 'rgba(240, 249, 255, 0.3)',
    'color-surface-raised': 'rgba(255, 255, 255, 0.75)',
    'color-surface-glass': 'rgba(255, 255, 255, 0.55)',
    'color-border-soft': 'rgba(14, 165, 233, 0.10)',
    'color-bubble-agent-bg': '#f1f5f9',
    'color-bubble-agent-text': '#0f172a',
    'color-bubble-user-bg': '#0EA5E9',
    'color-bubble-user-text': '#fff',
    'shadow-button': '0 2px 5px rgba(0, 0, 0, 0.1)',
    'shadow-button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
    'shadow-card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
    'shadow-card': '0px 10.27px 13.4px rgba(145, 145, 145, 0.1)',
    'shadow-card-raised': '0px 10.27px 13.4px rgba(145, 145, 145, 0.15)',
    'shadow-highlight': '0 8px 20px rgba(145, 145, 145, 0.14)',
    'shadow-input': '0px 6px 25px rgba(145, 145, 145, 0.15)',
    'shadow-overlay': '0 28px 60px rgba(17, 24, 39, 0.18)',
    'shadow-nav': '0px -4px 12px rgba(0, 0, 0, 0.03)',
    'radius-sm': '8px',
    'radius-md': '12px',
    'radius-lg': '16px',
    'radius-xl': '20px',
    'radius-full': '50%',
    'gradient-home': 'linear-gradient(180deg, #E0F2FE 0%, #FFFFFF 30%)',
    'gradient-chat': 'linear-gradient(180deg, #E0F2FE 0%, #FFFFFF 13%)',
    'shadow-bubble': '0 4px 16px rgba(14, 165, 233, 0.4)',
    'shadow-bubble-hover': '0 6px 20px rgba(14, 165, 233, 0.55)',
    'shadow-bubble-close': '0 4px 16px rgba(239, 68, 68, 0.4)',
    'nav-item-active-shadow': '0 10px 24px rgba(14, 165, 233, 0.12)',
  },

  // ---------- 森林绿 ----------
  forest: {
    'font-family': 'Arial',
    'color-primary': '#16A34A',
    'color-primary-hover': '#15803D',
    'color-primary-disabled': '#bbf7d0',
    'color-primary-bg': '#F0FDF4',
    'color-primary-bg-hover': '#DCFCE7',
    'color-primary-bg-alt': '#E8F8EE',
    'color-primary-border': '#86EFAC',
    'color-bubble': '#15803d',
    'color-danger': '#ef4444',
    'color-success': '#16A34A',
    'color-text': '#1a2e1a',
    'color-text-secondary': '#4a5e4a',
    'color-text-body': '#3a4e3a',
    'color-text-hint': '#8ca38c',
    'color-text-marker': '#9ca3af',
    'color-text-disabled': '#d1d5db',
    'color-bg': '#fff',
    'color-surface': 'rgba(240, 253, 244, 0.3)',
    'color-surface-raised': 'rgba(255, 255, 255, 0.75)',
    'color-surface-glass': 'rgba(255, 255, 255, 0.55)',
    'color-border-soft': 'rgba(22, 163, 74, 0.10)',
    'color-bubble-agent-bg': '#f1f5f1',
    'color-bubble-agent-text': '#1a2e1a',
    'color-bubble-user-bg': '#16A34A',
    'color-bubble-user-text': '#fff',
    'shadow-button': '0 2px 5px rgba(0, 0, 0, 0.1)',
    'shadow-button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
    'shadow-card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
    'shadow-card': '0px 10.27px 13.4px rgba(145, 145, 145, 0.1)',
    'shadow-card-raised': '0px 10.27px 13.4px rgba(145, 145, 145, 0.15)',
    'shadow-highlight': '0 8px 20px rgba(145, 145, 145, 0.14)',
    'shadow-input': '0px 6px 25px rgba(145, 145, 145, 0.15)',
    'shadow-overlay': '0 28px 60px rgba(17, 24, 39, 0.18)',
    'shadow-nav': '0px -4px 12px rgba(0, 0, 0, 0.03)',
    'radius-sm': '8px',
    'radius-md': '12px',
    'radius-lg': '16px',
    'radius-xl': '20px',
    'radius-full': '50%',
    'gradient-home': 'linear-gradient(180deg, #DCFCE7 0%, #FFFFFF 30%)',
    'gradient-chat': 'linear-gradient(180deg, #DCFCE7 0%, #FFFFFF 13%)',
    'shadow-bubble': '0 4px 16px rgba(22, 163, 74, 0.4)',
    'shadow-bubble-hover': '0 6px 20px rgba(22, 163, 74, 0.55)',
    'shadow-bubble-close': '0 4px 16px rgba(239, 68, 68, 0.4)',
    'nav-item-active-shadow': '0 10px 24px rgba(22, 163, 74, 0.12)',
  },

  // ---------- 日落暖色 ----------
  sunset: {
    'font-family': 'Arial',
    'color-primary': '#F97316',
    'color-primary-hover': '#EA580C',
    'color-primary-disabled': '#fed7aa',
    'color-primary-bg': '#FFF7ED',
    'color-primary-bg-hover': '#FFEDD5',
    'color-primary-bg-alt': '#FEF3E9',
    'color-primary-border': '#FDBA74',
    'color-bubble': '#ea580c',
    'color-danger': '#ef4444',
    'color-success': '#22C55E',
    'color-text': '#2d1a0f',
    'color-text-secondary': '#6b4a3a',
    'color-text-body': '#5c3a2e',
    'color-text-hint': '#b4a194',
    'color-text-marker': '#b4a194',
    'color-text-disabled': '#e5d8d0',
    'color-bg': '#fff',
    'color-surface': 'rgba(255, 247, 237, 0.3)',
    'color-surface-raised': 'rgba(255, 255, 255, 0.75)',
    'color-surface-glass': 'rgba(255, 255, 255, 0.55)',
    'color-border-soft': 'rgba(249, 115, 22, 0.10)',
    'color-bubble-agent-bg': '#faf5f0',
    'color-bubble-agent-text': '#2d1a0f',
    'color-bubble-user-bg': '#F97316',
    'color-bubble-user-text': '#fff',
    'shadow-button': '0 2px 5px rgba(0, 0, 0, 0.1)',
    'shadow-button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
    'shadow-card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
    'shadow-card': '0px 10.27px 13.4px rgba(145, 145, 145, 0.1)',
    'shadow-card-raised': '0px 10.27px 13.4px rgba(145, 145, 145, 0.15)',
    'shadow-highlight': '0 8px 20px rgba(145, 145, 145, 0.14)',
    'shadow-input': '0px 6px 25px rgba(145, 145, 145, 0.15)',
    'shadow-overlay': '0 28px 60px rgba(17, 24, 39, 0.18)',
    'shadow-nav': '0px -4px 12px rgba(0, 0, 0, 0.03)',
    'radius-sm': '8px',
    'radius-md': '12px',
    'radius-lg': '16px',
    'radius-xl': '20px',
    'radius-full': '50%',
    'gradient-home': 'linear-gradient(180deg, #FFEDD5 0%, #FFFFFF 30%)',
    'gradient-chat': 'linear-gradient(180deg, #FFEDD5 0%, #FFFFFF 13%)',
    'shadow-bubble': '0 4px 16px rgba(249, 115, 22, 0.4)',
    'shadow-bubble-hover': '0 6px 20px rgba(249, 115, 22, 0.55)',
    'shadow-bubble-close': '0 4px 16px rgba(239, 68, 68, 0.4)',
    'nav-item-active-shadow': '0 10px 24px rgba(249, 115, 22, 0.12)',
  },

  // ---------- 玫瑰粉 ----------
  rose: {
    'font-family': 'Arial',
    'color-primary': '#E11D48',
    'color-primary-hover': '#BE123C',
    'color-primary-disabled': '#fecdd3',
    'color-primary-bg': '#FFF1F2',
    'color-primary-bg-hover': '#FFE4E6',
    'color-primary-bg-alt': '#FDE8EE',
    'color-primary-border': '#FDA4AF',
    'color-bubble': '#be123c',
    'color-danger': '#ef4444',
    'color-success': '#22C55E',
    'color-text': '#2d1116',
    'color-text-secondary': '#6b3a44',
    'color-text-body': '#5c2e38',
    'color-text-hint': '#c4a4ac',
    'color-text-marker': '#c4a4ac',
    'color-text-disabled': '#e8d0d6',
    'color-bg': '#fff',
    'color-surface': 'rgba(255, 241, 242, 0.3)',
    'color-surface-raised': 'rgba(255, 255, 255, 0.75)',
    'color-surface-glass': 'rgba(255, 255, 255, 0.55)',
    'color-border-soft': 'rgba(225, 29, 72, 0.10)',
    'color-bubble-agent-bg': '#faf5f5',
    'color-bubble-agent-text': '#2d1116',
    'color-bubble-user-bg': '#E11D48',
    'color-bubble-user-text': '#fff',
    'shadow-button': '0 2px 5px rgba(0, 0, 0, 0.1)',
    'shadow-button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
    'shadow-card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
    'shadow-card': '0px 10.27px 13.4px rgba(145, 145, 145, 0.1)',
    'shadow-card-raised': '0px 10.27px 13.4px rgba(145, 145, 145, 0.15)',
    'shadow-highlight': '0 8px 20px rgba(145, 145, 145, 0.14)',
    'shadow-input': '0px 6px 25px rgba(145, 145, 145, 0.15)',
    'shadow-overlay': '0 28px 60px rgba(17, 24, 39, 0.18)',
    'shadow-nav': '0px -4px 12px rgba(0, 0, 0, 0.03)',
    'radius-sm': '8px',
    'radius-md': '12px',
    'radius-lg': '16px',
    'radius-xl': '20px',
    'radius-full': '50%',
    'gradient-home': 'linear-gradient(180deg, #FFE4E6 0%, #FFFFFF 30%)',
    'gradient-chat': 'linear-gradient(180deg, #FFE4E6 0%, #FFFFFF 13%)',
    'shadow-bubble': '0 4px 16px rgba(225, 29, 72, 0.4)',
    'shadow-bubble-hover': '0 6px 20px rgba(225, 29, 72, 0.55)',
    'shadow-bubble-close': '0 4px 16px rgba(239, 68, 68, 0.4)',
    'nav-item-active-shadow': '0 10px 24px rgba(225, 29, 72, 0.12)',
  },

  // ---------- 科技黑 ----------
  black: {
    'font-family': 'Inter, system-ui, -apple-system, sans-serif',
    'color-primary': '#18181B',
    'color-primary-hover': '#27272A',
    'color-primary-disabled': '#A1A1AA',
    'color-primary-bg': '#F4F4F5',
    'color-primary-bg-hover': '#E4E4E7',
    'color-primary-bg-alt': '#a8a8a8ff',
    'color-primary-border': '#D4D4D8',
    'color-bubble': '#27272A',
    'color-danger': '#ef4444',
    'color-success': '#22C55E',
    'color-text': '#18181B',
    'color-text-secondary': '#52525B',
    'color-text-body': '#3F3F46',
    'color-text-hint': '#A1A1AA',
    'color-text-marker': '#A1A1AA',
    'color-text-disabled': '#D4D4D8',
    'color-bg': '#FFFFFF',
    'color-surface': 'rgba(244, 244, 245, 0.3)',
    'color-surface-raised': 'rgba(255, 255, 255, 0.75)',
    'color-surface-glass': 'rgba(255, 255, 255, 0.55)',
    'color-border-soft': 'rgba(24, 24, 27, 0.08)',
    'color-bubble-agent-bg': '#F4F4F5',
    'color-bubble-agent-text': '#18181B',
    'color-bubble-user-bg': '#18181B',
    'color-bubble-user-text': '#FFFFFF',
    'shadow-button': '0 2px 5px rgba(0, 0, 0, 0.08)',
    'shadow-button-hover': '0 4px 8px rgba(0, 0, 0, 0.12)',
    'shadow-card-hover': '0 4px 12px rgba(0, 0, 0, 0.06)',
    'shadow-card': '0px 10.27px 13.4px rgba(0, 0, 0, 0.06)',
    'shadow-card-raised': '0px 10.27px 13.4px rgba(0, 0, 0, 0.1)',
    'shadow-highlight': '0 8px 20px rgba(0, 0, 0, 0.08)',
    'shadow-input': '0px 6px 25px rgba(0, 0, 0, 0.08)',
    'shadow-overlay': '0 28px 60px rgba(24, 24, 27, 0.18)',
    'shadow-nav': '0px -4px 12px rgba(0, 0, 0, 0.04)',
    'radius-sm': '8px',
    'radius-md': '12px',
    'radius-lg': '16px',
    'radius-xl': '20px',
    'radius-full': '50%',
    'gradient-home': `
     radial-gradient(circle at top left, rgba(67, 63, 85, 0.18) 0%, rgba(104, 75, 251, 0) 34%),
    linear-gradient(180deg, #696969ff 0%, rgba(255, 255, 255, 1) 30%)
    `
    ,
    'gradient-chat': 'linear-gradient(180deg, #444444ff 0%, #FFFFFF 13%)',
    'shadow-bubble': '0 4px 16px rgba(24, 24, 27, 0.4)',
    'shadow-bubble-hover': '0 6px 20px rgba(24, 24, 27, 0.55)',
    'shadow-bubble-close': '0 4px 16px rgba(239, 68, 68, 0.4)',
    'nav-item-active-shadow': '0 10px 24px rgba(24, 24, 27, 0.12)',
  },

};

/**
 * 当前激活的主题名
 */
export let currentTheme = 'default';

/**
 * 所有可用主题的键名列表
 */
export const themeNames = Object.keys(themePresets);

/**
 * 应用主题到目标 DOM 元素
 * @param {string} themeName - 主题名称（themePresets 的键）
 * @param {HTMLElement | null} target - 目标元素，默认查找 #chat-app 或 :host
 */
export function applyTheme(themeName, target) {
  const preset = themePresets[themeName];
  if (!preset) {
    console.warn(`[ChatWidget] 主题 "${themeName}" 不存在，使用默认主题`);
    return applyTheme('default', target);
  }

  const el = target || document.querySelector('#chat-app') || document.querySelector(':host');
  if (!el) {
    console.warn('[ChatWidget] 未找到目标元素，主题应用失败');
    return;
  }

  Object.entries(preset).forEach(([key, value]) => {
    el.style.setProperty(`--cw-${key}`, value);
  });

  currentTheme = themeName;
}

/**
 * 获取当前主题配置
 * @returns {object}
 */
export function getThemeConfig(themeName) {
  return themePresets[themeName || currentTheme] || themePresets.default;
}

// 兼容旧版导出
export const defaultConfig = themePresets.default;
