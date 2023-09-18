import useParametros from "../../../../context/Parametros/useParametros";
import { transpose } from "../../../../utils/MatrixImage";

const PropagarPesos = () => {
  const { parametros, setParametro } = useParametros();
  const handleProcessar = async () => {
    const qtd = parametros?.['qtdConvolucional'];
    Array.from({ length: qtd }).forEach((_, i) => setParametro(`filtros${i}`, parametros?.[`filtros${i}-Ajustados`]))

    setParametro(`pesosFC0`, parametros?.[`pesosFC0-Ajustados`])
    setParametro(`biasFC0`, parametros?.[`biasFC0-Ajustados`][0])
    setParametro(`blockAtualizacao`, true)
    document.getElementById('inicioFiltros').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  };
  return (
    <>
      <hr />
      <button onClick={handleProcessar}>Propagar Pesos</button>
      <hr />
    </>
  );
};

export default PropagarPesos;
