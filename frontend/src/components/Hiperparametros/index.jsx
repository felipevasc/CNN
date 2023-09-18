import './styles.css';
import useParametros from '../../context/Parametros/useParametros';
import MatrixImage from '../../utils/MatrixImage';

const Hiperparametros = () => {
  const { parametros, setParametros } = useParametros();

  return (
    <div className='hiperparametros'>
      <div className='cnn'>
        {!!parametros?.imagem && (
          <img
            alt='Imagem original'
            src={`data:image/png;base64,${parametros.imagem}`}
            className='img1'
            title={`Label: ${parametros?.previsao}`}
          />
        )}
        <div className='linhaImg1'>

        <svg>
          <line
            x1='28'
            y1='30'
            x2='100'
            y2='8'
            stroke='red'
            stroke-width='2'
          />
        </svg>
        </div>
        <div className='conv'>
          {parametros?.filtradas0?.map((v, i) => {
            return (
              <div className='imgConv' style={{ top: `${20 - (i * 2)}px`, zIndex: `${100 - i}` }} key={v}>
                <MatrixImage matrix={v} />
              </div>
            );
          })}
        </div>
      </div>
      A
    </div>
  );
};

export default Hiperparametros;
