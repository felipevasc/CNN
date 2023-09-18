import './styles.css';
import React, { useState, useEffect } from 'react';
import api from '../../../api';
import useParametros from '../../../context/Parametros/useParametros';

const Imagens = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    api()
      .getImagens()
      .then((i) => setImages(i.data));
  }, []);

  const { setParametro } = useParametros();
  return (
    <>
      <div className='imagens'>
        {images.map((objImage, index) => (
          <img
            key={index}
            src={`data:image/png;base64,${objImage.imagem}`}
            alt={`MNIST ${index}`}
            style={{
              position: 'absolute',
              top: `calc(50% + ${(index % 6) * (index % 6 === 0 ? 1 : -1)}px)`,
              left: `calc(50% + ${index * 5}px)`,
              width: '56px',
              height: '56px',
              transform: 'translate(-50%, -50%)',
              zIndex: -index,
              border: '#ddd solid 1px',
            }}
            onClick={() => {
              setParametro('imagem', objImage.imagem)
              setParametro('label', objImage.label)
            } 
          }
          />
        ))}
      </div>
    </>
  );
};

export default Imagens;
