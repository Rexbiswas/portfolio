import React, { useState, useRef } from 'react';
import { useStore } from '../store';

const PRESET_COLORS = [
  { name: 'Classic Teal', value: '#008080' },
  { name: 'Slate Blue', value: '#2d5573' },
  { name: 'Charcoal Grey', value: '#333333' }
];

export const DisplayProperties = () => {
  const { 
    wallpaperType, 
    wallpaperColor, 
    wallpaperImage, 
    wallpaperImageMode, 
    setWallpaperSettings, 
    resetWallpaperSettings,
    closeWindow 
  } = useStore();

  const [selectedType, setSelectedType] = useState(wallpaperType);
  const [selectedColor, setSelectedColor] = useState(wallpaperColor);
  const [selectedImage, setSelectedImage] = useState(wallpaperImage);
  const [selectedImageMode, setSelectedImageMode] = useState(wallpaperImageMode);
  
  const fileInputRef = useRef(null);

  const handleApply = () => {
    setWallpaperSettings({
      wallpaperType: selectedType,
      wallpaperColor: selectedColor,
      wallpaperImage: selectedImage,
      wallpaperImageMode: selectedImageMode
    });
  };

  const handleOk = () => {
    setWallpaperSettings({
      wallpaperType: selectedType,
      wallpaperColor: selectedColor,
      wallpaperImage: selectedImage,
      wallpaperImageMode: selectedImageMode
    });
    closeWindow('displayProperties');
  };

  const handleReset = () => {
    resetWallpaperSettings();
    setSelectedType('image');
    setSelectedColor('#008080');
    setSelectedImage('/wallpaper.jpg');
    setSelectedImageMode('stretch');
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result);
          setSelectedType('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isChanged = 
    selectedType !== wallpaperType ||
    selectedColor !== wallpaperColor ||
    selectedImage !== wallpaperImage ||
    selectedImageMode !== wallpaperImageMode;

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
            <div style={{
              width: '100%',
              height: '100%',
              backgroundColor: selectedType === 'color' ? selectedColor : undefined,
              backgroundImage: selectedType === 'image' ? `url(${selectedImage || '/wallpaper.jpg'})` : undefined,
              backgroundSize: selectedType === 'image' ? (
                selectedImageMode === 'stretch' ? 'cover' : 
                selectedImageMode === 'center' ? 'auto' : 
                undefined
              ) : undefined,
              backgroundRepeat: selectedType === 'image' ? (
                selectedImageMode === 'tile' ? 'repeat' : 'no-repeat'
              ) : undefined,
              backgroundPosition: selectedType === 'image' ? 'center' : undefined,
            }} />
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

        {/* Wallpaper Customization controls */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <fieldset className="win-border-outset" style={{ padding: '8px 12px', border: '1.5px solid #808080' }}>
            <legend style={{ fontSize: '11px', padding: '0 4px', color: '#000', fontWeight: 'bold' }}>Wallpaper Type</legend>
            <div style={{ display: 'flex', gap: '20px', fontSize: '11px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="wallpaperType" 
                  value="color" 
                  checked={selectedType === 'color'} 
                  onChange={() => setSelectedType('color')} 
                  style={{ cursor: 'pointer' }}
                />
                Solid Color
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="wallpaperType" 
                  value="image" 
                  checked={selectedType === 'image'} 
                  onChange={() => setSelectedType('image')} 
                  style={{ cursor: 'pointer' }}
                />
                Wallpaper Image
              </label>
            </div>
          </fieldset>

          {selectedType === 'color' ? (
            <fieldset className="win-border-outset" style={{ padding: '8px 12px', border: '1.5px solid #808080' }}>
              <legend style={{ fontSize: '11px', padding: '0 4px', color: '#000', fontWeight: 'bold' }}>Solid Color Settings</legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '11px' }}>Select a preset desktop color:</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {PRESET_COLORS.map((preset) => (
                      <button 
                        key={preset.value}
                        title={preset.name}
                        onClick={() => setSelectedColor(preset.value)}
                        style={{
                          width: '24px',
                          height: '24px',
                          backgroundColor: preset.value,
                          border: selectedColor === preset.value ? '2.5px solid #000' : '1px solid #808080',
                          outline: selectedColor === preset.value ? '1px solid #fff' : 'none',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', marginTop: '8px', color: '#333' }}>
                    Selected Color: <strong>{PRESET_COLORS.find(c => c.value.toLowerCase() === selectedColor.toLowerCase())?.name || 'Custom'}</strong>
                  </span>
                </div>
              </div>
            </fieldset>
          ) : (
            <fieldset className="win-border-outset" style={{ padding: '8px 12px', border: '1.5px solid #808080' }}>
              <legend style={{ fontSize: '11px', padding: '0 4px', color: '#000', fontWeight: 'bold' }}>Image Settings</legend>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                
                {/* Image Selection Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#000' }}>
                    {selectedImage === '/wallpaper.jpg' || !selectedImage 
                      ? '✓ Default Wallpaper' 
                      : '✓ Custom Image Loaded'}
                  </span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button 
                      className="win-control-btn" 
                      onClick={() => setSelectedImage('/wallpaper.jpg')} 
                      style={{ height: '22px', padding: '0 8px', fontSize: '11px' }}
                    >
                      Default
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      style={{ display: 'none' }}
                    />
                    <button 
                      className="win-control-btn" 
                      onClick={() => fileInputRef.current?.click()} 
                      style={{ height: '22px', padding: '0 8px', fontSize: '11px' }}
                    >
                      Browse...
                    </button>
                  </div>
                </div>

                {/* Display Mode */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                  <span style={{ fontSize: '11px' }}>Display Mode:</span>
                  <div className="win-border-inset" style={{ backgroundColor: '#fff', padding: '1px' }}>
                    <select 
                      value={selectedImageMode} 
                      onChange={(e) => setSelectedImageMode(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '11px',
                        fontFamily: 'inherit',
                        backgroundColor: 'transparent',
                        color: '#000',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="stretch">Stretch (Cover)</option>
                      <option value="center">Center</option>
                      <option value="tile">Tile (Repeat)</option>
                    </select>
                  </div>
                </div>

              </div>
            </fieldset>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        <button 
          className="win-control-btn" 
          onClick={handleReset} 
          style={{ height: '22px', fontSize: '11px', padding: '0 8px' }}
          title="Reset to default wallpaper"
        >
          Reset Default
        </button>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="win-control-btn" onClick={handleOk} style={{ width: '60px', height: '22px' }}>OK</button>
          <button className="win-control-btn" onClick={() => closeWindow('displayProperties')} style={{ width: '60px', height: '22px' }}>Cancel</button>
          <button className="win-control-btn" onClick={handleApply} disabled={!isChanged} style={{ width: '60px', height: '22px', opacity: !isChanged ? 0.6 : 1 }}>Apply</button>
        </div>
      </div>

    </div>
  );
};
