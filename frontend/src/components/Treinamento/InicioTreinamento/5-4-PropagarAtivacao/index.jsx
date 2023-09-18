import { Tooltip } from 'react-tooltip';
import api from '../../../../api';
import useParametros from '../../../../context/Parametros/useParametros';
import MatrixImage from '../../../../utils/MatrixImage';
import { codePy, retropropagarAtivacao } from '../../../Funcoes/funcoes';

const PropagarAtivacao = ({ numCamada }) => {
  const { parametros, setParametro } = useParametros();
  const handleProcessar = async () => {
    const gradient = parametros?.[`gradientPool-${numCamada}`];
    const filtradas = parametros?.[`filtradas${numCamada}`];
    const tipo_ativacao = parametros?.[`funcaoAtivacao${numCamada}`];
    setParametro(`gradientAtivacao-${numCamada}`, []);
    const res = await api().backAtivacao(gradient, filtradas, tipo_ativacao);
    setParametro(`gradientAtivacao-${numCamada}`, res.data);
  };
  return (
    <>
      <hr />
      <button
        data-tooltip-id='retropropagarAtivacao'
        data-tooltip-html={codePy(retropropagarAtivacao)}
        onClick={handleProcessar}>
        Retropropagar Ativação
      </button>
      <Tooltip id='retropropagarAtivacao' className='tooltip' />
      <hr />
      <h3>Gradiente Ativação</h3>
      <div className='filtros'>
        {!!parametros?.[`gradientAtivacao-${numCamada}`]?.length &&
          parametros[`gradientAtivacao-${numCamada}`].map((v, i) => {
            return (
              <div key={v}>
                <MatrixImage matrix={v} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PropagarAtivacao;
