from flask import Blueprint, jsonify, request

arquivoHiperparametros = "store/hiperparametros"

hiperparametros_blueprint = Blueprint('hiperparametros', __name__)

@hiperparametros_blueprint.route('/hiperparametros', methods=['GET'])
def hiperparametros():
    dicionario = {}
    with open(arquivoHiperparametros, 'r') as arquivo:
        for linha in arquivo:
            chave, valor = linha.strip().split('=')
            dicionario[chave] = valor
    return jsonify(dicionario)

@hiperparametros_blueprint.route('/hiperparametros', methods=['POST'])
def atualizar_hiperparametros():
    dicionario = {}
    with open('store/hiperparametros', 'r') as arquivo:
        for linha in arquivo:
            k, v = linha.strip().split('=')
            dicionario[k] = v
    for chave, valor in request.args.items():
        dicionario[chave] = valor
    with open('store/hiperparametros', 'w') as arquivo:
        for k, v in dicionario.items():
            arquivo.write(f"{k}={v}\n")
    return "Valores atualizados com sucesso!"