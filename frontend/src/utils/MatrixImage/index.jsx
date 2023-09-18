import './styles.css'
import React from 'react';

// Função para normalizar uma matriz para [0,255]
function normalizeMatrix(matrix) {
  let min = Infinity;
  let max = -Infinity;

  if (Array.isArray(matrix)) {
    matrix?.forEach((row) => {
      if (Array.isArray(row)) {
        row?.forEach((value) => {
          if (value < min) min = value;
          if (value > max) max = value;
        });
      }
    });
  }

  let normalizedMatrix = []
  if (Array.isArray(matrix)) {
    normalizedMatrix = matrix?.map((row) =>
      row?.map((value) => (max - min) ? ((value - min) * 255) / (max - min) : 0) 
    );
  }

  return normalizedMatrix;
}

export const transpose = (matrix) => {
  // Pega o número de linhas e colunas da matriz
  let rows = matrix?.length;
  let cols = matrix?.[0]?.length;

  // Cria uma nova matriz com dimensões invertidas
  let transposed = new Array(cols).fill(null).map(() => new Array(rows).fill(null));

  // Itera sobre a matriz original e preenche a matriz transposta
  for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
          transposed[j][i] = matrix[i][j];
      }
  }

  return transposed;
}

function MatrixImage({ matrix }) {
  const matrixT = transpose(matrix)
  const normalizedMatrix = normalizeMatrix(matrixT);

  return (
    <div className='matrix-container'>
      {normalizedMatrix.map((row, rowIndex) => (
        <div key={rowIndex} className='matrix-row'>
          {row.map((value, colIndex) => (
            <div
              title={matrixT[rowIndex][colIndex]}
              key={colIndex}
              className='matrix-cell'
              style={{ backgroundColor: `rgb(${value},${value},${value})` }}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default MatrixImage;
