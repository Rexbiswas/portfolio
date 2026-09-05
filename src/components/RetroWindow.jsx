import React, { useRef, useState, useEffect } from 'react';
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

  const [currentWidth, setCurrentWidth] = useState(width);
  const [currentHeight, setCurrentHeight] = useState(height);

  useEffect(() => {
    if (width !== currentWidth) setCurrentWidth(width);
    if (height !== currentHeight) setCurrentHeight(height);
  }, [width, height]);

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

  const handleResizeStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isMaximized) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = currentWidth;
    const startHeight = currentHeight;

    const handlePointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      setCurrentWidth(Math.max(200, startWidth + deltaX));
      setCurrentHeight(Math.max(100, startHeight + deltaY));
    };

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
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
      onMouseDownCapture={handleMouseDown}
      style={{
        width: isMaximized ? '100%' : currentWidth,
        height: isMaximized ? '100%' : currentHeight,
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
      <div className="window-content" style={{ position: 'relative' }}>
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          onPointerDown={handleResizeStart}
          className="retro-resize-handle"
          style={{
            position: 'absolute',
            right: '2px',
            bottom: '2px',
            width: '12px',
            height: '12px',
            cursor: 'nwse-resize',
            zIndex: 10,
          }}
        >
          {/* Classic Windows resize dots */}
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0 L12 12 L0 12 Z" fill="transparent" />
            <path d="M8 10 h2 v2 h-2 z M4 10 h2 v2 h-2 z M8 6 h2 v2 h-2 z M0 10 h2 v2 h-2 z M4 6 h2 v2 h-2 z M8 2 h2 v2 h-2 z" fill="#fff" />
            <path d="M7 9 h2 v2 h-2 z M3 9 h2 v2 h-2 z M7 5 h2 v2 h-2 z M-1 9 h2 v2 h-2 z M3 5 h2 v2 h-2 z M7 1 h2 v2 h-2 z" fill="#808080" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};
