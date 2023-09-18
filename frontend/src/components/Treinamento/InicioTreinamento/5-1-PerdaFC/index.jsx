import { useState } from 'react';
import useParametros from '../../../../context/Parametros/useParametros';
import api from '../../../../api';
import MatrixImage, { transpose } from '../../../../utils/MatrixImage';
import { atualizarPesos, codePy } from '../../../Funcoes/funcoes';
import { Tooltip } from 'react-tooltip';

const PerdaFC = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const paramPesosAjustados = `pesosFC${numCamada}-Ajustados`;
  const paramBiasAjustados = `biasFC${numCamada}-Ajustados`;
  const paramGradient = `gradientFC${numCamada}-Ajustados`;

  const handleProcessar = async () => {
    const paramAtivadas = `ativadasFC${numCamada}`;
    const paramPesos = `pesosFC${numCamada}`;
    const paramBias = `biasFC${numCamada}`;
    setParametro(paramPesosAjustados, []);
    setParametro(paramBiasAjustados, []);
    setParametro(paramGradient, []);
    const res = await api().backFC(
      parametros?.['achatadas'],
      parametros?.[paramAtivadas],
      parametros?.['label'],
      parametros?.[paramPesos],
      parametros?.[paramBias],
      parametros?.['taxaAprendizagem']
    );
    setParametro(paramPesosAjustados, res?.data?.pesos);
    setParametro(paramBiasAjustados, res?.data?.bias);
    setParametro(paramGradient, res?.data?.gradiente);
  };

  return (
    <>
      <hr />
      <div className='parametros'>
        <div>
          <label>Taxa de aprendizagem</label>
          <input
            value={parametros?.['taxaAprendizagem']}
            onChange={(e) => setParametro('taxaAprendizagem', e.target.value)}
          />
        </div>
      </div>

      <button
        data-tooltip-id='atualizarPesos'
        data-tooltip-html={codePy(atualizarPesos)}
        onClick={handleProcessar}>
        Atualizar pesos e bias FC
      </button>
      <Tooltip id='atualizarPesos' className='tooltip' />
      <hr />
      <h3>Pesos Atualizados</h3>
      <div className='filtros'>
        <MatrixImage
          matrix={transpose(parametros?.[paramBiasAjustados ?? []])}
        />
        <MatrixImage matrix={transpose(parametros?.[paramPesosAjustados])} />
      </div>
      <h3>Gradiente FC</h3>
      <div>
        <MatrixImage matrix={parametros?.[paramGradient ?? []]} />
      </div>
    </>
  );
};

export default PerdaFC;
