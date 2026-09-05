import React from 'react';

// Custom detailed retro SVGs matching Windows 95 16-color style
export const FolderIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-3.375, -4.625) scale(1.25)">
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
    </g>
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
    <g transform="translate(-3.375, -4.625) scale(1.25)">
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
    </g>
  </svg>
);

export const FileExplorerIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-3.375, -4.625) scale(1.25)">
      {/* Folder Base Shadow (Olive Green / Gold) */}
      <rect x="4" y="8" width="8" height="4" fill="#808000" />
      <rect x="4" y="10" width="24" height="16" fill="#808000" />

      {/* Win98 Yellow Folder Body */}
      <rect x="3" y="9" width="8" height="4" fill="#FFFF00" />
      <rect x="3" y="11" width="25" height="14" fill="#FFFF00" />

      {/* 3D Bevel Highlights (White top/left outsets) */}
      <rect x="3" y="11" width="25" height="1" fill="#FFFFFF" />
      <rect x="3" y="11" width="1" height="14" fill="#FFFFFF" />
      <rect x="27" y="11" width="1" height="14" fill="#808000" />
      <rect x="3" y="24" width="25" height="1" fill="#808000" />
      <path d="M3 11L11 11L13 13L27 13" stroke="#808080" strokeWidth="1" fill="none" />

      {/* Windows 98 Retro Blue File Explorer Stand / Arch Clip */}
      {/* Outer Blue Arch Body */}
      <rect x="8" y="14" width="15" height="11" fill="#000080" />
      <rect x="9" y="15" width="13" height="9" fill="#0066FF" />

      {/* Center cutout showing yellow folder */}
      <rect x="12" y="18" width="7" height="7" fill="#FFFF00" />

      {/* Retro 3D Bevel Highlights on Blue Stand */}
      <rect x="8" y="14" width="15" height="1" fill="#66CCFF" />
      <rect x="8" y="14" width="1" height="11" fill="#66CCFF" />
      <rect x="22" y="14" width="1" height="11" fill="#000040" />
      <rect x="8" y="24" width="15" height="1" fill="#000040" />

      {/* Inner Hole Bevel Shadows */}
      <rect x="12" y="18" width="7" height="1" fill="#000040" />
      <rect x="12" y="18" width="1" height="7" fill="#000040" />
      <rect x="18" y="18" width="1" height="7" fill="#66CCFF" />
    </g>
  </svg>
);

export const ProjectsFolderIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      {/* Folder Back Tab Gradient */}
      <linearGradient id="projFolderBackGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFE066" />
        <stop offset="100%" stopColor="#DCA000" />
      </linearGradient>
      {/* Folder Front Body Gradient */}
      <linearGradient id="projFolderFrontGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF2A3" />
        <stop offset="30%" stopColor="#FFE052" />
        <stop offset="100%" stopColor="#D99B00" />
      </linearGradient>
      {/* Titlebar Gradient */}
      <linearGradient id="projWinTitleGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#0B55D6" />
        <stop offset="60%" stopColor="#1E88E5" />
        <stop offset="100%" stopColor="#0055EA" />
      </linearGradient>
      {/* Shadow filter */}
      <filter id="projWinShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0.5" dy="1" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.35" />
      </filter>
    </defs>

    {/* Folder Back Tab */}
    <path
      d="M 3 6 C 3 4.5 4 3.5 5.5 3.5 H 12 C 13.5 3.5 14.5 4.5 15.5 6 L 16.5 7.5 H 27.5 C 28.8 7.5 29.5 8.3 29.5 9.5 V 13 H 3 V 6 Z"
      fill="url(#projFolderBackGrad)"
      stroke="#805C00"
      strokeWidth="0.8"
    />

    {/* Dark interior folder gap shadow */}
    <path
      d="M 3.5 7.5 H 28.5 V 10.5 H 3.5 Z"
      fill="#A67800"
      opacity="0.6"
    />

    {/* Folder Main Front Body (yellow 3D folder) */}
    <path
      d="M 2 8.5 C 2 7.4 2.8 6.5 4 6.5 H 28 C 29.2 6.5 30 7.4 30 8.5 V 27.5 C 30 28.6 29.2 29.5 28 29.5 H 4 C 2.8 29.5 2 28.6 2 27.5 Z"
      fill="url(#projFolderFrontGrad)"
      stroke="#7A5600"
      strokeWidth="1"
      strokeLinejoin="round"
    />

    {/* Folder Top Edge White Highlight */}
    <path
      d="M 3.5 7.5 H 28.5"
      stroke="#FFFFFF"
      strokeWidth="0.9"
      strokeLinecap="round"
      opacity="0.9"
    />

    {/* Left Edge Inner Highlight */}
    <path
      d="M 3 8.5 V 27"
      stroke="#FFFDD0"
      strokeWidth="0.7"
      opacity="0.7"
    />

    {/* Overlaid Mini Window (Bottom-Right) */}
    <g filter="url(#projWinShadow)">
      {/* Window Outer Container & Border */}
      <rect
        x="9"
        y="11.5"
        width="21"
        height="18"
        rx="1"
        fill="#FFFFFF"
        stroke="#002D88"
        strokeWidth="1"
      />

      {/* Blue XP Titlebar */}
      <path
        d="M 9.5 12 H 29.5 V 16.5 H 9.5 Z"
        fill="url(#projWinTitleGrad)"
      />

      {/* Titlebar Window Controls */}
      {/* Close button (Red square with white cross) */}
      <rect x="27.2" y="13" width="1.8" height="1.8" fill="#E53935" rx="0.3" />
      <path d="M 27.6 13.4 L 28.6 14.4 M 28.6 13.4 L 27.6 14.4" stroke="#FFFFFF" strokeWidth="0.4" />

      {/* Maximize button */}
      <rect x="25" y="13" width="1.8" height="1.8" fill="#1565C0" rx="0.3" stroke="#FFFFFF" strokeWidth="0.3" />

      {/* Minimize button */}
      <rect x="22.8" y="13" width="1.8" height="1.8" fill="#1565C0" rx="0.3" />
      <line x1="23.2" y1="14.3" x2="24.2" y2="14.3" stroke="#FFFFFF" strokeWidth="0.4" />

      {/* Window Inner Viewport Divider Line */}
      <line x1="9.5" y1="16.5" x2="29.5" y2="16.5" stroke="#002D88" strokeWidth="0.5" />

      {/* 2x3 Grid of Miniature Thumbnails inside window */}
      {/* --- Row 1 --- */}
      {/* Green Thumbnail (top-left) */}
      <rect x="11" y="18" width="4.5" height="4.5" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="0.5" rx="0.5" />
      <rect x="11.8" y="18.8" width="2.9" height="1.8" fill="#4CAF50" />
      <rect x="11.8" y="21" width="2.9" height="0.8" fill="#81C784" />

      {/* Orange/Red Thumbnail (top-center) */}
      <rect x="17.2" y="18" width="4.5" height="4.5" fill="#FBE9E7" stroke="#FF5722" strokeWidth="0.5" rx="0.5" />
      <rect x="18" y="18.8" width="2.9" height="1.8" fill="#FF5722" />
      <rect x="18" y="21" width="2.9" height="0.8" fill="#FF8A65" />

      {/* Blue Thumbnail (top-right) */}
      <rect x="23.5" y="18" width="4.5" height="4.5" fill="#E3F2FD" stroke="#1E88E5" strokeWidth="0.5" rx="0.5" />
      <rect x="24.3" y="18.8" width="2.9" height="1.8" fill="#1E88E5" />
      <rect x="24.3" y="21" width="2.9" height="0.8" fill="#64B5F6" />

      {/* --- Row 2 --- */}
      {/* Yellow Thumbnail (bottom-left) */}
      <rect x="11" y="23.8" width="4.5" height="4.5" fill="#FFFDE7" stroke="#FBC02D" strokeWidth="0.5" rx="0.5" />
      <rect x="11.8" y="24.6" width="2.9" height="1.8" fill="#FBC02D" />
      <rect x="11.8" y="26.8" width="2.9" height="0.8" fill="#FFF176" />

      {/* Teal Thumbnail (bottom-center) */}
      <rect x="17.2" y="23.8" width="4.5" height="4.5" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="0.5" rx="0.5" />
      <rect x="18" y="24.6" width="2.9" height="1.8" fill="#00ACC1" />
      <rect x="18" y="26.8" width="2.9" height="0.8" fill="#4DD0E1" />

      {/* Purple/Red Thumbnail (bottom-right) */}
      <rect x="23.5" y="23.8" width="4.5" height="4.5" fill="#FCE4EC" stroke="#D81B60" strokeWidth="0.5" rx="0.5" />
      <rect x="24.3" y="24.6" width="2.9" height="1.8" fill="#D81B60" />
      <rect x="24.3" y="26.8" width="2.9" height="0.8" fill="#F06292" />
    </g>
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
  <img 
    src="/firefox.svg" 
    alt="Browser" 
    width={size} 
    height={size} 
    style={{ userSelect: 'none', pointerEvents: 'none' }} 
  />
);

export const ShutdownIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Computer screen with power symbol inside */}
    <rect x="4" y="6" width="24" height="16" fill="#c0c0c0" stroke="#000000" strokeWidth="1.5" />
    <rect x="6" y="8" width="20" height="12" fill="#000000" />
    {/* Red Power Symbol */}
    <circle cx="16" cy="14" r="4" stroke="#ff3333" strokeWidth="1.5" fill="none" />
    <line x1="16" y1="10" x2="16" y2="14" stroke="#ff3333" strokeWidth="1.5" strokeLinecap="round" />
    {/* Stand */}
    <path d="M11 22L10 26H22L21 22H11Z" fill="#c0c0c0" stroke="#000000" strokeWidth="1.5" />
    {/* Bevel details */}
    <line x1="5" y1="7" x2="27" y2="7" stroke="#ffffff" strokeWidth="1" />
    <line x1="5" y1="7" x2="5" y2="21" stroke="#ffffff" strokeWidth="1" />
  </svg>
);

export const PinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2H10V3H9V7L11 9V10H7V14H6V10H2V9L4 7V3H3V2H6Z" stroke="#000000" strokeWidth="1.2" fill="#c0c0c0" />
    <path d="M5 3H8V7L9.5 8.5H3.5L5 7V3Z" fill="#ffffff" />
  </svg>
);

export const UnpinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Pin in background */}
    <path d="M6 2H10V3H9V7L11 9V10H7V14H6V10H2V9L4 7V3H3V2H6Z" stroke="#808080" strokeWidth="1.2" fill="#c0c0c0" opacity="0.6" />
    {/* Red forbidden slash/circle */}
    <circle cx="11" cy="11" r="4.5" stroke="#ff3333" strokeWidth="1.5" fill="none" />
    <line x1="8" y1="8" x2="14" y2="14" stroke="#ff3333" strokeWidth="1.5" />
  </svg>
);

export const GitHubIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
);

export const BriefcaseIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Handle shadow */}
    <rect x="13" y="4" width="6" height="2" fill="#403010" />
    {/* Handle */}
    <path d="M12 5H20V8H18V6H14V8H12V5Z" fill="#805a2b" stroke="#000000" strokeWidth="1" />
    
    {/* Main Briefcase Body */}
    <rect x="4" y="8" width="24" height="18" fill="#8b5a2b" stroke="#000000" strokeWidth="1.5" />
    
    {/* Bevel highlights */}
    <line x1="5" y1="9" x2="27" y2="9" stroke="#d2b48c" strokeWidth="1" />
    <line x1="5" y1="9" x2="5" y2="25" stroke="#d2b48c" strokeWidth="1" />
    
    {/* Bevel shadows */}
    <line x1="27" y1="9" x2="27" y2="25" stroke="#4a2700" strokeWidth="1" />
    <line x1="5" y1="25" x2="27" y2="25" stroke="#4a2700" strokeWidth="1" />
    
    {/* Leather straps */}
    <rect x="8" y="8" width="3" height="18" fill="#5c3a21" stroke="#000000" strokeWidth="1" />
    <rect x="21" y="8" width="3" height="18" fill="#5c3a21" stroke="#000000" strokeWidth="1" />
    
    {/* Gold Buckles/Locks */}
    <rect x="8" y="15" width="3" height="4" fill="#ffd700" stroke="#808000" strokeWidth="1" />
    <rect x="21" y="15" width="3" height="4" fill="#ffd700" stroke="#808000" strokeWidth="1" />
    <circle cx="9.5" cy="17" r="0.5" fill="#000000" />
    <circle cx="22.5" cy="17" r="0.5" fill="#000000" />
    
    {/* Center handle lock */}
    <rect x="14" y="8" width="4" height="4" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    <circle cx="16" cy="10" r="1" fill="#000" />
  </svg>
);

export const DownloadIcon = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="13" x2="13" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const FxMenuIcon = ({ size = 20, color = '#666' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="2" rx="1"/>
    <rect x="3" y="11" width="18" height="2" rx="1"/>
    <rect x="3" y="16" width="18" height="2" rx="1"/>
  </svg>
);

export const FxHomeIcon = ({ size = 20, color = '#666' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L2 12h3v8h5v-6h4v6h5v-8h3L12 3z"/>
  </svg>
);

export const FxDownloadsIcon = ({ size = 24, color = '#737f8d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2v2h14v-2H5z"/>
  </svg>
);

export const FxBookmarksIcon = ({ size = 24, color = '#737f8d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
);

export const FxHistoryIcon = ({ size = 24, color = '#737f8d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H11V7h2v9z"/>
  </svg>
);

export const FxAddonsIcon = ({ size = 24, color = '#737f8d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 13c-1.1 0-2-.9-2-2s.9-2 2-2V5c0-1.1-.9-2-2-2h-4c0 1.1-.9 2-2 2s-2-.9-2-2H6C4.9 3 4 3.9 4 5v4c1.1 0 2 .9 2 2s-.9 2-2 2v4c0 1.1.9 2 2 2h4c0-1.1.9-2 2-2s2 .9 2 2h4c1.1 0 2-.9 2-2v-4z"/>
  </svg>
);

export const FxSyncIcon = ({ size = 24, color = '#737f8d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/>
  </svg>
);

export const FxOptionsIcon = ({ size = 24, color = '#737f8d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
  </svg>
);

export const FxRestoreIcon = ({ size = 24, color = '#737f8d' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
  </svg>
);

export const FxSearchIcon = ({ size = 16, color = '#666' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

export const FxForwardIcon = ({ size = 20, color = '#666' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
  </svg>
);

export const FxBackIcon = ({ size = 20, color = '#666' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>
);

export const FxReloadIcon = ({ size = 18, color = '#666' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
  </svg>
);


