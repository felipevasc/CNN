import { Tooltip } from 'react-tooltip';
import api from '../../../../api';
import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import { codePy, gradienteFiltros } from '../../../Funcoes/funcoes';

const PropagarFiltros = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const handleProcessar = async () => {
    const filtros = parametros?.[`filtros${numCamada}`];
    setParametro(`gradientFiltros${numCamada}`, []);
    const res = await api().backFiltros(
      filtros,
      parametros.imagem,
      parametros?.[`gradientAtivacao-${numCamada}`]
    );
    setParametro(`gradientFiltros${numCamada}`, res.data);
  };
  return (
    <>
      <hr />
      <button
        data-tooltip-id='gradienteFiltros'
        data-tooltip-html={codePy(gradienteFiltros)}
        onClick={handleProcessar}>
        Calcular Gradiente dos Filtros
      </button>
      <Tooltip id='gradienteFiltros' className='tooltip' />
      <hr />
      <h3>Gradiente Filtros</h3>
      <div className='filtros'>
        {!!parametros?.[`gradientFiltros${numCamada}`]?.length &&
          parametros[`gradientFiltros${numCamada}`].map((v, i) => {
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

export default PropagarFiltros;
