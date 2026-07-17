import React from 'react';
import { MarkdownRender } from '@douyinfe/semi-ui';
import { IconBolt } from '@douyinfe/semi-icons';
import Loading from './Loading';
import './ChatItem.scss';

/* ============================================================
   自定义 Markdown Code 渲染器 — 商品卡片
   ============================================================ */

const CommodityCard = ({ data }) => {
  const { pic, title, price, skus } = data || {};

  const toBuy = () => {
    window.parent.postMessage({
      source: 'luna-h5',
      type: 'to_buy',
      variant_id: skus[0].out_sku_code.replace('ERP_VAR_', ''),
    }, '*');
  };

  const addToCart = () => {
    window.parent.postMessage({
      source: 'luna-h5',
      type: 'add_cart',
      variant_id: skus[0].out_sku_code.replace('ERP_VAR_', ''),
    }, '*');
  };

  return (
    <div
      style={{
        background: '#fff',
        margin: '8px 0',
        borderRadius: '12px',
        overflow: 'hidden',
        padding: '12px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        alignItems: 'flex-start',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ minWidth: '300px', display: 'flex' }}>
        {pic && (
          <img
            src={pic}
            alt={title}
            style={{
              width: '48px',
              height: '48px',
              marginRight: '12px',
              objectFit: 'cover',
              flexShrink: 0,
              borderRadius: '8px',
            }}
          />
        )}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
            minHeight: '48px',
          }}
        >
          <div style={{ marginBottom: '6px' }}>
            <div style={{
              lineHeight: '20px',
              color: '#101427',
              fontSize: '14px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '200px',
              fontWeight: 500,
            }}>{title}</div>
          </div>
          {price != null && (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{
                color: '#ff0000ff',
                fontSize: '18px',
                lineHeight: '22px',
                fontWeight: 600,
              }}>${price}</span>
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <button
          onClick={toBuy}
          style={{
            width: '48%',
            padding: '8px 0',
            background: '#684BFB',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '20px',
            cursor: 'pointer',
          }}>Buy Now</button>
        <button
          onClick={addToCart}
          style={{
            width: '48%',
            padding: '8px 0',
            background: '#fff',
            color: '#684BFB',
            border: '1px solid #684BFB',
            borderRadius: '8px',
            fontSize: '14px',
            lineHeight: '20px',
            cursor: 'pointer',
          }}>Add to Cart</button>
      </div>
    </div>
  );
};

const BundleCard = (props) => {
  const { ui_card } = props;

  const toDetail = (name) => {
    window.parent.postMessage({
      source: 'luna-h5',
      type: 'to_detail',
      name,
    }, '*');
  };

  const toBuy = (variant_id, discount_code) => {
    window.parent.postMessage({
      source: 'luna-h5',
      type: 'to_buy',
      variant_id,
      discount_code,
    }, '*');
  };

  const safeComponents = Array.isArray(ui_card?.components) ? ui_card.components : [];
  const originalTotal = Number(ui_card?.original_price);
  const discountedTotal = Number(ui_card?.discounted_price);
  const savedAmount = ui_card?.saved_amount ?? (Number.isFinite(originalTotal) && Number.isFinite(discountedTotal) ? (originalTotal - discountedTotal).toFixed(2) : undefined);
  const savedAmountDisplay = savedAmount !== undefined && savedAmount !== null
    ? (Number.isFinite(Number(savedAmount)) ? String(Number(savedAmount).toFixed(2)).replace(/\.00$/, '') : String(savedAmount))
    : undefined;
  const expiresInSeconds = typeof ui_card?.expires_in_seconds === 'number' ? ui_card.expires_in_seconds : 30 * 60;

  const formatTime = (seconds) => {
    const safeSeconds = Math.max(0, Number(seconds) || 0);
    const hours = Math.floor(safeSeconds / 3600);
    const minutes = Math.floor((safeSeconds % 3600) / 60);
    const remainingSeconds = Math.floor(safeSeconds % 60);
    const pad = (n) => String(n).padStart(2, '0');
    if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
    return `${pad(minutes)}:${pad(remainingSeconds)}`;
  };

  return (
    <div
      style={{
        minWidth: '300px',
        background: '#fff',
        border: '1px solid #e7e7e7',
        borderRadius: '12px',
        overflow: 'hidden',
        padding: '16px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <div style={{
          lineHeight: '22px',
          color: '#101427',
          fontSize: '16px',
          fontWeight: 700,
        }}>{ui_card?.title}</div>
        <div style={{
          marginTop: '4px',
          lineHeight: '18px',
          color: '#8a8a8a',
          fontSize: '12px',
        }}>{ui_card?.bundle_name}</div>
      </div>

      {savedAmountDisplay !== undefined && (
        <div style={{
          backgroundColor: '#e9f8ee',
          borderRadius: '6px',
          padding: '6px 0',
          textAlign: 'center',
          marginBottom: '10px',
        }}>
          <span style={{
            color: '#17a34a',
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 700,
          }}>Save ${savedAmountDisplay}</span>
        </div>
      )}

      <div style={{ marginBottom: '10px' }}>
        {safeComponents.map((component, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              padding: '8px 0',
              borderBottom: index < safeComponents.length - 1 ? '1px solid #f0f0f0' : 'none',
            }}
          >
            {component?.image ? (
              <img
                src={component.image.trim()}
                alt={component?.name}
                style={{
                  width: '40px',
                  height: '40px',
                  marginRight: '12px',
                  objectFit: 'cover',
                  flexShrink: 0,
                  borderRadius: '8px',
                  backgroundColor: '#f3f3f3',
                }}
              />
            ) : (
              <div style={{ width: '72px', height: '72px', marginRight: '12px', borderRadius: '8px', backgroundColor: '#f3f3f3' }} />
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                lineHeight: '18px',
                color: '#101427',
                fontSize: '13px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                fontWeight: 600,
              }}>{component?.name}</div>

              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{
                  color: '#ff5a2a',
                  fontSize: '14px',
                  lineHeight: '18px',
                  fontWeight: 700,
                }}>${component?.discounted_price}</span>
                <span style={{
                  color: '#b0b0b0',
                  fontSize: '12px',
                  lineHeight: '18px',
                  textDecoration: 'line-through',
                }}>${component?.original_price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '10px', backgroundColor: '#FEF8F4' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px' }}>
          <span style={{ color: '#333', fontSize: '12px', lineHeight: '18px' }}>Bundle Price</span>
          <span style={{ color: '#333', fontSize: '16px', lineHeight: '22px', fontWeight: 700 }}>${ui_card?.discounted_price}</span>
          <span style={{ color: '#b0b0b0', fontSize: '12px', lineHeight: '18px', textDecoration: 'line-through' }}>${ui_card?.original_price}</span>
        </div>

        <div style={{ marginTop: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '14px', height: '14px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff4d00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="13" r="8" />
              <path d="M12 9v5l3 2" />
              <path d="M5 3l2 2" />
              <path d="M19 3l-2 2" />
            </svg>
          </span>
          <span style={{ color: '#8a8a8a', fontSize: '12px', lineHeight: '18px' }}>Exclusive Offer · Limited Time</span>
          <span style={{ color: '#ff4d00', fontSize: '13px', lineHeight: '18px', fontWeight: 700 }}>{formatTime(expiresInSeconds)}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <button
          style={{
            flex: 1,
            padding: '10px 0',
            backgroundColor: '#684BFB',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
          onClick={() => toBuy(ui_card?.variant_id, ui_card?.discount_code)}
        >
          Buy Now
        </button>
        <button
          style={{
            flex: 1,
            padding: '10px 0',
            backgroundColor: '#fff',
            color: '#333',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          onClick={() => toDetail(ui_card?.bundle_name)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const DiscountCard = ({ data }) => {
  const { title, discount_code, discount_value, expires_in_seconds } = data || {};
  const [remaining, setRemaining] = React.useState(expires_in_seconds || 600);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const copyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(discount_code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = discount_code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const discountDisplay = discount_value != null
    ? (discount_value < 1 ? `${Math.round(discount_value * 100)}% OFF` : `$${discount_value} OFF`)
    : '';

  return (
    <div style={{
      minWidth: '300px',
      background: '#fff',
      border: '1px solid #e7e7e7',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.06)',
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #684BFB, #9b7dff)',
        padding: '14px',
        textAlign: 'center',
      }}>
        <div style={{ color: '#fff', fontSize: '16px', fontWeight: 700, lineHeight: '22px' }}>{title}</div>
      </div>

      {discountDisplay && (
        <div style={{ textAlign: 'center', padding: '12px 16px 6px' }}>
          <span style={{
            color: '#ff5a2a',
            fontSize: '28px',
            fontWeight: 800,
            lineHeight: '34px',
          }}>{discountDisplay}</span>
        </div>
      )}

      <div style={{
        margin: '10px 16px',
        padding: '12px',
        background: '#f7f5ff',
        borderRadius: '8px',
        border: '1px dashed #684BFB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ color: '#8a8a8a', fontSize: '11px', lineHeight: '16px' }}>Promo Code</div>
          <div style={{ color: '#684BFB', fontSize: '18px', fontWeight: 700, lineHeight: '24px', letterSpacing: '1px' }}>{discount_code}</div>
        </div>
        <button
          onClick={copyCode}
          style={{
            padding: '6px 16px',
            background: copied ? '#e9f8ee' : '#684BFB',
            color: copied ? '#17a34a' : '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

const MarkdownCodeRenderer = ({ className, children }) => {
  const lang = className?.replace('language-', '');

  switch (lang) {
    case 'upsello-card':
      return <CommodityCard data={JSON.parse(children)} />;
    case 'upsello-bundle':
      return <BundleCard data={JSON.parse(children)} />;
    case 'upsello-discountCard':
      return <DiscountCard data={JSON.parse(children)} />;
    default:
      return (
        <pre>
          <code>{children}</code>
        </pre>
      );
  }
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ChatItem 渲染异常:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#ef4444', padding: 10, fontSize: 12 }}>
          <p>消息渲染异常</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function ChatItem({
  role,
  content,
  loading,
  update,
  followUp = [],
  followUpFlag = false,
  onFollowUpClick,
}) {
  const isAgent = role === 'agent' || role === 'assistant';

  return (
    <div className={`chat-item ${isAgent ? 'chat-item--agent' : 'chat-item--user'}`}>
      <div className="chat-item__bubble-wrapper">
        <div
          className={`chat-item__bubble ${
            isAgent ? 'chat-item__bubble--agent' : 'chat-item__bubble--user'
          }`}
        >
          <ErrorBoundary>
            {loading ? (
              <div className="chat-item__loading">
                <span>Working on your response</span>
                <Loading />
              </div>
            ) : (
              <MarkdownRender
                raw={content}
                components={{
                  code: MarkdownCodeRenderer,
                }}
              />
            )}
          </ErrorBoundary>
        </div>

        {isAgent && update ? (
          <div className="chat-item__meta">
            <IconBolt style={{ color: '#684BFB', marginRight: 4, fontSize: 12 }} />
            AI Reply · {update}
          </div>
        ) : null}

        {isAgent && followUpFlag && followUp.length > 0 ? (
          <div className="chat-item__followup">
            {followUp.map((item, index) => (
              <button
                key={`${item}-${index}`}
                type="button"
                className="chat-item__followup-btn"
                onClick={() => onFollowUpClick?.(item)}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
