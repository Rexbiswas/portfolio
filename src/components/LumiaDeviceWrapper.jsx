import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';

const PHONE_COLORS = [
  { name: 'Yellow', id: 'yellow', hex: '#ffd300' },
  { name: 'Cyan', id: 'cyan', hex: '#00a2e8' },
  { name: 'Magenta', id: 'magenta', hex: '#d80073' },
  { name: 'White', id: 'white', hex: '#ffffff' },
  { name: 'Black', id: 'black', hex: '#1d1d1d' },
];

const ACCENT_COLORS = [
  { name: 'Cobalt', hex: '#0050ef' },
  { name: 'Teal', hex: '#00aba9' },
  { name: 'Lime', hex: '#a2c139' },
  { name: 'Emerald', hex: '#008a00' },
  { name: 'Green', hex: '#60a917' },
  { name: 'Magenta', hex: '#d80073' },
  { name: 'Pink', hex: '#e671b8' },
  { name: 'Orange', hex: '#fa6800' },
  { name: 'Mango', hex: '#f0a30a' },
  { name: 'Red', hex: '#e51400' },
];

export const LumiaDeviceWrapper = ({ children }) => {
  const {
    phoneColor,
    setPhoneColor,
    lumiaTheme,
    setLumiaTheme,
    lumiaAccent,
    setLumiaAccent,
    setActiveOS,
    setBooting,
    openWindow,
  } = useStore();

  const [isFlipped, setIsFlipped] = useState(false);
  const [isScreenOn, setIsScreenOn] = useState(true);
  const [volume, setVolume] = useState(15);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeSliderTimer = useRef(null);

  // Handle hardware key events
  const triggerHardwareBack = () => {
    if (!isScreenOn) return;
    window.dispatchEvent(new CustomEvent('lumia-hardware-back'));
  };

  const triggerHardwareHome = () => {
    if (!isScreenOn) return;
    window.dispatchEvent(new CustomEvent('lumia-hardware-home'));
  };

  const triggerHardwareSearch = () => {
    if (!isScreenOn) return;
    window.dispatchEvent(new CustomEvent('lumia-hardware-search'));
  };

  const handlePowerButton = () => {
    setIsScreenOn(prev => !prev);
  };

  const handleVolumeUp = () => {
    if (!isScreenOn) return;
    setVolume(prev => {
      const newVol = Math.min(30, prev + 1);
      triggerVolumeIndicator();
      return newVol;
    });
  };

  const handleVolumeDown = () => {
    if (!isScreenOn) return;
    setVolume(prev => {
      const newVol = Math.max(0, prev - 1);
      triggerVolumeIndicator();
      return newVol;
    });
  };

  const handleCameraKey = () => {
    if (!isScreenOn) return;
    // Launch projects app shortcut!
    openWindow('projectShowcase');
  };

  const triggerVolumeIndicator = () => {
    setShowVolumeSlider(true);
    if (volumeSliderTimer.current) {
      clearTimeout(volumeSliderTimer.current);
    }
    volumeSliderTimer.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (volumeSliderTimer.current) {
        clearTimeout(volumeSliderTimer.current);
      }
    };
  }, []);

  const handleOSSwitch = () => {
    setBooting(true);
    setActiveOS('win98');
  };

  return (
    <div className="lumia-desktop-workspace">
      <div className="lumia-workspace-container">
        
        {/* Left Side: 3D phone model */}
        <div className="lumia-phone-perspective">
          <div 
            className={`lumia-phone-chassis phone-color-${phoneColor} ${isFlipped ? 'flipped' : ''}`}
            style={{ '--accent-theme': lumiaAccent }}
          >
            {/* Front of phone */}
            <div className="phone-front">
              {/* Top Bezel Hardware */}
              <div className="lumia-bezel-earpiece" />
              <div className="lumia-bezel-logo">NOKIA</div>
              <div className="lumia-bezel-camera" />

              {/* Physical Screen Glass/Viewport Area */}
              <div 
                style={{ 
                  flexGrow: 1, 
                  position: 'relative', 
                  overflow: 'hidden', 
                  backgroundColor: '#000000',
                  borderRadius: '2px'
                }}
                className={`lumia-theme-${lumiaTheme}`}
              >
                {/* Simulated Screen Power State */}
                {isScreenOn ? (
                  <>
                    {/* Screen content (LumiaUI) */}
                    {children}

                    {/* Hardware Volume Slider Overlay inside screen */}
                    {showVolumeSlider && (
                      <div className="lumia-volume-overlay">
                        <span>ring + notifications</span>
                        <div className="volume-bar-container">
                          <div 
                            className="volume-bar-fill" 
                            style={{ width: `${(volume / 30) * 100}%` }}
                          />
                        </div>
                        <span style={{ fontWeight: 'bold' }}>{volume}/30</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      backgroundColor: '#000000', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#222', 
                      fontSize: '11px',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                    onClick={handlePowerButton}
                  >
                    {/* Double-tap screen or press power button to wake up */}
                    <span>(screen off)</span>
                  </div>
                )}
              </div>

              {/* Bottom Bezel Hardware Keys */}
              <div className="lumia-bezel-nav">
                <button 
                  className="lumia-bezel-key" 
                  onClick={triggerHardwareBack}
                  title="Back"
                >
                  ←
                </button>
                <button 
                  className="lumia-bezel-key" 
                  onClick={triggerHardwareHome}
                  title="Start"
                >
                  ⊞
                </button>
                <button 
                  className="lumia-bezel-key" 
                  onClick={triggerHardwareSearch}
                  title="Search"
                >
                  ⌕
                </button>
              </div>
            </div>

            {/* Back of phone */}
            <div className="phone-back">
              <div className="phone-camera-section">
                <div className="phone-flash" />
                <div className="phone-camera-pod">
                  <div className="phone-camera-lens" />
                  <span className="phone-camera-text">Nokia Carl Zeiss</span>
                </div>
              </div>

              <div className="phone-speaker-grill">
                <span /><span /><span /><span /><span />
                <span /><span /><span /><span /><span />
              </div>
            </div>

            {/* Hardware Side Buttons (Right Edge) */}
            <div 
              className="phone-side-button phone-button-vol-up" 
              onClick={handleVolumeUp}
              title="Volume Up"
            />
            <div 
              className="phone-side-button phone-button-vol-down" 
              onClick={handleVolumeDown}
              title="Volume Down"
            />
            <div 
              className="phone-side-button phone-button-power" 
              onClick={handlePowerButton}
              title="Power / Lock Screen"
            />
            <div 
              className="phone-side-button phone-button-camera" 
              onClick={handleCameraKey}
              title="Camera Shutter (Shortcuts)"
            />
          </div>
        </div>

        {/* Right Side: Customize Control Panel */}
        <div className="lumia-control-panel" style={{ '--accent-theme': lumiaAccent }}>
          <h2 className="lumia-control-title">
            <span>📱</span> lumia customizer
          </h2>

          <div>
            <div className="lumia-control-label">Phone Color</div>
            <div className="color-swatch-list">
              {PHONE_COLORS.map(c => (
                <div 
                  key={c.id}
                  className={`color-swatch ${phoneColor === c.id ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setPhoneColor(c.id)}
                  title={`${c.name} poly-carbonate`}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="lumia-control-label">Tile Accent Color</div>
            <div className="accent-swatch-grid">
              {ACCENT_COLORS.map(c => (
                <div 
                  key={c.hex}
                  className={`accent-swatch ${lumiaAccent === c.hex ? 'active' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => setLumiaAccent(c.hex)}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="lumia-control-label">OS Theme Mode</div>
            <button 
              className="lumia-toggle-btn"
              onClick={() => setLumiaTheme(lumiaTheme === 'dark' ? 'light' : 'dark')}
            >
              {lumiaTheme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto' }}>
            <button 
              className="lumia-sidebar-btn outline"
              onClick={() => setIsFlipped(prev => !prev)}
            >
              🔄 Spin Phone
            </button>
            <button 
              className="lumia-sidebar-btn accent"
              onClick={handleOSSwitch}
            >
              🖥️ Switch to Windows 98
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
