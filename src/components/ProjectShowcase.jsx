import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';

export const ProjectShowcase = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    let scrollInstance = null;
    if (scrollRef.current) {
      try {
        scrollInstance = new LocomotiveScroll({
          el: scrollRef.current,
          smooth: true,
          multiplier: 0.8, // subtle smooth scroll
        });
      } catch (err) {
        console.warn('Locomotive scroll failed to load, falling back to native scroll:', err);
      }
    }
    return () => {
      if (scrollInstance) scrollInstance.destroy();
    };
  }, []);

  return (
    <div className="project-showcase-container">
      <div className="project-row">
        <div className="project-label">Project:</div>
        <div className="project-value">Project_Alpha</div>
      </div>
      <div className="project-row">
        <div className="project-label">Tech Stack:</div>
        <div className="project-value">React, AWS</div>
      </div>
      <div className="project-row" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="project-label" style={{ marginBottom: '4px' }}>Description:</div>
        <div 
          ref={scrollRef}
          data-scroll-container
          className="project-desc-wrapper win-border-inset"
        >
          <div data-scroll-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do incididunt tincidunt ut dolore mareet dolore magna aliquamerat volutpat. ulititii, nonipad vertim datip ultam moritum.
          </div>
        </div>
      </div>
    </div>
  );
};
