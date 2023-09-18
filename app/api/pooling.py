from flask import Blueprint, jsonify, request
from funcoes.inicializacao import Inicializacao
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

pooling_blueprint = Blueprint('pooling', __name__)

@pooling_blueprint.route('/pooling', methods=['POST'])
def aplicar():
    img = request.json.get('imagem')
    funcao = request.json.get('funcao')
    tamanho = int(request.json.get('tamanho'))
    stride = int(request.json.get('stride'))
    imagem = np.array(img)
    forward = ForwardPropagation()
    retorno = []
    if (funcao == 'max'):
      retorno = forward.max_pooling2(imagem, tamanho, stride)
    elif (funcao == 'average'):
      retorno = forward.average_pooling(imagem, tamanho, stride)
    else:
      retorno = forward.max_pooling(imagem, 2)
    return jsonify(retorno.tolist())