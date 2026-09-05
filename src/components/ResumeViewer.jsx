import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { DownloadIcon } from './Icons';

export const ResumeViewer = () => {
  const { windows } = useStore();
  const isOpen = windows.resume.isOpen;
  const isMinimized = windows.resume.isMinimized;

  const [fullText, setFullText] = useState('');
  const [displayedText, setDisplayedText] = useState('');

  // Fetch resume text once
  useEffect(() => {
    fetch('/resume.txt')
      .then(res => res.text())
      .then(text => setFullText(text))
      .catch(err => {
        console.error('Failed to fetch resume', err);
        setFullText('Error loading resume.txt');
      });
  }, []);

  useEffect(() => {
    if (!isOpen || isMinimized || !fullText) {
      setDisplayedText('');
      return;
    }

    setDisplayedText('');
    let index = 0;
    
    // Resume text is long, so type faster (2ms) or multiple chars at a time
    const interval = setInterval(() => {
      if (index < fullText.length) {
        // Typing 4 characters at a time for faster animation on a large document
        const chars = fullText.slice(index, index + 4);
        setDisplayedText((prev) => prev + chars);
        index += 4;
      } else {
        clearInterval(interval);
      }
    }, 5);

    return () => clearInterval(interval);
  }, [isOpen, isMinimized, fullText]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '"MS Sans Serif", Tahoma, sans-serif' }}>
      
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '8px', padding: '6px', backgroundColor: '#c0c0c0', borderBottom: '1px solid #808080' }}>
        <button 
          onClick={handleDownload}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            padding: '4px 12px', 
            backgroundColor: '#c0c0c0', 
            border: '2px solid', 
            borderTopColor: '#fff', 
            borderLeftColor: '#fff', 
            borderRightColor: '#808080', 
            borderBottomColor: '#808080',
            cursor: 'pointer'
          }}
          onMouseDown={(e) => { e.currentTarget.style.borderTopColor='#808080'; e.currentTarget.style.borderLeftColor='#808080'; e.currentTarget.style.borderBottomColor='#fff'; e.currentTarget.style.borderRightColor='#fff'; }}
          onMouseUp={(e) => { e.currentTarget.style.borderTopColor='#fff'; e.currentTarget.style.borderLeftColor='#fff'; e.currentTarget.style.borderBottomColor='#808080'; e.currentTarget.style.borderRightColor='#808080'; }}
        >
          <DownloadIcon size={16} color="#000" />
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Download PDF</span>
        </button>
      </div>

      {/* Editor Content */}
      <div className="window-content-pane win-border-inset" style={{ flexGrow: 1, backgroundColor: '#ffffff', overflowY: 'auto', padding: '10px' }}>
        <div
          className="notepad-textarea"
          style={{
            width: '100%',
            minHeight: '100%',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '13px',
            lineHeight: '1.5',
            color: '#000000',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
          }}
        >
          {displayedText.split('\n').map((line, index) => {
            // Center the header lines (roughly the first 8 lines)
            const isCenter = index < 8;
            const trimmed = line.trim();
            const isSeparator = trimmed.length > 10 && (trimmed.split('').every(c => c === '=') || trimmed.split('').every(c => c === '-'));
            
            if (isSeparator) {
              return (
                <div key={index} style={{ whiteSpace: 'nowrap', overflow: 'hidden', minHeight: '1.5em' }}>
                  {trimmed[0].repeat(500)}
                </div>
              );
            }

            return (
              <div key={index} style={{ textAlign: isCenter ? 'center' : 'left', minHeight: '1.5em' }}>
                {line}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
