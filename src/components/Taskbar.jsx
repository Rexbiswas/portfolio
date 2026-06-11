import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { FolderIcon, ExecutableIcon, StartLogo, FileExplorerIcon, SettingsIcon, UserFolderIcon, ProjectsFolderIcon, RetroGlobeIcon, ChevronUpIcon, SkillsIcon, ShutdownIcon } from './Icons';

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
    openShutdownDialog
  } = useStore();

  const [time, setTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [battery, setBattery] = useState({ level: 1.0, charging: true, supported: false });

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
                src="https://media.licdn.com/dms/image/v2/D5603AQEgxQwX4tWhvw/profile-displayphoto-shrink_400_400/B56ZbxSlyxHUAo-/0/1747804906002?e=1782950400&v=beta&t=hiaFQRAfCJ40I4EwJ0j3spYJefTBuZcegSaZ1QxfPpQ" 
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
            <div className="start-menu-item" onClick={() => handleStartMenuItemClick('aboutMe')}>
              <span className="start-menu-item-icon"><UserFolderIcon size={16} /></span>
              <span>About Me</span>
            </div>
            <div className="start-menu-divider" />
            <div className="start-menu-item" onClick={() => openShutdownDialog()}>
              <span className="start-menu-item-icon"><ShutdownIcon size={16} /></span>
              <span>Shut Down...</span>
            </div>
          </div>
        </div>
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
      </div>

      {/* System Tray */}
      <div className="system-tray win-border-inset">
        {/* Chevron Show Hidden Icons */}
        <div className="tray-icon" title="Show hidden icons" style={{ opacity: 0.8 }}>
          <ChevronUpIcon size={12} />
        </div>

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
    </div>
  );
};
