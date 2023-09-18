import api from '../../../../api';
import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import { useState } from 'react';
import { achatar, codePy } from '../../../Funcoes/funcoes';
import { Tooltip } from 'react-tooltip';

const Agrupadas = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const [resposta, setResposta] = useState('nao');
  const paramAgrupadas = `agrupadas${numCamada}`

  const handleProcessar = async () => {
    if (resposta === 'sim') {
      setParametro('qtdConvolucional', Number(numCamada) + 2);
    } else {
      setParametro('qtdConvolucional', Number(numCamada) + 1);
      if (parametros[paramAgrupadas]?.length) {
        const paramAchatadas = `achatadas`
        setParametro(paramAchatadas, []);
        const res = await api().aplicarAchatamento(parametros[paramAgrupadas]);
        console.log('RES', res.data)
        setParametro(paramAchatadas, res.data);
      }
    }
  };
  const disabled = !!parametros?.['blockAtualizacao']

  return (
    <>
      <div className='filtros'>
        {!!parametros?.[paramAgrupadas]?.length &&
          parametros[paramAgrupadas].map((v, i) => {
            return (
              <div key={v}>
                <MatrixImage matrix={v} />
              </div>
            );
          })}
      </div>
      <hr />
      <div className='parametros'>
        <div>
          <label>Nova camada convolucional</label>
          <label>
            <input
              type='radio'
              name='ab'
              checked={resposta === 'sim'}
              value={'sim'}
              onChange={(e) => setResposta(e?.target?.value)}
              disabled={disabled}
            />{' '}
            Sim
          </label>
          <label data-tooltip-id='achatar' data-tooltip-html={codePy(achatar)}>
            <input
              type='radio'
              name='ab'
              checked={resposta === 'nao'}
              value={'nao'}
              onChange={(e) => setResposta(e?.target?.value)}
              disabled={disabled}
            />{' '}
            Não
          </label>
          <Tooltip id='achatar' className='tooltip' />
        </div>
      </div>
      <button onClick={handleProcessar}>
        {resposta === 'nao' ? 'Achatar' : 'Gerar nova camada'}
      </button>
      <hr />
    </>
  );
};

export default Agrupadas;
