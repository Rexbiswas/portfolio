import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import {
  FolderIcon,
  ExecutableIcon,
  FileExplorerIcon,
  SettingsIcon,
  UserFolderIcon,
  ProjectsFolderIcon,
  SkillsIcon,
  HelpIconSvg,
  GitHubIcon
} from './Icons';

export const LumiaUI = ({ isMobile }) => {
  const {
    windows,
    focusedWindow,
    openWindow,
    closeWindow,
    setSystemMode,
    lumiaAccent,
    setActiveOS,
    setBooting
  } = useStore();

  const [isLocked, setIsLocked] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('start'); // 'start' | 'apps'
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showIndexGrid, setShowIndexGrid] = useState(false);
  const [time, setTime] = useState(new Date());

  // Custom Lumia App State
  const [activeApp, setActiveApp] = useState(null); // 'aboutMe' | 'projectShowcase' | 'skills' | 'fileExplorer' | 'help'
  const [pivotIndex, setPivotIndex] = useState(0);

  // Sync with store window changes (e.g. if a file explorer opens notepad, or when an app opens)
  useEffect(() => {
    if (focusedWindow && windows[focusedWindow]?.isOpen) {
      setActiveApp(focusedWindow);
      setPivotIndex(0); // reset pivot tab
    } else {
      // Find the first open window
      const openWin = Object.keys(windows).find(key => windows[key].isOpen);
      if (openWin) {
        setActiveApp(openWin);
      } else {
        setActiveApp(null);
      }
    }
  }, [focusedWindow, windows]);

  // Keep digital clock updated
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle hardware bezel clicks from LumiaDeviceWrapper mockup
  useEffect(() => {
    const handleHardwareBack = () => handleBackPress();
    const handleHardwareHome = () => handleHomePress();
    const handleHardwareSearch = () => handleSearchPress();

    window.addEventListener('lumia-hardware-back', handleHardwareBack);
    window.addEventListener('lumia-hardware-home', handleHardwareHome);
    window.addEventListener('lumia-hardware-search', handleHardwareSearch);

    return () => {
      window.removeEventListener('lumia-hardware-back', handleHardwareBack);
      window.removeEventListener('lumia-hardware-home', handleHardwareHome);
      window.removeEventListener('lumia-hardware-search', handleHardwareSearch);
    };
  }, [showIndexGrid, activeApp, currentScreen, windows]);

  // Back button handler
  const handleBackPress = () => {
    if (showIndexGrid) {
      setShowIndexGrid(false);
      return;
    }
    if (activeApp) {
      closeWindow(activeApp);
      return;
    }
    if (currentScreen === 'apps') {
      setCurrentScreen('start');
      return;
    }
  };

  // Home/Start button handler
  const handleHomePress = () => {
    setShowIndexGrid(false);
    // Close all open windows to return to start screen
    Object.keys(windows).forEach(key => {
      if (windows[key].isOpen) {
        closeWindow(key);
      }
    });
    setCurrentScreen('start');
  };

  // Search button handler
  const handleSearchPress = () => {
    if (activeApp) {
      closeWindow(activeApp);
    }
    setCurrentScreen('apps');
    setIsSearching(true);
    // Focus search input
    setTimeout(() => {
      document.getElementById('lumia-search-input')?.focus();
    }, 100);
  };

  const formatClockTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
  };

  const getLumiaDate = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  // Lumia Live Tiles State and Animation
  const [flipState, setFlipState] = useState({
    me: false,
    notepad: false,
    projects: false,
    skills: false,
    photos: false,
  });

  // Cycle tiles randomly
  useEffect(() => {
    if (isLocked) return;

    const tileKeys = ['me', 'notepad', 'projects', 'skills', 'photos'];
    const interval = setInterval(() => {
      // Pick a random tile to flip
      const randomKey = tileKeys[Math.floor(Math.random() * tileKeys.length)];
      setFlipState(prev => ({
        ...prev,
        [randomKey]: !prev[randomKey]
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLocked]);

  // Projects list for live cycling and project page
  const PROJECTS = [
    {
      id: 'ecommerce',
      title: 'Rockerz Headphones',
      tech: 'React, Node.js, MongoDB, GSAP, Tailwind',
      desc: 'A full-stack e-commerce platform for headphones. Features user authentication, a shopping cart, order management, and an admin dashboard.',
      live: 'https://rockerz-kappa.vercel.app/',
      github: 'https://github.com/Rexbiswas/rockerz'
    },
    {
      id: 'chat',
      title: 'Real-time Chat App',
      tech: 'Socket.io, Express, React, TailwindCSS',
      desc: 'Instant messaging web application enabling seamless communication across custom chat rooms. Includes persistent message history via MongoDB and real-time typing indicators.',
      live: 'https://retro-chat-demo.herokuapp.com',
      github: 'https://github.com/rishi-biswas/retro-chat'
    },
    {
      id: 'ai_art',
      title: 'AI Art Generator',
      tech: 'Next.js, OpenAI DALL-E, Prisma, PostgreSQL',
      desc: 'An AI-powered creative canvas application. Users input text prompts to generate high-resolution AI artwork using OpenAI\'s API, share to feed, and bookmark favorites.',
      live: 'https://ai-canvas-gen.vercel.app',
      github: 'https://github.com/rishi-biswas/ai-canvas'
    },
    {
      id: 'crypto',
      title: 'Crypto Dashboard',
      tech: 'Vue.js, Chart.js, CoinGecko API',
      desc: 'A comprehensive financial dashboard tracking real-time cryptocurrency metrics. Visualizes historical price trends with interactive charts, and manages virtual user portfolios.',
      live: 'https://coin-tracker-dash.netlify.app',
      github: 'https://github.com/rishi-biswas/coin-tracker'
    },
    {
      id: 'emulator',
      title: 'Retro Web Emulator',
      tech: 'HTML5 Canvas, Vanilla JS, Web Audio API',
      desc: 'A high-performance browser-based emulator for classic 8-bit arcade games. Utilizes HTML5 Canvas for pixel-perfect rendering and Web Audio API for retro sound synthesis.',
      live: 'https://web-arcade-emulator.vercel.app',
      github: 'https://github.com/rishi-biswas/web-arcade'
    }
  ];

  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [liveProjectIndex, setLiveProjectIndex] = useState(0);

  // Cycle project titles in the live tile
  useEffect(() => {
    const projectTimer = setInterval(() => {
      setLiveProjectIndex(prev => (prev + 1) % PROJECTS.length);
    }, 5000);
    return () => clearInterval(projectTimer);
  }, []);

  // Skills Data for Lumia Skills App
  const FRONTEND_SKILLS = [
    { name: 'React / Next.js', level: 0.95 },
    { name: 'JavaScript / TypeScript', level: 0.90 },
    { name: 'HTML5 & CSS3 / Tailwind', level: 0.90 },
    { name: 'Framer Motion & SVG', level: 0.80 }
  ];
  const BACKEND_SKILLS = [
    { name: 'Node.js / Express', level: 0.85 },
    { name: 'Python / Django', level: 0.80 },
    { name: 'REST & GraphQL APIs', level: 0.85 },
    { name: 'System Design', level: 0.75 }
  ];
  const DEVOPS_SKILLS = [
    { name: 'SQL (PostgreSQL)', level: 0.85 },
    { name: 'NoSQL (MongoDB)', level: 0.80 },
    { name: 'AWS (S3, EC2, Lambda)', level: 0.75 },
    { name: 'Docker & CI/CD', level: 0.70 },
    { name: 'Git & Collaboration', level: 0.90 }
  ];

  // Developer Rating Calculator state
  const [ratingChecklist, setRatingChecklist] = useState({
    coffee: false,
    commits: false,
    tests: false,
    deadCode: false,
    docs: false,
    darkMode: false,
    refactor: false
  });

  const handleRatingCheckbox = (key) => {
    setRatingChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateRatingScore = () => {
    let score = 0;
    if (ratingChecklist.coffee) score += 10;
    if (ratingChecklist.commits) score += 15;
    if (ratingChecklist.tests) score += 20;
    if (ratingChecklist.deadCode) score += 15;
    if (ratingChecklist.docs) score += 15;
    if (ratingChecklist.darkMode) score += 10;
    if (ratingChecklist.refactor) score += 15;
    return score;
  };

  const getRatingLabel = (score) => {
    if (score === 0) return 'Legacy Maintainer (0%)';
    if (score <= 25) return 'StackOverflow Copier 📋';
    if (score <= 50) return 'Junior Developer 💻';
    if (score <= 75) return 'Full-Stack Builder 🛠️';
    if (score <= 90) return 'Senior Architect 🏗️';
    return 'Antigravity Wizard 🧙‍♂️✨';
  };

  const ratingScore = calculateRatingScore();

  // App List Configuration
  const APPS = [
    { id: 'aboutMe', label: 'About Me', letter: 'A', icon: <UserFolderIcon size={24} /> },
    { id: 'fileExplorer', label: 'File Explorer', letter: 'F', icon: <FileExplorerIcon size={24} /> },
    { id: 'help', label: 'Help & Guide', letter: 'H', icon: <HelpIconSvg size={24} /> },
    ...(!isMobile ? [
      { id: 'msdos', label: 'MS-DOS Prompt', letter: 'M', icon: <ExecutableIcon size={24} />, isSystemMode: 'msdos' },
      { id: 'win98', label: 'Windows 98 Classic', letter: 'W', icon: <span style={{ fontSize: '20px' }}>🖥️</span>, isSwitchOS: 'win98' }
    ] : []),
    { id: 'projectShowcase', label: 'Projects Showcase', letter: 'P', icon: <ProjectsFolderIcon size={24} /> },
    { id: 'skills', label: 'Skills Properties', letter: 'S', icon: <SkillsIcon size={24} /> }
  ];

  // Filter apps by search query
  const filteredApps = APPS.filter(app =>
    app.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Alphabet jump list grouping
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  // Find which letters have active apps
  const activeLetters = APPS.map(app => app.letter);

  const jumpToLetter = (letter) => {
    setShowIndexGrid(false);
    const element = document.getElementById(`app-group-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Custom live color derived from store
  const tileAccent = lumiaAccent || '#0050ef';

  return (
    <div className="lumia-device-container">
      {/* 1. Status Bar */}
      <div className="lumia-status-bar">
        <div className="lumia-status-left">
          <span>ıılıl</span>
          <span>🛜</span>
        </div>
        <div className="lumia-status-right">
          <span>87% [▮]</span>
          <span>{formatClockTime(time)}</span>
        </div>
      </div>

      {/* 2. Main Content Screen Wrapper */}
      <div className="lumia-screen-viewport">
        <AnimatePresence>
          {/* A. Lock Screen */}
          {isLocked && (
            <motion.div
              key="lockscreen"
              className="lumia-lockscreen"
              drag="y"
              dragConstraints={{ top: -800, bottom: 0 }}
              dragElastic={{ top: 0.1, bottom: 0.02 }}
              onDragEnd={(e, info) => {
                // If dragged up by 150px or speed is high, unlock
                if (info.offset.y < -150 || info.velocity.y < -500) {
                  setIsLocked(false);
                }
              }}
              onClick={() => setIsLocked(false)} // Tap to unlock
              exit={{ y: '-100%', opacity: 0, transition: { duration: 0.4, ease: 'easeOut' } }}
            >
              {/* Abstract Lumia wallpaper */}
              <div className="lumia-lockscreen-wallpaper" />

              {/* Stacked Time/Date */}
              <div className="lumia-lockscreen-time-container">
                <div className="lumia-lockscreen-time">{formatClockTime(time)}</div>
                <div className="lumia-lockscreen-date">{getLumiaDate(time)}</div>
              </div>

              {/* Slide instruction */}
              <div className="lumia-lockscreen-hint">
                <span className="lumia-hint-arrow">▲</span>
                <span>Swipe up to unlock</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* B. Core Lumia OS Layout (Start Menu Tiles + App List) */}
        {!isLocked && (
          <div className="lumia-os-layer">
            <AnimatePresence mode="wait">
              {/* If no app is active, show the Start tiles or the App List */}
              {!activeApp ? (
                <motion.div
                  key={currentScreen}
                  initial={{ opacity: 0, x: currentScreen === 'start' ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: currentScreen === 'start' ? 100 : -100 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="lumia-homescreen"
                >
                  {currentScreen === 'start' ? (
                    /* I. Start Tile Screen */
                    <div className="lumia-tile-grid-scroll">
                      <div className="lumia-tile-grid">

                        {/* Me Live Tile (2x2) */}
                        <div
                          className={`lumia-tile lumia-tile-2x2 ${flipState.me ? 'flipped' : ''}`}
                          onClick={() => openWindow('aboutMe')}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-inner">
                            <div className="lumia-tile-front lumia-me-tile-front">
                              <img
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80"
                                alt="Rishi"
                              />
                              <div className="lumia-tile-label">Me</div>
                            </div>
                            <div className="lumia-tile-back lumia-tile-accent-bg">
                              <div className="lumia-tile-me-details">
                                <h3>Rishi Biswas</h3>
                                <p>Full-Stack Developer</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Notepad / About Me Tile (2x2) */}
                        <div
                          className={`lumia-tile lumia-tile-2x2 ${flipState.notepad ? 'flipped' : ''}`}
                          onClick={() => openWindow('aboutMe')}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-inner">
                            <div className="lumia-tile-front lumia-tile-accent-bg">
                              <div className="lumia-tile-large-icon">📄</div>
                              <div className="lumia-tile-label">Notepad</div>
                            </div>
                            <div className="lumia-tile-back lumia-tile-accent-bg" style={{ padding: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <strong>Biography:</strong>
                              <p style={{ marginTop: '4px', opacity: 0.9 }}>I build complete production-ready web applications from DB to UI.</p>
                            </div>
                          </div>
                        </div>

                        {/* Projects Wide Tile (4x2) */}
                        <div
                          className={`lumia-tile lumia-tile-4x2 ${flipState.projects ? 'flipped' : ''}`}
                          onClick={() => openWindow('projectShowcase')}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-inner">
                            <div className="lumia-tile-front lumia-tile-accent-bg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px' }}>
                              <div>
                                <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Projects</h2>
                                <p style={{ fontSize: '11px', opacity: 0.8 }}>Live Apps Showcase</p>
                              </div>
                              <span style={{ fontSize: '28px' }}>📂</span>
                              <div className="lumia-tile-label">Showcase</div>
                            </div>
                            <div className="lumia-tile-back lumia-tile-accent-bg" style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <strong style={{ fontSize: '12px', color: '#fff' }}>Featured Project:</strong>
                              <h3 style={{ fontSize: '14px', margin: '2px 0 1px 0', color: '#fff' }}>{PROJECTS[liveProjectIndex].title}</h3>
                              <p style={{ fontSize: '10px', opacity: 0.85, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {PROJECTS[liveProjectIndex].desc}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Skills Tile (2x2) */}
                        <div
                          className={`lumia-tile lumia-tile-2x2 ${flipState.skills ? 'flipped' : ''}`}
                          onClick={() => openWindow('skills')}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-inner">
                            <div className="lumia-tile-front lumia-tile-accent-bg">
                              <div className="lumia-tile-large-icon">📊</div>
                              <div className="lumia-tile-label">Skills</div>
                            </div>
                            <div className="lumia-tile-back lumia-tile-accent-bg" style={{ padding: '8px', fontSize: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                  <span>React/Next.js</span>
                                  <span>95%</span>
                                </div>
                                <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '6px' }}>
                                  <div style={{ width: '95%', height: '100%', backgroundColor: '#fff' }} />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                  <span>Node/JS</span>
                                  <span>90%</span>
                                </div>
                                <div style={{ width: '100%', height: '3px', backgroundColor: 'rgba(255,255,255,0.3)' }}>
                                  <div style={{ width: '90%', height: '100%', backgroundColor: '#fff' }} />
                                </div>
                              </div>
                              <div className="lumia-tile-label" style={{ position: 'relative', margin: 0, padding: 0 }}>Core Specs</div>
                            </div>
                          </div>
                        </div>

                        {/* Photos Live Tile (2x2) */}
                        <div
                          className={`lumia-tile lumia-tile-2x2 ${flipState.photos ? 'flipped' : ''}`}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-inner">
                            <div className="lumia-tile-front lumia-photos-tile-front" style={{ backgroundColor: '#222' }}>
                              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80" alt="abstract art" />
                              <div className="lumia-tile-label">Photos</div>
                            </div>
                            <div className="lumia-tile-back lumia-photos-tile-front" style={{ backgroundColor: '#333' }}>
                              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&auto=format&fit=crop&q=80" alt="nature" />
                              <div className="lumia-tile-label">Favorites</div>
                            </div>
                          </div>
                        </div>

                        {/* File Explorer (2x2) */}
                        <div
                          className="lumia-tile lumia-tile-2x2 lumia-tile-accent-bg"
                          onClick={() => openWindow('fileExplorer')}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-large-icon">📁</div>
                          <div className="lumia-tile-label">Files</div>
                        </div>

                        {/* Help (2x2) */}
                        <div
                          className="lumia-tile lumia-tile-2x2 lumia-tile-accent-bg"
                          onClick={() => openWindow('help')}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-large-icon">❓</div>
                          <div className="lumia-tile-label">Help</div>
                        </div>

                      </div>

                      {/* Go to App List Button */}
                      <div className="lumia-home-footer">
                        <button
                          className="lumia-circle-btn"
                          onClick={() => setCurrentScreen('apps')}
                        >
                          →
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* II. App List Screen */
                    <div className="lumia-applist-container">
                      <div className="lumia-applist-header">
                        {isSearching ? (
                          <div className="lumia-search-box-row">
                            <input
                              id="lumia-search-input"
                              type="text"
                              placeholder="search apps"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="lumia-search-input"
                            />
                            <button
                              className="lumia-search-close-btn"
                              onClick={() => {
                                setIsSearching(false);
                                setSearchQuery('');
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="lumia-search-trigger-row">
                            <span className="lumia-applist-title">apps</span>
                            <button
                              className="lumia-applist-search-icon-btn"
                              onClick={() => {
                                setIsSearching(true);
                                setTimeout(() => {
                                  document.getElementById('lumia-search-input')?.focus();
                                }, 100);
                              }}
                            >
                              ⌕
                            </button>
                          </div>
                        )}
                      </div>

                      {/* App scroll list */}
                      <div className="lumia-applist-scroll">
                        {searchQuery ? (
                          /* Filtered list */
                          <div className="lumia-applist-items">
                            {filteredApps.map(app => (
                              <div
                                key={app.id}
                                className="lumia-app-item"
                                onClick={() => {
                                  if (app.isSystemMode) {
                                    setSystemMode(app.isSystemMode);
                                  } else if (app.isSwitchOS === 'win98') {
                                    setBooting(true);
                                    setActiveOS('win98');
                                  } else {
                                    openWindow(app.id);
                                  }
                                }}
                              >
                                <span className="lumia-app-icon-box" style={{ backgroundColor: tileAccent }}>
                                  {app.icon}
                                </span>
                                <span className="lumia-app-name">{app.label}</span>
                              </div>
                            ))}
                            {filteredApps.length === 0 && (
                              <div className="lumia-no-results">No apps match "{searchQuery}"</div>
                            )}
                          </div>
                        ) : (
                          /* Grouped list */
                          <div className="lumia-applist-groups">
                            {['A', 'F', 'H', 'M', 'P', 'S', 'W'].map(letter => {
                              const letterApps = APPS.filter(a => a.letter === letter);
                              if (letterApps.length === 0) return null;
                              return (
                                <div key={letter} id={`app-group-${letter}`} className="lumia-app-group">
                                  {/* Letter Header Box */}
                                  <div
                                    className="lumia-letter-header"
                                    onClick={() => setShowIndexGrid(true)}
                                    style={{ backgroundColor: tileAccent }}
                                  >
                                    {letter.toLowerCase()}
                                  </div>
                                  <div className="lumia-app-group-list">
                                    {letterApps.map(app => (
                                      <div
                                        key={app.id}
                                        className="lumia-app-item"
                                        onClick={() => {
                                          if (app.isSystemMode) {
                                            setSystemMode(app.isSystemMode);
                                          } else if (app.isSwitchOS === 'win98') {
                                            setBooting(true);
                                            setActiveOS('win98');
                                          } else {
                                            openWindow(app.id);
                                          }
                                        }}
                                      >
                                        <span className="lumia-app-icon-box" style={{ backgroundColor: tileAccent }}>
                                          {app.icon}
                                        </span>
                                        <span className="lumia-app-name">{app.label}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Go to Tiles Screen button */}
                      <div className="lumia-applist-footer">
                        <button
                          className="lumia-circle-btn left-arrow-btn"
                          onClick={() => setCurrentScreen('start')}
                        >
                          ←
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* III. App Views (Pivot / Full Screen Lumia Style) */
                <motion.div
                  key={activeApp}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="lumia-app-page"
                >
                  {renderLumiaPivotApp(activeApp, pivotIndex, setPivotIndex, PROJECTS, activeProjectIdx, setActiveProjectIdx, FRONTEND_SKILLS, BACKEND_SKILLS, DEVOPS_SKILLS, ratingScore, getRatingLabel(ratingScore), ratingChecklist, handleRatingCheckbox, tileAccent)}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Jump Index Grid overlay */}
            <AnimatePresence>
              {showIndexGrid && (
                <motion.div
                  className="lumia-index-grid-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="lumia-index-grid-header">
                    <span>choose letter</span>
                    <button className="lumia-search-close-btn" onClick={() => setShowIndexGrid(false)}>✕</button>
                  </div>
                  <div className="lumia-index-grid">
                    {ALPHABET.map(letter => {
                      const isActive = activeLetters.includes(letter);
                      return (
                        <div
                          key={letter}
                          className={`lumia-index-letter ${isActive ? 'active' : 'disabled'}`}
                          style={{ backgroundColor: isActive ? tileAccent : undefined }}
                          onClick={() => isActive && jumpToLetter(letter)}
                        >
                          {letter.toLowerCase()}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* 3. Physical / Hardware capacitive navigation bar */}
      <div className="lumia-nav-bar">
        <button
          className="lumia-nav-key back-key"
          onClick={handleBackPress}
          title="Back"
        >
          🠔
        </button>
        <button
          className="lumia-nav-key start-key"
          onClick={handleHomePress}
          title="Start"
        >
          ⊞
        </button>
        <button
          className="lumia-nav-key search-key"
          onClick={handleSearchPress}
          title="Search"
        >
          ⌕
        </button>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Rendering Lumia Pivot-style apps
// ----------------------------------------------------
const renderLumiaPivotApp = (
  appId,
  pivotIndex,
  setPivotIndex,
  PROJECTS,
  activeProjectIdx,
  setActiveProjectIdx,
  FRONTEND_SKILLS,
  BACKEND_SKILLS,
  DEVOPS_SKILLS,
  ratingScore,
  ratingLabel,
  ratingChecklist,
  handleRatingCheckbox,
  tileAccent
) => {
  switch (appId) {
    case 'aboutMe':
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            <span className="lumia-pivot-supertitle">NOTEPAD</span>
            <div className="lumia-pivot-tabs">
              <span className={`lumia-pivot-tab ${pivotIndex === 0 ? 'active' : ''}`} onClick={() => setPivotIndex(0)}>profile</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 1 ? 'active' : ''}`} onClick={() => setPivotIndex(1)}>details</span>
            </div>
          </div>
          <div className="lumia-pivot-content">
            {pivotIndex === 0 ? (
              <div className="lumia-notepad-app-pane">
                <h1 className="lumia-title-large">rishi biswas</h1>
                <h2 className="lumia-subtitle-accent" style={{ color: tileAccent }}>full-stack developer</h2>

                <p className="lumia-text-body" style={{ marginTop: '20px', lineHeight: '1.6' }}>
                  I build complete, production-ready web applications from the database layer right up to the user interface. Specializing in modern JavaScript frameworks and scalable backend architectures, I focus on performance, clean code, and creating unique user experiences that stand out.
                </p>
                <div style={{ marginTop: '30px' }}>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px', opacity: 0.6, marginBottom: '6px' }}>Focus Fields</h4>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="lumia-tag" style={{ border: `1px solid ${tileAccent}` }}>Web Apps</span>
                    <span className="lumia-tag" style={{ border: `1px solid ${tileAccent}` }}>UX/UI Design</span>
                    <span className="lumia-tag" style={{ border: `1px solid ${tileAccent}` }}>APIs</span>
                    <span className="lumia-tag" style={{ border: `1px solid ${tileAccent}` }}>Performance</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lumia-notepad-app-pane">
                <h1 className="lumia-title-medium">contact info</h1>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">Email</span>
                  <span className="lumia-detail-val">rishi.biswas@example.com</span>
                </div>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">Location</span>
                  <span className="lumia-detail-val">India</span>
                </div>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">GitHub</span>
                  <a href="https://github.com/Rexbiswas" target="_blank" rel="noopener noreferrer" className="lumia-detail-val" style={{ color: tileAccent, textDecoration: 'underline' }}>github.com/Rexbiswas</a>
                </div>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">LinkedIn</span>
                  <span className="lumia-detail-val">linkedin.com/in/rishi-biswas</span>
                </div>

                <div style={{ marginTop: '40px', padding: '16px', borderLeft: `3px solid ${tileAccent}`, backgroundColor: '#111' }}>
                  <p style={{ fontStyle: 'italic', fontSize: '13px', opacity: 0.9, lineHeight: '1.5' }}>
                    "The best code is deleted code. Simplicity is the ultimate sophistication."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'projectShowcase':
      const selectedProj = PROJECTS[activeProjectIdx];
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            <span className="lumia-pivot-supertitle">PORTFOLIO</span>
            <div className="lumia-pivot-tabs">
              <span className={`lumia-pivot-tab ${pivotIndex === 0 ? 'active' : ''}`} onClick={() => setPivotIndex(0)}>projects</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 1 ? 'active' : ''}`} onClick={() => setPivotIndex(1)}>details</span>
            </div>
          </div>
          <div className="lumia-pivot-content">
            {pivotIndex === 0 ? (
              <div className="lumia-list-pane">
                {PROJECTS.map((proj, idx) => (
                  <div
                    key={proj.id}
                    className={`lumia-list-item ${activeProjectIdx === idx ? 'selected' : ''}`}
                    onClick={() => {
                      setActiveProjectIdx(idx);
                      setPivotIndex(1); // jump to details tab
                    }}
                    style={{ borderLeft: activeProjectIdx === idx ? `4px solid ${tileAccent}` : undefined }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{proj.title}</div>
                    <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '2px' }}>{proj.tech}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="lumia-details-pane">
                <h1 className="lumia-title-medium" style={{ color: tileAccent }}>{selectedProj.title}</h1>
                <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  tech stack
                </div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '2px' }}>
                  {selectedProj.tech}
                </div>

                <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  description
                </div>
                <p style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '6px', opacity: 0.9 }}>
                  {selectedProj.desc}
                </p>

                <div className="lumia-details-actions" style={{ marginTop: '30px' }}>
                  <a
                    href={selectedProj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lumia-flat-button active"
                    style={{ backgroundColor: tileAccent }}
                  >
                    🌐 Live Demo
                  </a>
                  <a
                    href={selectedProj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lumia-flat-button"
                    style={{ border: `1px solid ${tileAccent}` }}
                  >
                    <GitHubIcon size={16} color="#fff" /> GitHub Repo
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            <span className="lumia-pivot-supertitle">PROPERTIES</span>
            <div className="lumia-pivot-tabs">
              <span className={`lumia-pivot-tab ${pivotIndex === 0 ? 'active' : ''}`} onClick={() => setPivotIndex(0)}>frontend</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 1 ? 'active' : ''}`} onClick={() => setPivotIndex(1)}>backend</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 2 ? 'active' : ''}`} onClick={() => setPivotIndex(2)}>devops</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 3 ? 'active' : ''}`} onClick={() => setPivotIndex(3)}>rating</span>
            </div>
          </div>
          <div className="lumia-pivot-content">
            {pivotIndex === 0 && (
              <div className="lumia-skills-pane">
                {FRONTEND_SKILLS.map(skill => (
                  <div key={skill.name} className="lumia-skill-bar-row">
                    <div className="lumia-skill-info">
                      <span>{skill.name}</span>
                      <span>{Math.round(skill.level * 100)}%</span>
                    </div>
                    <div className="lumia-skill-track">
                      <div className="lumia-skill-fill" style={{ width: `${skill.level * 100}%`, backgroundColor: tileAccent }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {pivotIndex === 1 && (
              <div className="lumia-skills-pane">
                {BACKEND_SKILLS.map(skill => (
                  <div key={skill.name} className="lumia-skill-bar-row">
                    <div className="lumia-skill-info">
                      <span>{skill.name}</span>
                      <span>{Math.round(skill.level * 100)}%</span>
                    </div>
                    <div className="lumia-skill-track">
                      <div className="lumia-skill-fill" style={{ width: `${skill.level * 100}%`, backgroundColor: tileAccent }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {pivotIndex === 2 && (
              <div className="lumia-skills-pane">
                {DEVOPS_SKILLS.map(skill => (
                  <div key={skill.name} className="lumia-skill-bar-row">
                    <div className="lumia-skill-info">
                      <span>{skill.name}</span>
                      <span>{Math.round(skill.level * 100)}%</span>
                    </div>
                    <div className="lumia-skill-track">
                      <div className="lumia-skill-fill" style={{ width: `${skill.level * 100}%`, backgroundColor: tileAccent }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
            {pivotIndex === 3 && (
              <div className="lumia-rating-pane">
                <h3 style={{ fontSize: '14px', marginBottom: '12px', fontWeight: 'bold' }}>Real-time Developer Assessment:</h3>

                <div className="lumia-checkbox-list">
                  <label className="lumia-checkbox-item">
                    <input
                      type="checkbox"
                      checked={ratingChecklist.coffee}
                      onChange={() => handleRatingCheckbox('coffee')}
                    />
                    <span className="lumia-checkbox-box" style={{ borderColor: tileAccent }} />
                    <span>Drinks sufficient coffee/tea (+10%)</span>
                  </label>
                  <label className="lumia-checkbox-item">
                    <input
                      type="checkbox"
                      checked={ratingChecklist.commits}
                      onChange={() => handleRatingCheckbox('commits')}
                    />
                    <span className="lumia-checkbox-box" style={{ borderColor: tileAccent }} />
                    <span>Uses descriptive git commits (+15%)</span>
                  </label>
                  <label className="lumia-checkbox-item">
                    <input
                      type="checkbox"
                      checked={ratingChecklist.tests}
                      onChange={() => handleRatingCheckbox('tests')}
                    />
                    <span className="lumia-checkbox-box" style={{ borderColor: tileAccent }} />
                    <span>Writes unit/integration tests (+20%)</span>
                  </label>
                  <label className="lumia-checkbox-item">
                    <input
                      type="checkbox"
                      checked={ratingChecklist.deadCode}
                      onChange={() => handleRatingCheckbox('deadCode')}
                    />
                    <span className="lumia-checkbox-box" style={{ borderColor: tileAccent }} />
                    <span>Deletes dead/unused code (+15%)</span>
                  </label>
                  <label className="lumia-checkbox-item">
                    <input
                      type="checkbox"
                      checked={ratingChecklist.docs}
                      onChange={() => handleRatingCheckbox('docs')}
                    />
                    <span className="lumia-checkbox-box" style={{ borderColor: tileAccent }} />
                    <span>Reads documentation first (+15%)</span>
                  </label>
                  <label className="lumia-checkbox-item">
                    <input
                      type="checkbox"
                      checked={ratingChecklist.darkMode}
                      onChange={() => handleRatingCheckbox('darkMode')}
                    />
                    <span className="lumia-checkbox-box" style={{ borderColor: tileAccent }} />
                    <span>Uses IDE Dark Mode (+10%)</span>
                  </label>
                  <label className="lumia-checkbox-item">
                    <input
                      type="checkbox"
                      checked={ratingChecklist.refactor}
                      onChange={() => handleRatingCheckbox('refactor')}
                    />
                    <span className="lumia-checkbox-box" style={{ borderColor: tileAccent }} />
                    <span>Refactors without breaking things (+15%)</span>
                  </label>
                </div>

                <div className="lumia-score-box" style={{ border: `1px solid ${tileAccent}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '13px' }}>
                    <span>Rating Score:</span>
                    <span>{ratingScore}%</span>
                  </div>
                  <div className="lumia-skill-track" style={{ height: '6px', marginTop: '6px' }}>
                    <div className="lumia-skill-fill" style={{ width: `${ratingScore}%`, backgroundColor: tileAccent }} />
                  </div>
                  <div style={{ color: tileAccent, fontWeight: 'bold', fontSize: '12px', marginTop: '8px' }}>
                    Rank: {ratingLabel}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'fileExplorer':
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            <span className="lumia-pivot-supertitle">FILES</span>
            <div className="lumia-pivot-tabs">
              <span className={`lumia-pivot-tab ${pivotIndex === 0 ? 'active' : ''}`} onClick={() => setPivotIndex(0)}>documents</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 1 ? 'active' : ''}`} onClick={() => setPivotIndex(1)}>system info</span>
            </div>
          </div>
          <div className="lumia-pivot-content">
            {pivotIndex === 0 ? (
              <div className="lumia-list-pane">
                <div className="lumia-file-item" onClick={() => openWindow('aboutMe')}>
                  <span style={{ fontSize: '20px' }}>📄</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>ABOUT_ME.TXT</div>
                    <div style={{ fontSize: '12px', opacity: 0.6 }}>Notepad file • 182 bytes</div>
                  </div>
                </div>
                <div className="lumia-file-item" onClick={() => openWindow('skills')}>
                  <span style={{ fontSize: '20px' }}>📄</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>SKILLS.TXT</div>
                    <div style={{ fontSize: '12px', opacity: 0.6 }}>Notepad file • 224 bytes</div>
                  </div>
                </div>
                <div className="lumia-file-item" onClick={() => openWindow('projectShowcase')}>
                  <span style={{ fontSize: '20px' }}>⚙️</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold' }}>PROJECASE.EXE</div>
                    <div style={{ fontSize: '12px', opacity: 0.6 }}>Application • 1.2 MB</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lumia-details-pane">
                <h2 className="lumia-title-medium">phone info</h2>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">Model</span>
                  <span className="lumia-detail-val">Nokia Lumia 920 Mockup</span>
                </div>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">OS Version</span>
                  <span className="lumia-detail-val">Windows Phone 8 (Ported)</span>
                </div>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">Storage</span>
                  <span className="lumia-detail-val">1.92 GB / 2.00 GB free</span>
                </div>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">Processor</span>
                  <span className="lumia-detail-val">Qualcomm Snapdragon S4</span>
                </div>
                <div className="lumia-detail-row">
                  <span className="lumia-detail-label">Memory</span>
                  <span className="lumia-detail-val">1.00 GB RAM</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'help':
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            <span className="lumia-pivot-supertitle">HELP + HOW TO</span>
            <div className="lumia-pivot-tabs">
              <span className={`lumia-pivot-tab ${pivotIndex === 0 ? 'active' : ''}`} onClick={() => setPivotIndex(0)}>guide</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 1 ? 'active' : ''}`} onClick={() => setPivotIndex(1)}>shortcuts</span>
            </div>
          </div>
          <div className="lumia-pivot-content">
            {pivotIndex === 0 ? (
              <div className="lumia-notepad-app-pane" style={{ overflowY: 'auto' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>lumia simulator guide</h2>
                <p style={{ fontSize: '13px', opacity: 0.9, lineHeight: '1.5', marginBottom: '12px' }}>
                  This interface simulates the classic Nokia Lumia / Windows Phone experience.
                </p>
                <ul style={{ paddingLeft: '16px', fontSize: '13px', opacity: 0.9, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li><strong>Live Tiles</strong>: The boxes on the home screen flip dynamically to show real-time stats and content snippets.</li>
                  <li><strong>App List</strong>: Click the arrow at the bottom or swipe left to access the list of installed apps.</li>
                  <li><strong>Jump Alphabet</strong>: Tap on the letter box (e.g. "a") in the app list to open the quick letter jump index.</li>
                  <li><strong>Accent Colors</strong>: The tiles inherit their accent color from your Windows 98 wallpaper settings!</li>
                </ul>
              </div>
            ) : (
              <div className="lumia-notepad-app-pane">
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>navigation keys</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="lumia-circle-btn" style={{ width: '32px', height: '32px', minWidth: '32px', fontSize: '12px' }}>←</span>
                    <span style={{ fontSize: '13px' }}><strong>Back Key</strong>: Closes the current application or returns to start screen.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="lumia-circle-btn" style={{ width: '32px', height: '32px', minWidth: '32px', fontSize: '12px' }}>⊞</span>
                    <span style={{ fontSize: '13px' }}><strong>Start Key</strong>: Returns directly to home screen (minimizes all windows).</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="lumia-circle-btn" style={{ width: '32px', height: '32px', minWidth: '32px', fontSize: '12px' }}>⌕</span>
                    <span style={{ fontSize: '13px' }}><strong>Search Key</strong>: Redirects to the app list with search query focused.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div style={{ padding: '20px', color: '#fff' }}>
          App not implemented for Lumia UI.
        </div>
      );
  }
};
