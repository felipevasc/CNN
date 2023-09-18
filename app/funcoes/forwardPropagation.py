import numpy as np

class ForwardPropagation:
  def _aplicar_padding(self, imagem, padding):
    if len(imagem.shape) == 3:
      return np.pad(imagem, ((padding, padding), (padding, padding), (0, 0)), mode='constant')
    else:
      return np.pad(imagem, ((padding, padding), (padding, padding)), mode='constant')

  def _calcular_dimensoes(self, imagem, filtro, stride):
    (altura_filtro, largura_filtro, _, _) = filtro.shape
    (altura_imagem, largura_imagem) = imagem.shape[:2]
    altura_saida = ((altura_imagem - altura_filtro) // stride) + 1
    largura_saida = ((largura_imagem - largura_filtro) // stride) + 1
    return altura_saida, largura_saida

  def aplicar_filtro2(self, imagem, filtro, padding, stride):
    if len(imagem.shape) == 2:  # verifica se a imagem é bidimensional
      imagem = imagem.reshape(imagem.shape[0], imagem.shape[1], 1)
    imagem_tratada = self._aplicar_padding(imagem, padding)
    (altura_filtro, largura_filtro, profundidade_anterior, profundidade_atual) = filtro.shape
    altura_mapa, largura_mapa = self._calcular_dimensoes(imagem_tratada, filtro, stride)
    saida = np.zeros((altura_mapa, largura_mapa, profundidade_atual))
    for d in range(profundidade_atual):
      for alt in range(0, altura_mapa * stride, stride):
        for larg in range(0, largura_mapa * stride, stride):
          regiao = imagem_tratada[alt:alt + altura_filtro, larg:larg + largura_filtro, :]
          saida[alt // stride, larg // stride, d] = np.sum(regiao * filtro[:, :, :, d], axis=(0, 1, 2))
    return saida
  
  def aplicar_filtro(self, image, kernel, padding=0, stride=1):
    if padding > 0:
        image = np.pad(image, ((padding, padding), (padding, padding)), mode='constant')
    kernel = np.flipud(np.fliplr(kernel))
    i_height, i_width = image.shape
    k_height, k_width = kernel.shape
    o_height = (i_height - k_height) // stride + 1
    o_width = (i_width - k_width) // stride + 1
    output = np.zeros((o_height, o_width))
    for y in range(0, o_height):
        for x in range(0, o_width):
            output[y, x] = np.sum(image[y*stride:y*stride+k_height, x*stride:x*stride+k_width] * kernel)
    return output

  def relu(self, array):
    return np.maximum(0, array)

  def sigmoid(self, matrix):
    return 1 / (1 + np.exp(-matrix))
  
  def leaky_relu(self, matrix, alpha=0.1):
    return np.where(matrix > 0, matrix, alpha * matrix)

  def custom_tanh(self, x):
    numerator = np.exp(x) - np.exp(-x)
    denominator = np.exp(x) + np.exp(-x)
    return numerator / denominator

  def tanh(self, matrix):
    vec_tanh = np.vectorize(self.custom_tanh)
    return vec_tanh(matrix)

  def softmax(self, x):
    e_x = np.exp(x - np.max(x)) 
    return e_x / e_x.sum(axis=0)

  def max_pooling(self, matriz, tamanho_janela):
    altura, largura, _ = matriz.shape
    altura_pool = altura // tamanho_janela
    largura_pool = largura // tamanho_janela
    pool_out = np.zeros((altura_pool, largura_pool, matriz.shape[2]))
    for i in range(0, altura_pool):
      for j in range(0, largura_pool):
        pool_out[i, j] = np.max(matriz[i*tamanho_janela:i*tamanho_janela+tamanho_janela, j*tamanho_janela:j*tamanho_janela+tamanho_janela])
    return pool_out
  
  def max_pooling2(self, input_matrix, pool_size=2, stride=2):
    input_height, input_width = input_matrix.shape
    output_height = (input_height - pool_size) // stride + 1
    output_width = (input_width - pool_size) // stride + 1
    output_matrix = np.zeros((output_height, output_width))
    for i in range(0, output_height):
        for j in range(0, output_width):
            start_i = i * stride
            start_j = j * stride
            output_matrix[i][j] = np.max(input_matrix[start_i:start_i + pool_size, start_j:start_j + pool_size])
    return output_matrix
  
  def average_pooling(self, input_matrix, pool_size=2, stride=2):
    input_height, input_width = input_matrix.shape
    output_height = (input_height - pool_size) // stride + 1
    output_width = (input_width - pool_size) // stride + 1
    output_matrix = np.zeros((output_height, output_width))
    for i in range(0, output_height):
        for j in range(0, output_width):
            start_i = i * stride
            start_j = j * stride
            output_matrix[i][j] = np.mean(input_matrix[start_i:start_i + pool_size, start_j:start_j + pool_size])
    return output_matrix

  def achatar(self, matriz):
    return matriz.flatten()

  def totalmente_conectada(self, entrada, pesos, bias):
    return np.matmul(entrada, pesos) + bias

  def propagar_para_frente(self, imagem, hiperparametros, parametros):
    cachesConv = []
    cachesFC = []
    A_atual = imagem
    print("Imagem original", A_atual.shape)
    display_image(A_atual)
    for i in range(hiperparametros.QTD_CAMADAS_CONVOLUCIONAIS):
        W, b = parametros['pesos_conv'][i], parametros['biases_conv'][i]
        stride = hiperparametros.TAMANHO_STRIDE_CONV[i]
        padding = hiperparametros.PADDING[i]
        Z = self.aplicar_filtro(A_atual, W, padding, stride) + b.T
        print("Imagem após filtro:", Z.shape)
        display_image(Z)
        A = self.relu(Z)  # Ativação
        print("Imagem após ReLU:", A.shape)
        display_image(A)
        A = self.max_pooling(A, hiperparametros.POOL_SIZE[i])
        print("Imagem após max pooling:", A.shape)
        display_image(A)
        A_atual = A
        #caches.append({"A": A, "W": W, "b": b, "Z": Z, "tipo": "conv"})
        cachesConv.append((A, W, b, Z))
    A_plano = self.achatar(A)
    for i in range(hiperparametros.QTD_CAMADAS_TOTALMENTE_CONECTADAS):
        W, b = parametros['pesos_fc'][i], parametros['biases_fc'][i]
        print(A_plano.shape, W.shape, b.shape)
        Z = self.totalmente_conectada(A_plano, W, b)
        print("Imagem camada totalmente conectada:", Z)
        display_image(Z)
        if hiperparametros.FUNCAO_ATIVACAO_FC[i] == "relu":
            A_plano = self.relu(Z)
        elif hiperparametros.FUNCAO_ATIVACAO_FC[i] == "softmax":
            A_plano = self.softmax(Z)
        #caches.append({"A": A_plano, "W": W, "b": b, "Z": Z, "tipo": "densa"})
        cachesFC.append((A_plano, W, b, Z))
    return A_plano, cachesConv, cachesFC
