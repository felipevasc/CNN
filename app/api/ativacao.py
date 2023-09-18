from flask import Blueprint, jsonify, request
from funcoes.inicializacao import Inicializacao
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

ativacao_blueprint = Blueprint('ativacao', __name__)

@ativacao_blueprint.route('/ativacao', methods=['POST'])
def aplicar():
    img = request.json.get('imagem')
    ativacao = request.json.get('ativacao')
    imagem = np.array(img)
    forward = ForwardPropagation()
    retorno = []
    if (ativacao == 'relu'):
      retorno = forward.relu(imagem)
    elif (ativacao == 'sigmoid'):
      retorno = forward.sigmoid(imagem)
    elif (ativacao == 'leaky_relu'):
      retorno = forward.leaky_relu(imagem)
    elif (ativacao == 'tanh'):
      retorno = forward.tanh(imagem)
    elif (ativacao == 'softmax'):
      retorno = forward.softmax(imagem)
    else:
      retorno = forward.relu(imagem)
    return jsonify(retorno.tolist())
