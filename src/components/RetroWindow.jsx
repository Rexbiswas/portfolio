import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { useStore } from '../store';

export const RetroWindow = ({
  id,
  title,
  isOpen,
  isMinimized,
  isMaximized,
  defaultX,
  defaultY,
  width,
  height,
  icon,
  children,
  menubar,
  toolbar,
  addressbar,
}) => {
  const { focusedWindow, focusWindow, closeWindow, minimizeWindow, toggleMaximize, zIndices } = useStore();
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();

  if (!isOpen) return null;

  const isActive = focusedWindow === id;
  const zIndex = zIndices[id] || 1;

  // Frame animations
  const variants = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.15, ease: 'easeOut' } 
    },
    minimized: { 
      scale: 0.3, 
      y: 400,
      opacity: 0, 
      transition: { duration: 0.2, ease: 'easeIn' } 
    }
  };

  const handleMouseDown = () => {
    focusWindow(id);
  };

  const handleTitleDoubleClick = () => {
    toggleMaximize(id);
  };

  return (
    <motion.div
      initial="hidden"
      animate={isMinimized ? "minimized" : "visible"}
      variants={variants}
      drag={!isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.05}
      dragTransition={{ power: 0.2, timeConstant: 150 }}
      onMouseDown={handleMouseDown}
      style={{
        width: isMaximized ? '100%' : width,
        height: isMaximized ? '100%' : height,
        left: isMaximized ? 0 : defaultX,
        top: isMaximized ? 0 : defaultY,
        zIndex: zIndex,
        display: isMinimized ? 'none' : 'flex',
      }}
      className={`retro-window win-border-outset ${isMaximized ? 'maximized' : ''}`}
    >
      {/* Title Bar */}
      <div
        onPointerDown={(e) => {
          dragControls.start(e);
          handleMouseDown();
        }}
        onDoubleClick={handleTitleDoubleClick}
        className={`window-titlebar ${isActive ? 'active' : 'inactive'}`}
      >
        <div className="window-title-left">
          {icon && <span className="window-title-icon">{icon}</span>}
          <span>{title}</span>
        </div>
        <div className="window-controls" onPointerDown={(e) => e.stopPropagation()}>
          {/* Minimize */}
          <button
            onClick={() => minimizeWindow(id)}
            className="win-control-btn"
            title="Minimize"
          >
            _
          </button>
          {/* Maximize */}
          <button
            onClick={() => toggleMaximize(id)}
            className="win-control-btn"
            title={isMaximized ? "Restore" : "Maximize"}
            style={{ fontWeight: 'normal', fontSize: '8px' }}
          >
            {isMaximized ? '❐' : '⬜'}
          </button>
          {/* Close */}
          <button
            onClick={() => closeWindow(id)}
            className="win-control-btn close-btn"
            title="Close"
            style={{ marginLeft: '2px' }}
          >
            X
          </button>
        </div>
      </div>

      {/* Menubar (optional) */}
      {menubar && <div className="window-menubar">{menubar}</div>}

      {/* Toolbar (optional) */}
      {toolbar && <div className="window-toolbar">{toolbar}</div>}

      {/* Addressbar (optional) */}
      {addressbar && <div className="window-address-bar">{addressbar}</div>}

      {/* Window Body Content */}
      <div className="window-content">
        {children}
      </div>
    </motion.div>
  );
};
