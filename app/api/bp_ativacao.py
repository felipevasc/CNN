from flask import Blueprint, jsonify, request
from funcoes.backPropagation import BackPropagation
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

back_ativacao_blueprint = Blueprint('back_ativacao', __name__)

@back_ativacao_blueprint.route('/back_ativacao', methods=['POST'])
def aplicar():
    gradienteP = request.json.get('gradiente')
    filtradasP = request.json.get('filtradas')
    tipo_ativacao = request.json.get('tipo_ativacao')  
    gradiente = np.array(gradienteP)
    filtradas = np.array(filtradasP)   
    back = BackPropagation()
    retorno = back.retropropagacao_ativacao(gradiente, filtradas, tipo_ativacao)
    return jsonify(retorno.tolist())