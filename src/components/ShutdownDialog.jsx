import React, { useState } from 'react';
import { useStore } from '../store';
import { ShutdownIcon } from './Icons';

export const ShutdownDialog = () => {
  const { isShutdownDialogOpen, closeShutdownDialog, setSystemMode, setActiveOS, setBooting } = useStore();
  const [selectedOption, setSelectedOption] = useState('shutdown'); // 'shutdown', 'restart', 'msdos', 'lumia'

  if (!isShutdownDialogOpen) return null;

  const handleOK = () => {
    if (selectedOption === 'shutdown') {
      setSystemMode('shutdown');
      // Attempt window close, will fall back to safe shutdown screen if blocked by browser
      setTimeout(() => {
        try {
          window.close();
        } catch (e) {
          console.warn("Browser blocked window.close():", e);
        }
      }, 1500);
    } else if (selectedOption === 'restart') {
      setSystemMode('normal');
      window.location.reload();
    } else if (selectedOption === 'msdos') {
      setSystemMode('msdos');
    } else if (selectedOption === 'lumia') {
      setBooting(true);
      setActiveOS('lumia');
      closeShutdownDialog();
    }
  };

  return (
    <div 
      className="shutdown-dialog-overlay" 
      onClick={closeShutdownDialog}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 99999,
      }}
    >
      <div 
        className="shutdown-dialog win-border-outset" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '340px',
          backgroundColor: '#d4d0c8',
          fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
          fontSize: '11px',
          color: '#000',
          padding: '2px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '2px 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        {/* Title Bar */}
        <div 
          className="window-titlebar active" 
          style={{
            height: '18px',
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--title-bg-active)',
            color: 'var(--title-text-active)',
            fontWeight: 'bold',
          }}
        >
          <span>Shut Down Windows</span>
          <button 
            onClick={closeShutdownDialog}
            style={{
              width: '16px',
              height: '14px',
              backgroundColor: '#d4d0c8',
              border: '1px solid',
              borderTopColor: '#fff',
              borderLeftColor: '#fff',
              borderRightColor: '#000',
              borderBottomColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              cursor: 'default',
              fontSize: '9px',
              color: '#000',
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Dialog Body */}
        <div style={{ padding: '16px 14px', display: 'flex', gap: '16px' }}>
          {/* Left: Icon */}
          <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: '4px' }}>
            <ShutdownIcon size={32} />
          </div>

          {/* Right: Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
            <span style={{ fontWeight: 'bold', fontSize: '11px' }}>What do you want the computer to do?</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'default' }}>
                <input 
                  type="radio" 
                  name="shutdown-opt" 
                  value="shutdown"
                  checked={selectedOption === 'shutdown'}
                  onChange={() => setSelectedOption('shutdown')}
                  style={{ margin: 0 }}
                />
                <span><u>S</u>hut down the computer?</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'default' }}>
                <input 
                  type="radio" 
                  name="shutdown-opt" 
                  value="restart"
                  checked={selectedOption === 'restart'}
                  onChange={() => setSelectedOption('restart')}
                  style={{ margin: 0 }}
                />
                <span><u>R</u>estart the computer?</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'default' }}>
                <input 
                  type="radio" 
                  name="shutdown-opt" 
                  value="msdos"
                  checked={selectedOption === 'msdos'}
                  onChange={() => setSelectedOption('msdos')}
                  style={{ margin: 0 }}
                />
                <span>Restart the computer in <u>M</u>S-DOS mode?</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'default' }}>
                <input 
                  type="radio" 
                  name="shutdown-opt" 
                  value="lumia"
                  checked={selectedOption === 'lumia'}
                  onChange={() => setSelectedOption('lumia')}
                  style={{ margin: 0 }}
                />
                <span>Restart the computer in Nokia <u>L</u>umia mode?</span>
              </label>
            </div>
          </div>
        </div>

        {/* Buttons Row */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', padding: '0 8px 8px 8px' }}>
          <button 
            onClick={handleOK}
            className="win-border-outset"
            style={{
              padding: '4px 16px',
              minWidth: '65px',
              backgroundColor: '#d4d0c8',
              cursor: 'default',
              fontWeight: 'bold',
              fontFamily: 'inherit',
              fontSize: '11px',
            }}
          >
            OK
          </button>
          <button 
            onClick={closeShutdownDialog}
            className="win-border-outset"
            style={{
              padding: '4px 16px',
              minWidth: '65px',
              backgroundColor: '#d4d0c8',
              cursor: 'default',
              fontFamily: 'inherit',
              fontSize: '11px',
            }}
          >
            Cancel
          </button>
          <button 
            onClick={() => alert("Windows Shut Down Options:\n\n1. Shut Down: Turns off your system screen.\n2. Restart: Reloads the browser tab.\n3. MS-DOS Mode: Drops down to a command-line prompt.")}
            className="win-border-outset"
            style={{
              padding: '4px 16px',
              minWidth: '65px',
              backgroundColor: '#d4d0c8',
              cursor: 'default',
              fontFamily: 'inherit',
              fontSize: '11px',
            }}
          >
            Help
          </button>
        </div>
      </div>
    </div>
  );
};
