from flask import Blueprint, jsonify, request
from funcoes.backPropagation import BackPropagation
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np

back_pool_blueprint = Blueprint('back_pool', __name__)

@back_pool_blueprint.route('/back_pool', methods=['POST'])
def aplicar():
    gradienteP = request.json.get('gradiente')
    ativadasP = request.json.get('ativadas')
    funcao_poolingP = request.json.get('funcao_pooling')
    tamanho_pooling = int(request.json.get('tamanho_pooling'))
    stride = int(request.json.get('stride'))    
    gradiente = np.array(gradienteP)
    ativadas = np.array(ativadasP)
    funcao_pooling = np.array(funcao_poolingP)    
    back = BackPropagation()
    retorno = back.retropropagacao_pooling(gradiente, ativadas, funcao_pooling, tamanho_pooling, stride)
    return jsonify(retorno.tolist())