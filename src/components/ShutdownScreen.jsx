import React from 'react';
import { useStore } from '../store';

export const ShutdownScreen = () => {
  const { setSystemMode } = useStore();
  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#ff6600', // Classic Windows 95 orange-red
        fontFamily: '"Courier New", Courier, monospace',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 20000,
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        {/* Retro line design */}
        <div style={{ width: '120px', height: '4px', backgroundColor: '#ff6600' }} />
        
        <h1 style={{ fontSize: '24px', fontWeight: 'normal', margin: 0, letterSpacing: '1px', lineHeight: '1.5' }}>
          It is now safe to turn off your computer.
        </h1>
        
        <div style={{ width: '120px', height: '4px', backgroundColor: '#ff6600' }} />

        {/* Power back on button */}
        <button 
          onClick={() => {
            setSystemMode('normal');
            window.location.reload();
          }}
          style={{
            marginTop: '50px',
            backgroundColor: '#222222',
            color: '#ff6600',
            border: '2px solid #ff6600',
            padding: '10px 20px',
            fontFamily: 'inherit',
            fontSize: '14px',
            cursor: 'pointer',
            borderRadius: '4px',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ff6600';
            e.currentTarget.style.color = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#222222';
            e.currentTarget.style.color = '#ff6600';
          }}
        >
          [ Power On System ]
        </button>
      </div>
    </div>
  );
};
