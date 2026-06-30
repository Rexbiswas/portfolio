import React, { useEffect, useState } from 'react';
import { useStore } from './store';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { ShutdownDialog } from './components/ShutdownDialog';
import { ShutdownScreen } from './components/ShutdownScreen';
import { MSDOSPrompt } from './components/MSDOSPrompt';
import { BootScreen } from './components/BootScreen';
import { LumiaUI } from './components/LumiaUI';
import { gsap } from 'gsap';

function App() {
  const { systemMode, isShutdownDialogOpen, isBooting } = useStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (systemMode !== 'normal' || isBooting || isMobile) return;

    // GSAP Startup Animation Sequence with StrictMode context cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Slide taskbar up
      tl.fromTo('.retro-taskbar', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );

      // 2. Stagger desktop icons in
      tl.fromTo('.desktop-icon',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(1.5)' },
        '-=0.2'
      );

      // 3. Stagger retro windows in
      tl.fromTo('.retro-window',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'power2.out' },
        '-=0.1'
      );
    });

    return () => ctx.revert();
  }, [systemMode, isBooting, isMobile]);

  if (isBooting) {
    return <BootScreen />;
  }

  if (systemMode === 'shutdown') {
    return <ShutdownScreen />;
  }

  if (systemMode === 'msdos') {
    return <MSDOSPrompt />;
  }

  return (
    <div className="os-viewport">
      {isMobile ? (
        <LumiaUI />
      ) : (
        <>
          <Desktop />
          <Taskbar />
          {isShutdownDialogOpen && <ShutdownDialog />}
        </>
      )}
    </div>
  );
}

export default App;
