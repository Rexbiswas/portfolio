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

  return (
    <div className="window-content-pane win-border-inset" style={{ height: '100%' }}>
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
        }}
      />
    </div>
  );
};
