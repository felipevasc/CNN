import './styles.css';
import React from 'react';

// Função para normalizar um array para [0,255]
function normalizeArray(array) {
  let min = Infinity;
  let max = -Infinity;
  if (Array.isArray(array)) {
    array.forEach((value) => {
      if (value < min) min = value;
      if (value > max) max = value;
    });

    return array.map((value) => ((value - min) * 255) / (max - min));
  } else {
    return [];
  }
}

function ArrayImage({ array }) {
  const normalizedMatrix = normalizeArray(array);

  return (
    <div className='array-container'>
      {normalizedMatrix.map((value, colIndex) => (
        <div
          title={array[colIndex]}
          key={`ar-${colIndex}`}
          className='array-cell'
          style={{ backgroundColor: `rgb(${value},${value},${value})` }}></div>
      ))}
    </div>
  );
}

export default ArrayImage;
