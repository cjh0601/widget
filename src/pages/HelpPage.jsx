import React, { useState, useEffect, useRef } from 'react';
import { IconSetting, IconHelpCircle, IconChevronLeft, IconClose, IconChevronDown, IconChevronRight } from '@douyinfe/semi-icons';
import './HelpPage.scss';
import { getShopify, recommendToggle } from '../api/chatWoot';

export default function HelpPage({ visitorId, onClose }) {
  const [currentView, setCurrentView] = useState('list');
  const [smartRecommendEnabled, setSmartRecommendEnabled] = useState(true);
  const [recommendLoaded, setRecommendLoaded] = useState(false);
  const [recommendLoading, setRecommendLoading] = useState(false);
  const [recommendSaving, setRecommendSaving] = useState(false);

  useEffect(() => {
    if (currentView !== 'preference') return;
    if (!visitorId) return;
    if (recommendLoaded || recommendLoading) return;

    const loadRecommendState = async () => {
      setRecommendLoading(true);
      try {
        const res = await getShopify(visitorId);
        if (res?.code === 200 && typeof res?.data?.is_recommend_enabled === 'boolean') {
          setSmartRecommendEnabled(res.data.is_recommend_enabled);
        }
        setRecommendLoaded(true);
      } catch {
        // silent fail
      } finally {
        setRecommendLoading(false);
      }
    };

    loadRecommendState();
  }, [currentView, recommendLoaded, recommendLoading, visitorId]);

  const onRecommendChange = async (checked) => {
    if (!visitorId) return;
    if (recommendSaving) return;

    const prev = smartRecommendEnabled;
    setSmartRecommendEnabled(checked);
    setRecommendSaving(true);
    try {
      await recommendToggle({
        visitor_id: visitorId,
        is_recommend_enabled: checked,
      });
    } catch {
      setSmartRecommendEnabled(prev);
    } finally {
      setRecommendSaving(false);
    }
  };

  const options = [
    {
      key: 'preference',
      title: 'Preference for Offers',
      subtitle: 'Manage your benefit reminders',
      icon: (
        <IconSetting size="large" style={{ color: '#684BFB' }} />
      ),
    },
    {
      key: 'faq',
      title: 'Frequently Asked Questions',
      subtitle: 'Find quick answers to common questions',
      icon: (
        <IconHelpCircle size="large" style={{ color: '#684BFB' }} />
      ),
    },
  ];

  if (currentView === 'preference') {
    return (
      <div className="help-page">
        <div className="help-page__header">
          <button className="help-page__back-btn" onClick={() => setCurrentView('list')} aria-label="Back">
            <IconChevronLeft size="small" style={{ color: '#1a1a1a' }} />
            <span className="help-page__subpage-title">Preference for Offers</span>
          </button>
          <button className="help-page__close-btn" onClick={onClose} aria-label="Close">
            <IconClose size="large" />
          </button>
        </div>

        <div className="help-page__subpage-content">
          <div className="help-page__switch-row">
            <span className="help-page__switch-label">Enable Smart Recommendations</span>
            <button
              className={`help-page__toggle ${smartRecommendEnabled ? 'help-page__toggle--on' : ''}`}
              onClick={() => onRecommendChange(!smartRecommendEnabled)}
              disabled={recommendLoading || recommendSaving}
              aria-label="Toggle smart recommendations"
            >
              <span className="help-page__toggle-knob" />
            </button>
          </div>

          <div className="help-page__info-card">
            <div className="help-page__info-title">Once enabled, you'll receive exclusive offers when:</div>
            <div className="help-page__info-columns">
              <ul className="help-page__info-list">
                <li>You show interest in a product</li>
                <li>There are items left in your cart</li>
                <li>It's a good time to bundle and buy together</li>
                <li>Other moments that help you save money</li>
              </ul>
              <ul className="help-page__info-list help-page__info-list--right">
                <li>Limited-time discounts or coupon codes</li>
                <li>Exclusive reminders + perks</li>
                <li>Bundle deal recommendations</li>
                <li>Surprise perks</li>
              </ul>
            </div>
          </div>

          <div className="help-page__simple-card">
            <div className="help-page__simple-card-title">Frequency</div>
            <div className="help-page__simple-card-text">Up to 2 notifications per day, never disruptive</div>
          </div>

          <details className="help-page__details-card">
            <summary className="help-page__details-summary">
              <span>Unsubscribe</span>
              <span className="help-page__details-arrow">
                <IconChevronDown size="small" style={{ color: '#666' }} />
              </span>
            </summary>
            <div className="help-page__details-content">
              <ul className="help-page__details-list">
                <li>After turning off the toggle above, you will no longer receive any proactive offer notifications</li>
                <li>You can still use basic features such as customer support and order lookup</li>
                <li>If you want to turn it back on, just return to this page and enable the toggle anytime</li>
                <li>You can also reply to customer support with "Disable recommendations" to unsubscribe quickly</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="help-page">
      <div className="help-page__header">
        <div />
        <div className="help-page__close-btn" onClick={onClose} role="button" tabIndex={0} aria-label="Close">
          <IconClose size="large" />
        </div>
      </div>

      <div className="help-page__content">
        <div className="help-page__options">
          {options.map((option) => (
            <div
              key={option.key}
              className="help-page__option-card"
              role="button"
              tabIndex={0}
              onClick={() => option.key === 'preference' ? setCurrentView('preference') : null}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && option.key === 'preference') {
                  setCurrentView('preference');
                }
              }}
            >
              <div className="help-page__option-content">
                <div className="help-page__option-icon">{option.icon}</div>
                <div className="help-page__option-text">
                  <div className="help-page__option-title">{option.title}</div>
                  <div className="help-page__option-subtitle">{option.subtitle}</div>
                </div>
              </div>
              <div className="help-page__option-arrow">
                <IconChevronRight size="large" style={{ color: '#666' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
