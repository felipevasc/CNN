import Prism from 'prismjs';

export const codePy = (codigo) =>
  `<pre>${Prism.highlight(codigo, Prism.languages.python, 'python')}</pre>`;

export const lecunInitialization = `
def inicializar_lecun(tamanho_filtro):
    desvio_padrao = np.sqrt(2. / tamanho_filtro)
    return np.random.normal(0, desvio_padrao, (tamanho_filtro, tamanho_filtro))  
`;

export const heInitialization = `
def inicializar_he(tamanho_filtro):
  desvio_padrao = np.sqrt(2. / np.prod(tamanho_filtro))
  return np.random.normal(0, desvio_padrao, tamanho_filtro)
`;

export const randomInitialization = `
def inicializar_random(tamanho_filtro):
  escala=0.01
  return np.random.randn(tamanho_filtro, tamanho_filtro) * escala
`;

export const aplicarFiltro = `
def aplicar_filtro(imagem, filtro, stride, padding=0):
  if padding > 0:
    imagem = np.pad(imagem, ((padding, padding), (padding, padding)), mode='constant')
  altura_imagem, largura_imagem = imagem.shape
  altura_filtro, largura_filtro = filtro.shape
  altura_saida = (altura_imagem - altura_filtro) // stride + 1
  largura_saida = (largura_imagem - largura_filtro) // stride + 1
  saida = np.zeros((altura_saida, largura_saida))
  for y in range(0, altura_saida):
    for x in range(0, largura_saida):
      inicio_altura_imagem = y * stride
      fim_altura_imagem = y * stride + altura_filtro
      inicio_largura_imagem = x * stride
      fim_largura_imagem = x * stride + largura_filtro
      recorte_imagem = imagem[inicio_altura_imagem:fim_altura_imagem, inicio_largura_imagem:fim_largura_imagem]
      saida[y, x] = np.sum(recorte_imagem * filtro)
  return saida
`;

export const ativacaoRelu = `
def relu(matrix):
  return np.maximum(0, matrix)
`;

export const ativacaoSigmoid = `
def sigmoid(matrix):
  return 1 / (1 + np.exp(-matrix))
`;

export const ativacaoLeakyRelu = `
def leaky_relu(matrix, alpha=0.1):
  return np.where(matrix > 0, matrix, alpha * matrix)
`;

export const ativacaoTanh = `
def custom_tanh(x):
  numerator = np.exp(x) - np.exp(-x)
  denominator = np.exp(x) + np.exp(-x)
  return numerator / denominator

def tanh(matrix):
  vec_tanh = np.vectorize(custom_tanh)
  return vec_tanh(matrix)
`;

export const ativacaoSoftmax = `
def softmax(entrada):
  exponencial = np.exp(entrada - np.max(entrada))
  return exponencial / exponencial.sum(axis=0)
`;

export const maxPool = `
def max_pool(entrada, tamanho_pool, stride):
  altura_entrada, largura_entrada = entrada.shape
  altura_saida = (altura_entrada - tamanho_pool) // stride + 1
  largura_saida = (largura_entrada - tamanho_pool) // stride + 1
  saida = np.zeros((altura_saida, largura_saida))
  for i in range(0, altura_saida):
      for j in range(0, largura_saida):
          inicio_i = i * stride
          fim_i = inicio_i + tamanho_pool
          inicio_j = j * stride
          fim_j = inicio_j + tamanho_pool
          recorte = entrada[inicio_i:fim_i, inicio_j:fim_j]
          saida[i][j] = np.max(recorte)
  return saida
`;

export const averagePool = `
def average_pool(entrada, tamanho_pool, stride):
  altura_entrada, largura_entrada = entrada.shape
  altura_saida = (altura_entrada - tamanho_pool) // stride + 1
  largura_saida = (largura_entrada - tamanho_pool) // stride + 1
  saida = np.zeros((altura_saida, largura_saida))
  for i in range(0, altura_saida):
    for j in range(0, largura_saida):
      inicio_i = i * stride
      fim_i = inicio_i + tamanho_pool
      inicio_j = j * stride
      fim_j = inicio_j + tamanho_pool
      recorte = entrada[inicio_i:fim_i, inicio_j:fim_j]
      saida[i][j] = np.mean(recorte)
  return saida
`;

export const achatar = `
def achatar(matriz):
  return matriz.flatten()
`;

export const pesosHe = `
def pesos_he(tamanho_entrada, tamanho_saida):
  stddev = np.sqrt(2.0 / tamanho_entrada)
  return np.random.randn(tamanho_entrada, tamanho_saida) * stddev
`

export const pesosXavier = `
def pesos_xavier(tamanho_entrada, tamanho_saida):
  limit = np.sqrt(6 / (tamanho_entrada + tamanho_saida))
  return np.random.uniform(-limit, limit, (tamanho_entrada, tamanho_saida))
`

export const pesosLecun = `
def pesos_lecun(tamanho_entrada, tamanho_saida):
  stddev = np.sqrt(1. / tamanho_entrada)
  return np.random.randn(tamanho_entrada, tamanho_saida) * stddev 
`

export const totalmenteConectada = `
def totalmente_conectada(entrada, pesos, bias):
  return np.matmul(entrada, pesos) + bias
`

export const entropiaCruzada = `
def perda_entropia_cruzada(esperado, previsto):
  epsilon = 1e-15
  previsto = np.clip(previsto, epsilon, 1. - epsilon)
  loss_per_sample = -np.sum(esperado * np.log(previsto))
  loss = np.mean(loss_per_sample)
  return loss
`

export const atualizarPesos = `
def atualizar_pesos_fc(entrada_fc, valores_previstos, valores_esperados, pesos, bias, lr=0.01):
  if entrada_fc.ndim == 1:
      entrada_fc = entrada_fc.reshape(1, -1)
  N = entrada_fc.shape[0]
  dlogits = valores_previstos - valores_esperados
  dlogits /= N 
  if dlogits.ndim == 1:
      dlogits = dlogits.reshape(1, -1)
  dW = np.dot(entrada_fc.T, dlogits)
  db = np.sum(dlogits, axis=0, keepdims=True)
  W_updated = pesos - lr * dW
  b_updated = bias - lr * db
  gradient = np.dot(dlogits, pesos.T)
  return { 
      'pesos': W_updated.tolist(), 
      'bias': b_updated.tolist(),
      'gradiente': gradient.tolist()
  }
`

export const desachatar = `
def desachatar(matriz_entrada, matriz_referencia):
  shape = matriz_referencia.shape
  return matriz_entrada.reshape(shape)
`

export const retropropagarPooling = `
def retropropagacao_pooling(gradiente_apos_pooling, saida_ativacao, funcao_pooling, tamanho_janela, stride):
  gradiente_antes_pooling = np.zeros_like(saida_ativacao)
  altura_saida, largura_saida, canais_saida = gradiente_apos_pooling.shape

  for h in range(altura_saida):
    for w in range(largura_saida):
      for c in range(canais_saida):
        inicio_altura = h * stride
        fim_altura = min(inicio_altura + tamanho_janela, saida_ativacao.shape[0])
        inicio_largura = w * stride
        fim_largura = min(inicio_largura + tamanho_janela, saida_ativacao.shape[1])
        altura_slice = max(fim_altura - inicio_altura, 0)
        largura_slice = max(fim_largura - inicio_largura, 0)
        matriz_1 = np.ones((altura_slice, largura_slice))
        if funcao_pooling == "max":
          recorte = saida_ativacao[inicio_altura:fim_altura, inicio_largura:fim_largura, c]
          valor_maximo = np.max(recorte)
          mascara = (recorte == valor_maximo)

          recorte_gradiente = gradiente_antes_pooling[inicio_altura:fim_altura, inicio_largura:fim_largura, c]
          gradiente_retropropagado = mascara * gradiente_apos_pooling[h, w, c]
          recorte_gradiente += gradiente_retropropagado
        elif funcao_pooling == "average":
          gradiente_medio = gradiente_apos_pooling[h, w, c] / (tamanho_janela * tamanho_janela)
          distribuicao_uniforme_gradiente = matriz_1 * gradiente_medio
          recorte_gradiente = gradiente_antes_pooling[inicio_altura:fim_altura, inicio_largura:fim_largura, c]
          recorte_gradiente += distribuicao_uniforme_gradiente
  return gradiente_antes_pooling
`

export const retropropagarAtivacao = `
def retropropagacao_ativacao(gradiente_antes_pooling, saida_convolucao, tipo_ativacao="relu"):
  if tipo_ativacao == "relu":
      mascara_relu = (saida_convolucao > 0)
      saida = gradiente_antes_pooling * mascara_relu
  elif tipo_ativacao == "leaky_relu":
      alpha = 0.01 
      mascara_leaky_relu = np.where(saida_convolucao > 0, 1, alpha)
      saida = gradiente_antes_pooling * mascara_leaky_relu
  elif tipo_ativacao == "sigmoid":
      sigmoid = 1 / (1 + np.exp(-saida_convolucao))
      saida = gradiente_antes_pooling * sigmoid * (1 - sigmoid)
  elif tipo_ativacao == "tanh":
      tanh = np.tanh(saida_convolucao)
      saida = gradiente_antes_pooling * (1 - np.square(tanh))
  return saida
`

export const gradienteFiltros = `
def calcular_gradiente_filtros(filtros, imagem_entrada, gradiente_ativacao):
  saida = np.zeros_like(filtros)
  for f in range(filtros.shape[0]):
    for h in range(gradiente_ativacao.shape[1]):
      for w in range(gradiente_ativacao.shape[2]):
        recorte = imagem_entrada[h:h+filtros.shape[1], w:w+filtros.shape[2]]
        saida[f] += recorte * gradiente_ativacao[f, h, w]
  return saida
`

export const atualizarFiltros = `
def atualizar_filtros(pesos, gradiente_pesos, taxa_aprendizado):
  return pesos - taxa_aprendizado * gradiente_pesos
`