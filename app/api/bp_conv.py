from flask import Blueprint, jsonify, request
from funcoes.backPropagation import BackPropagation
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

back_conv_blueprint = Blueprint('back_conv', __name__)

@back_conv_blueprint.route('/back_conv', methods=['POST'])
def aplicar():
    pesosP = request.json.get('pesos')
    gradienteP = request.json.get('gradiente')
    taxa = float(request.json.get('taxa'))
    gradiente = np.array(gradienteP)
    pesos = np.array(pesosP)
    back = BackPropagation()
    retorno = back.atualizar_pesos_conv(pesos, gradiente, taxa)
    return jsonify(retorno.tolist())