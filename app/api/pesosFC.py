from flask import Blueprint, jsonify, request
from funcoes.inicializacao import Inicializacao
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

pesosFC_blueprint = Blueprint('pesosFC', __name__)

@pesosFC_blueprint.route('/pesosFC', methods=['POST'])
def aplicar():
    entrada = int(request.json.get('entrada'))
    saida = int(request.json.get('saida'))
    tipo = request.json.get('tipo')
    inicializacao = Inicializacao()
    if (tipo == 'he'):
      retorno = inicializacao.pesos_he(entrada, saida)
    elif (tipo == 'xavier'):
      retorno = inicializacao.pesos_xavier(entrada, saida)
    elif (tipo == 'lecun'):
      retorno = inicializacao.pesos_lecun(entrada, saida)
    else:
      retorno = inicializacao.pesos_he(entrada, saida)
    return jsonify(retorno.tolist())