import numpy as np

class BackPropagation:
  def cross_entropy_loss(self, y_true, y_pred):
    epsilon = 1e-15
    y_pred = np.clip(y_pred, epsilon, 1. - epsilon)
    loss_per_sample = -np.sum(y_true * np.log(y_pred))
    loss = np.mean(loss_per_sample)
    return loss
  
  def calcular_entropia_cruzada(self, Y_verdadeiro, Y_previsto):
    m = Y_verdadeiro.shape[1]
    epsilon = 1e-15  

    custo = -1/m * np.sum(np.multiply(Y_verdadeiro, np.log(Y_previsto + epsilon)))

    custo = np.squeeze(custo)
    return custo

  def derivadaRelu(self, Z):
    dZ = np.array(Z, copy=True)
    dZ[Z <= 0] = 0
    dZ[Z > 0] = 1
    return dZ
  
  def atualizar_camada_densa(self, dA, cache, taxa_aprendizado):
    A_prev, W, b, Z = cache
    m = A_prev.shape[1]
    dZ = np.multiply(dA, self.derivadaRelu(Z))
    dW = 1/m * np.dot(dZ, A_prev.T)
    db = 1/m * np.sum(dZ, axis=1, keepdims=True)
    W = W - taxa_aprendizado * dW
    b = b - taxa_aprendizado * db
    dA_prev = np.dot(W.T, dZ)
    return dA_prev, W, b
  
  def atualizar_pesos_fc(self, entrada_fc, valores_previstos, valores_esperados, pesos, bias, lr=0.01):
    if entrada_fc.ndim == 1:
        entrada_fc = entrada_fc.reshape(1, -1)
    N = entrada_fc.shape[0]
    dlogits = valores_previstos - valores_esperados
    dlogits /= N  
    if dlogits.ndim == 1:
        dlogits = dlogits.reshape(1, -1)
    print(entrada_fc.shape, dlogits.shape)
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

  def backward_maxpool(self, dA, cache):
    (A_prev, W, b, Z) = cache
    stride = 2  
    f = 2  
    m, n_H, n_W, n_C = dA.shape
    m, n_H_prev, n_W_prev, n_C_prev = A_prev.shape
    dA_prev = np.zeros_like(A_prev)
    for i in range(m):
      for h in range(n_H):
        for w in range(n_W):
          for c in range(n_C):
            start_h = h * stride
            start_w = w * stride
            end_h = start_h + f
            end_w = start_w + f
            a_prev_slice = A_prev[i, start_h:end_h, start_w:end_w, c]
            mask = a_prev_slice == np.max(a_prev_slice)
            dA_prev[i, start_h:end_h, start_w:end_w, c] += mask * dA[i, h, w, c]
    return dA_prev

  def backward_convolution(self, dA, cache, W, b, hparameters):
    (A_prev, W, b, Z) = cache
    (m, n_H_prev, n_W_prev, n_C_prev) = A_prev.shape
    (f, f, n_C_prev, n_C) = W.shape
    (m, n_H, n_W, n_C) = dA.shape
    stride = hparameters["stride"]
    pad = hparameters["pad"]
    dA_prev = np.zeros((m, n_H_prev, n_W_prev, n_C_prev))
    dW = np.zeros((f, f, n_C_prev, n_C))
    db = np.zeros((1, 1, 1, n_C))
    A_prev_pad = np.pad(A_prev, ((0,0), (pad,pad), (pad,pad), (0,0)), mode='constant', constant_values=(0,0))
    dA_prev_pad = np.pad(dA_prev, ((0,0), (pad,pad), (pad,pad), (0,0)), mode='constant', constant_values=(0,0))
    for i in range(m):
        a_prev_pad = A_prev_pad[i]
        da_prev_pad = dA_prev_pad[i]
        for c in range(n_C):
            for h in range(n_H):
                for w in range(n_W):
                    vert_start = h * stride
                    vert_end = vert_start + f
                    horiz_start = w * stride
                    horiz_end = horiz_start + f
                    a_slice = a_prev_pad[vert_start:vert_end, horiz_start:horiz_end, :]
                    da_prev_pad[vert_start:vert_end, horiz_start:horiz_end, :] += W[:,:,:,c] * dA[i, h, w, c]
                    dW[:,:,:,c] += a_slice * dA[i, h, w, c]
                    db[:,:,:,c] += dA[i, h, w, c]
            dA_prev[i, :, :, :] = da_prev_pad[pad:-pad, pad:-pad, :]
    return dA_prev, dW, db
  
  
  def retropropagacao_pooling(self, gradiente_apos_pooling, saida_ativacao, funcao_pooling, tamanho_janela, stride):
    gradiente_antes_pooling = np.zeros_like(saida_ativacao)
    altura_saida, largura_saida, canais_saida = gradiente_apos_pooling.shape

    for h in range(altura_saida):
        for w in range(largura_saida):
            for c in range(canais_saida):
                inicio_h = h * stride
                fim_h = min(inicio_h + tamanho_janela, saida_ativacao.shape[0])
                inicio_w = w * stride
                fim_w = min(inicio_w + tamanho_janela, saida_ativacao.shape[1])

                altura_slice = max(fim_h - inicio_h, 0)
                largura_slice = max(fim_w - inicio_w, 0)
                ones_matrix = np.ones((altura_slice, largura_slice))

                if funcao_pooling == "max":
                    mascara = (saida_ativacao[inicio_h:fim_h, inicio_w:fim_w, c] == np.max(saida_ativacao[inicio_h:fim_h, inicio_w:fim_w, c]))
                    gradiente_antes_pooling[inicio_h:fim_h, inicio_w:fim_w, c] += mascara * gradiente_apos_pooling[h, w, c]

                elif funcao_pooling == "average":
                    media = gradiente_apos_pooling[h, w, c] / (tamanho_janela * tamanho_janela)
                    ones_multiplied = ones_matrix * media
                    gradiente_antes_pooling[inicio_h:fim_h, inicio_w:fim_w, c] += ones_multiplied                      
    return gradiente_antes_pooling

  def retropropagacao_convolutiva(self, gradiente_pos_pooling, cache):
    entrada, pesos, bias, saida_convolucao, saida_ativacao, saida_pooling, informacoes_pooling = cache
    
    quantidade_exemplos, altura_prev, largura_prev, canais_prev = entrada.shape
    tamanho_filtro, tamanho_filtro, canais_prev, canais = pesos.shape
    
    gradiente_entrada = np.zeros(entrada.shape)
    gradiente_pesos = np.zeros(pesos.shape)
    gradiente_bias = np.zeros(bias.shape)

    for i in range(quantidade_exemplos):
        entrada_individual = entrada[i]
        
        for h in range(altura_prev):
            for w in range(largura_prev):
                for c in range(canais):
                    
                    inicio_vertical = h
                    fim_vertical = inicio_vertical + tamanho_filtro
                    inicio_horizontal = w
                    fim_horizontal = inicio_horizontal + tamanho_filtro
                    if tipo_pooling == "max":
                        entrada_slice = entrada_individual[inicio_vertical:fim_vertical, inicio_horizontal:fim_horizontal, c]
                        mascara_maximo = (entrada_slice == np.max(entrada_slice))
                        gradiente_entrada[i, inicio_vertical:fim_vertical, inicio_horizontal:fim_horizontal, c] += mascara_maximo * gradiente_pos_pooling[i, h, w, c]
                    elif tipo_pooling == "media":
                        gradiente_media = gradiente_pos_pooling[i, h, w, c] / (tamanho_filtro * tamanho_filtro)
                        gradiente_entrada[i, inicio_vertical:fim_vertical, inicio_horizontal:fim_horizontal, c] += np.ones((tamanho_filtro, tamanho_filtro)) * gradiente_media
                    gradiente_convolucao = ...
                    
                    entrada_slice = entrada_individual[inicio_vertical:fim_vertical, inicio_horizontal:fim_horizontal, :]
                    gradiente_pesos[:,:,:,c] += entrada_slice * gradiente_convolucao
                    gradiente_bias[:,:,:,c] += gradiente_convolucao
                    
    return gradiente_entrada, gradiente_pesos, gradiente_bias

  def retropropagacao_ativacao(self, gradiente_antes_pooling, saida_convolucao, tipo_ativacao="relu"):
    if tipo_ativacao == "relu":
        mascara_relu = (saida_convolucao > 0)
        gradiente_antes_ativacao = gradiente_antes_pooling * mascara_relu
    elif tipo_ativacao == "leaky_relu":
        alpha = 0.01  # Valor padrão, pode ser ajustado
        mascara_leaky_relu = np.where(saida_convolucao > 0, 1, alpha)
        gradiente_antes_ativacao = gradiente_antes_pooling * mascara_leaky_relu
    elif tipo_ativacao == "sigmoid":
        sigmoid = 1 / (1 + np.exp(-saida_convolucao))
        gradiente_antes_ativacao = gradiente_antes_pooling * sigmoid * (1 - sigmoid)
    elif tipo_ativacao == "tanh":
        tanh = np.tanh(saida_convolucao)
        gradiente_antes_ativacao = gradiente_antes_pooling * (1 - np.square(tanh))
    return gradiente_antes_ativacao

  def calcular_gradiente_filtros(self, filtros, imagem_entrada, gradiente_ativacao):
    gradiente_pesos = np.zeros_like(filtros)
    print('imagem shape:', imagem_entrada.shape)
    for f in range(filtros.shape[0]):
        for h in range(gradiente_ativacao.shape[1]):
            for w in range(gradiente_ativacao.shape[2]):
                gradiente_pesos[f] += imagem_entrada[h:h+filtros.shape[1], w:w+filtros.shape[2]] * gradiente_ativacao[f, h, w]
    return gradiente_pesos


  def atualizar_pesos_conv(self, pesos, gradiente_pesos, taxa_aprendizado):
    pesos_atualizados = pesos - taxa_aprendizado * gradiente_pesos
    return pesos_atualizados
