import React from 'react';
import { IconComment, IconClose, IconShoppingBag, IconGift, IconChevronRight } from '@douyinfe/semi-icons';
import './HomePage.scss';

export default function HomePage({ onSwitchToChat, onClose, prologue }) {
  const shopHighlights = [
    {
      key: 'best-sellers',
      title: 'Best Sellers',
      description: 'See our most-loved products',
    },
    {
      key: 'deals-offers',
      title: 'Deals & Offers',
      description: 'Browse current promotions',
    },
  ];

  return (
    <div className="home-page">
      {/* Header */}
      <div className="home-page__header">
        <div />
        <div className="home-page__header-right">
          <div
            className="home-page__close-btn"
            onClick={onClose}
            role="button"
            tabIndex={0}
            aria-label="Close"
          >
            <IconClose size="large" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="home-page__body">
        {/* Title */}
        <div className="home-page__title-section">
          <h1 className="home-page__title">{prologue || ''}</h1>
        </div>

        {/* Contact Card */}
        <div className="home-page__contact-card">
          <div className="home-page__contact-header">
            <div className="home-page__contact-info">
              <h3 className="home-page__contact-title">Contact us</h3>
              <div className="home-page__availability">
                <span className="home-page__status-dot" />
                <span className="home-page__status-text">Our support is available 24/7</span>
              </div>
            </div>
            <div className="home-page__question-icon">
              <IconComment size="default" style={{ color: 'var(--cw-color-primary)' }} />
            </div>
          </div>
          <button className="home-page__chat-btn" onClick={() => onSwitchToChat()}>
            <IconComment size="default " style={{ marginRight: '8px', color: 'white' }} />
            Chat Now
          </button>
        </div>

        {/* Shop Highlights */}
        <div className="home-page__highlights">
          <div className="home-page__highlights-header">
            <h4 className="home-page__highlights-title">Shop Highlights</h4>
            <div className="home-page__highlights-subtitle">Quick ways to explore our store</div>
          </div>
          <div className="home-page__highlights-list">
            {shopHighlights.map((item) => (
              <button
                key={item.key}
                type="button"
                className="home-page__highlight-card"
                onClick={() => onSwitchToChat(item.title)}
              >
                <div className="home-page__highlight-left">
                  <div className="home-page__highlight-icon">
                    {item.key === 'best-sellers' ? (
                      <IconShoppingBag size="large" />
                    ) : (
                      <IconGift size="large" />
                    )}
                  </div>
                  <div className="home-page__highlight-text">
                    <div className="home-page__highlight-title">{item.title}</div>
                    <div className="home-page__highlight-desc">{item.description}</div>
                  </div>
                </div>
                <div className="home-page__highlight-arrow">
                  <IconChevronRight size="large" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
