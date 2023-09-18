import './styles.css';
import React from 'react';
import useParametros from '../../../../context/Parametros/useParametros';

const ImagemOriginal = () => {
  const { parametros } = useParametros();
  return (
    <div className='imagemOriginal'>
      <label>{parametros?.['label']}</label>
      <div className='image-wrapper'>
        {!!parametros?.imagem && (
          <img
            alt='Imagem original'
            src={`data:image/png;base64,${parametros.imagem}`}
            style={{
              border: '#ddd solid 1px',
            }}
            title={`Label: ${parametros?.previsao}`}
          />
        )}
        {!parametros?.imagem && (
          <img
            alt='Imagem original'
            src={``}
            style={{
              border: '#ddd solid 1px',
            }}
          />
        )}
        <div className='grid-overlay'></div>
      </div>
    </div>
  );
};

export default ImagemOriginal;
