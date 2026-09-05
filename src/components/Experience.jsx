import React, { useState } from 'react';
import { useStore } from '../store';
import { DownloadIcon } from './Icons';

const EXPERIENCES = [
  {
    id: 'freelance-insd',
    role: 'Freelance Web Developer & Designer',
    company: 'Self-Employed | INSD',
    period: 'Feb 2026 – Present',
    location: 'Karol Bagh, Delhi, India',
    tech: 'JavaScript, GSAP, Lenis Scroll, Three.js, React, Vercel',
    livePreview: 'https://insd-project.vercel.app/',
    onsiteLive: 'https://insd.edu.in/',
    points: [
      'Engineered and deployed high-performance web applications using modern JavaScript libraries including GSAP, Lenis Scroll, and Three.js to create immersive, interactive user experiences.',
      'Architected robust front-end interfaces, managing hosting and seamless continuous integration via Vercel.',
      'Collaborated closely with corporate stakeholders to draft Memorandums of Understanding (MoUs), gather technical requirements, and translate brand identities into polished digital solutions.',
      'Optimised website performance and asset loading, achieving faster render times and superior cross-device responsiveness.'
    ]
  },
  {
    id: 'sneakerhead-proj',
    role: 'Web Developer — Sneakerhead',
    company: 'Personal Project',
    period: '2024 – 2025',
    location: 'Remote',
    tech: 'React, REST APIs, Framer Motion, Lenis, GSAP, WebGL, Three.js',
    github: 'https://github.com/Rexbiswas/sneakerhead',
    livePreview: 'https://sneakerhead-khaki.vercel.app/',
    points: [
      'Built a modern e-commerce platform using React, APIs, Framer Motion, Lenis, and GSAP for smooth animations and fluid scrolling.',
      'Applied basic WebGL and Three.js concepts to create interactive 3D elements, enhancing visual engagement and overall user experience.',
      'Implemented responsive catalog browsing, product details, and dynamic cart interaction flows.'
    ]
  },
  {
    id: 'coralcookies-proj',
    role: 'Web Developer — Coralcookies',
    company: 'Personal Project',
    period: '2024 – 2025',
    location: 'Remote',
    tech: 'React, Matter.js, GSAP, Lenis.js, Tailwind CSS',
    github: 'https://github.com/Rexbiswas/coralcookies',
    livePreview: 'https://coralcookies.vercel.app/',
    points: [
      'Engineered a high-performance React webapp integrating Matter.js for 2D rigid-body physics simulation.',
      'Utilized GSAP for complex visual timelines and Lenis for smooth-scroll synchronization to deliver a seamless, interactive user experience.',
      'Architected custom UI components and interactive canvas animations.'
    ]
  },
  {
    id: 'education-ignou',
    role: 'Economics Honours (Graduate)',
    company: 'Indira Gandhi National Open University (IGNOU)',
    period: '2023 – 2025',
    location: 'Delhi, India',
    tech: 'Economics, Data Analysis, Analytical Thinking, Quantitative Research',
    points: [
      'Graduate in Economics (Hons) with a strong foundation in economic principles, data analysis, and research, capable of applying analytical thinking to real-world financial and market challenges.',
      'CBSE Higher Secondary (12th) | 2021-2022: Completed Higher Secondary (12th) under CBSE board with a strong academic foundation.',
      'CBSE Secondary (10th) | 2018-2021: Completed Secondary (10th) under CBSE board, building a solid foundation in core subjects.'
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
          a.download = 'Rishi_Biswas_Resume.pdf';
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
                         RISHI BISWAS
                    Frontend & Web Developer
====================================================================
Phone: +91 - 9625065557
Email: rexbiswas1@gmail.com
Location: Karol Bagh, Delhi, India
LinkedIn: linkedin.com/in/RishiBiswas
Portfolio: portfolio/Rishi Biswas

--------------------------------------------------------------------
ABOUT ME
--------------------------------------------------------------------
I am a frontend developer experienced in building responsive, visually 
engaging, and efficient web interfaces using HTML, CSS, JavaScript, and 
modern frameworks, focused on delivering smooth user experiences and clean, 
optimized designs.

--------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
--------------------------------------------------------------------
Freelance Web Developer & Designer | Self-Employed | INSD
Feb 2026 – Present
Key Project: Responsive Web Architecture & Branding
Live Preview: https://insd-project.vercel.app/
Onsite Live: https://insd.edu.in/

• Engineered and deployed high-performance web applications using modern 
  JavaScript libraries including GSAP, Lenis Scroll, and Three.js to create 
  immersive, interactive user experiences.
• Architected robust front-end interfaces, managing hosting and seamless 
  continuous integration via Vercel.
• Collaborated closely with corporate stakeholders to draft Memorandums of 
  Understanding (MoUs), gather technical requirements, and translate brand 
  identities into polished digital solutions.
• Optimised website performance and asset loading, achieving faster render 
  times and superior cross-device responsiveness.

--------------------------------------------------------------------
PROJECTS
--------------------------------------------------------------------
1. Sneaker Website
   Github: https://github.com/Rexbiswas/sneakerhead
   Live Preview: https://sneakerhead-khaki.vercel.app/
   • Built a modern e-commerce platform using React, APIs, Framer Motion, 
     Lenis, and GSAP for smooth animations and fluid scrolling.
   • Applied basic WebGL and Three.js concepts to create interactive 3D 
     elements, enhancing visual engagement and overall user experience.

2. Cookies Website
   Github: https://github.com/Rexbiswas/coralcookies
   Live Preview: https://coralcookies.vercel.app/
   • Engineered a high-performance React webapp integrating Matter.js 
     for 2D rigid-body physics, utilizing GSAP for complex visual timelines 
     and Lenis for smooth-scroll synchronization.

--------------------------------------------------------------------
TECHNICAL SKILLS
--------------------------------------------------------------------
• Programming Languages: JavaScript, Python, R Programming, Core C++
• Frontend Styling & UI: CSS, Responsive Design, Tailwind CSS, Bootstrap
• JS Libraries & Frameworks: React.js, GSAP, Lenis.js, Locomotive.js
• Backend & Server Technologies: Node.js, PHP
• Development Tools / IDEs: VS Code, Sublime Text, Atom, PyCharm, Cursor AI
• Database Technologies: MySQL, MongoDB

--------------------------------------------------------------------
EDUCATION
--------------------------------------------------------------------
• Indira Gandhi National Open University (IGNOU) | 2023-2025
  Economics Honours (Graduate)
  Graduate in Economics (Hons) with a strong foundation in economic 
  principles, data analysis, and research.

• CBSE | 2021-2022
  Higher Secondary (12th)

• CBSE | 2018-2021
  Secondary (10th)

--------------------------------------------------------------------
PERSONAL INFORMATION
--------------------------------------------------------------------
Date of Birth: 22-11-2003
Nationality: Indian
Marital Status: Bachelor
Hobbies: Cricket and Listening to music
====================================================================`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Rishi_Biswas_Resume.txt';
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
            <div style={{ fontSize: '10px', color: '#666', marginTop: '4px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span>📍 Location: {selectedExp.location}</span>
              {selectedExp.livePreview && (
                <span>
                  🌐 Live: <a href={selectedExp.livePreview} target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff' }}>{selectedExp.livePreview}</a>
                </span>
              )}
              {selectedExp.onsiteLive && (
                <span>
                  🏢 Onsite: <a href={selectedExp.onsiteLive} target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff' }}>{selectedExp.onsiteLive}</a>
                </span>
              )}
              {selectedExp.github && (
                <span>
                  💻 GitHub: <a href={selectedExp.github} target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff' }}>{selectedExp.github}</a>
                </span>
              )}
            </div>
          </div>

          {/* Details Content */}
          <div style={{ flexGrow: 1 }}>
            {/* Tech Stack Badge Row */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', color: '#808080', marginBottom: '4px' }}>Technologies / Skills:</div>
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
              <div style={{ fontWeight: 'bold', marginBottom: '6px', color: '#000080' }}>Key Highlights & Achievements:</div>
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

