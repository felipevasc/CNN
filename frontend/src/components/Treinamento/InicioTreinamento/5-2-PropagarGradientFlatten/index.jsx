import { Tooltip } from 'react-tooltip';
import api from '../../../../api';
import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import { codePy, desachatar } from '../../../Funcoes/funcoes';

const PropagarGradientFlatten = () => {
  const { parametros, setParametro } = useParametros();
  const paramGradientFlatten = 'gradientFlatten';

  const numCamada = parametros?.['qtdConvolucional']
    ? parametros?.['qtdConvolucional'] - 1
    : 0;
  const handleProcessar = async () => {
    const paramAgrupadas = `agrupadas${numCamada}`;
    const paramGradient = `gradientFC0-Ajustados`;
    const matriz = parametros?.[paramGradient] ?? [];
    const referencia = parametros?.[paramAgrupadas] ?? [];
    setParametro(paramGradientFlatten, []);
    const res = await api().reshape(matriz, referencia);
    setParametro(paramGradientFlatten, res.data);
  };

  return (
    <div>
      <hr />
      <button
        data-tooltip-id='desachatar'
        data-tooltip-html={codePy(desachatar)}
        onClick={handleProcessar}>
        Desachatar gradient
      </button>
      <Tooltip id='desachatar' className='tooltip' />
      <hr />
      <h3>Gradiente Flatten</h3>
      <div className='filtros'>
        {!!parametros?.[paramGradientFlatten]?.length &&
          parametros[paramGradientFlatten].map((v, i) => {
            return (
              <div key={v}>
                <MatrixImage matrix={v} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PropagarGradientFlatten;
