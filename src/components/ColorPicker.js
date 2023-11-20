import React from 'react'
import { useState, setState } from 'react';
import { ChromePicker } from 'react-color';




export default function ColorPicker(){
    const[displayColorPicker, setdisplayColorPicker] = useState(false);
    const handleClick = () => {
        setdisplayColorPicker( !displayColorPicker )
    };
    
    const [opacityBg, setOpacityBg] = useState("1");
    const [colorPreview, setColorPreview] = useState("#333333");
    const [background, setBackground] = useState({
        h: 250,
        s: 0,
        l: 0.2,
        a: 1
      });
    const handleChangeComplete = data => {
        if (data.hsl !== background) {
        setColorPreview(data.hex);
        setBackground(data.hsl);
        setOpacityBg(data.hsl.a);
        }
        
    };

  const previewStyle = {
    background: colorPreview,
    opacity: opacityBg,
  };

  
    const popover = {
        position: 'absolute',
        zIndex: '2',
        top: '-45%',
        left : '82%'
        };
    const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    };
    return (
        
      <div>
        <button onClick={ handleClick } style={previewStyle}></button>
        {displayColorPicker ? <div style={ popover }>
          <div style={ cover }/>
          <ChromePicker color={background} onChange={handleChangeComplete}/>
        </div> : null }
      </div>
    )
  }


