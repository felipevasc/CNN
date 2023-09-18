from flask import Blueprint, jsonify, request
from funcoes.backPropagation import BackPropagation
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

back_fc_blueprint = Blueprint('back_fc', __name__)

@back_fc_blueprint.route('/back_fc', methods=['POST'])
def aplicar():
    entradaP = request.json.get('entrada')
    esperadoP = request.json.get('esperado')
    previstoP = request.json.get('previsto')
    pesosP = request.json.get('pesos')
    biasP = request.json.get('bias')
    taxa = float(request.json.get('taxa'))
    esperado = np.array(esperadoP)
    previsto = np.array(previstoP)
    entrada = np.array(entradaP)
    pesos = np.array(pesosP)
    bias = np.array(biasP)
    back = BackPropagation()
    retorno = back.atualizar_pesos_fc(entrada, previsto, esperado, pesos, bias, taxa)
    return jsonify(retorno)