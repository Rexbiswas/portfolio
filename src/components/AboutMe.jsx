import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

export const AboutMe = () => {
  const { windows } = useStore();
  const isOpen = windows.aboutMe.isOpen;
  const isMinimized = windows.aboutMe.isMinimized;

  const defaultText = `Rishi Biswas | Full-Stack Developer \nI build complete, production-ready web applications from the database layer right up to the user interface. Specializing in modern JavaScript frameworks and scalable backend architectures, I focus on performance, clean code, and creating unique user experiences that stand out.`;
  const fullText = windows.aboutMe.content !== undefined && windows.aboutMe.content !== null
    ? windows.aboutMe.content
    : defaultText;
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!isOpen || isMinimized) {
      setDisplayedText('');
      return;
    }

    setDisplayedText('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        const nextChar = fullText[index];
        setDisplayedText((prev) => prev + nextChar);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25); // 25ms per character for snappy typing animation

    return () => clearInterval(interval);
  }, [isOpen, isMinimized]);

  const isDefaultAboutMe = windows.aboutMe.content === undefined || windows.aboutMe.content === null;

  return (
    <div className="window-content-pane win-border-inset" style={{ height: '100%', display: 'flex', backgroundColor: '#ffffff', overflow: 'hidden' }}>
      {/* Profile Sidebar */}
      {isDefaultAboutMe && (
        <div style={{
          width: '124px',
          flexShrink: 0,
          backgroundColor: '#ece9d8',
          borderRight: '2px solid #808080',
          padding: '12px 8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '94px',
            height: '94px',
            border: '2px solid #808080',
            borderTopColor: '#404040',
            borderLeftColor: '#404040',
            borderBottomColor: '#ffffff',
            borderRightColor: '#ffffff',
            overflow: 'hidden',
            backgroundColor: '#000000',
            boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.3)',
            borderRadius: '2px'
          }}>
            <img
              src="https://ik.imagekit.io/c4aufc4vx/rishi_biswas_full_stack.jpg"
              alt="Rishi Biswas"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ textAlign: 'center', fontFamily: '"MS Sans Serif", Tahoma, sans-serif' }}>
            <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#000080', lineHeight: '1.2' }}>Rishi Biswas</div>
            <div style={{ fontSize: '10px', color: '#555555', marginTop: '3px' }}>Full-Stack Dev</div>
          </div>
        </div>
      )}

      {/* Notepad Text Content */}
      <div style={{ flexGrow: 1, height: '100%' }}>
        <textarea
          className="notepad-textarea"
          readOnly
          value={displayedText}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            padding: '10px',
            margin: 0,
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '12px',
            lineHeight: '1.5',
            resize: 'none',
            backgroundColor: '#ffffff',
            color: '#000000',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </div>
  );
};
