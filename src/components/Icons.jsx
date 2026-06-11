import React from 'react';

// Custom detailed retro SVGs matching Windows 95 16-color style
export const FolderIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Shadow / Base */}
    <rect x="4" y="8" width="8" height="4" fill="#808000" />
    <rect x="4" y="10" width="24" height="16" fill="#808000" />
    {/* Folder Back */}
    <rect x="3" y="9" width="8" height="4" fill="#ffff00" />
    <rect x="3" y="11" width="25" height="14" fill="#ffff00" />
    {/* Bevel highlights */}
    <rect x="3" y="11" width="25" height="1" fill="#ffffff" />
    <rect x="3" y="11" width="1" height="14" fill="#ffffff" />
    <rect x="27" y="11" width="1" height="14" fill="#808000" />
    <rect x="3" y="24" width="25" height="1" fill="#808000" />
    {/* Tab line */}
    <path d="M3 11L11 11L13 13L27 13" stroke="#808080" strokeWidth="1" fill="none" />
  </svg>
);

export const ComputerIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor Frame */}
    <rect x="4" y="4" width="24" height="18" fill="#c0c0c0" stroke="#808080" strokeWidth="1" />
    <rect x="5" y="5" width="22" height="16" fill="#ffffff" />
    <rect x="6" y="6" width="20" height="14" fill="#000000" />
    {/* Screen Content */}
    <rect x="8" y="8" width="16" height="10" fill="#008080" />
    <rect x="10" y="10" width="4" height="3" fill="#ffffff" />
    <rect x="15" y="12" width="7" height="2" fill="#ffff00" />
    {/* Stand */}
    <path d="M12 22H20L22 26H10L12 22Z" fill="#c0c0c0" stroke="#808080" strokeWidth="1" />
    <rect x="8" y="26" width="16" height="2" fill="#808080" />
    <rect x="8" y="27" width="16" height="1" fill="#ffffff" />
  </svg>
);

export const ExecutableIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Gray Window Frame */}
    <rect x="4" y="4" width="24" height="22" fill="#c0c0c0" />
    {/* 3D Border outset */}
    <rect x="4" y="4" width="24" height="1" fill="#ffffff" />
    <rect x="4" y="4" width="1" height="22" fill="#ffffff" />
    <rect x="4" y="25" width="24" height="1" fill="#808080" />
    <rect x="27" y="4" width="1" height="22" fill="#808080" />
    {/* Blue title bar */}
    <rect x="6" y="6" width="20" height="4" fill="#000080" />
    {/* Window content (white) */}
    <rect x="6" y="11" width="20" height="13" fill="#ffffff" />
    {/* Little gears/cogs inside (representing exe) */}
    <rect x="10" y="13" width="6" height="6" fill="#808080" />
    <rect x="14" y="16" width="6" height="6" fill="#333333" />
    <circle cx="13" cy="16" r="2" fill="#ffff00" />
  </svg>
);

export const SettingsIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Gear 1 */}
    <circle cx="14" cy="14" r="6" fill="#c0c0c0" stroke="#808080" strokeWidth="2" />
    <rect x="13" y="6" width="2" height="4" fill="#808080" />
    <rect x="13" y="18" width="2" height="4" fill="#808080" />
    <rect x="6" y="13" width="4" height="2" fill="#808080" />
    <rect x="18" y="13" width="4" height="2" fill="#808080" />
    {/* Gear 2 */}
    <circle cx="22" cy="22" r="4" fill="#808080" stroke="#404040" strokeWidth="1.5" />
    <rect x="21" y="16" width="2" height="3" fill="#404040" />
    <rect x="21" y="25" width="2" height="3" fill="#404040" />
    {/* Center holes */}
    <circle cx="14" cy="14" r="2" fill="#808080" />
    <circle cx="22" cy="22" r="1.5" fill="#c0c0c0" />
  </svg>
);

export const HelpIconSvg = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Blue circle */}
    <circle cx="16" cy="16" r="12" fill="#0000ff" />
    {/* Bevel effect */}
    <circle cx="16" cy="16" r="12" stroke="#8080ff" strokeWidth="1.5" fill="none" />
    {/* Question mark */}
    <path d="M13 11C13 9 14.5 8 16 8C17.5 8 19 9 19 11C19 13 17.5 13.5 16.5 14.5V17" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
    <circle cx="16.5" cy="21" r="2.2" fill="#ffffff" />
  </svg>
);

export const FileTextIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document sheet */}
    <path d="M6 4H20L26 10V28H6V4Z" fill="#ffffff" stroke="#808080" strokeWidth="1.5" />
    {/* Folded corner */}
    <path d="M20 4V10H26" fill="#c0c0c0" stroke="#808080" strokeWidth="1.5" />
    {/* Text lines */}
    <rect x="9" y="12" width="12" height="2" fill="#000080" />
    <rect x="9" y="16" width="14" height="2" fill="#808080" />
    <rect x="9" y="20" width="10" height="2" fill="#808080" />
    <rect x="9" y="24" width="13" height="2" fill="#808080" />
  </svg>
);

export const ContactBotIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Robot / Agent head */}
    <rect x="8" y="10" width="16" height="12" fill="#c0c0c0" stroke="#808080" strokeWidth="2" />
    <rect x="10" y="8" width="12" height="2" fill="#0000ff" />
    {/* Eyes */}
    <rect x="11" y="13" width="3" height="3" fill="#00ff00" />
    <rect x="18" y="13" width="3" height="3" fill="#00ff00" />
    {/* Mouth */}
    <rect x="12" y="18" width="8" height="2" fill="#ff0000" />
    {/* Antenna */}
    <rect x="15" y="5" width="2" height="5" fill="#808080" />
    <circle cx="16" cy="4" r="2" fill="#ff0000" />
    {/* Headset arc */}
    <path d="M6 16C6 11 10 7 16 7C22 7 26 11 26 16" stroke="#000000" strokeWidth="1.5" fill="none" />
    {/* Earpieces */}
    <rect x="5" y="14" width="3" height="6" fill="#000000" />
    <rect x="24" y="14" width="3" height="6" fill="#000000" />
  </svg>
);

export const TerminalIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor / Screen */}
    <rect x="4" y="6" width="24" height="20" fill="#000000" stroke="#808080" strokeWidth="2" />
    {/* Text cursor */}
    <path d="M8 12L12 15L8 18" stroke="#00ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="17" width="6" height="2" fill="#00ff00" />
  </svg>
);

export const GlobeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="8" cy="8" rx="3" ry="7" stroke="currentColor" strokeWidth="1.5" />
    <line x1="1" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" />
    <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.2" />
    <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export const StartLogo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Red top-left */}
    <rect x="1" y="2" width="6" height="5" fill="#ff3333" />
    {/* Green top-right */}
    <rect x="8" y="2" width="6" height="5" fill="#33cc33" />
    {/* Blue bottom-left */}
    <rect x="1" y="8" width="6" height="5" fill="#0066ff" />
    {/* Yellow bottom-right */}
    <rect x="8" y="8" width="6" height="5" fill="#ffcc00" />
    {/* Shadow lines */}
    <rect x="1" y="7" width="13" height="1" fill="#000000" />
    <rect x="7" y="2" width="1" height="11" fill="#000000" />
  </svg>
);

export const UserFolderIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Folder Shadow / Base */}
    <rect x="4" y="8" width="8" height="4" fill="#808000" />
    <rect x="4" y="10" width="24" height="16" fill="#808000" />
    {/* Folder Back */}
    <rect x="3" y="9" width="8" height="4" fill="#ffff00" />
    <rect x="3" y="11" width="25" height="14" fill="#ffff00" />
    {/* Bevel highlights */}
    <rect x="3" y="11" width="25" height="1" fill="#ffffff" />
    <rect x="3" y="11" width="1" height="14" fill="#ffffff" />
    <rect x="27" y="11" width="1" height="14" fill="#808000" />
    <rect x="3" y="24" width="25" height="1" fill="#808000" />
    {/* Tab line */}
    <path d="M3 11L11 11L13 13L27 13" stroke="#808080" strokeWidth="1" fill="none" />

    {/* Person Silhouette */}
    <path d="M13 25C13 20.5 15.5 18 19.5 18C23.5 18 26 20.5 26 25H13Z" fill="#2d8a6b" stroke="#1d5a45" strokeWidth="1" />
    <path d="M18.5 18.5L19.5 20.5L20.5 18.5" stroke="#ffffff" strokeWidth="1" fill="none" />
    <circle cx="19.5" cy="14" r="3.5" fill="#e0a96d" stroke="#b87d3b" strokeWidth="1" />
    <path d="M16 13C16 11 17.5 10 19.5 10C21.5 10 23 11 23 13" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const FileExplorerIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Folder Shadow / Base */}
    <rect x="4" y="8" width="8" height="4" fill="#808000" />
    <rect x="4" y="10" width="24" height="16" fill="#808000" />
    {/* Folder Back */}
    <rect x="3" y="9" width="8" height="4" fill="#ffff00" />
    <rect x="3" y="11" width="25" height="14" fill="#ffff00" />
    {/* Bevel highlights */}
    <rect x="3" y="11" width="25" height="1" fill="#ffffff" />
    <rect x="3" y="11" width="1" height="14" fill="#ffffff" />
    <rect x="27" y="11" width="1" height="14" fill="#808000" />
    <rect x="3" y="24" width="25" height="1" fill="#808000" />
    {/* Tab line */}
    <path d="M3 11L11 11L13 13L27 13" stroke="#808080" strokeWidth="1" fill="none" />

    {/* Blue Arch/U-shape overlay */}
    <rect x="9" y="16" width="14" height="9" fill="#3b9df8" stroke="#1c5ca3" strokeWidth="1" />
    <rect x="13" y="20" width="6" height="5" fill="#ffff00" />
  </svg>
);

export const ProjectsFolderIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Folder Tab (Back) */}
    <path
      d="M 6.5 11 L 6.5 7.5 C 6.5 6.1 7.6 5 9 5 L 14.5 5 C 15.9 5 17 6.1 17 7.5 L 17 11 Z"
      fill="#3b6ebb"
      stroke="#0a1835"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Folder Body (Front) */}
    <rect
      x="5"
      y="9.5"
      width="22"
      height="17"
      rx="3.5"
      fill="#6292e9"
      stroke="#0a1835"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    {/* Highlights and Shadows to give the 3D retro-modern premium feel */}
    {/* Top inner highlight of the body */}
    <path
      d="M 8.5 11.3 H 23.5"
      stroke="#b2caff"
      strokeWidth="1"
      strokeLinecap="round"
    />
    {/* Left inner highlight of the body */}
    <path
      d="M 6.8 12.5 V 23"
      stroke="#b2caff"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
    {/* Tab top inner highlight */}
    <path
      d="M 8.5 6.8 H 14.5"
      stroke="#80a5f5"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
  </svg>
);

export const RetroGlobeIcon = ({ size = 16, color = '#111111', online = true }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Globe grid */}
    <circle cx="7.5" cy="7.5" r="6.5" stroke={color} strokeWidth="1.2" />
    <ellipse cx="7.5" cy="7.5" rx="2.5" ry="6.5" stroke={color} strokeWidth="1" />
    <line x1="1" y1="7.5" x2="14" y2="7.5" stroke={color} strokeWidth="1.2" />
    <line x1="2" y1="4" x2="13" y2="4" stroke={color} strokeWidth="0.8" />
    <line x1="2" y1="11" x2="13" y2="11" stroke={color} strokeWidth="0.8" />
    {/* Small plug/connector overlay at bottom right */}
    <rect x="9.5" y="9.5" width="5.5" height="5.5" fill="#d4d0c8" stroke="#000000" strokeWidth="1" />
    <rect x="11.5" y="11.5" width="1.5" height="1.5" fill={online ? '#00ff00' : '#ff0000'} />
    <line x1="9.5" y1="12" x2="8" y2="12" stroke="#000000" strokeWidth="1" />
    {/* Red X over globe when offline */}
    {!online && (
      <path d="M2 2L13 13M13 2L2 13" stroke="#ff0000" strokeWidth="2.0" strokeLinecap="round" />
    )}
  </svg>
);

export const ChevronUpIcon = ({ size = 16, color = '#111111' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10L8 6L12 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SkillsIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document Base (White sheet with dark border) */}
    <rect x="5.5" y="4.5" width="21" height="23" fill="#ffffff" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
    {/* Blue inner certificate border */}
    <rect x="8" y="7" width="16" height="18" fill="none" stroke="#0a246a" strokeWidth="1.2" />
    
    {/* Lines representing written text/credentials */}
    <line x1="11" y1="11" x2="21" y2="11" stroke="#808080" strokeWidth="1.5" />
    <line x1="11" y1="15" x2="19" y2="15" stroke="#808080" strokeWidth="1.5" />
    <line x1="11" y1="19" x2="16" y2="19" stroke="#808080" strokeWidth="1.5" />

    {/* Red hanging ribbon seals */}
    <polygon points="17,20 15,26 17,24 19,26 18,20" fill="#d41a1a" />
    <polygon points="20,20 19,26 21,24 23,26 22,20" fill="#d41a1a" />

    {/* Gold Seal of excellence */}
    <circle cx="19" cy="19.5" r="3.5" fill="#ffcc00" stroke="#808000" strokeWidth="1" />
  </svg>
);

