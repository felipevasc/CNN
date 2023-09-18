import './styles.css';
import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import api from '../../../../api';
import { useState } from 'react';
import Prism from 'prismjs';
import { aplicarFiltro } from '../../../Funcoes/funcoes';
import { Tooltip } from 'react-tooltip';

const Filtros = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const [tamanho, setTamanho] = useState();
  const paramFiltros = `filtros${numCamada}`;
  const codeAplicarFiltro = Prism.highlight(
    aplicarFiltro,
    Prism.languages.python,
    'python'
  );

  const handleProcessar = async () => {
    const paramFiltradas = `filtradas${numCamada}`;

    if (Number(numCamada) === 0) {
      if (parametros?.[paramFiltros].length && parametros.imagem) {
        setParametro(paramFiltradas, []);
        const filtradas = [];
        for (const filtro of parametros[paramFiltros]) {
          const res = await api().aplicarFiltro(
            parametros.imagem,
            filtro,
            tamanho
          );
          if (res?.data) {
            filtradas.push(res.data);
          }
        }
        setParametro(paramFiltradas, filtradas);
      }
    } else if (parametros?.[paramFiltros].length) {
      const paramAgrupadas = `agrupadas${numCamada - 1}`;
      console.log(paramAgrupadas, parametros[paramAgrupadas]?.length);
      if (parametros[paramAgrupadas]?.length) {
        setParametro(paramFiltradas, []);
        const filtradas = [];
        for (const agrupada of parametros[paramAgrupadas]) {
          for (const filtro of parametros[paramFiltros]) {
            const res = await api().aplicarFiltro(agrupada, filtro, tamanho);
            if (res?.data) {
              filtradas.push(res.data);
            }
          }
        }
        setParametro(paramFiltradas, filtradas);
      }
    }
  };

  return (
    <div id="inicioFiltros">
      <h3>Filtros</h3>
      <div className='filtros'>
        {!!parametros?.[paramFiltros]?.length &&
          parametros[paramFiltros].map((v, i) => {
            console.log('Filtro:', v);

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
          <label>Stride</label>
          <input
            type='number'
            value={tamanho}
            onChange={(v) => setTamanho(v.target.value.replace(/\D/g, ''))}
          />
        </div>
      </div>
      <button data-tooltip-id='aplicarFiltro' data-tooltip-html={`<pre>${codeAplicarFiltro}</pre>`} onClick={handleProcessar}>Processar Filtros</button>
      <Tooltip id='aplicarFiltro' className='tooltip' />
      <hr />
    </div>
  );
};

export default Filtros;
