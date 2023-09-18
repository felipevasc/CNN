import { useContext } from "react"
import Parametros from "."

const useParametros = () => {
  const context = useContext(Parametros);
  if (context === undefined) {
    throw new Error(
      'Tentativa de acesso fora do contexto de Parametros',
    );
  }

  return context;
}

export default useParametros