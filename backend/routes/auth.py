import re
from flask import Blueprint, request, jsonify
from ..models.usuario import Usuario, Moderador, Admin
from backend.models.usuario import UsuarioDB
from backend.app import db
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__, url_prefix='/api')


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Credenciales incompletas"}), 400

    # Buscar usuario en la base de datos
    usuario = UsuarioDB.query.filter_by(username=username).first()

    if not usuario:
        return jsonify({"error": "Usuario no encontrado"}), 404

    # Verificar contraseña hasheada
    if not check_password_hash(usuario.password_hash, password):
        return jsonify({"error": "Contraseña incorrecta"}), 401

    # Validar reglas específicas del rol
    if usuario.role == 'moderador' and not password.startswith('mod_'):
        return jsonify({"error": "Contraseña de moderador inválida"}), 401

    if usuario.role == 'admin' and not re.search(r'[@#]', password):
        return jsonify({"error": "Contraseña de admin inválida"}), 401
    
    user_instance = None
    if usuario.role == 'moderador':
        user_instance = Moderador(usuario.username, password)
    elif usuario.role == 'admin':
        user_instance = Admin(usuario.username, password)
    else:
        user_instance = Usuario(usuario.username, password)

    if user_instance.autenticar(password):
        return jsonify({
            "token": "fake-jwt",
            "role": usuario.role
        }), 200


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    role = data.get('role', 'usuario').lower()

    if role == 'moderador' and not password.startswith('mod_'):
        return jsonify({"error": "La contraseña de moderador debe empezar con 'mod_'"}), 400
        
    if role == 'admin' and not re.search(r'[@#]', password):
        return jsonify({"error": "La contraseña de admin debe contener @ o #"}), 400

    if not username or not password:
        return jsonify({"error": "Faltan datos"}), 400

    if UsuarioDB.query.filter_by(username=username).first():
        return jsonify({"error": "El usuario ya existe"}), 409

    user = UsuarioDB(username=username, role=role)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Usuario registrado exitosamente",
        "token": "fake-jwt"
    }), 201