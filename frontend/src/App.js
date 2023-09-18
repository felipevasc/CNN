import { useState, useMemo, useCallback, useEffect } from 'react';
import 'react-tooltip/dist/react-tooltip.css'
import './App.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-python.min.js'; 
import 'prismjs/themes/prism.css';
import Treinamento from './components/Treinamento';
import Parametros from './context/Parametros';

function App() {
  const [parametrosGerais, setParametrosGerais] = useState();
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const setParametro = useCallback((chave, valor) => {
    setParametrosGerais((p) => ({ ...p, [chave]: valor }));
  }, []);

  const obj = useMemo(
    () => ({ parametros: parametrosGerais, setParametro }),
    [parametrosGerais, setParametro]
  );

  return (
    <div className='App'>
      <Parametros.Provider value={obj}>
        <Treinamento />
      </Parametros.Provider>
    </div>
  );
}

export default App;
