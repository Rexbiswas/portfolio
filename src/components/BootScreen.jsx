import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

export const BootScreen = () => {
  const { setBooting } = useStore();
  const [phase, setPhase] = useState('bios'); // 'bios' | 'splash'
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    if (phase !== 'bios') return;
    
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
  }, [phase]);

  // Click / Key listener to boot
  useEffect(() => {
    if (phase !== 'bios') return;

    const triggerBoot = () => {
      setPhase('splash');
    };

    window.addEventListener('keydown', triggerBoot);
    window.addEventListener('click', triggerBoot);

    return () => {
      window.removeEventListener('keydown', triggerBoot);
      window.removeEventListener('click', triggerBoot);
    };
  }, [phase]);

  // Splash Screen progress bar
  useEffect(() => {
    if (phase !== 'splash') return;

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
  }, [phase]);

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
