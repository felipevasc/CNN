import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import api from '../../../../api';
import { ativacaoLeakyRelu, ativacaoRelu, ativacaoSigmoid, ativacaoTanh, codePy } from '../../../Funcoes/funcoes';
import { Tooltip } from 'react-tooltip';

const Filtradas = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const paramFiltradas = `filtradas${numCamada}`;

  const handleProcessar = async () => {
    if (parametros?.[paramFiltradas]?.length) {
      const paramAtivadas = `ativadas${numCamada}`;
      setParametro(paramAtivadas, []);
      const ativadas = [];
      for (const filtrada of parametros[paramFiltradas]) {
        const res = await api().aplicarAtivacao(filtrada, parametros?.[`funcaoAtivacao${numCamada}`]);
        if (res?.data) {
          ativadas.push(res.data);
        }
      }
      setParametro(paramAtivadas, ativadas);
    }
  };

  return (
    <>
      <h3>Pós processamento filtros</h3>
      <div className='filtros'>
        {!!parametros?.[paramFiltradas]?.length &&
          parametros[paramFiltradas].map((v, i) => {
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
          <label>Função de Ativação</label>
          <label data-tooltip-id='ativacaoRelu' data-tooltip-html={codePy(ativacaoRelu)}>
            <input
              type='radio'
              name={`ativacao${numCamada}`}
              checked={parametros?.[`funcaoAtivacao${numCamada}`] === 'relu'}
              value={'relu'}
              onChange={(e) => setParametro(`funcaoAtivacao${numCamada}`, e?.target?.value)}
            />{' '}
            Relu
          </label>
          <Tooltip id='ativacaoRelu' className='tooltip' />
          <label data-tooltip-id='ativacaoLeakyRelu' data-tooltip-html={codePy(ativacaoLeakyRelu)}>
            <input
              type='radio'
              name={`ativacao${numCamada}`}
              checked={parametros?.[`funcaoAtivacao${numCamada}`] === 'leaky_relu'}
              value={'leaky_relu'}
              onChange={(e) => setParametro(`funcaoAtivacao${numCamada}`, e?.target?.value)}
            />{' '}
            Leaky ReLU
          </label>
          <Tooltip id='ativacaoLeakyRelu' className='tooltip' />
          <label data-tooltip-id='ativacaoSigmoid' data-tooltip-html={codePy(ativacaoSigmoid)}>
            <input
              type='radio'
              name={`ativacao${numCamada}`}
              checked={parametros?.[`funcaoAtivacao${numCamada}`] === 'sigmoid'}
              value={'sigmoid'}
              onChange={(e) => setParametro(`funcaoAtivacao${numCamada}`, e?.target?.value)}
            />{' '}
            Sigmoid
          </label>
          <Tooltip id='ativacaoSigmoid' className='tooltip' />
          <label data-tooltip-id='ativacaoTanh' data-tooltip-html={codePy(ativacaoTanh)}>
            <input
              type='radio'
              name={`ativacao${numCamada}`}
              checked={parametros?.[`funcaoAtivacao${numCamada}`] === 'tanh'}
              value={'tanh'}
              onChange={(e) => setParametro(`funcaoAtivacao${numCamada}`, e?.target?.value)}
            />{' '}
            Tangente Hiperbolica
          </label>
          <Tooltip id='ativacaoTanh' className='tooltip' />
        </div>
      </div>
      <button onClick={handleProcessar}>Processar Ativação</button>
      <hr />
    </>
  );
};

export default Filtradas;
