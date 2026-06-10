import React, { useState } from 'react';
import { GlobeIcon } from './Icons';

export const ChromeFrame = ({ children }) => {
  const [url, setUrl] = useState('localhost:3000/psm');

  return (
    <div className="chrome-container">
      {/* Chrome Window Titlebar / Tab Row */}
      <div className="chrome-header">
        <div className="chrome-tabs-row">
          {/* Active Tab */}
          <div className="chrome-tabs">
            <div className="chrome-tab active">
              <span className="chrome-tab-icon">🌐</span>
              <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>NeonOS OS</span>
              <span className="chrome-tab-close">×</span>
            </div>
            <div className="chrome-tab-plus">+</div>
          </div>

          {/* Chrome Window Controls - Windows Style */}
          <div className="chrome-window-controls-win">
            <button className="chrome-win-btn-rect" title="Minimize Browser">
              <svg width="10" height="1" viewBox="0 0 10 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="10" height="1" fill="currentColor" />
              </svg>
            </button>
            <button className="chrome-win-btn-rect" title="Maximize Browser">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="9" height="9" stroke="currentColor" fill="none" />
              </svg>
            </button>
            <button className="chrome-win-btn-rect close" title="Close Browser">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0.5L9.5 9.5M9.5 0.5L0.5 9.5" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>
        </div>

        {/* Chrome Navigation / URL Bar Row */}
        <div className="chrome-nav-row">
          <div className="chrome-nav-buttons">
            <div className="chrome-nav-btn" title="Back">◀</div>
            <div className="chrome-nav-btn" title="Forward">▶</div>
            <div className="chrome-nav-btn" title="Reload">↻</div>
          </div>

          {/* URL Input */}
          <div className="chrome-url-bar">
            <span style={{ color: '#9aa0a6', marginRight: '6px', fontSize: '11px' }}>🔒</span>
            <input
              type="text"
              className="chrome-url-text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              title="URL Address"
            />
          </div>

          {/* Right Actions (Extensions & Profile) */}
          <div className="chrome-right-actions">
            <div className="chrome-extension-icon" title="Extensions">🧩</div>
            <div className="chrome-extension-icon" title="Bookmarks">⭐</div>
            <div 
              className="chrome-profile-pic" 
              title="Chrome Profile"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces")'
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Viewport for internal Retro OS */}
      <div className="os-viewport">
        {children}
      </div>
    </div>
  );
};
