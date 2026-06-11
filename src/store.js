import { create } from 'zustand'

export const useStore = create((set) => ({
  windows: {
    fileExplorer: {
      id: 'fileExplorer',
      title: 'File Explorer',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 150,
      y: 50,
      width: 680,
      height: 420,
    },
    projectShowcase: {
      id: 'projectShowcase',
      title: 'Projects - Projecase.exe',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 340,
      y: 220,
      width: 600,
      height: 320,
    },
    aboutMe: {
      id: 'aboutMe',
      title: 'About_Me.txt - Notepad',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 260,
      y: 140,
      width: 480,
      height: 280,
    },
    displayProperties: {
      id: 'displayProperties',
      title: 'Display Properties',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 220,
      y: 100,
      width: 400,
      height: 340,
    },
    skills: {
      id: 'skills',
      title: 'Skills Properties',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 200,
      y: 80,
      width: 450,
      height: 400,
    },
    help: {
      id: 'help',
      title: 'Windows Help',
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 180,
      y: 120,
      width: 550,
      height: 400,
    },
  },
  focusedWindow: 'projectShowcase',
  maxZIndex: 15,
  windowOrder: ['fileExplorer', 'skills', 'displayProperties', 'aboutMe', 'help', 'projectShowcase'],
  zIndices: {
    fileExplorer: 10,
    skills: 11,
    displayProperties: 12,
    aboutMe: 13,
    help: 14,
    projectShowcase: 15,
  },
  startMenuOpen: false,
  wallpaperTheme: localStorage.getItem('portfolio_wallpaper_theme') || 'win98',
  setWallpaperTheme: (theme) => set(() => {
    localStorage.setItem('portfolio_wallpaper_theme', theme);
    return { wallpaperTheme: theme };
  }),
  systemMode: 'normal',
  isShutdownDialogOpen: false,
  isBooting: true,
  setBooting: (bool) => set({ isBooting: bool }),
  openShutdownDialog: () => set({ isShutdownDialogOpen: true, startMenuOpen: false }),
  closeShutdownDialog: () => set({ isShutdownDialogOpen: false }),
  setSystemMode: (mode) => set({ systemMode: mode, isShutdownDialogOpen: false }),
  pinnedApps: JSON.parse(localStorage.getItem('portfolio_pinned_apps') || '[]'),
  pinApp: (id) => set((state) => {
    if (state.pinnedApps.includes(id)) return {};
    const newPinned = [...state.pinnedApps, id];
    localStorage.setItem('portfolio_pinned_apps', JSON.stringify(newPinned));
    return { pinnedApps: newPinned };
  }),
  unpinApp: (id) => set((state) => {
    const newPinned = state.pinnedApps.filter(appId => appId !== id);
    localStorage.setItem('portfolio_pinned_apps', JSON.stringify(newPinned));
    return { pinnedApps: newPinned };
  }),

  openWindow: (id) =>
    set((state) => {
      const newOrder = state.windowOrder.filter(wId => wId !== id);
      newOrder.push(id);
      
      const newZIndices = {};
      newOrder.forEach((wId, index) => {
        newZIndices[wId] = 10 + index;
      });

      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: true, isMinimized: false },
        },
        focusedWindow: id,
        windowOrder: newOrder,
        zIndices: newZIndices,
        maxZIndex: 10 + newOrder.length - 1,
      };
    }),

  openTextFile: (fileName, content) =>
    set((state) => {
      const id = 'aboutMe';
      const newOrder = state.windowOrder.filter(wId => wId !== id);
      newOrder.push(id);
      
      const newZIndices = {};
      newOrder.forEach((wId, index) => {
        newZIndices[wId] = 10 + index;
      });

      return {
        windows: {
          ...state.windows,
          aboutMe: {
            ...state.windows.aboutMe,
            isOpen: true,
            isMinimized: false,
            title: `${fileName} - Notepad`,
            content: content,
          },
        },
        focusedWindow: 'aboutMe',
        windowOrder: newOrder,
        zIndices: newZIndices,
        maxZIndex: 10 + newOrder.length - 1,
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const windowState = { ...state.windows[id], isOpen: false };
      if (id === 'aboutMe') {
        windowState.content = undefined;
        windowState.title = 'About_Me.txt - Notepad';
      }

      // Determine next focused window
      let nextFocused = state.focusedWindow;
      if (state.focusedWindow === id) {
        nextFocused = null;
        for (let i = state.windowOrder.length - 1; i >= 0; i--) {
          const wId = state.windowOrder[i];
          if (wId !== id) {
            const w = state.windows[wId];
            if (w.isOpen && !w.isMinimized) {
              nextFocused = wId;
              break;
            }
          }
        }
      }

      // If we focused a new window, move it to the top of the stack
      let newOrder = [...state.windowOrder];
      let newZIndices = { ...state.zIndices };
      if (nextFocused) {
        newOrder = newOrder.filter(wId => wId !== nextFocused);
        newOrder.push(nextFocused);
        newOrder.forEach((wId, index) => {
          newZIndices[wId] = 10 + index;
        });
      }

      return {
        windows: {
          ...state.windows,
          [id]: windowState,
        },
        focusedWindow: nextFocused,
        windowOrder: newOrder,
        zIndices: newZIndices,
        maxZIndex: 10 + newOrder.length - 1,
      };
    }),

  minimizeWindow: (id) =>
    set((state) => {
      // Determine next focused window
      let nextFocused = state.focusedWindow;
      if (state.focusedWindow === id) {
        nextFocused = null;
        for (let i = state.windowOrder.length - 1; i >= 0; i--) {
          const wId = state.windowOrder[i];
          if (wId !== id) {
            const w = state.windows[wId];
            if (w.isOpen && !w.isMinimized) {
              nextFocused = wId;
              break;
            }
          }
        }
      }

      // If we focused a new window, move it to the top of the stack
      let newOrder = [...state.windowOrder];
      let newZIndices = { ...state.zIndices };
      if (nextFocused) {
        newOrder = newOrder.filter(wId => wId !== nextFocused);
        newOrder.push(nextFocused);
        newOrder.forEach((wId, index) => {
          newZIndices[wId] = 10 + index;
        });
      }

      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: true },
        },
        focusedWindow: nextFocused,
        windowOrder: newOrder,
        zIndices: newZIndices,
        maxZIndex: 10 + newOrder.length - 1,
      };
    }),

  toggleMaximize: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      const newOrder = state.windowOrder.filter(wId => wId !== id);
      newOrder.push(id);
      
      const newZIndices = {};
      newOrder.forEach((wId, index) => {
        newZIndices[wId] = 10 + index;
      });

      return {
        focusedWindow: id,
        windowOrder: newOrder,
        zIndices: newZIndices,
        maxZIndex: 10 + newOrder.length - 1,
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false },
        },
      };
    }),

  toggleStartMenu: () =>
    set((state) => ({ startMenuOpen: !state.startMenuOpen })),
    
  closeStartMenu: () =>
    set({ startMenuOpen: false }),
}));
