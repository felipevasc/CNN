import { Tooltip } from 'react-tooltip';
import api from '../../../../api';
import useParametros from '../../../../context/Parametros/useParametros';
import ArrayImage from '../../../../utils/ArrayImage';
import { codePy, entropiaCruzada } from '../../../Funcoes/funcoes';

const Entropia = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const paramAtivadas = `ativadasFC${numCamada}`;
  const handleProcessar = async () => {
    const paramAtivadas = `ativadasFC${numCamada}`;
    const previsto = parametros?.[paramAtivadas];
    if (parametros?.['label'] !== undefined && previsto) {
      setParametro('erro', '');
      const esperado = Array.from({ length: 10 }).map((_, i) =>
        i == parametros?.['label'] ? 1 : 0
      );
      const res = await api().calcularEntropia(esperado, previsto);
      setParametro('erro', res?.data);
    }
  };
  return (
    <>
      <div className='achatadas'>
        <label>Previsto</label>
        {!!parametros?.[paramAtivadas]?.length && (
          <ArrayImage array={parametros[paramAtivadas]} />
        )}
        <br />
        <label>Esperado</label>
        {parametros?.['label'] !== undefined && (
          <ArrayImage
            array={Array.from({ length: 10 }).map((_, i) =>
              i == parametros?.['label'] ? 1 : 0
            )}
          />
        )}
        <br />
      </div>
      <hr />
      <button
        data-tooltip-id='entropiaCruzada'
        data-tooltip-html={codePy(entropiaCruzada)}
        onClick={handleProcessar}>
        Calcular Erro
      </button>
      <Tooltip id='entropiaCruzada' className='tooltip' />
      <hr />
      <div className='achatadas'>
        <label>Erro:</label>
        <br />
        {parametros?.['erro']}
      </div>
    </>
  );
};

export default Entropia;
