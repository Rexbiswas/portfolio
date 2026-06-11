import React from 'react';
import { useStore } from '../store';
import { FolderIcon, ExecutableIcon, StartLogo, FileExplorerIcon, SettingsIcon, UserFolderIcon, ProjectsFolderIcon, RetroGlobeIcon, ChevronUpIcon, SkillsIcon } from './Icons';

export const Taskbar = () => {
  const { 
    windows, 
    focusedWindow, 
    focusWindow, 
    minimizeWindow, 
    openWindow,
    startMenuOpen, 
    toggleStartMenu,
    closeStartMenu
  } = useStore();

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
            <div className="start-menu-item" onClick={() => { alert('Skills module loaded.'); closeStartMenu(); }}>
              <span className="start-menu-item-icon"><SkillsIcon size={16} /></span>
              <span>Skills</span>
            </div>
            <div className="start-menu-item" onClick={() => handleStartMenuItemClick('aboutMe')}>
              <span className="start-menu-item-icon"><UserFolderIcon size={16} /></span>
              <span>About Me</span>
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
      </div>

      {/* System Tray */}
      <div className="system-tray win-border-inset">
        {/* Chevron Show Hidden Icons */}
        <div className="tray-icon" title="Show hidden icons" style={{ opacity: 0.8 }}>
          <ChevronUpIcon size={12} />
        </div>

        {/* Internet Connection Globe Icon (Static Decoration) */}
        <div className="tray-icon" title="Internet: Connected">
          <RetroGlobeIcon size={16} />
        </div>
        
        {/* Battery Icon */}
        <div className="tray-icon" title="Battery: 100% (Charging)">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="2" width="14" height="8" stroke="#000000" strokeWidth="1" />
            <rect x="15" y="4" width="2" height="4" fill="#000000" />
            <rect x="3" y="4" width="10" height="4" fill="#00ff00" />
          </svg>
        </div>
        {/* Clock */}
        <span className="tray-clock">14:57 PM</span>
      </div>
    </div>
  );
};
