import React, { useState } from 'react';
import { GitHubIcon } from './Icons';


const PROJECTS = [
  {
    id: 'rockerz',
    title: 'Rockerz Headphones',
    tech: 'React, Node.js, MongoDB, framer motion, tailwindcss, Gsap',
    github: 'https://github.com/Rexbiswas/rockerz',
    live: 'https://rockerz-kappa.vercel.app/',
    desc: 'A full-stack e-commerce platform for headphones. Features user authentication, a shopping cart, order management, and an admin dashboard. Built with React, Node.js, MongoDB, framer motion, tailwindcss, and Gsap.'
  },
  {
    id: 'sneakerhead',
    title: 'Sneakerhead',
    tech: 'React, Node.js, MongoDB, framer motion, tailwindcss, Gsap',
    github: 'https://github.com/Rexbiswas/sneakerhead.git',
    live: 'https://sneakerhead-khaki.vercel.app/',
    desc: 'A modern full-stack e-commerce platform designed for sneaker enthusiasts. Features interactive product showcases, seamless shopping cart & checkout flow, user authentication, and fluid micro-interactions powered by GSAP and Framer Motion.'
  },
  {
    id: 'concept',
    title: 'Concept Website',
    tech: 'React, TailwindCSS, framer motion, GSAP',
    github: 'https://github.com/Rexbiswas/visual_concept.git',
    live: 'https://visual-concept.vercel.app/',
    desc: 'This website is for a conceptual project called Concept Website. It is a work in progress.'
  },
  {
    id: 'coralcookies',
    title: 'Coralcookies',
    tech: 'React, tailwindcss, Gsap',
    github: 'https://github.com/Rexbiswas/coralcookies.git',
    live: 'https://coralcookies.vercel.app/',
    desc: 'A modern full-stack e-commerce platform designed for cookie enthusiasts. Features interactive product showcases, seamless shopping cart & checkout flow, user authentication, and fluid micro-interactions powered by GSAP and Framer Motion.'
  }
];

export const ProjectShowcase = () => {
  const [selectedProjectId, setSelectedProjectId] = useState('rockerz');

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  return (
    <div className="project-showcase-container" style={{ display: 'flex', height: '100%', padding: '4px', backgroundColor: '#d4d0c8', fontFamily: '"MS Sans Serif", Tahoma, sans-serif', color: '#000', gap: '6px' }}>
      {/* Left Listbox of Projects */}
      <div 
        className="win-border-inset"
        style={{
          width: '180px',
          backgroundColor: '#ffffff',
          overflowY: 'auto',
          padding: '2px',
          flexShrink: 0
        }}
      >
        <div style={{ fontWeight: 'bold', fontSize: '11px', padding: '4px', borderBottom: '1px solid #d4d0c8', marginBottom: '4px', color: '#0a246a' }}>
          Select Project:
        </div>
        {PROJECTS.map(p => {
          const isSelected = p.id === selectedProjectId;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              style={{
                padding: '4px 8px',
                fontSize: '11px',
                cursor: 'pointer',
                backgroundColor: isSelected ? '#0a246a' : 'transparent',
                color: isSelected ? '#ffffff' : '#000000',
                borderRadius: '1px',
                marginBottom: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              title={p.title}
            >
              📁 {p.title}
            </div>
          );
        })}
      </div>

      {/* Right Details Panel */}
      <div 
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          overflow: 'hidden'
        }}
      >
        {/* Project Header */}
        <div className="win-border-inset" style={{ padding: '8px', backgroundColor: '#ffffff' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0a246a' }}>
            {selectedProject.title}
          </div>
          <div style={{ fontSize: '10px', color: '#555555', marginTop: '2px' }}>
            <strong>Tech Stack:</strong> {selectedProject.tech}
          </div>
        </div>

        {/* Project Description (Scrollable) */}
        <div 
          className="win-border-inset"
          style={{
            flexGrow: 1,
            backgroundColor: '#ffffff',
            padding: '10px',
            overflowY: 'auto',
            fontSize: '11px',
            lineHeight: '1.5'
          }}
        >
          {selectedProject.desc}
        </div>

        {/* Project Action Links (Buttons) */}
        <div 
          style={{
            display: 'flex',
            gap: '8px',
            padding: '4px 0 2px 0'
          }}
        >
          <a
            href={selectedProject.live}
            target="_blank"
            rel="noopener noreferrer"
            className="win-border-outset"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              backgroundColor: '#d4d0c8',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '11px',
              fontWeight: 'bold',
              gap: '6px'
            }}
          >
            <span>🌐</span>
            <span>Live Demo</span>
          </a>
          <a
            href={selectedProject.github}
            target="_blank"
            rel="noopener noreferrer"
            className="win-border-outset"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px',
              backgroundColor: '#d4d0c8',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '11px',
              fontWeight: 'bold',
              gap: '6px'
            }}
          >
            <GitHubIcon size={16} color="#000000" />
            <span>GitHub Repo</span>
          </a>
        </div>
      </div>
    </div>
  );
};
