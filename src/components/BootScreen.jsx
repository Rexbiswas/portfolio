import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';

export const BootScreen = () => {
  const { setBooting, activeOS, lumiaAccent } = useStore();
  const [phase, setPhase] = useState('bios'); // 'bios' | 'splash'
  const [progress, setProgress] = useState(0);

  const isMobileSize = typeof window !== 'undefined' && window.innerWidth < 1024;
  const effectiveOS = isMobileSize ? 'lumia' : activeOS;

  // Lumia boot phases
  const [lumiaPhase, setLumiaPhase] = useState('nokia'); // 'nokia' | 'splash'
  const [welcomeIndex, setWelcomeIndex] = useState(0);
  const welcomeTranslations = ['Welcome', 'स्वागत', 'स्वागतम्', 'Willkommen', 'Bienvenue'];
  const [widths, setWidths] = useState({});
  const fontSize = isMobileSize ? '24px' : '32px';
  const fontFamily = '"Segoe UI Light", "Segoe UI", sans-serif';

  useEffect(() => {
    const fontSpec = `300 ${fontSize} ${fontFamily}`;
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
  }, [fontSize]);

  // BIOS screen line reveal
  const [biosLines, setBiosLines] = useState([]);
  const fullBiosText = [
    'AMIBIOS (C) 1998 American Megatrends, Inc.',
    'Rishi Biswas Portfolio OS v1.00',
    'Processor: Intel Pentium II @ 300 MHz',
    'Memory Test: 65536KB OK',
    '',
    'Detecting IDE Primary Master ... PORTFOLIO_HDD (2.0GB)',
    'Detecting IDE Primary Slave  ... NONE',
    'Detecting IDE Secondary Master.. RETRO_CDROM',
    '',
    'System status: OPTIMAL',
    'Press any key or click to boot Portfolio OS...'
  ];

  // Lumia Boot sequence
  useEffect(() => {
    if (effectiveOS !== 'lumia') return;

    // Phase 1: Nokia screen for 1.8 seconds
    const timer1 = setTimeout(() => {
      setLumiaPhase('splash');
    }, 1800);

    // Phase 2: WP Splash for 3.2 seconds (total 5 seconds)
    const timer2 = setTimeout(() => {
      setBooting(false);
    }, 5000);

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

  useEffect(() => {
    if (effectiveOS === 'lumia' || phase !== 'bios') return;
    
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < fullBiosText.length) {
        setBiosLines(prev => [...prev, fullBiosText[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [phase, effectiveOS]);

  // Click / Key listener to boot (win98 only)
  useEffect(() => {
    if (effectiveOS === 'lumia' || phase !== 'bios') return;

    const triggerBoot = () => {
      setPhase('splash');
    };

    window.addEventListener('keydown', triggerBoot);
    window.addEventListener('click', triggerBoot);

    return () => {
      window.removeEventListener('keydown', triggerBoot);
      window.removeEventListener('click', triggerBoot);
    };
  }, [phase, effectiveOS]);

  // Splash Screen progress bar (win98 only)
  useEffect(() => {
    if (effectiveOS === 'lumia' || phase !== 'splash') return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setBooting(false);
          }, 400); // Small delay after reaching 100%
          return 100;
        }
        // Random step increments for realistic Windows loading feel
        const increment = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + increment);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [phase, effectiveOS, setBooting]);

  // Lumia Rendering path
  if (effectiveOS === 'lumia') {
    if (lumiaPhase === 'nokia') {
      const bootText = "Rishi's Portfolio";
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
              lineHeight: '1.4',
            }}
          >
            {bootText}
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
          {/* Windows Phone Logo */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', width: isMobileSize ? '36px' : '48px', height: isMobileSize ? '36px' : '48px', transform: 'skewY(-6deg)' }}>
            <div style={{ backgroundColor: '#ffffff' }} />
            <div style={{ backgroundColor: '#ffffff' }} />
            <div style={{ backgroundColor: '#ffffff' }} />
            <div style={{ backgroundColor: '#ffff' }} />
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            fontSize: isMobileSize ? '24px' : '32px', 
            fontWeight: '300', 
            height: isMobileSize ? '36px' : '48px' 
          }}>
            <motion.div 
              animate={{ 
                width: widths[welcomeTranslations[welcomeIndex]] || (isMobileSize ? 100 : 140) 
              }}
              transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
              style={{ 
                position: 'relative', 
                height: isMobileSize ? '36px' : '48px', 
                overflow: 'hidden', 
                marginRight: isMobileSize ? '6px' : '8px' 
              }}
            >
              <AnimatePresence>
                <motion.span
                  key={welcomeIndex}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.77, 0, 0.175, 1] }}
                  style={{ 
                    position: 'absolute', 
                    left: 0, 
                    top: 0, 
                    whiteSpace: 'nowrap',
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center' 
                  }}
                >
                  {welcomeTranslations[welcomeIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            {/* <span>to Portfolio</span> */}
          </div>
        </div>

        {/* Windows Phone rolling dots loader */}
        <div className="wp-dots-loader" style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          <div className="wp-dot" style={{ width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
          <div className="wp-dot" style={{ width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
          <div className="wp-dot" style={{ width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
          <div className="wp-dot" style={{ width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
          <div className="wp-dot" style={{ width: '6px', height: '6px', backgroundColor: '#ffffff', borderRadius: '50%' }} />
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .wp-dots-loader .wp-dot {
            animation: wp-dot-bounce 1.4s infinite ease-in-out both;
          }
          .wp-dots-loader .wp-dot:nth-child(1) { animation-delay: -0.32s; }
          .wp-dots-loader .wp-dot:nth-child(2) { animation-delay: -0.16s; }
          .wp-dots-loader .wp-dot:nth-child(3) { animation-delay: -0.08s; }
          .wp-dots-loader .wp-dot:nth-child(4) { animation-delay: 0s; }
          .wp-dots-loader .wp-dot:nth-child(5) { animation-delay: 0.08s; }
          @keyframes wp-dot-bounce {
            0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
            40% { transform: scale(1.3); opacity: 1; }
          }
        ` }} />
      </div>
    );
  }

  // Windows 98 bios rendering path
  if (phase === 'bios') {
    return (
      <div 
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#000000',
          color: '#c0c0c0',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '14px',
          padding: '24px',
          boxSizing: 'border-box',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 30000,
          cursor: 'pointer',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {biosLines.map((line, index) => (
            <div key={index} style={{ minHeight: '1.4em', whiteSpace: 'pre-wrap' }}>
              {line}
            </div>
          ))}
          {/* Blinking block cursor */}
          {biosLines.length === fullBiosText.length && (
            <span 
              className="blinking-cursor"
              style={{
                display: 'inline-block',
                width: '8px',
                height: '14px',
                backgroundColor: '#c0c0c0',
                marginLeft: '4px',
                animation: 'blink 1s step-end infinite'
              }}
            />
          )}
        </div>
        
        {/* CSS for blinking cursor */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes blink {
            50% { opacity: 0; }
          }
        `}} />
      </div>
    );
  }

  // Splash Screen
  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(180deg, #3a6ea5 0%, #b8d2ed 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 20px',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 30000,
        color: '#ffffff',
        fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
      }}
    >
      {/* Top spacing */}
      <div />

      {/* Main Logo & Title */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Retro Windows Flag */}
        <svg width="100" height="100" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.3))' }}>
          {/* Red top-left */}
          <rect x="1" y="2" width="6" height="5" fill="#ff3333" />
          {/* Green top-right */}
          <rect x="8" y="2" width="6" height="5" fill="#33cc33" />
          {/* Blue bottom-left */}
          <rect x="1" y="8" width="6" height="5" fill="#0066ff" />
          {/* Yellow bottom-right */}
          <rect x="8" y="8" width="6" height="5" fill="#ffcc00" />
          {/* Shadow lines */}
          <rect x="1" y="7" width="13" height="1" fill="#000000" />
          <rect x="7" y="2" width="1" height="11" fill="#000000" />
        </svg>

        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', margin: 0, fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.4)', letterSpacing: '1px' }}>
            Rishi's
          </h1>
          <h2 style={{ fontSize: '24px', margin: '4px 0 0 0', fontWeight: 'normal', opacity: 0.9, textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>
            Portfolio OS 98
          </h2>
        </div>
      </div>

      {/* Progress Bar & Copyright */}
      <div style={{ width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        
        {/* Win98 loading bar container */}
        <div 
          className="win-border-inset"
          style={{
            width: '100%',
            height: '18px',
            backgroundColor: '#ffffff',
            padding: '2px',
            boxSizing: 'border-box',
            display: 'flex',
            gap: '2px',
            overflow: 'hidden'
          }}
        >
          {/* Create small blue blocks matching the progress */}
          {Array.from({ length: Math.floor(progress / 5) }).map((_, idx) => (
            <div 
              key={idx}
              style={{
                width: '10px',
                height: '100%',
                backgroundColor: '#000080',
                flexShrink: 0
              }}
            />
          ))}
        </div>

        <div style={{ fontSize: '10px', opacity: 0.8, textShadow: '1px 1px 2px rgba(0,0,0,0.3)', textAlign: 'center' }}>
          Starting up the system. Please wait...
        </div>

        <div style={{ fontSize: '9px', opacity: 0.6, marginTop: '20px' }}>
          (C) Copyright Rishi Biswas 2026
        </div>
      </div>
    </div>
  );
};
