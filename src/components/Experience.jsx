import React, { useState } from 'react';
import { useStore } from '../store';
import { DownloadIcon } from './Icons';

const EXPERIENCES = [
  {
    id: 'pixelcraft',
    role: 'Lead Full-Stack Developer',
    company: 'PixelCraft Studio',
    period: 'Jan 2024 - Present',
    location: 'Remote',
    tech: 'React, Next.js, Node.js, Express, PostgreSQL, Redis, Docker',
    points: [
      'Architected and deployed high-performance full-stack web applications, serving over 50,000 active monthly users.',
      'Reduced API latency by 45% by introducing Redis caching layers, query index optimization, and database connection pooling.',
      'Led a cross-functional team of 4 developers to build an internal dashboard, streamlining company operations and reducing support ticket response times by 30%.',
      'Established CI/CD pipelines using GitHub Actions, reducing deployment errors and rollbacks by 80%.'
    ]
  },
  {
    id: 'retroweb',
    role: 'Software Engineer',
    company: 'RetroWeb Technologies',
    period: 'Jun 2022 - Dec 2023',
    location: 'Bangalore, India',
    tech: 'JavaScript, TypeScript, React, Express, MongoDB, AWS, Git',
    points: [
      'Developed and integrated secure payment processing modules using Stripe API, handling $10k+ weekly transactions.',
      'Refactored legacy React components to TypeScript and modern hooks, resulting in a 25% decrease in bundle size and improved developer velocity.',
      'Built serverless microservices on AWS Lambda for real-time image processing and S3 storage, saving 35% in monthly hosting costs.',
      'Collaborated closely with UX designers to implement pixel-perfect, responsive interfaces using clean CSS and animations.'
    ]
  },
  {
    id: 'freelance',
    role: 'Freelance Developer',
    company: 'Self-Employed',
    period: 'Mar 2020 - May 2022',
    location: 'Remote',
    tech: 'HTML5, CSS3, JavaScript, React, GSAP, TailwindCSS, Figma',
    points: [
      'Designed and coded bespoke marketing websites and portfolios for 15+ global clients, achieving high Google Lighthouse performance scores (95+).',
      'Developed interactive dashboards and dynamic features with smooth user experiences utilizing GSAP and Framer Motion.',
      'Managed end-to-end client relationships, scoping requirements, designing mockups, coding, and deploying final applications.'
    ]
  }
];

export const Experience = () => {
  const { closeWindow } = useStore();
  const [selectedExpId, setSelectedExpId] = useState(EXPERIENCES[0].id);

  const selectedExp = EXPERIENCES.find(exp => exp.id === selectedExpId) || EXPERIENCES[0];

  const handleDownloadResume = () => {
    fetch('/resume.pdf')
      .then((res) => {
        if (res.ok) {
          const a = document.createElement('a');
          a.href = '/resume.pdf';
          a.download = 'Resume.pdf';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        } else {
          generateFallbackResumeDownload();
        }
      })
      .catch(() => {
        generateFallbackResumeDownload();
      });
  };

  const generateFallbackResumeDownload = () => {
    const content = `====================================================================
                       CAREER TIMELINE & RESUME
====================================================================

LEAD FULL-STACK DEVELOPER
Portfolio Resume

--------------------------------------------------------------------
WORK EXPERIENCE
--------------------------------------------------------------------
1. Lead Full-Stack Developer | PixelCraft Studio
   Period: Jan 2024 - Present | Location: Remote
   Tech Stack: React, Next.js, Node.js, Express, PostgreSQL, Redis, Docker
   - Architected & deployed high-performance full-stack web applications for 50k+ active users.
   - Reduced API latency by 45% using Redis caching and query index optimization.
   - Led a cross-functional team of 4 developers to build internal operational dashboards.
   - Established automated CI/CD pipelines via GitHub Actions.

2. Software Engineer | RetroWeb Technologies
   Period: Jun 2022 - Dec 2023 | Location: Bangalore, India
   Tech Stack: JavaScript, TypeScript, React, Express, MongoDB, AWS, Git
   - Integrated Stripe API payment modules handling $10k+ weekly transactions.
   - Refactored legacy React components to TypeScript, reducing bundle size by 25%.
   - Built serverless microservices on AWS Lambda saving 35% in monthly hosting costs.

3. Freelance Developer | Self-Employed
   Period: Mar 2020 - May 2022 | Location: Remote
   Tech Stack: HTML5, CSS3, JavaScript, React, GSAP, TailwindCSS, Figma
   - Designed and coded bespoke marketing websites for 15+ global clients.
   - Built interactive web tools & dynamic dashboards using GSAP and Framer Motion.

====================================================================`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '"MS Sans Serif", Tahoma, sans-serif', color: '#000' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: 'bold' }}>Career Timeline & History:</div>
        <button 
          className="win-control-btn"
          onClick={handleDownloadResume}
          title="Download Resume"
          style={{ fontSize: '11px', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
        >
          <DownloadIcon size={14} color="#000" />
          <span>Download Resume</span>
        </button>
      </div>

      {/* Main Split Content */}
      <div style={{ display: 'flex', flexGrow: 1, gap: '10px', minHeight: 0, overflow: 'hidden' }}>
        {/* Left Roles List (Win98 Inset Pane) */}
        <div className="win-border-inset" style={{ width: '180px', backgroundColor: '#fff', overflowY: 'auto', padding: '4px', flexShrink: 0 }}>
          {EXPERIENCES.map((exp) => {
            const isSelected = exp.id === selectedExpId;
            return (
              <div
                key={exp.id}
                onClick={() => setSelectedExpId(exp.id)}
                style={{
                  padding: '6px 8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#000080' : 'transparent',
                  color: isSelected ? '#ffffff' : '#000000',
                  fontSize: '11px',
                  borderRadius: '2px',
                  marginBottom: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                  border: isSelected ? '1px dotted #fff' : '1px solid transparent'
                }}
              >
                <strong style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{exp.role}</strong>
                <span style={{ fontSize: '9px', opacity: isSelected ? 0.9 : 0.6 }}>{exp.company}</span>
              </div>
            );
          })}
        </div>

        {/* Right Details Panel (Win98 Inset Pane) */}
        <div className="win-border-inset" style={{ flexGrow: 1, backgroundColor: '#ffffff', overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column' }}>
          {/* Header section */}
          <div style={{ borderBottom: '1px solid #808080', paddingBottom: '8px', marginBottom: '10px' }}>
            <h2 style={{ fontSize: '15px', color: '#0a246a', margin: '0 0 4px 0', fontWeight: 'bold' }}>{selectedExp.role}</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', color: '#333' }}>
              <span>🏛️ {selectedExp.company}</span>
              <span>📅 {selectedExp.period}</span>
            </div>
            <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
              📍 Location: {selectedExp.location}
            </div>
          </div>

          {/* Details Content */}
          <div style={{ flexGrow: 1 }}>
            {/* Tech Stack Badge Row */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', color: '#808080', marginBottom: '4px' }}>Technologies Used:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {selectedExp.tech.split(', ').map((t, idx) => (
                  <span 
                    key={idx} 
                    className="win-border-outset"
                    style={{ 
                      fontSize: '9px', 
                      padding: '1px 5px', 
                      backgroundColor: '#e4e2de', 
                      color: '#000',
                      cursor: 'default'
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Bullet points */}
            <div style={{ fontSize: '11px', lineHeight: '1.5' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#000080' }}>Key Responsibilities & Achievements:</div>
              <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {selectedExp.points.map((pt, idx) => (
                  <li key={idx} style={{ listStyleType: 'square' }}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Close Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <button 
          className="win-control-btn"
          onClick={() => closeWindow('experience')}
          style={{ width: '80px', height: '22px', fontSize: '11px', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
