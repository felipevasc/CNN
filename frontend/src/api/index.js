import axios from 'axios';

const app = axios.create({
  baseURL: 'http://localhost:5000/',
});

const api = () => {
  return {
    getHiperparametros: () => app.get('/hiperparametros'),
    setHiperparametros: (chave, valor) =>
      app.post(`/hiperparametros?${chave}=${valor}`),
    getImagens: () => app.get(`/images`),
    getFiltro: (tamanho, tipo) =>
      app.get(`/filtros?tamanho=${tamanho}&tipo=${tipo}`),
    aplicarFiltro: (imagem, filtro, stride) =>
      app.post(`/filtros`, { imagem, filtro, stride }),
    aplicarAtivacao: (imagem, ativacao) =>
      app.post(`/ativacao`, { imagem, ativacao }),
    aplicarPooling: (imagem, funcao, tamanho, stride) =>
      app.post(`/pooling`, { imagem, funcao, tamanho, stride }),
    aplicarAchatamento: (imagem) => app.post(`/achatar`, { imagem }),
    gerarPesosFC: (entrada, saida, tipo) =>
      app.post(`/pesosFC`, { entrada, saida, tipo }),
    gerarBias: (tamanho) => app.post(`/bias`, { tamanho }),
    gerarTotalmenteConectada: (entrada, pesos, bias) =>
      app.post(`/FC`, { entrada, pesos, bias }),
    calcularEntropia: (esperado, previsto) =>
      app.post(`/entropia`, { esperado, previsto }),
    backFC: (entrada, previsto, esperado, pesos, bias, taxa) =>
      app.post(`/back_fc`, { entrada, previsto, esperado, pesos, bias, taxa }),
    reshape: (matriz, referencia) =>
      app.post(`/reshape`, { matriz, referencia }),
    retropropagarPool: (
      gradiente,
      ativadas,
      funcao_pooling,
      tamanho_pooling,
      stride
    ) =>
      app.post(`/back_pool`, {
        gradiente,
        ativadas,
        funcao_pooling,
        tamanho_pooling,
        stride,
      }),
    backAtivacao: (gradiente, filtradas, tipo_ativacao) =>
      app.post(`/back_ativacao`, { gradiente, filtradas, tipo_ativacao }),
    backFiltros: (filtros, imagem_entrada, gradiente_ativacao) =>
      app.post(`/back_filtros`, {
        filtros,
        imagem_entrada,
        gradiente_ativacao,
      }),
    backConv: (pesos, gradiente, taxa) =>
      app.post(`/back_conv`, { pesos, gradiente, taxa }),
  };
};

export default api;
