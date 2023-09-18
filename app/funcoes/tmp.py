hiperparametros = Hiperparametros()
inicializacao = Inicializacao()
parametros = inicializacao.inicializar_redes(28, 28, hiperparametros)
treinar_mnist(hiperparametros, parametros)