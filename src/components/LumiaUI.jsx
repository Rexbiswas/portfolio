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
  GitHubIcon,
  BriefcaseIcon
} from './Icons';

const MobileBatteryIcon = ({ level = 0.87, charging = false }) => {
  const pct = Math.max(0, Math.min(100, Math.round(level * 100)));
  const fillColor = charging ? '#4CAF50' : pct <= 20 ? '#FF4D4D' : pct <= 35 ? '#FF9800' : '#FFFFFF';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontFamily: '"Segoe UI", sans-serif', fontWeight: '500' }}>
      <span>{pct}%</span>

      {/* Mobile Battery Shell Bar */}
      <div
        style={{
          width: '21px',
          height: '11px',
          border: '1.2px solid #FFFFFF',
          borderRadius: '2px',
          padding: '1px',
          boxSizing: 'border-box',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Dynamic Battery Fill Bar */}
        <div
          style={{
            width: `${Math.max(8, pct)}%`,
            height: '100%',
            backgroundColor: fillColor,
            borderRadius: '0.8px',
            transition: 'width 0.3s ease, background-color 0.3s ease'
          }}
        />

        {/* Battery Right Tip Cap */}
        <div
          style={{
            position: 'absolute',
            right: '-3px',
            top: '2px',
            width: '1.8px',
            height: '4.5px',
            backgroundColor: '#FFFFFF',
            borderRadius: '0 1px 1px 0'
          }}
        />
      </div>
    </div>
  );
};

// --- Dedicated Mobile Vector Icons for Lumia Mobile View ---
export const MobileUserIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" fill={color} />
    <path d="M12 14C7.58172 14 4 16.6863 4 20C4 20.5523 4.44772 21 5 21H19C19.5523 21 20 20.5523 20 20C20 16.6863 16.4183 14 12 14Z" fill={color} />
  </svg>
);

export const MobileBriefcaseIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V6H9V4Z" fill={color} />
    <path fillRule="evenodd" clipRule="evenodd" d="M3 8C3 6.89543 3.89543 6 5 6H19C20.1046 6 21 6.89543 21 8V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V8ZM5 8H19V11H14V10C14 9.44772 13.5523 9 13 9H11C10.4477 9 10 9.44772 10 10V11H5V8ZM19 13H14V14C14 14.5523 13.5523 15 13 15H11C10.4477 15 10 14.5523 10 14V13H5V19H19V13Z" fill={color} />
  </svg>
);

export const MobileProjectsIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 5H19V8H5V5ZM5 10H11V19H5V10ZM13 10H19V19H13V10Z" fill={color} />
  </svg>
);

export const MobileSkillsIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 19V13H7V19H4Z" fill={color} />
    <path d="M10 19V9H13V19H10Z" fill={color} />
    <path d="M16 19V5H19V19H16Z" fill={color} />
  </svg>
);

export const MobileFolderIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6C3 4.89543 3.89543 4 5 4H10C10.5304 4 11.0391 4.21071 11.4142 4.58579L12.8284 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" fill={color} />
  </svg>
);

export const MobileSettingsIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 17Z" fill={color} />
    <path fillRule="evenodd" clipRule="evenodd" d="M9.8 3H14.2L14.7 5.2C15.3 5.4 15.9 5.8 16.4 6.2L18.6 5.4L20.8 9.2L19.1 10.7C19.2 11.1 19.2 11.5 19.2 12C19.2 12.5 19.2 12.9 19.1 13.3L20.8 14.8L18.6 18.6L16.4 17.8C15.9 18.2 15.3 18.6 14.7 18.8L14.2 21H9.8L9.3 18.8C8.7 18.6 8.1 18.2 7.6 17.8L5.4 18.6L3.2 14.8L4.9 13.3C4.8 12.9 4.8 12.5 4.8 12C4.8 11.5 4.8 11.1 4.9 10.7L3.2 9.2L5.4 5.4L7.6 6.2C8.1 5.8 8.7 5.4 9.3 5.2L9.8 3Z" fill={color} />
  </svg>
);

export const MobileHelpIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15ZM12 7C9.79086 7 8 8.79086 8 11H10C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12 13 12.5 12.5 13C12.05 13.45 11.75 14.1 11.75 14.75V15H13.25V14.75C13.25 14.35 13.45 14.05 13.8 13.7C14.5 13.05 15.5 12.3 15.5 11C15.5 8.79086 13.7091 7 12 7Z" fill={color} />
  </svg>
);

export const MobileTerminalIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4ZM5 4H19V20H5V4ZM7 8L11 11L7 14V12.2L9.6 11L7 9.8V8ZM12 13H16V14.5H12V13Z" fill={color} />
  </svg>
);

export const MobileMonitorIcon = ({ size = 24, color = '#FFFFFF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3 4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V15C21 16.1046 20.1046 17 19 17H13V19H16V21H8V19H11V17H5C3.89543 17 3 16.1046 3 15V4ZM5 4H19V15H5V4Z" fill={color} />
  </svg>
);

const EXPERIENCES = [
  {
    id: 'pixelcraft',
    role: 'Lead Full-Stack Developer',
    company: 'PixelCraft Studio',
    period: 'Jan 2024 - Present',
    location: 'Remote',
    tech: 'React, Next.js, Node.js, Express, PostgreSQL, Redis, Docker',
    points: [
      'Architected and deployed high-performance full-stack web applications, serving over 50,000 active monthly users.',
      'Reduced API latency by 45% by introducing Redis caching layers, query index optimization, and database connection pooling.',
      'Led a cross-functional team of 4 developers to build an internal dashboard, streamlining company operations and reducing support ticket response times by 30%.',
      'Established CI/CD pipelines using GitHub Actions, reducing deployment errors and rollbacks by 80%.'
    ]
  },
  {
    id: 'retroweb',
    role: 'Software Engineer',
    company: 'RetroWeb Technologies',
    period: 'Jun 2022 - Dec 2023',
    location: 'Bangalore, India',
    tech: 'JavaScript, TypeScript, React, Express, MongoDB, AWS, Git',
    points: [
      'Developed and integrated secure payment processing modules using Stripe API, handling $10k+ weekly transactions.',
      'Refactored legacy React components to TypeScript and modern hooks, resulting in a 25% decrease in bundle size and improved developer velocity.',
      'Built serverless microservices on AWS Lambda for real-time image processing and S3 storage, saving 35% in monthly hosting costs.',
      'Collaborated closely with UX designers to implement pixel-perfect, responsive interfaces using clean CSS and animations.'
    ]
  },
  {
    id: 'freelance',
    role: 'Freelance Developer',
    company: 'Self-Employed',
    period: 'Mar 2020 - May 2022',
    location: 'Remote',
    tech: 'HTML5, CSS3, JavaScript, React, GSAP, TailwindCSS, Figma',
    points: [
      'Designed and coded bespoke marketing websites and portfolios for 15+ global clients, achieving high Google Lighthouse performance scores (95+).',
      'Developed interactive dashboards and dynamic features with smooth user experiences utilizing GSAP and Framer Motion.',
      'Managed end-to-end client relationships, scoping requirements, designing mockups, coding, and deploying final applications.'
    ]
  }
];

export const LumiaUI = ({ isMobile }) => {
  const {
    windows,
    focusedWindow,
    openWindow,
    closeWindow,
    setSystemMode,
    lumiaAccent,
    setLumiaAccent,
    setActiveOS,
    setBooting
  } = useStore();

  const [isLocked, setIsLocked] = useState(!isMobile);
  const [currentScreen, setCurrentScreen] = useState('start'); // 'start' | 'apps'

  // Unlock automatically if mobile view is active
  useEffect(() => {
    if (isMobile) {
      setIsLocked(false);
    }
  }, [isMobile]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showIndexGrid, setShowIndexGrid] = useState(false);
  const [time, setTime] = useState(new Date());

  // Custom Lumia App State
  const [activeApp, setActiveApp] = useState(null); // 'aboutMe' | 'projectShowcase' | 'skills' | 'fileExplorer' | 'help' | 'experience'
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

  const [battery, setBattery] = useState({ level: 0.87, charging: false, supported: false });

  // Dynamic device battery tracking
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.getBattery) return;

    let batteryRef = null;
    const updateBattery = () => {
      if (batteryRef) {
        setBattery({
          level: batteryRef.level,
          charging: batteryRef.charging,
          supported: true
        });
      }
    };

    navigator.getBattery().then((batt) => {
      batteryRef = batt;
      updateBattery();
      batt.addEventListener('levelchange', updateBattery);
      batt.addEventListener('chargingchange', updateBattery);
    }).catch((err) => {
      console.warn('Battery Status API error:', err);
    });

    return () => {
      if (batteryRef) {
        batteryRef.removeEventListener('levelchange', updateBattery);
        batteryRef.removeEventListener('chargingchange', updateBattery);
      }
    };
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
    experience: false,
  });

  // Cycle tiles randomly
  useEffect(() => {
    if (isLocked) return;

    const tileKeys = ['me', 'notepad', 'projects', 'skills', 'photos', 'experience'];
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
  const [activeExperienceIdx, setActiveExperienceIdx] = useState(0);

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

  // Accent color presets for Personalise app
  const ACCENT_COLORS = [
    { name: 'Cobalt', hex: '#0050ef' },
    { name: 'Crimson', hex: '#e51400' },
    { name: 'Emerald', hex: '#00a300' },
    { name: 'Magenta', hex: '#d80073' },
    { name: 'Amber', hex: '#f0a30a' },
    { name: 'Purple', hex: '#76608a' },
    { name: 'Cyan', hex: '#1ba1e2' },
    { name: 'Teal', hex: '#00aba9' },
    { name: 'Violet', hex: '#aa00ff' },
    { name: 'Lime', hex: '#a4c400' },
    { name: 'Orange', hex: '#fa6800' },
    { name: 'Pink', hex: '#f472d0' }
  ];

  // App List Configuration
  const APPS = [
    { id: 'aboutMe', label: 'About Me', letter: 'A', icon: <MobileUserIcon size={26} /> },
    { id: 'experience', label: 'Work Experience', letter: 'E', icon: <MobileBriefcaseIcon size={26} /> },
    { id: 'fileExplorer', label: 'File Explorer', letter: 'F', icon: <MobileFolderIcon size={26} /> },
    ...(!isMobile ? [
      { id: 'msdos', label: 'MS-DOS Prompt', letter: 'M', icon: <MobileTerminalIcon size={26} />, isSystemMode: 'msdos' },
      { id: 'win98', label: 'Windows 98 Classic', letter: 'W', icon: <MobileMonitorIcon size={26} />, isSwitchOS: 'win98' }
    ] : []),
    { id: 'displayProperties', label: 'Personalise Theme', letter: 'P', icon: <MobileSettingsIcon size={26} /> },
    { id: 'projectShowcase', label: 'Projects Showcase', letter: 'P', icon: <MobileProjectsIcon size={26} /> },
    { id: 'skills', label: 'Skills Properties', letter: 'S', icon: <MobileSkillsIcon size={26} /> }
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
        </div>
        <div className="lumia-status-right">
          <MobileBatteryIcon level={battery.level} charging={battery.charging} />
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
                                src="https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_400_400/B56ZbxSlyxHUAo-/0/1747804906002?e=1786579200&v=beta&t=xkiG9qFojxe8yvkzzIJCJMxuQSk9wwhJugO5J7fNgMU"
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
                              <div className="lumia-tile-large-icon"><MobileUserIcon size={52} /></div>
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
                            <div className="lumia-tile-front lumia-tile-accent-bg" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 18px' }}>
                              <MobileProjectsIcon size={44} />
                              <div>
                                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>Projects</h2>
                                <p style={{ fontSize: '11px', opacity: 0.85, margin: '2px 0 0 0' }}>Live Apps Showcase</p>
                              </div>
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
                              <div className="lumia-tile-large-icon"><MobileSkillsIcon size={52} /></div>
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

                        {/* Experience Tile (2x2) */}
                        <div
                          className={`lumia-tile lumia-tile-2x2 ${flipState.experience ? 'flipped' : ''}`}
                          onClick={() => openWindow('experience')}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-inner">
                            <div className="lumia-tile-front lumia-tile-accent-bg">
                              <div className="lumia-tile-large-icon"><MobileBriefcaseIcon size={52} /></div>
                              <div className="lumia-tile-label">Experience</div>
                            </div>
                            <div className="lumia-tile-back lumia-tile-accent-bg" style={{ padding: '10px', fontSize: '11px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                              <strong>Work Experience:</strong>
                              <p style={{ marginTop: '4px', opacity: 0.9 }}>{EXPERIENCES[0].role}</p>
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
                          <div className="lumia-tile-large-icon"><MobileFolderIcon size={52} /></div>
                          <div className="lumia-tile-label">Files</div>
                        </div>

                        {/* Personalise (2x2) */}
                        <div
                          className="lumia-tile lumia-tile-2x2 lumia-tile-accent-bg"
                          onClick={() => openWindow('displayProperties')}
                          style={{ '--accent': tileAccent }}
                        >
                          <div className="lumia-tile-large-icon"><MobileSettingsIcon size={52} /></div>
                          <div className="lumia-tile-label">Personalise</div>
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
                            {['A', 'E', 'F', 'M', 'P', 'S', 'W'].map(letter => {
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
                  {renderLumiaPivotApp(activeApp, pivotIndex, setPivotIndex, PROJECTS, activeProjectIdx, setActiveProjectIdx, FRONTEND_SKILLS, BACKEND_SKILLS, DEVOPS_SKILLS, ratingScore, getRatingLabel(ratingScore), ratingChecklist, handleRatingCheckbox, tileAccent, isMobile, handleBackPress, EXPERIENCES, activeExperienceIdx, setActiveExperienceIdx, ACCENT_COLORS, setLumiaAccent, lumiaAccent)}
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
const renderSuperTitle = (title, isMobile, handleBackPress) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
      {isMobile && (
        <button
          onClick={handleBackPress}
          className="lumia-app-back-btn"
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#ffffff',
            fontSize: '16px',
            cursor: 'pointer',
            padding: 0,
            marginRight: '8px',
            borderRadius: '50%',
            width: '28px',
            height: '28px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none'
          }}
          title="Back"
        >
          ←
        </button>
      )}
      <span className="lumia-pivot-supertitle" style={{ margin: 0 }}>{title}</span>
    </div>
  );
};

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
  tileAccent,
  isMobile,
  handleBackPress,
  EXPERIENCES,
  activeExperienceIdx,
  setActiveExperienceIdx,
  ACCENT_COLORS,
  setLumiaAccent,
  lumiaAccent
) => {
  switch (appId) {
    case 'aboutMe':
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            {renderSuperTitle('NOTEPAD', isMobile, handleBackPress)}
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
            {renderSuperTitle('PORTFOLIO', isMobile, handleBackPress)}
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

    case 'experience':
      const selectedExp = EXPERIENCES[activeExperienceIdx];
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            {renderSuperTitle('BRIEFCASE', isMobile, handleBackPress)}
            <div className="lumia-pivot-tabs">
              <span className={`lumia-pivot-tab ${pivotIndex === 0 ? 'active' : ''}`} onClick={() => setPivotIndex(0)}>roles</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 1 ? 'active' : ''}`} onClick={() => setPivotIndex(1)}>details</span>
            </div>
          </div>
          <div className="lumia-pivot-content">
            {pivotIndex === 0 ? (
              <div className="lumia-list-pane">
                {EXPERIENCES.map((exp, idx) => (
                  <div
                    key={exp.id}
                    className={`lumia-list-item ${activeExperienceIdx === idx ? 'selected' : ''}`}
                    onClick={() => {
                      setActiveExperienceIdx(idx);
                      setPivotIndex(1);
                    }}
                    style={{ borderLeft: activeExperienceIdx === idx ? `4px solid ${tileAccent}` : undefined }}
                  >
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{exp.role}</div>
                    <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '2px' }}>{exp.company} • {exp.period}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="lumia-details-pane">
                <h1 className="lumia-title-medium" style={{ color: tileAccent }}>{selectedExp.role}</h1>
                <h2 style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '2px', color: '#fff' }}>
                  🏛️ {selectedExp.company}
                </h2>
                <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '2px' }}>
                  📅 {selectedExp.period} | 📍 {selectedExp.location}
                </div>

                <div style={{ fontSize: '11px', opacity: 0.6, marginTop: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  key achievements
                </div>
                <ul style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '6px', opacity: 0.9, paddingLeft: '20px' }}>
                  {selectedExp.points.map((pt, i) => (
                    <li key={i} style={{ marginBottom: '6px', listStyleType: 'square' }}>{pt}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );

    case 'skills':
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            {renderSuperTitle('PROPERTIES', isMobile, handleBackPress)}
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
            {renderSuperTitle('FILES', isMobile, handleBackPress)}
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

    case 'displayProperties':
      return (
        <div className="lumia-pivot-container">
          <div className="lumia-pivot-header">
            {renderSuperTitle('PERSONALISE', isMobile, handleBackPress)}
            <div className="lumia-pivot-tabs">
              <span className={`lumia-pivot-tab ${pivotIndex === 0 ? 'active' : ''}`} onClick={() => setPivotIndex(0)}>accent color</span>
              <span className={`lumia-pivot-tab ${pivotIndex === 1 ? 'active' : ''}`} onClick={() => setPivotIndex(1)}>theme info</span>
            </div>
          </div>
          <div className="lumia-pivot-content">
            {pivotIndex === 0 ? (
              <div className="lumia-notepad-app-pane">
                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Choose Theme Accent Color:</h3>
                <p style={{ fontSize: '12px', opacity: 0.8, marginBottom: '16px' }}>
                  Tap any color below to customize your phone tiles and app headers.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', maxWidth: '340px' }}>
                  {(ACCENT_COLORS || []).map(c => {
                    const isSelected = (lumiaAccent || '#0050ef').toLowerCase() === c.hex.toLowerCase();
                    return (
                      <div
                        key={c.hex}
                        onClick={() => setLumiaAccent(c.hex)}
                        style={{
                          aspectRatio: '1',
                          backgroundColor: c.hex,
                          borderRadius: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          border: isSelected ? '3px solid #FFFFFF' : '1px solid rgba(255,255,255,0.2)',
                          boxShadow: isSelected ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
                          transition: 'transform 0.15s'
                        }}
                      >
                        {isSelected && <span style={{ fontSize: '18px', color: '#fff', fontWeight: 'bold' }}>✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="lumia-notepad-app-pane">
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Active Accent Color</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                  <div style={{ width: '36px', height: '36px', backgroundColor: tileAccent, borderRadius: '4px', border: '2px solid #fff' }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                      {(ACCENT_COLORS || []).find(c => c.hex.toLowerCase() === tileAccent.toLowerCase())?.name || 'Custom Accent'}
                    </div>
                    <div style={{ fontSize: '12px', opacity: 0.6 }}>{tileAccent}</div>
                  </div>
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
            {renderSuperTitle('HELP + HOW TO', isMobile, handleBackPress)}
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
                  <li><strong>Accent Colors</strong>: Customize tile accent colors in the Personalise app!</li>
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
