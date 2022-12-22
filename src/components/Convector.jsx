import React, {useState} from "react";
import hexToRgb from './hexToRgb';

export default function Convector() {
  const [colors, setColors] = useState({
    hex: '',
    rgb: '',
    error: false
  });
  
  const getColor = ({target}) => {
    const colorHex = target.value;

    if (colorHex.length < 8 && colorHex.match(/#[a-f0-9]{6}\b/gi)) {
      const colorRgbObj = hexToRgb(colorHex);
      const colorRgb = `rgb(${colorRgbObj.r}, ${colorRgbObj.g}, ${colorRgbObj.b})`
      setColors(prev => ({...prev, hex: colorHex, rgb: colorRgb}));
    } else {
      setColors(prev => ({...prev, rgb: '', error: false}));
    }
    
    if (colorHex.length >= 7 && !colorHex.match(/#[a-f0-9]{6}\b/gi)) {
      setColors(prev => ({...prev, rgb: '', error: true}));
    }
  }

  const buttonText = () => {
    if (colors.rgb && !colors.error) {
      return colors.rgb;
    }

    if (colors.error && !colors.rgb) {
      return 'ошибка';
    }
  }

  return (
    <div className="background_color" style={{backgroundColor: colors.hex}}>
      <input className="" type="text" onChange={getColor}></input>
      <div className="color-rgb">{buttonText()}</div>
    </div>
  )
}