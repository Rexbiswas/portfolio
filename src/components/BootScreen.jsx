import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

// 4-Color Waving Windows Flag SVG (matching reference images)
const WindowsWaveLogo = ({ size = 80 }) => (
  <svg width={size} height={size * 0.85} viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="winWaveRed" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF4D4D" />
        <stop offset="100%" stopColor="#C62828" />
      </linearGradient>
      <linearGradient id="winWaveGreen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#66BB6A" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <linearGradient id="winWaveBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#42A5F5" />
        <stop offset="100%" stopColor="#1565C0" />
      </linearGradient>
      <linearGradient id="winWaveYellow" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFCA28" />
        <stop offset="100%" stopColor="#F57F17" />
      </linearGradient>
      <filter id="logoGlowShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.45" />
      </filter>
    </defs>

    <g filter="url(#logoGlowShadow)">
      {/* Top-Left Red Pane */}
      <path
        d="M 12 18 C 22 10, 34 22, 46 15 L 46 42 C 34 49, 22 37, 12 45 Z"
        fill="url(#winWaveRed)"
      />
      {/* Top-Right Green Pane */}
      <path
        d="M 51 14 C 63 7, 75 19, 87 12 L 87 39 C 75 46, 63 34, 51 41 Z"
        fill="url(#winWaveGreen)"
      />
      {/* Bottom-Left Blue Pane */}
      <path
        d="M 12 49 C 22 41, 34 53, 46 46 L 46 73 C 34 80, 22 68, 12 76 Z"
        fill="url(#winWaveBlue)"
      />
      {/* Bottom-Right Yellow Pane */}
      <path
        d="M 51 45 C 63 38, 75 50, 87 43 L 87 70 C 75 65, 63 65, 51 72 Z"
        fill="url(#winWaveYellow)"
      />
    </g>
  </svg>
);

// Windows Bouncing 3-Block Progress Bar (matching Image 2)
const XPProgressBar = () => (
  <div
    style={{
      width: '200px',
      height: '16px',
      border: '1.5px solid #808080',
      borderRadius: '3px',
      backgroundColor: '#000000',
      padding: '2px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'inset 0 0 5px rgba(0,0,0,0.9)'
    }}
  >
    <div className="xp-sliding-blocks">
      <div className="xp-single-block" />
      <div className="xp-single-block" />
      <div className="xp-single-block" />
    </div>

    <style dangerouslySetInnerHTML={{ __html: `
      .xp-sliding-blocks {
        display: flex;
        gap: 3px;
        position: absolute;
        top: 2px;
        height: 9px;
        animation: xp-blocks-slide 1.6s infinite ease-in-out;
      }
      .xp-single-block {
        width: 8px;
        height: 100%;
        background: linear-gradient(180deg, #90CAF9 0%, #1E88E5 50%, #1565C0 100%);
        border-radius: 1px;
        box-shadow: 0 0 4px #42A5F5;
      }
      @keyframes xp-blocks-slide {
        0% { left: -35px; }
        100% { left: 205px; }
      }
    ` }} />
  </div>
);

export const BootScreen = () => {
  const { setBooting, activeOS, lumiaAccent } = useStore();
  const [phase, setPhase] = useState('loader'); // 'loader' | 'welcome'
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const isMobileSize = typeof window !== 'undefined' && window.innerWidth < 1024;
  const effectiveOS = isMobileSize ? 'lumia' : activeOS;

  // Lumia boot state
  const [lumiaPhase, setLumiaPhase] = useState('nokia');
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const welcomeTranslations = ['Welcome', 'स्वागत', 'स्वागतम्', 'Willkommen', 'Bienvenue'];
  const [widths, setWidths] = useState({});

  useEffect(() => {
    const fontSpec = `300 ${isMobileSize ? '24px' : '32px'} "Segoe UI Light", "Segoe UI", sans-serif`;
    const newWidths = {};
    welcomeTranslations.forEach(word => {
      try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          context.font = fontSpec;
          newWidths[word] = Math.ceil(context.measureText(word).width) + 8;
        } else {
          newWidths[word] = isMobileSize ? 110 : 150;
        }
      } catch (e) {
        newWidths[word] = isMobileSize ? 110 : 150;
      }
    });
    setWidths(newWidths);
  }, [isMobileSize]);

  // Mobile Lumia sequence
  useEffect(() => {
    if (effectiveOS !== 'lumia') return;

    const timer1 = setTimeout(() => setLumiaPhase('splash'), 1800);
    const timer2 = setTimeout(() => setBooting(false), 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [effectiveOS, setBooting]);

  useEffect(() => {
    if (effectiveOS !== 'lumia' || lumiaPhase !== 'splash') return;
    const interval = setInterval(() => {
      setWelcomeIndex(prev => (prev + 1) % welcomeTranslations.length);
    }, 500);
    return () => clearInterval(interval);
  }, [effectiveOS, lumiaPhase]);

  // Desktop Boot Loader timer: transition from black loader screen to welcome screen after 2.8s
  useEffect(() => {
    if (effectiveOS === 'lumia' || phase !== 'loader') return;

    const timer = setTimeout(() => {
      setPhase('welcome');
    }, 2800);

    return () => clearTimeout(timer);
  }, [phase, effectiveOS]);

  const handleLogin = () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    setTimeout(() => {
      setBooting(false);
    }, 400);
  };

  // Keyboard shortcut listener to log in
  useEffect(() => {
    if (effectiveOS === 'lumia') return;

    const handleKeyDown = (e) => {
      if (phase === 'loader') {
        setPhase('welcome');
      } else if (phase === 'welcome') {
        handleLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, effectiveOS, isLoggingIn]);

  // Lumia Rendering path
  if (effectiveOS === 'lumia') {
    if (lumiaPhase === 'nokia') {
      return (
        <div
          style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 30000,
          }}
        >
          <span
            style={{
              color: '#ffffff',
              fontFamily: '"Segoe UI", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: isMobileSize ? '24px' : '36px',
              fontWeight: 'bold',
              letterSpacing: isMobileSize ? '3px' : '6px',
              textTransform: 'uppercase',
              textAlign: 'center',
              padding: '0 24px',
            }}
          >
            Rishi's Portfolio
          </span>
        </div>
      );
    }

    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: lumiaAccent || '#0050ef',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '40px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 30000,
          fontFamily: '"Segoe UI Light", "Segoe UI", sans-serif',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', width: isMobileSize ? '36px' : '48px', height: isMobileSize ? '36px' : '48px', transform: 'skewY(-6deg)' }}>
            <div style={{ backgroundColor: '#ffffff' }} />
            <div style={{ backgroundColor: '#ffffff' }} />
            <div style={{ backgroundColor: '#ffffff' }} />
            <div style={{ backgroundColor: '#ffffff' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: isMobileSize ? '24px' : '32px', fontWeight: '300', height: isMobileSize ? '36px' : '48px' }}>
            <motion.div
              animate={{ width: widths[welcomeTranslations[welcomeIndex]] || (isMobileSize ? 100 : 140) }}
              transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
              style={{ position: 'relative', height: isMobileSize ? '36px' : '48px', overflow: 'hidden', marginRight: '8px' }}
            >
              <AnimatePresence>
                <motion.span
                  key={welcomeIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
                  style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', height: '100%', display: 'flex', alignItems: 'center' }}
                >
                  {welcomeTranslations[welcomeIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // --- Phase 1: Black Boot Loader Screen (Image 2 Vibe) ---
  if (phase === 'loader') {
    return (
      <div
        onClick={() => setPhase('welcome')}
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 30000,
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {/* Center Logo & Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <WindowsWaveLogo size={85} />
            <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
              <span style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif', opacity: 0.9, letterSpacing: '0.5px' }}>
                Rishi-Biswas
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline' }}>
                <span style={{ fontSize: '42px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', lineHeight: '1', letterSpacing: '-0.5px' }}>
                  Portfolio
                </span>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF6A00', fontFamily: 'Arial, sans-serif', marginLeft: '3px' }}>
                  98
                </span>
              </div>
            </div>
          </div>

          {/* XP Animated 3-Block Loading Bar */}
          <div style={{ marginTop: '16px' }}>
            <XPProgressBar />
          </div>
        </div>

        {/* Bottom Left Text */}
        <div style={{ position: 'absolute', bottom: '24px', left: '32px', color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '13px', opacity: 0.85 }}>
          Welcome to my computer.
        </div>

        {/* Bottom Right Text */}
        <div style={{ position: 'absolute', bottom: '24px', right: '32px', color: '#ffffff', fontFamily: 'Arial, sans-serif', fontSize: '14px', fontWeight: 'bold', letterSpacing: '0.5px' }}>
          Portfolio OS 98
        </div>
      </div>
    );
  }

  // --- Phase 2: Windows 98 / XP Welcome Login Screen (Image 1 Vibe) ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoggingIn ? 0 : 1 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#002B88',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 30000,
        fontFamily: 'Arial, Tahoma, sans-serif',
        userSelect: 'none',
      }}
    >
      {/* Top Header Banner */}
      <div
        style={{
          height: '64px',
          backgroundColor: '#072467',
          borderBottom: '2px solid #3B6ECD',
          display: 'flex',
          alignItems: 'center',
          padding: '0 32px',
          boxSizing: 'border-box',
        }}
      />

      {/* Center Main Login Section */}
      <div
        style={{
          flexGrow: 1,
          background: 'linear-gradient(180deg, #5A83D2 0%, #3F6AC1 50%, #2E529E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '850px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
          }}
        >
          {/* Left Side: Brand Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '45%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <WindowsWaveLogo size={75} />
              <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                <span style={{ fontSize: '18px', fontFamily: 'Arial, sans-serif', opacity: 0.9 }}>
                  Rishi-Biswas
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '38px', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', lineHeight: '1' }}>
                    Portfolio
                  </span>
                  <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#FF6A00', marginLeft: '2px' }}>
                    98
                  </span>
                </div>
              </div>
            </div>

            <div style={{ color: '#ffffff', fontSize: '13px', opacity: 0.9, marginTop: '8px' }}>
              To begin, click your user name
            </div>
          </div>

          {/* Middle Vertical Divider Line */}
          <div
            style={{
              width: '1px',
              height: '180px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Right Side: User Login Card */}
          <div style={{ width: '45%', display: 'flex', justifyContent: 'flex-start' }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 18px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.05) 100%)',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'all 0.2s ease',
              }}
            >
              {/* User Avatar with Retro 3D Frame */}
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '6px',
                  border: '2px solid #FFC107',
                  boxShadow: '0 0 8px rgba(0,0,0,0.4)',
                  overflow: 'hidden',
                  backgroundColor: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_400_400/B56ZbxSlyxHUAo-/0/1747804906002?e=1786579200&v=beta&t=xkiG9qFojxe8yvkzzIJCJMxuQSk9wwhJugO5J7fNgMU"
                  alt="Rishi Biswas"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {/* User Details */}
              <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff' }}>
                <span style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '0.3px' }}>
                  Rishi Biswas
                </span>
                <span style={{ fontSize: '11px', opacity: 0.8, marginTop: '2px' }}>
                  Click to log in
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Banner */}
      <div
        style={{
          height: '74px',
          backgroundColor: '#072467',
          borderTop: '2px solid #3B6ECD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 36px',
          boxSizing: 'border-box',
          color: '#ffffff',
          fontSize: '12px',
        }}
      >
        {/* Bottom Left: OS System Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4CAF50', display: 'inline-block' }} />
          <span style={{ fontWeight: 'bold', opacity: 0.9 }}>Portfolio OS 98 Ready</span>
        </div>

        {/* Bottom Right: Tagline */}
        <div style={{ opacity: 0.8, maxWidth: '450px', textAlign: 'right', fontSize: '11px' }}>
          After logging in, you can explore projects, skills, and files on my computer.
        </div>
      </div>
    </motion.div>
  );
};
