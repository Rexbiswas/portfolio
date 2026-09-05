import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { 
  FxMenuIcon, FxHomeIcon, FxDownloadsIcon, FxBookmarksIcon, 
  FxHistoryIcon, FxAddonsIcon, FxSyncIcon, FxOptionsIcon, 
  FxRestoreIcon, FxSearchIcon, FxForwardIcon, FxBackIcon, FxReloadIcon 
} from './Icons';

const FRONTEND_SKILLS = [
  { name: 'React / Next.js', level: 0.95, desc: 'SPAs, SSR, routing, hooks, state management (Zustand, Redux)' },
  { name: 'JavaScript / TypeScript', level: 0.90, desc: 'Modern ES6+, async programming, strong typing, DOM manipulation' },
  { name: 'HTML5 & CSS3 / Tailwind', level: 0.90, desc: 'Semantic layouts, Flexbox/Grid, responsive design, animations' },
  { name: 'Framer Motion & SVG', level: 0.80, desc: 'Advanced micro-interactions, spring physics, vector layout animations' }
];

const BACKEND_SKILLS = [
  { name: 'Node.js / Express', level: 0.85, desc: 'REST APIs, middleware, authentication (JWT), event loop' },
  { name: 'Python / Django', level: 0.80, desc: 'Scalable backends, ORM, MVC pattern, script automation' },
  { name: 'REST & GraphQL APIs', level: 0.85, desc: 'API architecture, query optimization, endpoint design' },
  { name: 'System Design', level: 0.75, desc: 'Caching (Redis), message queues, database normalization/indexing' }
];

const DEVOPS_SKILLS = [
  { name: 'SQL (PostgreSQL)', level: 0.85, desc: 'Relational database schemas, joins, transactions, optimizations' },
  { name: 'NoSQL (MongoDB)', level: 0.80, desc: 'Document store collections, aggregation pipelines' },
  { name: 'AWS (S3, EC2, Lambda)', level: 0.75, desc: 'Serverless deployment, cloud storage, virtual machine hosting' },
  { name: 'Docker & CI/CD', level: 0.70, desc: 'Containerization, automated GitHub Actions pipelines' },
  { name: 'Git & Collaboration', level: 0.90, desc: 'Branching, PRs, merge conflict resolution, rebase workflows' }
];

const ProgressBar = ({ percent }) => {
  const blocks = Math.round(percent * 10);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className="win-border-inset" style={{
        display: 'flex',
        gap: '1px',
        backgroundColor: '#fff',
        padding: '1px',
        height: '14px',
        width: '120px'
      }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: i < blocks ? '#000080' : 'transparent',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: '11px', minWidth: '30px', textAlign: 'right' }}>{Math.round(percent * 100)}%</span>
    </div>
  );
};

const FooterIcon = ({ icon, label, onClick }) => (
  <div 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '8px', 
      cursor: 'pointer',
      opacity: 0.8
    }}
    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
    onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
  >
    {icon}
    <span style={{ color: '#555', fontSize: '12px' }}>{label}</span>
  </div>
);

export const Skills = () => {
  const [tabs, setTabs] = useState([
    { id: 1, title: 'Mozilla Firefox Start Page', url: 'about:home', history: ['about:home'], historyIndex: 0 }
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [addressInput, setAddressInput] = useState('about:home');
  const [tabCounter, setTabCounter] = useState(2);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [prefTab, setPrefTab] = useState('general');

  const toggleDropdown = (name) => {
    setOpenDropdown(prev => prev === name ? null : name);
  };

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  useEffect(() => {
    setAddressInput(activeTab.url);
  }, [activeTab.url, activeTabId]);

  const navigate = (url) => {
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId) {
        let title = 'Mozilla Firefox Start Page';
        if (url.includes('frontend')) title = 'Frontend Skills';
        else if (url.includes('backend')) title = 'Backend Skills';
        else if (url.includes('devops')) title = 'DevOps Skills';
        else if (url !== 'about:home') title = url;

        const newHistory = t.history.slice(0, t.historyIndex + 1);
        newHistory.push(url);
        
        return { ...t, url, title, history: newHistory, historyIndex: newHistory.length - 1 };
      }
      return t;
    }));
  };

  const handleBack = () => {
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId && t.historyIndex > 0) {
        const newIndex = t.historyIndex - 1;
        const newUrl = t.history[newIndex];
        let title = 'Mozilla Firefox Start Page';
        if (newUrl.includes('frontend')) title = 'Frontend Skills';
        else if (newUrl.includes('backend')) title = 'Backend Skills';
        else if (newUrl.includes('devops')) title = 'DevOps Skills';
        else if (newUrl !== 'about:home') title = newUrl;
        
        return { ...t, url: newUrl, title, historyIndex: newIndex };
      }
      return t;
    }));
  };

  const handleForward = () => {
    setTabs(prev => prev.map(t => {
      if (t.id === activeTabId && t.historyIndex < t.history.length - 1) {
        const newIndex = t.historyIndex + 1;
        const newUrl = t.history[newIndex];
        let title = 'Mozilla Firefox Start Page';
        if (newUrl.includes('frontend')) title = 'Frontend Skills';
        else if (newUrl.includes('backend')) title = 'Backend Skills';
        else if (newUrl.includes('devops')) title = 'DevOps Skills';
        else if (newUrl !== 'about:home') title = newUrl;
        
        return { ...t, url: newUrl, title, historyIndex: newIndex };
      }
      return t;
    }));
  };

  const addNewTab = () => {
    const newTab = { id: tabCounter, title: 'Mozilla Firefox Start Page', url: 'about:home', history: ['about:home'], historyIndex: 0 };
    setTabs([...tabs, newTab]);
    setActiveTabId(tabCounter);
    setTabCounter(prev => prev + 1);
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    if (tabs.length === 1) return; // Don't close last tab
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[newTabs.length - 1].id);
    }
  };

  const handleAddressSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(addressInput);
    }
  };

  const renderStartPage = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff', alignItems: 'center', paddingTop: '60px', fontFamily: 'MS Sans Serif, Tahoma, sans-serif' }}>
      <img src="/firefox.svg" width={120} height={120} alt="Firefox Logo" style={{ marginBottom: '30px' }} />
      
      <div style={{ display: 'flex', width: '500px', height: '34px', backgroundColor: '#fff', border: '2px solid', borderTopColor: '#808080', borderLeftColor: '#808080', borderBottomColor: '#fff', borderRightColor: '#fff' }}>
        <div style={{ padding: '0 8px', display: 'flex', alignItems: 'center' }}>
          <FxSearchIcon size={16} color="#000" />
        </div>
        <input 
          type="text" 
          placeholder="Search or enter address" 
          value={addressInput === 'about:home' ? '' : addressInput}
          onChange={(e) => setAddressInput(e.target.value)}
          onKeyDown={handleAddressSubmit}
          style={{ flexGrow: 1, border: 'none', outline: 'none', fontSize: '13px', color: '#000', fontFamily: 'MS Sans Serif, Tahoma, sans-serif' }} 
        />
        <button 
          onClick={() => navigate(addressInput)}
          style={{ width: '40px', backgroundColor: '#c0c0c0', border: '2px solid', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#808080', borderBottomColor: '#808080', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '2px' }}
          onMouseDown={(e) => { e.currentTarget.style.borderTopColor='#808080'; e.currentTarget.style.borderLeftColor='#808080'; e.currentTarget.style.borderBottomColor='#fff'; e.currentTarget.style.borderRightColor='#fff'; }}
          onMouseUp={(e) => { e.currentTarget.style.borderTopColor='#fff'; e.currentTarget.style.borderLeftColor='#fff'; e.currentTarget.style.borderBottomColor='#808080'; e.currentTarget.style.borderRightColor='#808080'; }}
        >
          <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>→</span>
        </button>
      </div>

      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#000080', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid', borderTopColor: '#808080', borderLeftColor: '#808080', borderBottomColor: '#fff', borderRightColor: '#fff' }}>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>R</span>
        </div>
        <span style={{ fontSize: '13px', color: '#000' }}>
          Welcome to my portfolio. <span onClick={() => navigate('https://portfolio.os98/skills/frontend')} style={{ color: '#0000ff', textDecoration: 'underline', cursor: 'pointer' }}>Click here to view my Frontend Skills</span> and explore!
        </span>
      </div>

      {/* Footer Icons */}
      <div style={{ marginTop: 'auto', width: '100%', backgroundColor: '#c0c0c0', borderTop: '2px solid #fff', display: 'flex', justifyContent: 'center', gap: '40px', padding: '15px 0' }}>
        <FooterIcon icon={<FxDownloadsIcon size={24} color="#000" />} label="Frontend" onClick={() => navigate('https://portfolio.os98/skills/frontend')} />
        <FooterIcon icon={<FxBookmarksIcon size={24} color="#000" />} label="Backend" onClick={() => navigate('https://portfolio.os98/skills/backend')} />
        <FooterIcon icon={<FxHistoryIcon size={24} color="#000" />} label="DevOps" onClick={() => navigate('https://portfolio.os98/skills/devops')} />
        <FooterIcon icon={<FxSyncIcon size={24} color="#000" />} label="Sync" onClick={() => {
          const btn = document.createElement('div');
          btn.style.position = 'fixed'; btn.style.bottom = '20px'; btn.style.right = '20px'; btn.style.backgroundColor = '#c0c0c0'; btn.style.border = '2px solid'; btn.style.borderTopColor = '#fff'; btn.style.borderLeftColor = '#fff'; btn.style.borderBottomColor = '#808080'; btn.style.borderRightColor = '#808080'; btn.style.color = '#000'; btn.style.padding = '8px 12px'; btn.style.zIndex = 10000; btn.style.fontFamily = 'MS Sans Serif, Tahoma, sans-serif'; btn.style.fontSize = '12px';
          btn.innerText = 'Syncing portfolio data... Complete!';
          document.body.appendChild(btn);
          setTimeout(() => btn.remove(), 3000);
        }} />
        <FooterIcon icon={<FxOptionsIcon size={24} color="#000" />} label="Options" onClick={() => {
          navigate('about:preferences');
        }} />
        
        <div 
          onClick={() => {
            navigate('https://portfolio.os98/skills/frontend');
          }}
          style={{ borderLeft: '2px solid #808080', marginLeft: '20px', paddingLeft: '30px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <FxRestoreIcon size={24} color="#000" />
          <span style={{ color: '#0000ff', fontSize: '12px', textDecoration: 'underline' }}>Restore Previous Session</span>
        </div>
      </div>
    </div>
  );

  const renderContentPage = (skillsList, title) => (
    <div style={{ padding: '20px 40px', backgroundColor: '#fff', height: '100%', overflowY: 'auto', fontFamily: 'MS Sans Serif, Tahoma, sans-serif' }}>
      <h2 style={{ color: '#000', borderBottom: '2px solid #000', paddingBottom: '4px', marginBottom: '20px', fontSize: '18px' }}>{title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {skillsList.map((skill) => (
          <div key={skill.name} style={{ padding: '12px', border: '2px solid', borderTopColor: '#808080', borderLeftColor: '#808080', borderRightColor: '#fff', borderBottomColor: '#fff', backgroundColor: '#c0c0c0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#000' }}>{skill.name}</span>
              <ProgressBar percent={skill.level} />
            </div>
            <div style={{ fontSize: '11px', color: '#000' }}>
              {skill.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab.url === 'about:home') return renderStartPage();
    if (activeTab.url === 'about:preferences') return (
      <div style={{ display: 'flex', height: '100%', fontFamily: 'MS Sans Serif, Tahoma, sans-serif', backgroundColor: '#c0c0c0', color: '#000' }}>
        {/* Sidebar */}
        <div style={{ width: '220px', borderRight: '1px solid #808080', borderRightWidth: '2px', borderRightStyle: 'outset', paddingTop: '30px', display: 'flex', flexDirection: 'column' }}>
          <div 
            onClick={() => setPrefTab('general')} 
            style={{ padding: '12px 24px', cursor: 'pointer', backgroundColor: prefTab === 'general' ? '#eef' : 'transparent', borderLeft: prefTab === 'general' ? '3px solid #0060df' : '3px solid transparent', color: prefTab === 'general' ? '#0060df' : '#555', fontWeight: prefTab === 'general' ? 'bold' : 'normal' }}
          >
            General
          </div>
          <div 
            onClick={() => setPrefTab('search')} 
            style={{ padding: '12px 24px', cursor: 'pointer', backgroundColor: prefTab === 'search' ? '#eef' : 'transparent', borderLeft: prefTab === 'search' ? '3px solid #0060df' : '3px solid transparent', color: prefTab === 'search' ? '#0060df' : '#555', fontWeight: prefTab === 'search' ? 'bold' : 'normal' }}
          >
            Search
          </div>
          <div 
            onClick={() => setPrefTab('privacy')} 
            style={{ padding: '12px 24px', cursor: 'pointer', backgroundColor: prefTab === 'privacy' ? '#eef' : 'transparent', borderLeft: prefTab === 'privacy' ? '3px solid #0060df' : '3px solid transparent', color: prefTab === 'privacy' ? '#0060df' : '#555', fontWeight: prefTab === 'privacy' ? 'bold' : 'normal' }}
          >
            Privacy & Security
          </div>
        </div>
        
        {/* Settings Content */}
        <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '300', marginBottom: '30px' }}>Preferences</h1>
          
          {prefTab === 'general' && (
            <div>
              <h2 style={{ fontSize: '18px', paddingBottom: '8px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>Startup</h2>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
                <input type="checkbox" defaultChecked /> Always check if Firefox is your default browser
              </label>
              <div style={{ marginBottom: '30px' }}>
                <button style={{ padding: '6px 12px', backgroundColor: '#e1e1e6', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>Make Default...</button>
              </div>

              <h2 style={{ fontSize: '18px', paddingBottom: '8px', borderBottom: '1px solid #808080', marginBottom: '20px' }}>Appearance</h2>
              <p style={{ fontSize: '13px', marginBottom: '10px' }}>
                Classic Windows 98 Theme applied globally.
              </p>
            </div>
          )}

          {prefTab === 'search' && (
            <div>
              <h2 style={{ fontSize: '18px', paddingBottom: '8px', borderBottom: '1px solid #808080', marginBottom: '20px' }}>Default Search Engine</h2>
              <p style={{ fontSize: '13px', opacity: 0.8, marginBottom: '15px' }}>This is your default search engine in the address bar and search bar.</p>
              <select style={{ padding: '2px 4px', width: '300px', boxShadow: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080', marginBottom: '20px', backgroundColor: '#fff', color: '#000' }}>
                <option>Altavista</option>
                <option>Yahoo!</option>
                <option>WebCrawler</option>
                <option>Lycos</option>
              </select>
              <br />
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" defaultChecked /> Provide search suggestions
              </label>
            </div>
          )}

          {prefTab === 'privacy' && (
            <div>
              <h2 style={{ fontSize: '18px', paddingBottom: '8px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>Enhanced Tracking Protection</h2>
              <p style={{ fontSize: '13px', color: '#666', marginBottom: '15px' }}>Firefox protects you from many of the most common trackers by default.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '15px', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px' }}>
                <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <input type="radio" name="tracking" defaultChecked style={{ marginTop: '4px' }} />
                  <div>
                    <strong>Standard</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>Balanced for protection and performance. Pages will load normally.</div>
                  </div>
                </label>
                <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <input type="radio" name="tracking" style={{ marginTop: '4px' }} />
                  <div>
                    <strong>Strict</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>Stronger protection, but may cause some sites or content to break.</div>
                  </div>
                </label>
                <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <input type="radio" name="tracking" style={{ marginTop: '4px' }} />
                  <div>
                    <strong>Custom</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>Choose which trackers and scripts to block.</div>
                  </div>
                </label>
              </div>
              
              <div style={{ marginTop: '30px' }}>
                <button style={{ padding: '6px 12px', backgroundColor: '#e1e1e6', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>Clear Data...</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
    if (activeTab.url.includes('frontend')) return renderContentPage(FRONTEND_SKILLS, 'Frontend Development Skills');
    if (activeTab.url.includes('backend')) return renderContentPage(BACKEND_SKILLS, 'Backend Development Skills');
    if (activeTab.url.includes('devops')) return renderContentPage(DEVOPS_SKILLS, 'DevOps & Database Skills');
    
    // 404
    return <div style={{ padding: '40px', textAlign: 'center' }}><h2>404 Not Found</h2><p>The URL {activeTab.url} could not be found.</p></div>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% + 20px)', width: 'calc(100% + 20px)', margin: '-10px', backgroundColor: '#c0c0c0', fontFamily: 'MS Sans Serif, Tahoma, sans-serif', color: '#000' }}>
      
      {/* Classic Tab Bar */}
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '24px', paddingLeft: '4px', paddingTop: '4px', backgroundColor: '#c0c0c0', position: 'relative' }}>
        {tabs.map((tab, idx) => (
          <div 
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            style={{
              height: activeTabId === tab.id ? '22px' : '20px',
              minWidth: '100px',
              maxWidth: '180px',
              backgroundColor: '#c0c0c0',
              borderTop: '2px solid',
              borderLeft: '2px solid',
              borderRight: '2px solid',
              borderBottom: activeTabId === tab.id ? 'none' : '2px solid',
              borderTopColor: '#fff',
              borderLeftColor: '#fff',
              borderRightColor: '#808080',
              borderBottomColor: '#808080',
              display: 'flex',
              alignItems: 'center',
              padding: '0 6px',
              cursor: 'default',
              position: 'relative',
              zIndex: activeTabId === tab.id ? 10 : 1,
              marginTop: activeTabId === tab.id ? '0' : '2px',
              marginBottom: activeTabId === tab.id ? '-2px' : '0'
            }}
          >
            {/* Netscape/Firefox Icon in Tab */}
            <img src="/firefox.svg" width={12} height={12} alt="icon" style={{ marginRight: '6px' }} />
            <span style={{ fontSize: '11px', color: '#000', flexGrow: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {tab.title}
            </span>
            {tabs.length > 1 && (
              <span 
                onClick={(e) => closeTab(e, tab.id)}
                style={{ fontSize: '9px', marginLeft: '4px', color: '#000', cursor: 'pointer', padding: '1px 3px', border: '1px solid #808080', backgroundColor: '#c0c0c0' }}
                onMouseEnter={(e) => { e.target.style.borderTopColor='#808080'; e.target.style.borderLeftColor='#808080'; e.target.style.borderBottomColor='#fff'; e.target.style.borderRightColor='#fff'; }}
                onMouseLeave={(e) => { e.target.style.borderTopColor='#fff'; e.target.style.borderLeftColor='#fff'; e.target.style.borderBottomColor='#808080'; e.target.style.borderRightColor='#808080'; }}
              >
                X
              </span>
            )}
          </div>
        ))}
        <div 
          onClick={addNewTab}
          style={{ width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', margin: '0 4px', backgroundColor: '#c0c0c0', border: '2px solid', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#808080', borderBottomColor: '#808080' }}
          onMouseDown={(e) => { e.currentTarget.style.borderTopColor='#808080'; e.currentTarget.style.borderLeftColor='#808080'; e.currentTarget.style.borderBottomColor='#fff'; e.currentTarget.style.borderRightColor='#fff'; }}
          onMouseUp={(e) => { e.currentTarget.style.borderTopColor='#fff'; e.currentTarget.style.borderLeftColor='#fff'; e.currentTarget.style.borderBottomColor='#808080'; e.currentTarget.style.borderRightColor='#808080'; }}
        >
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>+</span>
        </div>
      </div>

      {/* Classic Navigation Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px', backgroundColor: '#c0c0c0', borderTop: '2px solid #fff', borderLeft: '2px solid #fff', borderRight: '2px solid #808080', borderBottom: '2px solid #808080', gap: '4px', margin: '2px' }}>
             {/* Navigation Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button 
            onClick={handleBack}
            disabled={activeTab.historyIndex === 0}
            style={{ width: '24px', height: '24px', border: '2px solid', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#808080', borderBottomColor: '#808080', backgroundColor: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: activeTab.historyIndex === 0 ? 'default' : 'pointer', opacity: activeTab.historyIndex === 0 ? 0.5 : 1 }}
            onMouseDown={(e) => { if (activeTab.historyIndex !== 0) { e.currentTarget.style.borderTopColor='#808080'; e.currentTarget.style.borderLeftColor='#808080'; e.currentTarget.style.borderBottomColor='#fff'; e.currentTarget.style.borderRightColor='#fff'; } }}
            onMouseUp={(e) => { if (activeTab.historyIndex !== 0) { e.currentTarget.style.borderTopColor='#fff'; e.currentTarget.style.borderLeftColor='#fff'; e.currentTarget.style.borderBottomColor='#808080'; e.currentTarget.style.borderRightColor='#808080'; } }}
          >
            <FxBackIcon size={14} color="#000" />
          </button>
          <button 
            onClick={handleForward}
            disabled={activeTab.historyIndex === activeTab.history.length - 1}
            style={{ width: '24px', height: '24px', border: '2px solid', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#808080', borderBottomColor: '#808080', backgroundColor: '#c0c0c0', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: activeTab.historyIndex === activeTab.history.length - 1 ? 'default' : 'pointer', opacity: activeTab.historyIndex === activeTab.history.length - 1 ? 0.5 : 1 }}
            onMouseDown={(e) => { if (activeTab.historyIndex !== activeTab.history.length - 1) { e.currentTarget.style.borderTopColor='#808080'; e.currentTarget.style.borderLeftColor='#808080'; e.currentTarget.style.borderBottomColor='#fff'; e.currentTarget.style.borderRightColor='#fff'; } }}
            onMouseUp={(e) => { if (activeTab.historyIndex !== activeTab.history.length - 1) { e.currentTarget.style.borderTopColor='#fff'; e.currentTarget.style.borderLeftColor='#fff'; e.currentTarget.style.borderBottomColor='#808080'; e.currentTarget.style.borderRightColor='#808080'; } }}
          >
            <FxForwardIcon size={14} color="#000" />
          </button>
        </div>

        {/* Address Bar */}
        <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, height: '24px', backgroundColor: '#fff', boxShadow: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080', padding: '0 4px', position: 'relative' }}>
          <img src="/firefox.svg" width={12} height={12} alt="icon" style={{ opacity: 0.8 }} />
          <input 
            type="text" 
            value={addressInput}
            onChange={(e) => setAddressInput(e.target.value)}
            onKeyDown={handleAddressSubmit}
            style={{ border: 'none', outline: 'none', width: '100%', padding: '0 6px', fontSize: '11px', fontFamily: 'MS Sans Serif, Tahoma, sans-serif', backgroundColor: 'transparent', color: '#000' }}
          />
          <FxReloadIcon size={12} color="#000" />
        </div>

        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', width: '150px', height: '24px', backgroundColor: '#fff', boxShadow: 'inset -1px -1px #fff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080', padding: '0 4px' }}>
          <FxSearchIcon size={12} color="#000" />
          <input 
            type="text" 
            placeholder="Search" 
            style={{ border: 'none', outline: 'none', width: '100%', padding: '0 6px', fontSize: '11px', fontFamily: 'MS Sans Serif, Tahoma, sans-serif', backgroundColor: 'transparent', color: '#000' }}
          />
        </div>

        {/* Quick Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: '4px' }}>
          
          <div 
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px', border: '2px solid', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#808080', borderBottomColor: '#808080', backgroundColor: '#c0c0c0' }} 
            onClick={() => { setOpenDropdown(null); navigate('about:home'); }} 
            onMouseDown={(e) => { e.currentTarget.style.borderTopColor='#808080'; e.currentTarget.style.borderLeftColor='#808080'; e.currentTarget.style.borderBottomColor='#fff'; e.currentTarget.style.borderRightColor='#fff'; }}
            onMouseUp={(e) => { e.currentTarget.style.borderTopColor='#fff'; e.currentTarget.style.borderLeftColor='#fff'; e.currentTarget.style.borderBottomColor='#808080'; e.currentTarget.style.borderRightColor='#808080'; }}
            title="Home"
          >
            <FxHomeIcon size={16} color="#000" />
          </div>
          
          <div style={{ position: 'relative' }}>
            <div 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px', border: '2px solid', borderTopColor: openDropdown === 'bookmarks' ? '#808080' : '#fff', borderLeftColor: openDropdown === 'bookmarks' ? '#808080' : '#fff', borderRightColor: openDropdown === 'bookmarks' ? '#fff' : '#808080', borderBottomColor: openDropdown === 'bookmarks' ? '#fff' : '#808080', backgroundColor: '#c0c0c0' }} 
              onClick={() => toggleDropdown('bookmarks')} 
              title="Bookmarks"
            >
              <FxBookmarksIcon size={16} color="#000" />
            </div>
            {openDropdown === 'bookmarks' && (
              <div style={{ position: 'absolute', top: '24px', right: '0px', width: '180px', backgroundColor: '#c0c0c0', border: '2px solid', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#000', borderBottomColor: '#000', zIndex: 100, display: 'flex', flexDirection: 'column', padding: '2px' }}>
                <div style={{ padding: '4px 8px', fontSize: '11px', color: '#000', borderBottom: '1px solid #808080' }}><strong>Bookmarks</strong></div>
                <div style={{ padding: '4px 8px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#000' }} onClick={() => { navigate('https://portfolio.os98/skills/frontend'); setOpenDropdown(null); }}>
                  Frontend Skills
                </div>
                <div style={{ padding: '4px 8px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#000' }} onClick={() => { navigate('https://portfolio.os98/skills/backend'); setOpenDropdown(null); }}>
                  Backend Skills
                </div>
                <div style={{ padding: '4px 8px', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }} onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#000080'; e.currentTarget.style.color = '#fff' }} onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#000' }} onClick={() => { navigate('https://portfolio.os98/skills/devops'); setOpenDropdown(null); }}>
                  DevOps Skills
                </div>
              </div>
            )}
          </div>
          
          <div style={{ position: 'relative' }}>
            <div 
              style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px', border: '2px solid', borderTopColor: openDropdown === 'downloads' ? '#808080' : '#fff', borderLeftColor: openDropdown === 'downloads' ? '#808080' : '#fff', borderRightColor: openDropdown === 'downloads' ? '#fff' : '#808080', borderBottomColor: openDropdown === 'downloads' ? '#fff' : '#808080', backgroundColor: '#c0c0c0' }} 
              onClick={() => toggleDropdown('downloads')} 
              title="Downloads"
            >
              <FxDownloadsIcon size={16} color="#000" />
            </div>
            {openDropdown === 'downloads' && (
              <div style={{ position: 'absolute', top: '24px', right: '0px', width: '200px', backgroundColor: '#c0c0c0', border: '2px solid', borderTopColor: '#fff', borderLeftColor: '#fff', borderRightColor: '#000', borderBottomColor: '#000', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '4px 8px', fontSize: '11px', color: '#000', borderBottom: '1px solid #808080' }}><strong>Downloads</strong></div>
                <div style={{ padding: '12px', textAlign: 'center', fontSize: '11px', color: '#000' }}>
                  No recent downloads.
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
      
      {/* Web Content Area */}
      <div 
        onClick={() => setOpenDropdown(null)}
        style={{ flexGrow: 1, backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }}
      >
        {renderContent()}
      </div>
    </div>
  );
};
