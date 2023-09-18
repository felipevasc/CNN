from flask import Blueprint, jsonify, request
from funcoes.backPropagation import BackPropagation
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

entropia_blueprint = Blueprint('entropia', __name__)

@entropia_blueprint.route('/entropia', methods=['POST'])
def aplicar():
    esperadoP = request.json.get('esperado')
    previstoP = request.json.get('previsto')
    esperado = np.array(esperadoP)
    previsto = np.array(previstoP)
    print(esperado.shape, previsto.shape)
    back = BackPropagation()
    retorno = back.cross_entropy_loss(esperado, previsto)
    return jsonify(retorno.tolist())