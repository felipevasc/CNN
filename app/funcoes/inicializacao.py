import numpy as np

class Inicializacao:
  def filtro_he(self, shape):
    stddev = np.sqrt(2. / np.prod(shape))
    return np.random.normal(0, stddev, shape)
  
  def filtro_random(self, filter_shape, scale=0.01):
    return np.random.randn(*filter_shape) * scale
  
  def filtro_lecun(self, tamanho_filtro):
    desvio_padrao = np.sqrt(2. / tamanho_filtro)
    return np.random.normal(0, desvio_padrao, (tamanho_filtro, tamanho_filtro)) 

  def calcular_saida_camadas_convolucionais(self, altura_imagem, largura_imagem, hiperparametros):
    for i in range(hiperparametros.QTD_CAMADAS_CONVOLUCIONAIS):
      altura_imagem_retorno = (altura_imagem - hiperparametros.TAMANHO_FILTROS[i] + 2 * hiperparametros.PADDING[i]) // hiperparametros.TAMANHO_STRIDE_CONV[i] + 1
      largura_imagem_retorno = (largura_imagem - hiperparametros.TAMANHO_FILTROS[i] + 2 * hiperparametros.PADDING[i]) // hiperparametros.TAMANHO_STRIDE_CONV[i] + 1
      altura_imagem_retorno //= hiperparametros.POOL_SIZE[i]
      largura_imagem_retorno //= hiperparametros.POOL_SIZE[i]
    return altura_imagem_retorno * largura_imagem_retorno * hiperparametros.QTD_FILTROS[-1]

  def inicializar_pesos_biases_conv(self, hiperparametros):
    pesos_conv = []
    biases_conv = []
    profundidade_anterior = 1
    for i in range(hiperparametros.QTD_CAMADAS_CONVOLUCIONAIS):
      altura_filtro, largura_filtro = hiperparametros.TAMANHO_FILTROS[i], hiperparametros.TAMANHO_FILTROS[i]
      profundidade_atual = hiperparametros.QTD_FILTROS[i]
      shape = (altura_filtro, largura_filtro, profundidade_anterior, profundidade_atual)
      pesos = self.filtro_he(shape)
      bias = np.zeros((profundidade_atual, 1))
      pesos_conv.append(pesos)
      biases_conv.append(bias)
      profundidade_anterior = profundidade_atual
    return pesos_conv, biases_conv

  def inicializar_pesos_biases_fc(self, altura_imagem, largura_imagem, hiperparametros):
    pesos_fc = []
    biases_fc = []
    
    entrada_anterior = self.calcular_saida_camadas_convolucionais(altura_imagem, largura_imagem, hiperparametros)
    
    qtd_neuronios = entrada_anterior
    print('qtd', qtd_neuronios)
    pesos = self.filtro_he((qtd_neuronios, entrada_anterior))
    bias = np.zeros((qtd_neuronios, 1))
    pesos_fc.append(pesos)
    biases_fc.append(bias)
    entrada_anterior = qtd_neuronios
    qtd_neuronios = 10
    pesos = self.filtro_he((qtd_neuronios, entrada_anterior))
    bias = np.zeros((qtd_neuronios, 1))
    pesos_fc.append(pesos)
    biases_fc.append(bias)
    
    return pesos_fc, biases_fc

  def pesos_he(self, input_size, output_size):
    stddev = np.sqrt(2.0 / input_size)
    return np.random.randn(input_size, output_size) * stddev
  
  def pesos_xavier(self, input_size, output_size):
    limit = np.sqrt(6 / (input_size + output_size))
    return np.random.uniform(-limit, limit, (input_size, output_size))
  
  def pesos_lecun(self, input_size, output_size):
    stddev = np.sqrt(1. / input_size)
    return np.random.randn(input_size, output_size) * stddev  
  
  def bias_zero(self, output_size):
    return np.zeros((output_size,))

  def inicializar_redes(self, altura_imagem, largura_imagem, hiperparametros):
    pesos_conv, biases_conv = self.inicializar_pesos_biases_conv(hiperparametros)
    pesos_fc, biases_fc = self.inicializar_pesos_biases_fc(altura_imagem, largura_imagem, hiperparametros)
    return {
        "pesos_conv": pesos_conv,
        "biases_conv": biases_conv,
        "pesos_fc": pesos_fc,
        "biases_fc": biases_fc
    }