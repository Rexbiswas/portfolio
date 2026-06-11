import React, { useState } from 'react';
import { useStore } from '../store';

const THEMES = {
  win98: {
    name: 'Windows 98 (Classic Teal)',
    base: '#008080',
    polygons: []
  },
  classic: {
    name: 'Windows Classic (Teal)',
    base: '#2d5573',
    polygons: ['#223f58', '#365e82', '#4d7c9f', '#182e42', '#284863', '#3b668a']
  },
  clover: {
    name: 'Clover Fields (Green)',
    base: '#18522b',
    polygons: ['#10381d', '#206937', '#2e8247', '#0c2615', '#164523', '#255e34']
  },
  orchid: {
    name: 'Deep Orchid (Purple)',
    base: '#4f1a52',
    polygons: ['#361138', '#632167', '#7b2b80', '#260c27', '#421644', '#552258']
  },
  charcoal: {
    name: 'Charcoal Slate (Grey)',
    base: '#333333',
    polygons: ['#222222', '#444444', '#555555', '#151515', '#2a2a2a', '#3e3e3e']
  },
  hotdog: {
    name: 'Hot Dog Stand (Meme)',
    base: '#d41a1a',
    polygons: ['#000000', '#ffcc00', '#ff0000', '#ffffff', '#ffaa00', '#770000']
  }
};

export const DisplayProperties = () => {
  const { wallpaperTheme, setWallpaperTheme, closeWindow } = useStore();
  const [selectedTheme, setSelectedTheme] = useState(wallpaperTheme);

  const handleApply = () => {
    setWallpaperTheme(selectedTheme);
  };

  const handleOk = () => {
    setWallpaperTheme(selectedTheme);
    closeWindow('displayProperties');
  };

  const themeData = THEMES[selectedTheme] || THEMES.classic;

  return (
    <div style={{ padding: '10px', display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '"MS Sans Serif", Tahoma, sans-serif', color: '#000' }}>
      
      {/* Tab bar header (Display Settings) */}
      <div style={{ display: 'flex', borderBottom: '1px solid #808080', marginBottom: '12px' }}>
        <div className="win-border-outset" style={{ padding: '4px 10px', backgroundColor: '#d4d0c8', borderBottom: 'none', fontWeight: 'bold', fontSize: '11px' }}>
          Background
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', flexGrow: 1 }}>
        {/* Simulated CRT Monitor Preview */}
        <div className="win-border-outset" style={{
          width: '180px',
          height: '140px',
          backgroundColor: '#d4d0c8',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px'
        }}>
          {/* Monitor bezel screen container */}
          <div className="win-border-inset" style={{
            width: '100%',
            height: '100px',
            backgroundColor: '#000',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {selectedTheme === 'win98' ? (
              <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#008080',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <svg width="60" height="45" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(200, 120) scale(1.8)">
                    <g transform="translate(3, 3)" opacity="0.15">
                      <path d="M -35,-32 C -18,-34 -7,-24 0,-21 L 0,-2 C -8,-4 -18,-12 -35,-10 Z" fill="#000" />
                      <path d="M 4,-20 C 12,-18 24,-24 35,-26 L 35,-6 C 24,-4 12,2 4,-1 Z" fill="#000" />
                      <path d="M -35,-6 C -18,-8 -8,0 0,-1 L 0,18 C -7,16 -18,10 -35,12 Z" fill="#000" />
                      <path d="M 4,2 C 12,3 24,-3 35,-5 L 35,15 C 24,17 12,23 4,20 Z" fill="#000" />
                    </g>
                    <g stroke="#000000" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
                      <path d="M -42,-25 L -85,-18" />
                      <path d="M -45,-12 L -70,-8" />
                      <path d="M -40,-2 L -95,3" />
                      <path d="M -42,8 L -65,12" />
                      <path d="M -40,16 L -80,24" />
                    </g>
                    <rect x="-80" y="-30" width="4" height="4" fill="#ff3333" opacity="0.8" />
                    <rect x="-90" y="-10" width="3" height="3" fill="#33cc33" opacity="0.8" />
                    <rect x="-70" y="5" width="4" height="4" fill="#0066ff" opacity="0.8" />
                    <rect x="-85" y="18" width="3" height="3" fill="#ffcc00" opacity="0.8" />
                    <rect x="-55" y="-32" width="2" height="2" fill="#000" opacity="0.5" />
                    <rect x="-105" y="0" width="3" height="3" fill="#ff3333" opacity="0.6" />
                    <path d="M -35,-32 C -18,-34 -7,-24 0,-21 L 0,-2 C -8,-4 -18,-12 -35,-10 Z" fill="#ff3333" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M 4,-20 C 12,-18 24,-24 35,-26 L 35,-6 C 24,-4 12,2 4,-1 Z" fill="#33cc33" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M -35,-6 C -18,-8 -8,0 0,-1 L 0,18 C -7,16 -18,10 -35,12 Z" fill="#0066ff" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M 4,2 C 12,3 24,-3 35,-5 L 35,15 C 24,17 12,23 4,20 Z" fill="#ffcc00" stroke="#000000" strokeWidth="2" strokeLinejoin="round" />
                  </g>
                  <text x="200" y="240" textAnchor="middle" fill="#ffffff" fontFamily='"MS Sans Serif", Tahoma, sans-serif' fontSize="30" fontWeight="bold" letterSpacing="1.5" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
                    Windows 98
                  </text>
                </svg>
              </div>
            ) : (
              <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="1000" height="600" fill={themeData.base} />
                {themeData.polygons && themeData.polygons.length > 0 && (
                  <>
                    <polygon points="0,0 420,0 280,240 0,180" fill={themeData.polygons[0]} opacity="0.85" />
                    <polygon points="420,0 1000,0 720,200 280,240" fill={themeData.polygons[1]} opacity="0.9" />
                    <polygon points="1000,0 1000,320 720,200" fill={themeData.polygons[2]} opacity="0.85" />
                    <polygon points="0,180 280,240 180,600 0,600" fill={themeData.polygons[3]} opacity="0.9" />
                    <polygon points="280,240 720,200 640,600 180,600" fill={themeData.polygons[4]} opacity="0.95" />
                    <polygon points="720,200 1000,320 1000,600 640,600" fill={themeData.polygons[5]} opacity="0.9" />
                  </>
                )}
              </svg>
            )}
          </div>
          {/* Monitor stand base */}
          <div style={{
            width: '40px',
            height: '10px',
            backgroundColor: '#808080',
            borderLeft: '2px solid #fff',
            borderRight: '2px solid #404040'
          }} />
          <div className="win-border-outset" style={{
            width: '70px',
            height: '6px',
            backgroundColor: '#d4d0c8'
          }} />
        </div>

        {/* Theme Selection Section */}
        <div style={{ width: '100%' }}>
          <fieldset className="win-border-outset" style={{ padding: '10px', border: '1.5px solid #808080' }}>
            <legend style={{ fontSize: '11px', padding: '0 4px', color: '#000' }}>Wallpaper Scheme</legend>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '11px' }}>Select a color scheme for the polygon desktop background:</span>
              <div className="win-border-inset" style={{ backgroundColor: '#fff', padding: '2px' }}>
                <select 
                  value={selectedTheme} 
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  style={{
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: '11px',
                    fontFamily: 'inherit',
                    backgroundColor: 'transparent',
                    color: '#000',
                    cursor: 'pointer'
                  }}
                  size={5}
                >
                  {Object.entries(THEMES).map(([key, value]) => (
                    <option key={key} value={key} style={{ padding: '2px 4px' }}>
                      {value.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>
        </div>
      </div>

      {/* Footer Buttons */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '16px' }}>
        <button className="win-control-btn" onClick={handleOk} style={{ width: '60px', height: '22px' }}>OK</button>
        <button className="win-control-btn" onClick={() => closeWindow('displayProperties')} style={{ width: '60px', height: '22px' }}>Cancel</button>
        <button className="win-control-btn" onClick={handleApply} disabled={selectedTheme === wallpaperTheme} style={{ width: '60px', height: '22px', opacity: selectedTheme === wallpaperTheme ? 0.6 : 1 }}>Apply</button>
      </div>

    </div>
  );
};
