import useParametros from '../../../../context/Parametros/useParametros';
import api from '../../../../api';
import { useState } from 'react';
import ArrayImage from '../../../../utils/ArrayImage';
import { ativacaoSoftmax, codePy } from '../../../Funcoes/funcoes';
import { Tooltip } from 'react-tooltip';

const FC = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const [tipo, setTipo] = useState('softmax');
  const paramFC = `FC${numCamada}`;

  const handleProcessar = async () => {
    if (parametros?.[paramFC]?.length) {
      const paramAtivadas = `ativadasFC${numCamada}`;
      setParametro(paramAtivadas, []);
      const res = await api().aplicarAtivacao(parametros[paramFC], tipo);
      const previsto = res?.data;
      setParametro(paramAtivadas, previsto);
    }
  };

  return (
    <>
      <div className='achatadas'>
        {!!parametros?.[paramFC]?.length && (
          <ArrayImage array={parametros[paramFC]} />
        )}
      </div>
      <hr />
      <div className='parametros'>
        <div>
          <label>Função de Ativação</label>
          <label data-tooltip-id='ativacaoSoftmax' data-tooltip-html={codePy(ativacaoSoftmax)}>
            <input
              type='radio'
              name='ativacaoFC'
              checked={tipo === 'softmax'}
              value={'softmax'}
              onChange={(e) => setTipo(e?.target?.value)}
            />{' '}
            Softmax
          </label>
          <Tooltip id='ativacaoSoftmax' className='tooltip' />
        </div>
      </div>
      <button onClick={handleProcessar}>Aplicar Função de Ativação</button>
      <hr />
    </>
  );
};

export default FC;
