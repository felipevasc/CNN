import React from 'react';
import useParametros from '../../../context/Parametros/useParametros';
import ImagemOriginal from './1-ImagemOriginal';
import Filtros from './2-1-Filtros';
import Filtradas from './2-2-Filtradas/Filtradas';
import Ativadas from './2-3-Ativadas';
import Agrupadas from './2-4-Agrupadas';
import './styles.css';
import Parametros from './2-0-Parametros/Parametros';
import Achatada from './3-Achatada';
import Pesos from './4-1-Pesos';
import FC from './4-2-FC';
import PerdaFC from './5-1-PerdaFC';
import PropagarGradientFlatten from './5-2-PropagarGradientFlatten';
import PropagarPooling from './5-3-PropagarPooling';
import PropagarAtivacao from './5-4-PropagarAtivacao';
import AtualizarPesos from './5-6-AtualizarPesos';
import PropagarFiltros from './5-5-PropagarFiltros';
import PropagarPesos from './6-PropagarPesos';
import Entropia from './4-3-Entropia';

const InicioTreinamento = () => {
  const { parametros } = useParametros();

  const qtdConvolucional = parametros?.qtdConvolucional ?? 1;
  const qtdFC = parametros?.qtdFC ?? 1;
  const iteracoes = parametros?.iteracoes ?? 1
  return (
    <div className='inicioTreinamento' >
      <ImagemOriginal />
      {Array.from({ length: qtdConvolucional }).map((_, i) => (
        <React.Fragment key={`cont-${i}`}>
          <Parametros numCamada={i} />
          <Filtros numCamada={i} />
          <Filtradas numCamada={i} />
          <Ativadas numCamada={i} />
          <Agrupadas numCamada={i} />
        </React.Fragment>
      ))}
      <Achatada />
      {Array.from({ length: qtdFC }).map((_, i) => (
        <React.Fragment key={`fc-${i}`}>
          <Pesos numCamada={i} />
          <FC numCamada={i} />
          <Entropia numCamada={i} />
        </React.Fragment>
      ))}
      {Array.from({ length: qtdFC }).map((_, i) => i).sort((a, b) => a > b ? -1 : 1).map((i) => (
        <React.Fragment key={`bp-${i}`}>
          <PerdaFC numCamada={i} />
        </React.Fragment>
      ))}
      <PropagarGradientFlatten />
      {Array.from({ length: qtdConvolucional }).map((_, i) => i).sort((a, b) => a > b ? -1 : 1).map((i) => (
        <React.Fragment key={`bp-conv-${i}`}>
          <PropagarPooling numCamada={i} />
          <PropagarAtivacao numCamada={i} />
          <PropagarFiltros numCamada={i} />
          <AtualizarPesos numCamada={i} />
        </React.Fragment>
      ))}
      <PropagarPesos />
    </div>
  );
};

export default InicioTreinamento;
