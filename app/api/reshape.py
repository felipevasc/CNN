from flask import Blueprint, jsonify, request
from funcoes.inicializacao import Inicializacao
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

reshape_blueprint = Blueprint('reshape', __name__)

@reshape_blueprint.route('/reshape', methods=['POST'])
def aplicar():
    matrizP = request.json.get('matriz')
    matriz = np.array(matrizP)
    referenciaP = request.json.get('referencia')
    referencia = np.array(referenciaP)
    shape = referencia.shape
    retorno = matriz.reshape(shape)
    return jsonify(retorno.tolist())