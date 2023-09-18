import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage, { transpose } from '../../../../utils/MatrixImage';
import api from '../../../../api';
import { useState } from 'react';
import { codePy, totalmenteConectada } from '../../../Funcoes/funcoes';
import { Tooltip } from 'react-tooltip';

const Pesos = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const paramPesos = `pesosFC${numCamada}`;
  const paramBias = `biasFC${numCamada}`;
  const handleProcessar = async () => {
    const paramFC = `FC${numCamada}`;

    if (parametros?.[paramPesos].length && parametros?.[paramBias]?.length) {
      setParametro(paramFC, []);
      let entrada = [];
      if (Number(numCamada) === 0) {
        entrada = parametros?.['achatadas']
      }
      const res = await api().gerarTotalmenteConectada(entrada, parametros?.[paramPesos], parametros?.[paramBias])
      setParametro(paramFC, res.data);
    }
  };

  return (
    <div>
      <h3>Pesos</h3>
      <div className='filtros'>
        <MatrixImage matrix={transpose([parametros?.[paramBias] ?? []])} />
        <MatrixImage matrix={transpose(parametros?.[paramPesos])} />
      </div>
      <hr />
      <button data-tooltip-id='totalmenteConectada' data-tooltip-html={codePy(totalmenteConectada)} onClick={handleProcessar}>Aplicar Totalmente Conectada</button>
      <Tooltip id='totalmenteConectada' className='tooltip' />
      <hr />
    </div>
  );
};

export default Pesos;
