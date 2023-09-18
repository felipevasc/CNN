from flask import Blueprint, jsonify, request
from funcoes.inicializacao import Inicializacao
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

bias_blueprint = Blueprint('bias', __name__)

@bias_blueprint.route('/bias', methods=['POST'])
def aplicar():
    tamanho = int(request.json.get('tamanho'))
    inicializacao = Inicializacao()
    retorno = inicializacao.bias_zero(tamanho)
    return jsonify(retorno.tolist())