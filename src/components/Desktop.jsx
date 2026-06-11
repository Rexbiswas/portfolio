import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { RetroWindow } from './RetroWindow';
import { FileExplorer } from './FileExplorer';
import { ProjectShowcase } from './ProjectShowcase';
import { FolderIcon, ExecutableIcon, SettingsIcon, ContactBotIcon, HelpIconSvg, UserFolderIcon, FileExplorerIcon, FileTextIcon, ProjectsFolderIcon, RetroGlobeIcon, SkillsIcon } from './Icons';
import { AboutMe } from './AboutMe';
import { DisplayProperties } from './DisplayProperties';
import { Skills } from './Skills';

export const Desktop = () => {
  const { windows, openWindow, focusWindow, closeStartMenu, wallpaperTheme } = useStore();
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [iconSize, setIconSize] = useState(48);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0 });

  const dragStartRef = useRef(null); // Wait, do we want to keep useState for dragStart and dragCurrent?
  // Let's see: yes, useState for dragStart and dragCurrent is needed to trigger re-renders so the selection marquee box updates visually as the user drags.
  const [dragStart, setDragStart] = useState(null);
  const [dragCurrent, setDragCurrent] = useState(null);
  const dragMoved = useRef(false);

  const isDesktopBackground = (target) => {
    if (!target) return false;
    if (
      target.closest('.retro-window') ||
      target.closest('.desktop-context-menu') ||
      target.closest('.retro-taskbar') ||
      target.closest('.start-menu') ||
      target.closest('.desktop-icon')
    ) {
      return false;
    }
    return true;
  };


  // Global mouseup to release selection dragging
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setDragStart(null);
      setDragCurrent(null);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const [icons, setIcons] = useState([
    {
      id: 'fileExplorer',
      label: 'File Explorer',
      icon: <FileExplorerIcon size={32} />,
      action: () => openWindow('fileExplorer'),
    },
    {
      id: 'projectShowcase',
      label: 'Projects',
      icon: <ProjectsFolderIcon size={32} />,
      action: () => openWindow('projectShowcase'),
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: <SkillsIcon size={32} />,
      action: () => openWindow('skills'),
    },
    {
      id: 'aboutMe',
      label: 'About Me',
      icon: <UserFolderIcon size={32} />,
      action: () => openWindow('aboutMe'),
    },
    {
      id: 'help',
      label: 'Help',
      icon: <HelpIconSvg size={32} />,
      action: () => alert('Help module:\nDouble click any icon to open it.\nDrag windows by their title bars.\nDouble click a title bar to maximize!'),
    },
  ]);

  const desktopIcons = icons.map(icon => ({
    ...icon,
    icon: React.cloneElement(icon.icon, { size: iconSize })
  }));

  const handleIconClick = (id, e) => {
    e.stopPropagation();
    closeStartMenu();
    setContextMenu({ visible: false, x: 0, y: 0 });

    if (e.shiftKey || e.ctrlKey) {
      setSelectedIcons(prev => 
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      );
    } else {
      setSelectedIcons([id]);
    }
  };

  const handleIconDoubleClick = (action, e) => {
    e.stopPropagation();
    action();
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // only left click
    if (isDesktopBackground(e.target)) {
      closeStartMenu();
      setContextMenu({ visible: false, x: 0, y: 0 });
      
      dragMoved.current = false;

      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setDragStart({ x, y });
      setDragCurrent({ x, y });

      if (!e.shiftKey && !e.ctrlKey) {
        setSelectedIcons([]);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!dragStart) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setDragCurrent({ x, y });

    const dist = Math.hypot(x - dragStart.x, y - dragStart.y);
    if (dist > 3) {
      dragMoved.current = true;
    }

    const selBox = {
      left: Math.min(dragStart.x, x),
      right: Math.max(dragStart.x, x),
      top: Math.min(dragStart.y, y),
      bottom: Math.max(dragStart.y, y)
    };

    const iconElements = e.currentTarget.querySelectorAll('.desktop-icon');
    const newSelected = [];
    iconElements.forEach((el) => {
      const iconRect = el.getBoundingClientRect();
      const relativeIconBox = {
         left: iconRect.left - rect.left,
         right: iconRect.right - rect.left,
         top: iconRect.top - rect.top,
         bottom: iconRect.bottom - rect.top
      };

      const overlap = !(
        selBox.right < relativeIconBox.left ||
        selBox.left > relativeIconBox.right ||
        selBox.bottom < relativeIconBox.top ||
        selBox.top > relativeIconBox.bottom
      );

      if (overlap) {
        const id = el.getAttribute('data-id');
        if (id) newSelected.push(id);
      }
    });

    setSelectedIcons(newSelected);
  };

  const handleContextMenu = (e) => {
    if (isDesktopBackground(e.target)) {
      e.preventDefault();
      closeStartMenu();
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY
      });
    }
  };

  const handleRefresh = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    window.location.reload();
  };

  const handleSortByName = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    setIcons(prev => [...prev].sort((a, b) => a.label.localeCompare(b.label)));
  };

  const handleSortByType = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    const priority = { fileExplorer: 1, aboutMe: 2, projectShowcase: 3, skills: 4, help: 5 };
    setIcons(prev => [...prev].sort((a, b) => (priority[a.id] || 99) - (priority[b.id] || 99)));
  };



  const THEMES = {
    classic: {
      base: '#2d5573',
      polygons: ['#223f58', '#365e82', '#4d7c9f', '#182e42', '#284863', '#3b668a']
    },
    clover: {
      base: '#18522b',
      polygons: ['#10381d', '#206937', '#2e8247', '#0c2615', '#164523', '#255e34']
    },
    orchid: {
      base: '#4f1a52',
      polygons: ['#361138', '#632167', '#7b2b80', '#260c27', '#421644', '#552258']
    },
    charcoal: {
      base: '#333333',
      polygons: ['#222222', '#444444', '#555555', '#151515', '#2a2a2a', '#3e3e3e']
    },
    hotdog: {
      base: '#d41a1a',
      polygons: ['#000000', '#ffcc00', '#ff0000', '#ffffff', '#ffaa00', '#770000']
    }
  };

  const activeTheme = THEMES[wallpaperTheme] || THEMES.classic;

  return (
    <div 
      className="desktop-content" 
      style={{ cursor: 'default' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={() => {
        if (!dragMoved.current) {
          setSelectedIcons([]);
        }
        closeStartMenu();
        setContextMenu({ visible: false, x: 0, y: 0 });
      }}
      onContextMenu={handleContextMenu}
    >
      {/* Low Poly Wallpaper Background */}
      <div className="os-wallpaper">
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Base Background */}
          <rect width="1000" height="600" fill={activeTheme.base} />
          {/* Polygons */}
          <polygon points="0,0 420,0 280,240 0,180" fill={activeTheme.polygons[0]} opacity="0.85" />
          <polygon points="420,0 1000,0 720,200 280,240" fill={activeTheme.polygons[1]} opacity="0.9" />
          <polygon points="1000,0 1000,320 720,200" fill={activeTheme.polygons[2]} opacity="0.85" />
          <polygon points="0,180 280,240 180,600 0,600" fill={activeTheme.polygons[3]} opacity="0.9" />
          <polygon points="280,240 720,200 640,600 180,600" fill={activeTheme.polygons[4]} opacity="0.95" />
          <polygon points="720,200 1000,320 1000,600 640,600" fill={activeTheme.polygons[5]} opacity="0.9" />
          {/* Soft overlay gradient for ambient shading */}
          <defs>
            <radialGradient id="overlay-grad" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
            </radialGradient>
          </defs>
          <rect width="1000" height="600" fill="url(#overlay-grad)" style={{ mixBlendMode: 'multiply' }} />
        </svg>
      </div>

      {/* Selection Marquee Box */}
      {dragStart && dragCurrent && (
        <div 
          className="selection-marquee"
          style={{
            left: `${Math.min(dragStart.x, dragCurrent.x)}px`,
            top: `${Math.min(dragStart.y, dragCurrent.y)}px`,
            width: `${Math.abs(dragStart.x - dragCurrent.x)}px`,
            height: `${Math.abs(dragStart.y - dragCurrent.y)}px`,
          }}
        />
      )}

      {/* Column of Desktop Icons */}
      <div className="desktop-icons-container">
        {desktopIcons.map((icon) => (
          <motion.div
            key={icon.id}
            data-id={icon.id}
            drag
            dragMomentum={false}
            dragElastic={0.05}
            onClick={(e) => handleIconClick(icon.id, e)}
            onDoubleClick={(e) => handleIconDoubleClick(icon.action, e)}
            onTouchStart={(e) => {
              // Double-tap handler for touch devices
              const now = Date.now();
              const lastTap = e.currentTarget.lastTap || 0;
              if (now - lastTap < 300) {
                handleIconDoubleClick(icon.action, e);
              } else {
                handleIconClick(icon.id, e);
              }
              e.currentTarget.lastTap = now;
            }}
            className={`desktop-icon ${selectedIcons.includes(icon.id) ? 'selected' : ''}`}
            style={{ 
              width: iconSize === 64 ? '110px' : iconSize === 32 ? '76px' : '92px'
            }}
          >
            <div 
              className="desktop-icon-img"
              style={{
                width: `${iconSize}px`,
                height: `${iconSize}px`
              }}
            >
              {icon.icon}
            </div>
            <div className="desktop-icon-text" style={{ fontSize: iconSize === 64 ? '12px' : iconSize === 32 ? '10px' : '11px' }}>{icon.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Floating Retro Windows */}
      
      {/* File Explorer Window */}
      <RetroWindow
        id="fileExplorer"
        title={windows.fileExplorer.title}
        isOpen={windows.fileExplorer.isOpen}
        isMinimized={windows.fileExplorer.isMinimized}
        isMaximized={windows.fileExplorer.isMaximized}
        defaultX={windows.fileExplorer.x}
        defaultY={windows.fileExplorer.y}
        width={windows.fileExplorer.width}
        height={windows.fileExplorer.height}
        icon={<FileExplorerIcon size={14} />}
      >
        <FileExplorer />
      </RetroWindow>


      {/* Project Showcase Window */}
      <RetroWindow
        id="projectShowcase"
        title={windows.projectShowcase.title}
        isOpen={windows.projectShowcase.isOpen}
        isMinimized={windows.projectShowcase.isMinimized}
        isMaximized={windows.projectShowcase.isMaximized}
        defaultX={windows.projectShowcase.x}
        defaultY={windows.projectShowcase.y}
        width={windows.projectShowcase.width}
        height={windows.projectShowcase.height}
        icon={<ExecutableIcon size={14} />}
        menubar={
          <>
            <span className="menu-item">File</span>
            <span className="menu-item">Edit</span>
            <span className="menu-item">Help</span>
          </>
        }
      >
        <ProjectShowcase />
      </RetroWindow>

      {/* About Me (Notepad) Window */}
      <RetroWindow
        id="aboutMe"
        title={windows.aboutMe.title}
        isOpen={windows.aboutMe.isOpen}
        isMinimized={windows.aboutMe.isMinimized}
        isMaximized={windows.aboutMe.isMaximized}
        defaultX={windows.aboutMe.x}
        defaultY={windows.aboutMe.y}
        width={windows.aboutMe.width}
        height={windows.aboutMe.height}
        icon={<FileTextIcon size={14} />}
        menubar={
          <>
            <span className="menu-item">File</span>
            <span className="menu-item">Edit</span>
            <span className="menu-item">Search</span>
            <span className="menu-item">Help</span>
          </>
        }
      >
        <AboutMe />
      </RetroWindow>

      {/* Display Properties Window */}
      <RetroWindow
        id="displayProperties"
        title={windows.displayProperties.title}
        isOpen={windows.displayProperties.isOpen}
        isMinimized={windows.displayProperties.isMinimized}
        isMaximized={windows.displayProperties.isMaximized}
        defaultX={windows.displayProperties.x}
        defaultY={windows.displayProperties.y}
        width={windows.displayProperties.width}
        height={windows.displayProperties.height}
        icon={<SettingsIcon size={14} />}
      >
        <DisplayProperties />
      </RetroWindow>

      {/* Skills Properties Window */}
      <RetroWindow
        id="skills"
        title={windows.skills.title}
        isOpen={windows.skills.isOpen}
        isMinimized={windows.skills.isMinimized}
        isMaximized={windows.skills.isMaximized}
        defaultX={windows.skills.x}
        defaultY={windows.skills.y}
        width={windows.skills.width}
        height={windows.skills.height}
        icon={<SkillsIcon size={14} />}
      >
        <Skills />
      </RetroWindow>

      {/* Right-click Context Menu */}
      {contextMenu.visible && (
        <div 
          className={`win-border-outset desktop-context-menu ${contextMenu.x > window.innerWidth - 320 ? 'right-aligned' : ''}`}
          style={{
            position: 'absolute',
            top: contextMenu.y,
            left: contextMenu.x,
            zIndex: 9999,
            backgroundColor: '#d4d0c8',
            padding: '2px',
            width: '160px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="context-menu-item has-submenu">
            <span>View</span>
            <span className="submenu-arrow">▶</span>
            <div className="win-border-outset context-submenu">
              <div 
                className="context-menu-item" 
                onClick={() => { setIconSize(64); setContextMenu({ visible: false, x: 0, y: 0 }); }}
              >
                <span>{iconSize === 64 ? '✓ ' : ''}Large Icons</span>
              </div>
              <div 
                className="context-menu-item" 
                onClick={() => { setIconSize(48); setContextMenu({ visible: false, x: 0, y: 0 }); }}
              >
                <span>{iconSize === 48 ? '✓ ' : ''}Medium Icons</span>
              </div>
              <div 
                className="context-menu-item" 
                onClick={() => { setIconSize(32); setContextMenu({ visible: false, x: 0, y: 0 }); }}
              >
                <span>{iconSize === 32 ? '✓ ' : ''}Small Icons</span>
              </div>
            </div>
          </div>

          <div className="context-menu-item has-submenu">
            <span>Sort by</span>
            <span className="submenu-arrow">▶</span>
            <div className="win-border-outset context-submenu">
              <div className="context-menu-item" onClick={handleSortByName}>Name</div>
              <div className="context-menu-item" onClick={handleSortByType}>Item type</div>
            </div>
          </div>

          <div className="context-menu-item" onClick={handleRefresh}>
            <span>Refresh</span>
          </div>

          <div className="context-menu-divider" />

          <div className="context-menu-item disabled">
            <span>Paste</span>
          </div>
          <div className="context-menu-item disabled">
            <span>Paste shortcut</span>
          </div>

          <div className="context-menu-divider" />

          <div className="context-menu-item" onClick={() => { openWindow('displayProperties'); setContextMenu({ visible: false, x: 0, y: 0 }); }}>
            <strong>Personalize</strong>
          </div>
        </div>
      )}
    </div>
  );
};
