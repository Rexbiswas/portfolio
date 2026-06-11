import React, { useState } from 'react';

const HELP_TOPICS = [
  {
    id: 'welcome',
    title: 'Welcome to Portfolio OS',
    icon: '❓',
    content: (
      <div>
        <h2 style={{ color: '#0a246a', marginBottom: '8px', borderBottom: '1px solid #808080', paddingBottom: '4px', fontSize: '16px' }}>Welcome</h2>
        <p style={{ margin: '8px 0', lineHeight: '1.4', fontSize: '11px' }}>
          Welcome to <strong>Portfolio OS</strong>, a premium retro-interactive replica of classic late-90s operating systems (Windows 95/98/NT).
        </p>
        <p style={{ margin: '8px 0', lineHeight: '1.4', fontSize: '11px' }}>
          This system was designed to showcase skills, experience, and projects in a nostalgic and highly interactive manner.
        </p>
        <h3 style={{ margin: '12px 0 6px 0', fontSize: '12px', fontWeight: 'bold' }}>Basic Instructions:</h3>
        <ul style={{ paddingLeft: '20px', margin: '6px 0', fontSize: '11px' }}>
          <li style={{ margin: '4px 0' }}><strong>Open Applications</strong>: Double-click any icon on the desktop background to open its window.</li>
          <li style={{ margin: '4px 0' }}><strong>Drag & Move</strong>: Hold the left mouse button down on any window title bar to drag and reposition it.</li>
          <li style={{ margin: '4px 0' }}><strong>Maximize</strong>: Double-click a window's title bar, or click the square icon in the upper-right corner to fill the desktop.</li>
          <li style={{ margin: '4px 0' }}><strong>Close/Minimize</strong>: Click the <strong>X</strong> button to close a window, or the <strong>_</strong> button to hide it in the taskbar.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'customizing',
    title: 'Customizing Desktop',
    icon: '🖥️',
    content: (
      <div>
        <h2 style={{ color: '#0a246a', marginBottom: '8px', borderBottom: '1px solid #808080', paddingBottom: '4px', fontSize: '16px' }}>Customizing Desktop</h2>
        <p style={{ margin: '8px 0', lineHeight: '1.4', fontSize: '11px' }}>
          You can personalize your desktop wallpaper and color scheme to match your aesthetic preferences.
        </p>
        <h3 style={{ margin: '12px 0 6px 0', fontSize: '12px', fontWeight: 'bold' }}>How to Change Wallpapers:</h3>
        <ol style={{ paddingLeft: '20px', margin: '6px 0', fontSize: '11px' }}>
          <li style={{ margin: '4px 0' }}>Right-click on any empty area of the desktop background to open the context menu.</li>
          <li style={{ margin: '4px 0' }}>Click <strong>Personalize</strong> to open the <strong>Display Properties</strong> application.</li>
          <li style={{ margin: '4px 0' }}>Select your preferred wallpaper theme from the list (Classic Blue, Clover Green, Orchid Purple, Charcoal Grey, or Hotdog Stand).</li>
          <li style={{ margin: '4px 0' }}>Click <strong>Apply</strong> or <strong>OK</strong> to save changes!</li>
        </ol>
      </div>
    )
  },
  {
    id: 'files',
    title: 'File Manager',
    icon: '📂',
    content: (
      <div>
        <h2 style={{ color: '#0a246a', marginBottom: '8px', borderBottom: '1px solid #808080', paddingBottom: '4px', fontSize: '16px' }}>File Manager</h2>
        <p style={{ margin: '8px 0', lineHeight: '1.4', fontSize: '11px' }}>
          Use the <strong>File Explorer</strong> application to browse directories and read documents.
        </p>
        <h3 style={{ margin: '12px 0 6px 0', fontSize: '12px', fontWeight: 'bold' }}>Features:</h3>
        <ul style={{ paddingLeft: '20px', margin: '6px 0', fontSize: '11px' }}>
          <li style={{ margin: '4px 0' }}><strong>Navigation</strong>: Double-click folders to open them. Use navigation buttons (Back, Forward, Up) or type paths directly into the address bar.</li>
          <li style={{ margin: '4px 0' }}><strong>Search</strong>: Find documents in the current directory using the search input field in the top-right.</li>
          <li style={{ margin: '4px 0' }}><strong>File Editing</strong>: Rename or delete files by right-clicking on them and using the context menu.</li>
          <li style={{ margin: '4px 0' }}><strong>Create Folders</strong>: Click the "New Folder" ribbon button under the <strong>Home</strong> tab to create directories.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'pinning',
    title: 'Taskbar Pinning',
    icon: '📌',
    content: (
      <div>
        <h2 style={{ color: '#0a246a', marginBottom: '8px', borderBottom: '1px solid #808080', paddingBottom: '4px', fontSize: '16px' }}>Taskbar Pinning</h2>
        <p style={{ margin: '8px 0', lineHeight: '1.4', fontSize: '11px' }}>
          Keep your favorite applications within easy reach using the <strong>Quick Launch</strong> taskbar toolbar.
        </p>
        <h3 style={{ margin: '12px 0 6px 0', fontSize: '12px', fontWeight: 'bold' }}>How to Pin:</h3>
        <ul style={{ paddingLeft: '20px', margin: '6px 0', fontSize: '11px' }}>
          <li style={{ margin: '4px 0' }}><strong>Drag and Drop</strong>: Grab any desktop icon and drag it all the way down to the taskbar area to pin it.</li>
          <li style={{ margin: '4px 0' }}><strong>Right-Click</strong>: Right-click any desktop icon and select <strong>Pin to Taskbar</strong> from the context menu.</li>
        </ul>
        <h3 style={{ margin: '12px 0 6px 0', fontSize: '12px', fontWeight: 'bold' }}>How to Unpin:</h3>
        <ul style={{ paddingLeft: '20px', margin: '6px 0', fontSize: '11px' }}>
          <li style={{ margin: '4px 0' }}>Right-click the icon in the Quick Launch toolbar or desktop and select <strong>Unpin from Taskbar</strong>.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'power',
    title: 'Powering Off',
    icon: '🚪',
    content: (
      <div>
        <h2 style={{ color: '#0a246a', marginBottom: '8px', borderBottom: '1px solid #808080', paddingBottom: '4px', fontSize: '16px' }}>Powering Off</h2>
        <p style={{ margin: '8px 0', lineHeight: '1.4', fontSize: '11px' }}>
          You can safely exit the Portfolio OS by shutting down the session.
        </p>
        <h3 style={{ margin: '12px 0 6px 0', fontSize: '12px', fontWeight: 'bold' }}>How to Shutdown:</h3>
        <ol style={{ paddingLeft: '20px', margin: '6px 0', fontSize: '11px' }}>
          <li style={{ margin: '4px 0' }}>Click the <strong>Start</strong> button in the bottom-left corner.</li>
          <li style={{ margin: '4px 0' }}>Click on your user profile photo/avatar at the top of the Start Menu.</li>
          <li style={{ margin: '4px 0' }}>Choose <strong>Shut Down</strong> from the menu options to exit the operating system.</li>
        </ol>
      </div>
    )
  }
];

export const Help = () => {
  const [activeTopicId, setActiveTopicId] = useState('welcome');
  const [history, setHistory] = useState(['welcome']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateToTopic = (id) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(id);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActiveTopicId(id);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setActiveTopicId(history[newIndex]);
    }
  };

  const activeTopic = HELP_TOPICS.find(t => t.id === activeTopicId) || HELP_TOPICS[0];

  return (
    <div className="help-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#d4d0c8', fontFamily: '"MS Sans Serif", Tahoma, sans-serif', color: '#000' }}>
      {/* Help Menubar */}
      <div className="window-menubar" style={{ display: 'flex', gap: '8px', padding: '2px 6px', borderBottom: '1px solid #808080' }}>
        <span className="menu-item" style={{ cursor: 'default', fontSize: '11px', padding: '2px 4px' }}>File</span>
        <span className="menu-item" style={{ cursor: 'default', fontSize: '11px', padding: '2px 4px' }}>Edit</span>
        <span className="menu-item" style={{ cursor: 'default', fontSize: '11px', padding: '2px 4px' }}>Bookmark</span>
        <span className="menu-item" style={{ cursor: 'default', fontSize: '11px', padding: '2px 4px' }}>Options</span>
        <span className="menu-item" style={{ cursor: 'default', fontSize: '11px', padding: '2px 4px' }}>Help</span>
      </div>

      {/* Help Toolbar */}
      <div className="help-toolbar" style={{ display: 'flex', gap: '6px', padding: '4px 6px', borderBottom: '1px solid #808080', backgroundColor: '#d4d0c8', alignItems: 'center' }}>
        <button 
          className="win-border-outset" 
          disabled={historyIndex === 0}
          onClick={handleBack}
          style={{
            fontSize: '11px',
            padding: '2px 8px',
            cursor: historyIndex === 0 ? 'default' : 'pointer',
            backgroundColor: '#d4d0c8',
            opacity: historyIndex === 0 ? 0.6 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            outline: 'none'
          }}
        >
          <span>⬅️</span>
          <span>Back</span>
        </button>
        <div style={{ width: '1px', height: '18px', backgroundColor: '#808080', borderRight: '1px solid #fff', margin: '0 4px' }} />
        <button 
          className="win-border-outset" 
          onClick={() => window.print()}
          style={{
            fontSize: '11px',
            padding: '2px 8px',
            backgroundColor: '#d4d0c8',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            outline: 'none'
          }}
        >
          <span>🖨️</span>
          <span>Print</span>
        </button>
      </div>

      {/* Help Main Content Split Pane */}
      <div className="help-split-pane" style={{ display: 'flex', flexGrow: 1, overflow: 'hidden', borderTop: '1px solid #808080' }}>
        {/* Left Topics List */}
        <div className="help-sidebar win-border-inset" style={{ width: '180px', backgroundColor: '#fff', overflowY: 'auto', padding: '4px', margin: '4px', flexShrink: 0 }}>
          <div style={{ fontWeight: 'bold', fontSize: '11px', padding: '4px', borderBottom: '1px solid #d4d0c8', marginBottom: '4px', color: '#0a246a' }}>Help Topics</div>
          {HELP_TOPICS.map(topic => {
            const isActive = topic.id === activeTopicId;
            return (
              <div 
                key={topic.id}
                onClick={() => navigateToTopic(topic.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 6px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  backgroundColor: isActive ? '#0a246a' : 'transparent',
                  color: isActive ? '#fff' : '#000',
                  borderRadius: '2px',
                  marginBottom: '2px'
                }}
              >
                <span>{topic.icon}</span>
                <span style={{ textDecoration: isActive ? 'none' : 'underline' }}>{topic.title}</span>
              </div>
            );
          })}
        </div>

        {/* Right Content Sheet */}
        <div className="help-content win-border-inset" style={{ flexGrow: 1, backgroundColor: '#ffffff', overflowY: 'auto', padding: '16px', margin: '4px 4px 4px 0', fontFamily: 'Arial, sans-serif' }}>
          {activeTopic.content}
        </div>
      </div>
    </div>
  );
};
