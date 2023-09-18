from flask import Blueprint, jsonify, request
from funcoes.inicializacao import Inicializacao
from funcoes.forwardPropagation import ForwardPropagation
import numpy as np
import base64
from PIL import Image
import io
import json

filtros_blueprint = Blueprint('filtros', __name__)

@filtros_blueprint.route('/filtros', methods=['GET'])
def gerar():
    tamanho = int(request.args.get('tamanho'))
    tipo = request.args.get('tipo')
    inicializacao = Inicializacao()
    if (tipo == 'random'):
      retorno = inicializacao.filtro_random((tamanho, tamanho))
    elif (tipo == 'lecun'):
      retorno = inicializacao.filtro_lecun(tamanho)
    else:
      retorno = inicializacao.filtro_he((tamanho, tamanho))
    return jsonify(retorno.tolist())

@filtros_blueprint.route('/filtros', methods=['POST'])
def aplicar():
    img_data = request.json.get('imagem')
    stride = int(request.json.get('stride'))
    filtro_json = request.json.get('filtro')
    if img_data is None:
        return jsonify({'error': 'imagem não fornecida'}), 400
    if isinstance(img_data, list):
       imagem = np.array(img_data)
    else:
      img_data = base64.b64decode(img_data) 
      image = Image.open(io.BytesIO(img_data))
      imagem = np.array(image)
    filtro = np.array(filtro_json)
    forward = ForwardPropagation()
    retorno = forward.aplicar_filtro(imagem, filtro, 0, stride)
    return jsonify(retorno.tolist())