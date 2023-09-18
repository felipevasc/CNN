import './styles.css';
import useParametros from '../../../../context/Parametros/useParametros';
import api from '../../../../api';
import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import Prism from 'prismjs';
import {
  heInitialization,
  lecunInitialization,
  randomInitialization,
} from '../../../Funcoes/funcoes';

const Parametros = ({ numCamada }) => {
  const { setParametro, parametros } = useParametros();
  const [tamanho, setTamanho] = useState();
  const [tipo, setTipo] = useState('he');
  const [qtd, setQtd] = useState();
  const codelecunInitialization = Prism.highlight(
    lecunInitialization,
    Prism.languages.python,
    'python'
  );
  const codeHeInitialization = Prism.highlight(
    heInitialization,
    Prism.languages.python,
    'python'
  );
  const codeRandomInitialization = Prism.highlight(
    randomInitialization,
    Prism.languages.python,
    'python'
  );
  const disabled = !!parametros?.['blockAtualizacao']

  const handleProcessar = async () => {
    if (qtd && tamanho) {
      const paramFiltros = `filtros${numCamada}`;
      setParametro(paramFiltros, []);
      const filtros = [];
      for (let i = 0; i < qtd; i++) {
        const res = await api().getFiltro(tamanho, tipo);
        if (res?.data) {
          filtros.push(res?.data);
        }
      }
      setParametro(paramFiltros, filtros);
    }
  };

  return (
    <>
      <hr />
      <div className='parametros'>
        <div>
          <label>Quantidade de filtros</label>
          <input
            type='number'
            value={qtd}
            onChange={(v) => setQtd(v.target.value.replace(/\D/g, ''))}
            disabled={disabled}
          />
        </div>
        <div>
          <label>Tamanho dos filtros</label>
          <input
            type='number'
            value={tamanho}
            onChange={(v) => setTamanho(v.target.value.replace(/\D/g, ''))}
            disabled={disabled}
          />
        </div>
        <div>
          <label>Tipo de Inicialização</label>
          <label
            data-tooltip-id='filtro-lecun'
            data-tooltip-html={`<pre>${codeHeInitialization}</pre>`}>
            <input
              type='radio'
              name='filtro'
              checked={tipo === 'he'}
              value={'he'}
              onChange={(e) => setTipo(e?.target?.value)}
              disabled={disabled}
            />{' '}
            He Initialization
          </label>
          <Tooltip id='filtro-he' className='tooltip' />
          <label
            data-tooltip-id='filtro-random'
            data-tooltip-html={`<pre>${codeRandomInitialization}</pre>`}>
            <input
              type='radio'
              name='filtro'
              checked={tipo === 'random'}
              value={'random'}
              onChange={(e) => setTipo(e?.target?.value)}
              disabled={disabled}
            />{' '}
            Random
          </label>
          <Tooltip id='filtro-random' className='tooltip' />
          <label
            data-tooltip-id='filtro-lecun'
            data-tooltip-html={`<pre>${codelecunInitialization}</pre>`}>
            <input
              type='radio'
              name='filtro'
              checked={tipo === 'lecun'}
              value={'lecun'}
              onChange={(e) => setTipo(e?.target?.value)}
              disabled={disabled}
            />{' '}
            LeCun Initialization
          </label>
          <Tooltip id='filtro-lecun' className='tooltip' />
        </div>
      </div>
      <button disabled={disabled} onClick={handleProcessar}>Inicializar Filtros</button>
      <hr />
    </>
  );
};

export default Parametros;
