class Hiperparametros:
  QTD_CAMADAS_CONVOLUCIONAIS = 2
  QTD_CAMADAS_TOTALMENTE_CONECTADAS = 1
  QTD_FILTROS = [3, 3]
  QTD_NEURONIOS_CAMADAS_TOTALMENTE_CONECTADAS = [21, 10]
  TAMANHO_FILTROS = [1, 1] 
  TAMANHO_STRIDE_CONV = [2, 2]
  PADDING = [0, 0]
  FUNCAO_ATIVACAO_CONV = ['relu', 'relu']
  POOL_SIZE = [1, 1] 
  FUNCAO_POOLING = ['max', 'max']
  FUNCAO_ATIVACAO_FC = ['relu', 'softmax']
  TAXA_APRENDIZADO = 0.001
  QTD_EXEMPLOS_ATUALIZAR_PESOS = 32
  QTD_EPOCAS = 20
  OTIMIZADOR = 'adam'
  FUNCAO_PERDA = 'categorical_crossentropy'
  DECAIMENTO_APRENDIZADO = 0.5
  FUNCAO_INIZALIZACAO_PESOS = 'he_normal'