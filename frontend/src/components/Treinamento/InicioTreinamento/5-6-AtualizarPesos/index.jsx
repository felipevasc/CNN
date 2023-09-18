import { Tooltip } from 'react-tooltip';
import api from '../../../../api';
import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import { atualizarFiltros, codePy } from '../../../Funcoes/funcoes';

const AtualizarPesos = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const handleProcessar = async () => {
    const filtros = parametros?.[`filtros${numCamada}`];
    const gradiente = parametros?.[`gradientFiltros${numCamada}`];
    setParametro(`filtros${numCamada}-Ajustados`, []);
    const taxa = parametros?.[`taxaAprendizagem`];
    const res = await api().backConv(filtros, gradiente, taxa);
    setParametro(`filtros${numCamada}-Ajustados`, res.data);
  };
  return (
    <>
      <hr />
      <div className='parametros'>
        <div>
          <label>Taxa de Aprendizado</label>
          <input
            type='number'
            value={parametros?.[`taxaAprendizagem`]}
            disabled
          />
        </div>
      </div>
      <button
        data-tooltip-id='atualizarFiltros'
        data-tooltip-html={codePy(atualizarFiltros)}
        onClick={handleProcessar}>
        Atualizar Filtros
      </button>
      <Tooltip id='atualizarFiltros' className='tooltip' />
      <hr />
      <h3>Filtros atualizados</h3>
      <div className='filtros'>
        {!!parametros?.[`filtros${numCamada}-Ajustados`]?.length &&
          parametros[`filtros${numCamada}-Ajustados`].map((v, i) => {
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

export default AtualizarPesos;
