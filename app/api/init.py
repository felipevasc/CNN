from .mnist import mnist_blueprint
from .hiperparametros import hiperparametros_blueprint
from .filtros import filtros_blueprint
from .ativacao import ativacao_blueprint
from .pooling import pooling_blueprint
from .achatar import achatar_blueprint
from .pesosFC import pesosFC_blueprint
from .bias import bias_blueprint
from .FC import FC_blueprint
from .entropia import entropia_blueprint
from .bp_fc import back_fc_blueprint
from .reshape import reshape_blueprint
from .bp_pool import back_pool_blueprint
from .bp_ativacao import back_ativacao_blueprint
from .bp_conv import back_conv_blueprint
from .bp_filtros import back_filtros_blueprint

def init_app(app):
    app.register_blueprint(mnist_blueprint, url_prefix='/')
    app.register_blueprint(hiperparametros_blueprint, url_prefix='/')
    app.register_blueprint(filtros_blueprint, url_prefix='/')
    app.register_blueprint(ativacao_blueprint, url_prefix='/')
    app.register_blueprint(pooling_blueprint, url_prefix='/')
    app.register_blueprint(achatar_blueprint, url_prefix='/')
    app.register_blueprint(pesosFC_blueprint, url_prefix='/')
    app.register_blueprint(bias_blueprint, url_prefix='/')
    app.register_blueprint(FC_blueprint, url_prefix='/')
    app.register_blueprint(entropia_blueprint, url_prefix='/')
    app.register_blueprint(back_fc_blueprint, url_prefix='/')
    app.register_blueprint(reshape_blueprint, url_prefix='/')
    app.register_blueprint(back_pool_blueprint, url_prefix='/')
    app.register_blueprint(back_ativacao_blueprint, url_prefix='/')
    app.register_blueprint(back_conv_blueprint, url_prefix='/')
    app.register_blueprint(back_filtros_blueprint, url_prefix='/')
