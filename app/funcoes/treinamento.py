from keras.datasets import mnist
def atualizar_parametros(self, dW, db, parametros, taxa_aprendizado):
    parametros -= taxa_aprendizado * dW
    db -= taxa_aprendizado * db
    return parametros, db

def treinar_mnist(hiperparametros, parametros):
    (X_train, y_train), _ = mnist.load_data()

    X_train = X_train.astype('float32') / 255.0
    X_train = X_train.reshape(X_train.shape[0], X_train.shape[1], X_train.shape[2], 1)
    forward = ForwardPropagation()
    backward = BackPropagation() 
    for epoca in range(hiperparametros.QTD_EPOCAS):
        print(f"Época {epoca + 1}/{hiperparametros.QTD_EPOCAS}")
        for i in range(hiperparametros.QTD_EXEMPLOS_ATUALIZAR_PESOS):
            imagem = X_train[i]
            saida_predita, cachesConv, cachesFC = forward.propagar_para_frente(imagem, hiperparametros, parametros)
            erro = backward.calcular_entropia_cruzada(imagem.reshape(imagem.shape[0] * imagem.shape[1], 1), saida_predita)
            dA = saida_predita - imagem.reshape(784, 1)  
            for cache in reversed(cachesFC):
              A_prev, W, b, Z = cache
              dA, W, b = backward.atualizar_camada_densa(dA, cache, hiperparametros.TAXA_APRENDIZADO)

            for cache in reversed(cachesConv):
                # Retropropagação do maxpooling
                dA = backward.backward_maxpool(dA, cache)
                # Retropropagação da convolução
                dA, dW, db = backward.backward_convolution(dA, cache, parametros["pesos_conv"], parametros["biases_conv"], hiperparametros)
                parametros["pesos_conv"], parametros["biases_conv"] = W, b

              
            if i % 10 == 0:  # Mostrando progresso a cada 10 imagens
                print(f"Treinando imagem {i + 1}/{hiperparametros.QTD_EXEMPLOS_ATUALIZAR_PESOS}", "Erro:", erro)
                
    print("Treinamento concluído!")
