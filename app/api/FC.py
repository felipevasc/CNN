from flask import Blueprint, jsonify, request
from funcoes.inicializacao import Inicializacao
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

FC_blueprint = Blueprint('FC', __name__)

@FC_blueprint.route('/FC', methods=['POST'])
def aplicar():
    entrada = request.json.get('entrada')
    pesos = request.json.get('pesos')
    bias = request.json.get('bias')
    forward = ForwardPropagation()
    retorno = forward.totalmente_conectada(entrada, pesos, bias)
    return jsonify(retorno.tolist())