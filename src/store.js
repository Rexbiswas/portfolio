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
  },
  focusedWindow: 'projectShowcase',
  maxZIndex: 10,
  zIndices: {
    fileExplorer: 1,
    projectShowcase: 2,
    aboutMe: 3,
    displayProperties: 4,
  },
  startMenuOpen: false,
  wallpaperTheme: 'classic',
  setWallpaperTheme: (theme) => set({ wallpaperTheme: theme }),

  openWindow: (id) =>
    set((state) => {
      const newZ = state.maxZIndex + 1;
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isOpen: true, isMinimized: false },
        },
        focusedWindow: id,
        maxZIndex: newZ,
        zIndices: { ...state.zIndices, [id]: newZ },
      };
    }),

  openTextFile: (fileName, content) =>
    set((state) => {
      const newZ = state.maxZIndex + 1;
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
        maxZIndex: newZ,
        zIndices: { ...state.zIndices, aboutMe: newZ },
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const windowState = { ...state.windows[id], isOpen: false };
      if (id === 'aboutMe') {
        windowState.content = undefined;
        windowState.title = 'About_Me.txt - Notepad';
      }
      return {
        windows: {
          ...state.windows,
          [id]: windowState,
        },
        focusedWindow: state.focusedWindow === id ? null : state.focusedWindow,
      };
    }),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMinimized: true },
      },
      focusedWindow: state.focusedWindow === id ? null : state.focusedWindow,
    })),

  toggleMaximize: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      if (state.focusedWindow === id) return {};
      const newZ = state.maxZIndex + 1;
      return {
        focusedWindow: id,
        maxZIndex: newZ,
        zIndices: { ...state.zIndices, [id]: newZ },
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
