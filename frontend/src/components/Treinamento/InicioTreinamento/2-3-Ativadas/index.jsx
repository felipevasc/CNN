import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import api from '../../../../api';
import { useState } from 'react';
import { averagePool, codePy, maxPool } from '../../../Funcoes/funcoes';
import { Tooltip } from 'react-tooltip';

const Ativadas = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const paramAtivadas = `ativadas${numCamada}`;

  const handleProcessar = async () => {
    if (parametros?.[paramAtivadas]?.length) {
      const paramAgrupadas = `agrupadas${numCamada}`;
      setParametro(paramAgrupadas, []);
      const agrupadas = [];
      for (const ativada of parametros[paramAtivadas]) {
        const res = await api().aplicarPooling(ativada, parametros?.[`funcaoPooling${numCamada}`], parametros?.[`tamanhoPool${numCamada}`], parametros?.[`stride${numCamada}`]);
        if (res?.data) {
          agrupadas.push(res.data);
        }
      }
      setParametro(paramAgrupadas, agrupadas);
    }
  };

  return (
    <>
      <div className='filtros'>
        {!!parametros?.[paramAtivadas]?.length &&
          parametros[paramAtivadas].map((v, i) => {
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
          <label>Tamanho do pool</label>
          <input
            type='number'
            value={parametros?.[`tamanhoPool${numCamada}`]}
            onChange={(v) => setParametro(`tamanhoPool${numCamada}`, v.target.value.replace(/\D/g, ''))}
          />
        </div>
        <div>
          <label>Stride</label>
          <input
            type='number'
            value={parametros?.[`stride${numCamada}`]}
            onChange={(v) =>
              setParametro(
                `stride${numCamada}`,
                v.target.value.replace(/\D/g, '')
              )
            }
          />
        </div>
        <div>
          <label>Função de Pooling</label>
          <label data-tooltip-id='maxPool' data-tooltip-html={codePy(maxPool)}>
            <input
              type='radio'
              name='pool'
              checked={parametros?.[`funcaoPooling${numCamada}`] === 'max'}
              value={'max'}
              onChange={(e) =>
                setParametro(`funcaoPooling${numCamada}`, e?.target?.value)
              }
            />{' '}
            Max Pooling
          </label>
          <Tooltip id='maxPool' className='tooltip' />
          <label data-tooltip-id='averagePool' data-tooltip-html={codePy(averagePool)}>
            <input
              type='radio'
              name='pool'
              checked={parametros?.[`funcaoPooling${numCamada}`] === 'average'}
              value={'average'}
              onChange={(e) =>
                setParametro(`funcaoPooling${numCamada}`, e?.target?.value)
              }
            />{' '}
            Average Pooling
          </label>
          <Tooltip id='averagePool' className='tooltip' />
        </div>
      </div>
      <button onClick={handleProcessar}>Processar Pooling</button>
      <hr />
    </>
  );
};

export default Ativadas;
