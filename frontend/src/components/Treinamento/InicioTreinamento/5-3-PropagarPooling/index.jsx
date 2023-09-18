import { Tooltip } from 'react-tooltip';
import api from '../../../../api';
import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import { codePy, retropropagarPooling } from '../../../Funcoes/funcoes';

const PropagarPooling = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const handleProcessar = async () => {
    let gradient;
    if (numCamada + 1 >= parametros?.['qtdConvolucional']) {
      gradient = parametros?.['gradientFlatten'];
    } else {
      gradient = parametros?.[`gradientConv-${numCamada + 1}`];
    }
    const ativadas = parametros?.[`ativadas${numCamada}`];
    const funcaoPooling = parametros?.[`funcaoPooling${numCamada}`];
    const stride = parametros?.[`stride${numCamada}`];
    const tamanhoPool = parametros?.[`tamanhoPool${numCamada}`];
    setParametro(`gradientPool-${numCamada}`, []);
    const res = await api().retropropagarPool(
      gradient,
      ativadas,
      funcaoPooling,
      tamanhoPool,
      stride
    );
    setParametro(`gradientPool-${numCamada}`, res.data);
  };
  return (
    <>
      <hr />
      <div className='parametros'>
        <div>
          <label>Função de Pooling</label>
          <input disabled value={parametros?.[`funcaoPooling${numCamada}`]} />
        </div>
      </div>
      <button
        data-tooltip-id='retropropagarPooling'
        data-tooltip-html={codePy(retropropagarPooling)}
        onClick={handleProcessar}>
        Retropropagar pooling
      </button>
      <Tooltip id='retropropagarPooling' className='tooltip' />
      <hr />
      <h3>Gradiente Pooling</h3>
      <div className='filtros'>
        {!!parametros?.[`gradientPool-${numCamada}`]?.length &&
          parametros[`gradientPool-${numCamada}`].map((v, i) => {
            return (
              <div key={v}>
                <MatrixImage matrix={v} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PropagarPooling;
