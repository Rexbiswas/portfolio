import React, { useEffect } from 'react';
import { useStore } from './store';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { gsap } from 'gsap';

function App() {
  const { openWindow } = useStore();

  useEffect(() => {
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
  }, []);

  return (
    <div className="os-viewport">
      <Desktop />
      <Taskbar />
    </div>
  );
}

export default App;
