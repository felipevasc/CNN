from flask import Blueprint, jsonify
import tensorflow as tf
import base64
from PIL import Image
from io import BytesIO

mnist_blueprint = Blueprint('mnist', __name__)

@mnist_blueprint.route('/images')
def images():
    (x_train, y_train), (_, _) = tf.keras.datasets.mnist.load_data()
    
    base64_images = []
    for i in range(100):
        image = Image.fromarray(x_train[i])
        buffered = BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
        retornoImagem = {}
        retornoImagem['label'] = int(y_train[i])
        retornoImagem['imagem'] = img_str
        base64_images.append(retornoImagem)
    return jsonify(base64_images)
