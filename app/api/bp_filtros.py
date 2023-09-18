from flask import Blueprint, jsonify, request
from funcoes.backPropagation import BackPropagation
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np
import base64
from PIL import Image
import io

back_filtros_blueprint = Blueprint('back_filtros', __name__)

@back_filtros_blueprint.route('/back_filtros', methods=['POST'])
def aplicar():
    filtrosP = request.json.get('filtros')
    gradiente_ativacaoP = request.json.get('gradiente_ativacao')
    img_data = request.json.get('imagem_entrada')
    if isinstance(img_data, list):
       imagem_entrada = np.array(img_data)
    else:
      img_data = base64.b64decode(img_data) 
      image = Image.open(io.BytesIO(img_data))
      imagem_entrada = np.array(image)
    filtros = np.array(filtrosP)
    gradiente_ativacao = np.array(gradiente_ativacaoP)
    back = BackPropagation()
    retorno = back.calcular_gradiente_filtros(filtros, imagem_entrada, gradiente_ativacao)
    return jsonify(retorno.tolist())