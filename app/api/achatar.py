from flask import Blueprint, jsonify, request
from funcoes.inicializacao import Inicializacao
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

achatar_blueprint = Blueprint('achatar', __name__)

@achatar_blueprint.route('/achatar', methods=['POST'])
def aplicar():
    img = request.json.get('imagem')
    imagem = np.array(img)
    forward = ForwardPropagation()
    retorno = forward.achatar(imagem)
    return jsonify(retorno.tolist())