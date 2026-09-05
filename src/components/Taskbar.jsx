import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { StartLogo, ProjectsFolderIcon, SkillsIcon, BriefcaseIcon, UserFolderIcon, HelpIconSvg, ShutdownIcon, ChevronUpIcon, RetroGlobeIcon, UnpinIcon, FileExplorerIcon } from './Icons';
import { LinkedInIcon, GmailIcon, WhatsAppIcon } from './SocialIcons';

export const Taskbar = () => {
  const {
    windows,
    focusedWindow,
    focusWindow,
    minimizeWindow,
    openWindow,
    startMenuOpen,
    toggleStartMenu,
    closeStartMenu,
    openShutdownDialog,
    pinnedApps,
    unpinApp
  } = useStore();

  const [time, setTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [battery, setBattery] = useState({ level: 1.0, charging: true, supported: false });
  const [pinnedContextMenu, setPinnedContextMenu] = useState({ visible: false, x: 0, y: 0, appId: null });
  const [hiddenIconsVisible, setHiddenIconsVisible] = useState(false);

  const getAppIcon = (id) => {
    switch (id) {
      case 'fileExplorer': return <FileExplorerIcon size={16} />;
      case 'projectShowcase': return <ProjectsFolderIcon size={16} />;
      case 'skills': return <SkillsIcon size={16} />;
      case 'experience': return <BriefcaseIcon size={16} />;
      case 'aboutMe': return <UserFolderIcon size={16} />;
      case 'help': return <HelpIconSvg size={16} />;
      default: return <FolderIcon size={16} />;
    }
  };

  const getAppTitle = (id) => {
    switch (id) {
      case 'fileExplorer': return 'File Explorer';
      case 'projectShowcase': return 'Projects';
      case 'skills': return 'Skills';
      case 'experience': return 'Work Experience';
      case 'aboutMe': return 'About Me';
      case 'help': return 'Help';
      default: return 'App';
    }
  };

  const handlePinnedAppContextMenu = (appId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setPinnedContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      appId
    });
  };

  useEffect(() => {
    const handleCloseMenu = () => {
      setPinnedContextMenu({ visible: false, x: 0, y: 0, appId: null });
      setHiddenIconsVisible(false);
    };
    window.addEventListener('click', handleCloseMenu);
    return () => window.removeEventListener('click', handleCloseMenu);
  }, []);

  // Clock update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Network connection status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Battery status API
  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.getBattery) return;

    let batteryRef = null;
    const handleLevelChange = () => {
      if (batteryRef) {
        setBattery({
          level: batteryRef.level,
          charging: batteryRef.charging,
          supported: true
        });
      }
    };
    const handleChargingChange = () => {
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
      setBattery({
        level: batt.level,
        charging: batt.charging,
        supported: true
      });
      batt.addEventListener('levelchange', handleLevelChange);
      batt.addEventListener('chargingchange', handleChargingChange);
    }).catch((err) => {
      console.warn('Failed to get battery status:', err);
    });

    return () => {
      if (batteryRef) {
        batteryRef.removeEventListener('levelchange', handleLevelChange);
        batteryRef.removeEventListener('chargingchange', handleChargingChange);
      }
    };
  }, []);

  const renderBatteryIcon = () => {
    const fillWidth = Math.max(1, Math.round(battery.level * 10));
    let fillColor = '#00ff00';
    if (!battery.charging) {
      if (battery.level <= 0.15) fillColor = '#ff3333';
      else if (battery.level <= 0.3) fillColor = '#ffcc00';
    }
    return (
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="2" width="14" height="8" stroke="#000000" strokeWidth="1" />
        <rect x="15" y="4" width="2" height="4" fill="#000000" />
        <rect x="3" y="4" width={fillWidth} height="4" fill={fillColor} />
        {battery.charging && (
          <path d="M9 3L5 7H8L7 10L11 6H8L9 3Z" fill="#ffcc00" stroke="#000000" strokeWidth="0.5" />
        )}
      </svg>
    );
  };

  const handleTabClick = (id) => {
    if (focusedWindow === id && !windows[id].isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
    closeStartMenu();
  };

  const handleStartMenuItemClick = (windowId) => {
    openWindow(windowId);
    closeStartMenu();
  };

  return (
    <div className="retro-taskbar" style={{ cursor: 'default' }}>
      {/* Start Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleStartMenu();
        }}
        className={`start-btn win-border-outset ${startMenuOpen ? 'taskbar-tab active' : ''}`}
      >
        <span className="start-btn-logo">
          <StartLogo />
        </span>
        <span>Start</span>
      </button>

      {/* Start Menu Popup */}
      {startMenuOpen && (
        <div className="start-menu win-border-outset" onMouseDown={(e) => e.stopPropagation()}>
          {/* Profile Header */}
          <div className="start-menu-profile">
            <div className="profile-avatar" style={{ overflow: 'hidden' }}>
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_400_400/B56ZbxSlyxHUAo-/0/1747804906002?e=1786579200&v=beta&t=xkiG9qFojxe8yvkzzIJCJMxuQSk9wwhJugO5J7fNgMU"
                alt="Rishi Biswas"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div className="profile-info">
              <div className="profile-name">rishi biswas</div>
              <div className="profile-title">fullstack developer</div>
            </div>
          </div>
          <div className="start-menu-items">
            <div className="start-menu-item" onClick={() => handleStartMenuItemClick('projectShowcase')}>
              <span className="start-menu-item-icon"><ProjectsFolderIcon size={16} /></span>
              <span>Projects</span>
            </div>
            <div className="start-menu-divider" />
            <div className="start-menu-item" onClick={() => handleStartMenuItemClick('skills')}>
              <span className="start-menu-item-icon"><SkillsIcon size={16} /></span>
              <span>Skills</span>
            </div>
            <div className="start-menu-item" onClick={() => handleStartMenuItemClick('experience')}>
              <span className="start-menu-item-icon"><BriefcaseIcon size={16} /></span>
              <span>Work Experience</span>
            </div>
            <div className="start-menu-item" onClick={() => handleStartMenuItemClick('aboutMe')}>
              <span className="start-menu-item-icon"><UserFolderIcon size={16} /></span>
              <span>About Me</span>
            </div>
            <div className="start-menu-item" onClick={() => handleStartMenuItemClick('help')}>
              <span className="start-menu-item-icon"><HelpIconSvg size={16} /></span>
              <span>Help</span>
            </div>
            <div className="start-menu-divider" />
            <div className="start-menu-item" onClick={() => openShutdownDialog()}>
              <span className="start-menu-item-icon"><ShutdownIcon size={16} /></span>
              <span>Shut Down...</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Launch (Pinned Apps) */}
      {pinnedApps && pinnedApps.length > 0 && (
        <>
          <div className="quick-launch-divider" />
          <div className="quick-launch">
            {pinnedApps.map((appId) => (
              <button
                key={appId}
                onClick={() => openWindow(appId)}
                onContextMenu={(e) => handlePinnedAppContextMenu(appId, e)}
                className="quick-launch-btn win-border-outset"
                title={getAppTitle(appId)}
              >
                {getAppIcon(appId)}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="taskbar-divider" />

      {/* Windows Tabs */}
      <div className="taskbar-windows">
        {windows.fileExplorer.isOpen && (
          <button
            onClick={() => handleTabClick('fileExplorer')}
            className={`taskbar-tab ${focusedWindow === 'fileExplorer' && !windows.fileExplorer.isMinimized ? 'active' : 'inactive'}`}
          >
            <span className="taskbar-tab-icon">
              <FileExplorerIcon size={14} />
            </span>
            <span>File Explorer</span>
          </button>
        )}

        {windows.projectShowcase.isOpen && (
          <button
            onClick={() => handleTabClick('projectShowcase')}
            className={`taskbar-tab ${focusedWindow === 'projectShowcase' && !windows.projectShowcase.isMinimized ? 'active' : 'inactive'}`}
          >
            <span className="taskbar-tab-icon">
              <ProjectsFolderIcon size={14} />
            </span>
            <span>Project_Showcase</span>
          </button>
        )}

        {windows.aboutMe.isOpen && (
          <button
            onClick={() => handleTabClick('aboutMe')}
            className={`taskbar-tab ${focusedWindow === 'aboutMe' && !windows.aboutMe.isMinimized ? 'active' : 'inactive'}`}
          >
            <span className="taskbar-tab-icon">
              <UserFolderIcon size={14} />
            </span>
            <span>{windows.aboutMe.title.replace(' - Notepad', '')}</span>
          </button>
        )}

        {windows.displayProperties.isOpen && (
          <button
            onClick={() => handleTabClick('displayProperties')}
            className={`taskbar-tab ${focusedWindow === 'displayProperties' && !windows.displayProperties.isMinimized ? 'active' : 'inactive'}`}
          >
            <span className="taskbar-tab-icon">
              <SettingsIcon size={14} />
            </span>
            <span>Display Properties</span>
          </button>
        )}

        {windows.skills.isOpen && (
          <button
            onClick={() => handleTabClick('skills')}
            className={`taskbar-tab ${focusedWindow === 'skills' && !windows.skills.isMinimized ? 'active' : 'inactive'}`}
          >
            <span className="taskbar-tab-icon">
              <SkillsIcon size={14} />
            </span>
            <span>Skills Properties</span>
          </button>
        )}

        {windows.experience.isOpen && (
          <button
            onClick={() => handleTabClick('experience')}
            className={`taskbar-tab ${focusedWindow === 'experience' && !windows.experience.isMinimized ? 'active' : 'inactive'}`}
          >
            <span className="taskbar-tab-icon">
              <BriefcaseIcon size={14} />
            </span>
            <span>Work Experience</span>
          </button>
        )}

        {windows.help.isOpen && (
          <button
            onClick={() => handleTabClick('help')}
            className={`taskbar-tab ${focusedWindow === 'help' && !windows.help.isMinimized ? 'active' : 'inactive'}`}
          >
            <span className="taskbar-tab-icon">
              <HelpIconSvg size={14} />
            </span>
            <span>Windows Help</span>
          </button>
        )}
      </div>

      {/* System Tray */}
      <div className="system-tray win-border-inset" style={{ position: 'relative' }}>
        {/* Chevron Show Hidden Icons */}
        <div 
          className="tray-icon" 
          title="Show hidden icons" 
          style={{ opacity: 0.8, cursor: 'pointer', backgroundColor: hiddenIconsVisible ? '#a0a0a0' : 'transparent' }}
          onClick={(e) => {
            e.stopPropagation();
            setHiddenIconsVisible(!hiddenIconsVisible);
          }}
        >
          <ChevronUpIcon size={12} />
        </div>

        {/* Hidden Icons Flyout */}
        {hiddenIconsVisible && (
          <div 
            className="win-border-outset"
            style={{
              position: 'absolute',
              bottom: '30px',
              left: 0,
              backgroundColor: '#c0c0c0',
              padding: '2px',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10000,
              boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <a href="https://linkedin.com/in/Rishi Biswas" target="_blank" rel="noreferrer" className="start-menu-item" style={{ textDecoration: 'none', color: '#000' }}>
              <span className="start-menu-item-icon"><LinkedInIcon size={16} /></span>
              <span>LinkedIn</span>
            </a>
            <a href="mailto:rexbiswas1@gmail.com" className="start-menu-item" style={{ textDecoration: 'none', color: '#000' }}>
              <span className="start-menu-item-icon"><GmailIcon size={16} /></span>
              <span>Email</span>
            </a>
            <a href="https://wa.me/919625065557" target="_blank" rel="noreferrer" className="start-menu-item" style={{ textDecoration: 'none', color: '#000' }}>
              <span className="start-menu-item-icon"><WhatsAppIcon size={16} /></span>
              <span>WhatsApp</span>
            </a>
          </div>
        )}

        {/* Internet Connection Globe Icon (Dynamic) */}
        <div className="tray-icon" title={isOnline ? 'Internet: Connected' : 'Internet: Disconnected / Offline'}>
          <RetroGlobeIcon size={16} online={isOnline} />
        </div>

        {/* Battery Icon (Dynamic) */}
        <div
          className="tray-icon"
          title={battery.supported
            ? `Battery: ${Math.round(battery.level * 100)}% (${battery.charging ? 'Charging' : 'Discharging'})`
            : 'AC Power connected (100%)'}
        >
          {renderBatteryIcon()}
        </div>

        {/* Clock (Dynamic) */}
        <div
          className="tray-clock"
          title={time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        >
          <span className="tray-time">
            {time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
          </span>
          <span className="tray-date">
            {time.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Pinned App Context Menu */}
      {pinnedContextMenu.visible && (
        <div
          className="win-border-outset desktop-context-menu"
          style={{
            position: 'fixed',
            top: pinnedContextMenu.y - 50,
            left: pinnedContextMenu.x,
            zIndex: 10000,
            backgroundColor: '#d4d0c8',
            padding: '2px',
            minWidth: '180px',
            width: 'max-content',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header option showing app icon and title */}
          <div
            className="context-menu-item"
            onClick={() => {
              openWindow(pinnedContextMenu.appId);
              setPinnedContextMenu({ visible: false, x: 0, y: 0, appId: null });
            }}
            style={{ fontWeight: 'bold' }}
          >
            <span style={{ position: 'absolute', left: '2px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
              {getAppIcon(pinnedContextMenu.appId)}
            </span>
            <span>{getAppTitle(pinnedContextMenu.appId)}</span>
          </div>
          <div className="context-menu-divider" />
          <div
            className="context-menu-item"
            onClick={() => {
              unpinApp(pinnedContextMenu.appId);
              setPinnedContextMenu({ visible: false, x: 0, y: 0, appId: null });
            }}
          >
            <span style={{ position: 'absolute', left: '2px', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
              <UnpinIcon size={16} />
            </span>
            <span>Unpin from taskbar</span>
          </div>
        </div>
      )}
    </div>
  );
};
