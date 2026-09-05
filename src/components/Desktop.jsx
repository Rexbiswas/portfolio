import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { useStore } from '../store';
import { RetroWindow } from './RetroWindow';
import { FileExplorer } from './FileExplorer';
import { ProjectShowcase } from './ProjectShowcase';
import { FolderIcon, ExecutableIcon, SettingsIcon, ContactBotIcon, HelpIconSvg, UserFolderIcon, FileExplorerIcon, FileTextIcon, ProjectsFolderIcon, RetroGlobeIcon, SkillsIcon, PinIcon, UnpinIcon, BriefcaseIcon } from './Icons';
import { AboutMe } from './AboutMe';
import { DisplayProperties } from './DisplayProperties';
import { Skills } from './Skills';
import { Help } from './Help';
import { Experience } from './Experience';
import { ResumeViewer } from './ResumeViewer';

const DesktopIcon = ({
  icon,
  iconSize,
  selectedIcons,
  draggedIcon,
  setDraggedIcon,
  pinApp,
  handleIconClick,
  handleIconDoubleClick,
  handleIconContextMenu,
  initialPosition,
  onDragEndSave,
}) => {
  const x = useMotionValue(initialPosition?.x || 0);
  const y = useMotionValue(initialPosition?.y || 0);

  useEffect(() => {
    x.set(initialPosition?.x || 0);
    y.set(initialPosition?.y || 0);
  }, [initialPosition, x, y]);

  return (
    <motion.div
      key={icon.id}
      data-id={icon.id}
      drag
      dragMomentum={false}
      dragElastic={0.05}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        x,
        y,
        width: iconSize === 64 ? '110px' : iconSize === 32 ? '76px' : '92px',
        zIndex: draggedIcon === icon.id ? 2000 : undefined,
      }}
      onDragStart={() => setDraggedIcon(icon.id)}
      onDragEnd={(event, info) => {
        setDraggedIcon(null);
        if (info.point.y > window.innerHeight - 50) {
          pinApp(icon.id);
          animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
          animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 });
          onDragEndSave(icon.id, 0, 0);
        } else {
          onDragEndSave(icon.id, x.get(), y.get());
        }
      }}
      onClick={(e) => handleIconClick(icon.id, e)}
      onDoubleClick={(e) => handleIconDoubleClick(icon.action, e)}
      onContextMenu={(e) => handleIconContextMenu(icon.id, e)}
      onTouchStart={(e) => {
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
    >
      <div
        className="desktop-icon-img"
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
        }}
      >
        {icon.icon}
      </div>
      <div
        className="desktop-icon-text"
        style={{ fontSize: iconSize === 64 ? '12px' : iconSize === 32 ? '10px' : '11px' }}
      >
        {icon.label}
      </div>
    </motion.div>
  );
};

export const Desktop = () => {
  const { windows, openWindow, focusWindow, closeStartMenu, wallpaperType, wallpaperColor, wallpaperImage, wallpaperImageMode, pinApp, unpinApp, pinnedApps } = useStore();
  const [selectedIcons, setSelectedIcons] = useState([]);
  const [iconSize, setIconSize] = useState(48);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, type: 'desktop', targetId: null });
  const [draggedIcon, setDraggedIcon] = useState(null);

  const defaultPositions = {
    fileExplorer: { x: 0, y: 0 },
    resume: { x: 100, y: 0 },
    projectShowcase: { x: 0, y: 100 },
    skills: { x: 0, y: 200 },
    experience: { x: 0, y: 300 },
    aboutMe: { x: 0, y: 400 },
  };

  const [iconPositions, setIconPositions] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_desktop_icon_positions');
      const parsed = saved ? JSON.parse(saved) : {};
      return { ...defaultPositions, ...parsed };
    } catch (e) {
      return defaultPositions;
    }
  });

  const handleIconDragEnd = (id, xVal, yVal) => {
    setIconPositions(prev => {
      const updated = { ...prev, [id]: { x: xVal, y: yVal } };
      localStorage.setItem('portfolio_desktop_icon_positions', JSON.stringify(updated));
      return updated;
    });
  };

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
      id: 'resume',
      label: 'Resume',
      icon: <img src="/resume-icon.png" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} alt="Resume" />,
      action: () => openWindow('resume'),
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
      id: 'experience',
      label: 'Work Experience',
      icon: <BriefcaseIcon size={32} />,
      action: () => openWindow('experience'),
    },
    {
      id: 'aboutMe',
      label: 'About Me',
      icon: <UserFolderIcon size={32} />,
      action: () => openWindow('aboutMe'),
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
        y: e.clientY,
        type: 'desktop',
        targetId: null
      });
    }
  };

  const handleIconContextMenu = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    closeStartMenu();
    setSelectedIcons([id]);
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type: 'icon',
      targetId: id
    });
  };

  const handleRefresh = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    window.location.reload();
  };

  const handleSortByName = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    setIcons(prev => [...prev].sort((a, b) => a.label.localeCompare(b.label)));
    setIconPositions({});
    localStorage.removeItem('portfolio_desktop_icon_positions');
  };

  const handleSortByType = () => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    const priority = { fileExplorer: 1, aboutMe: 2, projectShowcase: 3, experience: 4, skills: 5 };
    setIcons(prev => [...prev].sort((a, b) => (priority[a.id] || 99) - (priority[b.id] || 99)));
    setIconPositions({});
    localStorage.removeItem('portfolio_desktop_icon_positions');
  };



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
      {/* Wallpaper Background */}
      <div 
        className="os-wallpaper"
        style={{
          backgroundColor: wallpaperType === 'color' ? wallpaperColor : undefined,
          backgroundImage: wallpaperType === 'image' ? `url(${wallpaperImage || '/wallpaper.jpg'})` : undefined,
          backgroundSize: wallpaperType === 'image' ? (
            wallpaperImageMode === 'stretch' ? 'cover' : 
            wallpaperImageMode === 'center' ? 'auto' : 
            undefined
          ) : undefined,
          backgroundRepeat: wallpaperType === 'image' ? (
            wallpaperImageMode === 'tile' ? 'repeat' : 'no-repeat'
          ) : undefined,
          backgroundPosition: wallpaperType === 'image' ? 'center' : undefined,
        }}
      />

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
          <DesktopIcon
            key={icon.id}
            icon={icon}
            iconSize={iconSize}
            selectedIcons={selectedIcons}
            draggedIcon={draggedIcon}
            setDraggedIcon={setDraggedIcon}
            pinApp={pinApp}
            handleIconClick={handleIconClick}
            handleIconDoubleClick={handleIconDoubleClick}
            handleIconContextMenu={handleIconContextMenu}
            initialPosition={iconPositions[icon.id]}
            onDragEndSave={handleIconDragEnd}
          />
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

      {/* Resume Window */}
      <RetroWindow
        id="resume"
        title={windows.resume.title}
        isOpen={windows.resume.isOpen}
        isMinimized={windows.resume.isMinimized}
        isMaximized={windows.resume.isMaximized}
        defaultX={windows.resume.x}
        defaultY={windows.resume.y}
        width={windows.resume.width}
        height={windows.resume.height}
        icon={<FileTextIcon size={14} />}
      >
        <ResumeViewer />
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

      {/* Help Window */}
      <RetroWindow
        id="help"
        title={windows.help.title}
        isOpen={windows.help.isOpen}
        isMinimized={windows.help.isMinimized}
        isMaximized={windows.help.isMaximized}
        defaultX={windows.help.x}
        defaultY={windows.help.y}
        width={windows.help.width}
        height={windows.help.height}
        icon={<HelpIconSvg size={14} />}
      >
        <Help />
      </RetroWindow>

      {/* Experience Window */}
      <RetroWindow
        id="experience"
        title={windows.experience.title}
        isOpen={windows.experience.isOpen}
        isMinimized={windows.experience.isMinimized}
        isMaximized={windows.experience.isMaximized}
        defaultX={windows.experience.x}
        defaultY={windows.experience.y}
        width={windows.experience.width}
        height={windows.experience.height}
        icon={<BriefcaseIcon size={14} />}
      >
        <Experience />
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
            minWidth: '180px',
            width: 'max-content',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'desktop' ? (
            <>
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
            </>
          ) : (
            <>
              <div 
                className="context-menu-item" 
                onClick={() => {
                  const matchedIcon = icons.find(ic => ic.id === contextMenu.targetId);
                  if (matchedIcon) matchedIcon.action();
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
              >
                <strong>Open</strong>
              </div>
              <div className="context-menu-divider" />
              <div 
                className="context-menu-item" 
                onClick={() => {
                  const isPinned = pinnedApps.includes(contextMenu.targetId);
                  if (isPinned) {
                    unpinApp(contextMenu.targetId);
                  } else {
                    pinApp(contextMenu.targetId);
                  }
                  setContextMenu({ visible: false, x: 0, y: 0 });
                }}
              >
                <span style={{ position: 'absolute', left: '2px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
                  {pinnedApps.includes(contextMenu.targetId) ? (
                    <UnpinIcon size={16} />
                  ) : (
                    <PinIcon size={16} />
                  )}
                </span>
                <span>
                  {pinnedApps.includes(contextMenu.targetId) ? 'Unpin from Taskbar' : 'Pin to Taskbar'}
                </span>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
