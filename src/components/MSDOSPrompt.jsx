import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../store';

export const MSDOSPrompt = () => {
  const { setSystemMode } = useStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    'Rishi(R) Portfolio OS [Version 1.0]',
    '   (C)Copyright Rishi Biswas 2026. All rights reserved.',
    '',
    'Type HELP for a list of commands, or WIN to start Portfolio OS.',
    ''
  ]);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keep input focused
  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    focusInput();
    document.addEventListener('click', focusInput);
    return () => document.removeEventListener('click', focusInput);
  }, []);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const commandTrimmed = input.trim();
    const commandLower = commandTrimmed.toLowerCase();
    
    // Add typed command line to history
    const newHistory = [...history, `C:\\WINDOWS>${commandTrimmed}`];

    if (commandLower === '') {
      setHistory(newHistory);
      setInput('');
      return;
    }

    const args = commandLower.split(' ');
    const cmd = args[0];

    let output = [];

    switch (cmd) {
      case 'win':
      case 'win98':
      case 'exit':
        setSystemMode('normal');
        return;

      case 'cls':
        setHistory([]);
        setInput('');
        return;

      case 'ver':
        output = [
          'Portfolio OS [Version 1.0.2026]',
          'Command Prompt Simulator Version 1.0'
        ];
        break;

      case 'help':
        output = [
          'Supported commands in this DOS shell:',
          '  HELP   - Displays this help information',
          '  DIR    - Lists files and directories in current folder',
          '  TYPE   - Displays file contents (e.g., TYPE ABOUT_ME.TXT)',
          '  CLS    - Clears the command prompt screen',
          '  VER    - Displays Portfolio OS version details',
          '  EXIT   - Exit DOS mode and return to Portfolio OS GUI',
          '  WIN    - Boot Portfolio OS Desktop graphical interface'
        ];
        break;

      case 'dir':
        output = [
          ' Volume in drive C has no label',
          ' Volume Serial Number is 1F3A-8C2D',
          ' Directory of C:\\WINDOWS',
          '',
          'PROJECTS     <DIR>         06-11-02  10:24p PROJECTS',
          'SKILLS       <DIR>         06-11-02  10:24p SKILLS',
          'ABOUT_ME TXT          182  06-11-02  10:24p ABOUT_ME.TXT',
          'SKILLS_L TXT          224  06-11-02  10:24p SKILLS.TXT',
          '       2 File(s)            406 bytes',
          '       2 Dir(s)        65,536,256 bytes free'
        ];
        break;

      case 'type':
        const targetFile = args[1] || '';
        if (targetFile === 'about_me.txt') {
          output = [
            'File contents of ABOUT_ME.TXT:',
            '------------------------------',
            'Name: Rishi Biswas',
            'Title: Fullstack Developer',
            'Bio: A passionate fullstack developer from India who loves building',
            '     creative and premium retro-themed web applications.',
            'Contact: rishi.biswas@example.com',
            'GitHub: github.com/Rexbiswas'
          ];
        } else if (targetFile === 'skills.txt' || targetFile === 'skills_l.txt') {
          output = [
            'File contents of SKILLS.TXT:',
            '----------------------------',
            '- Frontend: HTML, CSS, JavaScript, React, Next.js, GSAP',
            '- Backend: Node.js, Express, SQL, Python, REST APIs',
            '- Developer Tools: Git, GitHub, VS Code, Vite, Chrome DevTools',
            '- Experience: Modern web applications, responsive UI, rich design'
          ];
        } else if (targetFile === '') {
          output = ['Required parameter missing. Usage: TYPE [filename]'];
        } else {
          output = [`File not found: ${args[1]}`];
        }
        break;

      default:
        output = [`Bad command or file name: '${cmd}'`];
    }

    setHistory([...newHistory, ...output, '']);
    setInput('');
  };

  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        color: '#c0c0c0', // Retro off-white / light-gray DOS color
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: '14px',
        padding: '16px',
        boxSizing: 'border-box',
        overflowY: 'auto',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 20000,
        cursor: 'text',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
        {/* Output History */}
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
          {history.map((line, idx) => (
            <div key={idx} style={{ minHeight: '1.4em' }}>{line}</div>
          ))}
        </div>

        {/* Input Line */}
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '4px' }}>
          <span style={{ marginRight: '2px' }}>C:\WINDOWS&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flexGrow: 1,
              backgroundColor: 'transparent',
              color: '#ffffff',
              border: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              padding: 0,
              margin: 0,
            }}
            autoComplete="off"
            autoCapitalize="none"
          />
        </form>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
