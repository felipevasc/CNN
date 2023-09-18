import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import api from '../../../../api';
import { useState } from 'react';
import ArrayImage from '../../../../utils/ArrayImage';
import { codePy, pesosHe, pesosLecun, pesosXavier } from '../../../Funcoes/funcoes';
import { Tooltip } from 'react-tooltip';

const Achatada = () => {
  const { parametros, setParametro } = useParametros();
  const [saida, setSaida] = useState(10);
  const [tipo, setTipo] = useState('he');

  const handleProcessar = async () => {
    if (parametros?.['achatadas']?.length) {
      const paramPesos = `pesosFC0`;
      const paramBias = `biasFC0`;
      const entrada = parametros?.['achatadas']?.length;
      setParametro(paramPesos, []);
      const res = await api().gerarPesosFC(entrada, saida, tipo);
      setParametro(paramPesos, res?.data);
      const res2 = await api().gerarBias(saida);
      setParametro(paramBias, res2?.data);
    }
  };
  const disabled = !!parametros?.['blockAtualizacao']

  return (
    <>
      <div className='achatadas'>
        {!!parametros?.['achatadas']?.length && (
          <ArrayImage array={parametros['achatadas']} />
        )}
      </div>
      <hr />
      <div className='parametros'>
        <div>
          <label>Tamanho Entrada</label>
          <input
            type='number'
            value={parametros?.['achatadas']?.length ?? 0}
            disabled={disabled}
            readOnly
          />
        </div>
        <div>
          <label>Tamanho Saída</label>
          <input
            type='number'
            value={saida}
            onChange={(e) => setSaida(e.target.value.replace(/\D/g, ''))}
            disabled={disabled}
          />
        </div>
        <div>
          <label>Tipo de Inicialização dos Pesos</label>
          <label data-tooltip-id='pesosHe' data-tooltip-html={codePy(pesosHe)}>
            <input
              type='radio'
              name='filtroFC'
              checked={tipo === 'he'}
              value={'he'}
              onChange={(e) => setTipo(e?.target?.value)}
              disabled={disabled}
            />{' '}
            He Initialization
          </label>
          <Tooltip id='pesosHe' className='tooltip' />
          <label data-tooltip-id='pesosLecun' data-tooltip-html={codePy(pesosLecun)}>
            <input
              type='radio'
              name='filtroFC'
              checked={tipo === 'lecun'}
              value={'lecun'}
              onChange={(e) => setTipo(e?.target?.value)}
              disabled={disabled}
            />{' '}
            LeCun Initialization
          </label>
          <Tooltip id='pesosLecun' className='tooltip' />
          <label data-tooltip-id='pesosXavier' data-tooltip-html={codePy(pesosXavier)}>
            <input
              type='radio'
              name='filtroFC'
              checked={tipo === 'xavier'}
              value={'xavier'}
              onChange={(e) => setTipo(e?.target?.value)}
              disabled={disabled}
            />{' '}
            Inicialização Glorot/Xavier
          </label>
          <Tooltip id='pesosXavier' className='tooltip' />
        </div>
      </div>
      <button disabled={disabled} onClick={handleProcessar}>Gerar Pesos</button>
      <hr />
    </>
  );
};

export default Achatada;
