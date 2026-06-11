import React, { useState } from 'react';
import { useStore } from '../store';

const FRONTEND_SKILLS = [
  { name: 'React / Next.js', level: 0.95, desc: 'SPAs, SSR, routing, hooks, state management (Zustand, Redux)' },
  { name: 'JavaScript / TypeScript', level: 0.90, desc: 'Modern ES6+, async programming, strong typing, DOM manipulation' },
  { name: 'HTML5 & CSS3 / Tailwind', level: 0.90, desc: 'Semantic layouts, Flexbox/Grid, responsive design, animations' },
  { name: 'Framer Motion & SVG', level: 0.80, desc: 'Advanced micro-interactions, spring physics, vector layout animations' }
];

const BACKEND_SKILLS = [
  { name: 'Node.js / Express', level: 0.85, desc: 'REST APIs, middleware, authentication (JWT), event loop' },
  { name: 'Python / Django', level: 0.80, desc: 'Scalable backends, ORM, MVC pattern, script automation' },
  { name: 'REST & GraphQL APIs', level: 0.85, desc: 'API architecture, query optimization, endpoint design' },
  { name: 'System Design', level: 0.75, desc: 'Caching (Redis), message queues, database normalization/indexing' }
];

const DEVOPS_SKILLS = [
  { name: 'SQL (PostgreSQL)', level: 0.85, desc: 'Relational database schemas, joins, transactions, optimizations' },
  { name: 'NoSQL (MongoDB)', level: 0.80, desc: 'Document store collections, aggregation pipelines' },
  { name: 'AWS (S3, EC2, Lambda)', level: 0.75, desc: 'Serverless deployment, cloud storage, virtual machine hosting' },
  { name: 'Docker & CI/CD', level: 0.70, desc: 'Containerization, automated GitHub Actions pipelines' },
  { name: 'Git & Collaboration', level: 0.90, desc: 'Branching, PRs, merge conflict resolution, rebase workflows' }
];

const ProgressBar = ({ percent }) => {
  const blocks = Math.round(percent * 10);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div className="win-border-inset" style={{
        display: 'flex',
        gap: '1px',
        backgroundColor: '#fff',
        padding: '1px',
        height: '14px',
        width: '120px'
      }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              backgroundColor: i < blocks ? '#000080' : 'transparent',
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: '11px', minWidth: '30px', textAlign: 'right' }}>{Math.round(percent * 100)}%</span>
    </div>
  );
};

export const Skills = () => {
  const { closeWindow } = useStore();
  const [activeTab, setActiveTab] = useState('Frontend');

  // Interactive Assessment State
  const [checklist, setChecklist] = useState({
    coffee: false,
    commits: false,
    tests: false,
    deadCode: false,
    docs: false,
    darkMode: false,
    refactor: false
  });

  const handleCheckboxChange = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateScore = () => {
    let score = 0;
    if (checklist.coffee) score += 10;
    if (checklist.commits) score += 15;
    if (checklist.tests) score += 20;
    if (checklist.deadCode) score += 15;
    if (checklist.docs) score += 15;
    if (checklist.darkMode) score += 10;
    if (checklist.refactor) score += 15;
    return score;
  };

  const getRating = (score) => {
    if (score === 0) return 'Legacy Maintainer (0%)';
    if (score <= 25) return 'StackOverflow Copier 📋';
    if (score <= 50) return 'Junior Developer 💻';
    if (score <= 75) return 'Full-Stack Builder 🛠️';
    if (score <= 90) return 'Senior Architect 🏗️';
    return 'Antigravity Wizard 🧙‍♂️✨';
  };

  const score = calculateScore();
  const ratingText = getRating(score);

  const TABS = ['Frontend', 'Backend', 'Database & DevOps', 'Rating System'];

  const renderTabContent = () => {
    let skillsList = [];
    if (activeTab === 'Frontend') skillsList = FRONTEND_SKILLS;
    else if (activeTab === 'Backend') skillsList = BACKEND_SKILLS;
    else if (activeTab === 'Database & DevOps') skillsList = DEVOPS_SKILLS;

    if (activeTab === 'Rating System') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%' }}>
          <div style={{ fontSize: '11px', marginBottom: '4px', fontWeight: 'bold' }}>
            Calculate Developer Rating in Real-Time:
          </div>
          <div className="win-border-inset" style={{
            backgroundColor: '#ffffff',
            padding: '8px',
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
              <input type="checkbox" checked={checklist.coffee} onChange={() => handleCheckboxChange('coffee')} />
              <span>Drinks sufficient coffee/tea (+10%)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
              <input type="checkbox" checked={checklist.commits} onChange={() => handleCheckboxChange('commits')} />
              <span>Uses descriptive git commits (+15%)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
              <input type="checkbox" checked={checklist.tests} onChange={() => handleCheckboxChange('tests')} />
              <span>Writes unit/integration tests (+20%)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
              <input type="checkbox" checked={checklist.deadCode} onChange={() => handleCheckboxChange('deadCode')} />
              <span>Proactively deletes dead/unused code (+15%)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
              <input type="checkbox" checked={checklist.docs} onChange={() => handleCheckboxChange('docs')} />
              <span>Reads the official docs before debugging (+15%)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
              <input type="checkbox" checked={checklist.darkMode} onChange={() => handleCheckboxChange('darkMode')} />
              <span>Uses IDE Dark Mode (+10%)</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px' }}>
              <input type="checkbox" checked={checklist.refactor} onChange={() => handleCheckboxChange('refactor')} />
              <span>Refactors code without breaking things (+15%)</span>
            </label>
          </div>
          
          <div className="win-border-outset" style={{ padding: '8px', backgroundColor: '#e4e2de', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold' }}>
              <span>Total Rating Score:</span>
              <span>{score}%</span>
            </div>
            <ProgressBar percent={score / 100} />
            <div style={{ fontSize: '11px', fontWeight: 'bold', marginTop: '2px', color: '#000080' }}>
              Rank: {ratingText}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%', overflowY: 'auto' }}>
        {skillsList.map((skill) => (
          <div key={skill.name} className="win-border-outset" style={{ padding: '6px', backgroundColor: '#e4e2de' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '11px' }}>{skill.name}</span>
              <ProgressBar percent={skill.level} />
            </div>
            <div style={{ fontSize: '10px', color: '#444', fontStyle: 'italic', paddingLeft: '4px' }}>
              {skill.desc}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '"MS Sans Serif", Tahoma, sans-serif', color: '#000' }}>
      
      {/* Dynamic Tab Bar */}
      <div style={{ display: 'flex', borderBottom: '1px solid #808080', marginBottom: '12px', overflowX: 'auto', gap: '2px' }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <div 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={isActive ? 'win-border-outset' : ''}
              style={{
                padding: '4px 8px',
                backgroundColor: isActive ? '#d4d0c8' : '#c0c0c0',
                borderBottom: isActive ? '1px solid #d4d0c8' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                fontSize: '10px',
                cursor: 'pointer',
                marginBottom: isActive ? '-1px' : '0',
                zIndex: isActive ? 2 : 1,
                borderTopLeftRadius: '2px',
                borderTopRightRadius: '2px',
                border: !isActive ? '1px solid transparent' : undefined,
                borderBottomColor: !isActive ? '1px solid #808080' : undefined
              }}
            >
              {tab}
            </div>
          );
        })}
      </div>

      {/* Main Tab Panel Content */}
      <div style={{ flexGrow: 1, minHeight: 0 }}>
        {renderTabContent()}
      </div>

      {/* Close Footer Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
        <button 
          className="win-control-btn" 
          onClick={() => closeWindow('skills')} 
          style={{ width: '80px', height: '22px', fontSize: '11px' }}
        >
          Close
        </button>
      </div>

    </div>
  );
};
