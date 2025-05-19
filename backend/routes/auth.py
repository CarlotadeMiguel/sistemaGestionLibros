from flask import Blueprint, request, jsonify
from ..models.usuario import Usuario, Moderador, Admin

auth_bp = Blueprint('auth', __name__, url_prefix='/api')

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'usuario').lower()

    if not username or not password:
        return jsonify({"error": "Credenciales incompletas"}), 400

    usuario = None
    if role == 'moderador':
        usuario = Moderador(username, password)
    elif role == 'admin':
        usuario = Admin(username, password)
    else:
        usuario = Usuario(username, password)

    if usuario.autenticar(password):
        return jsonify({"token": "fake-jwt"}), 200
    return jsonify({"error": "Autenticación fallida"}), 401
