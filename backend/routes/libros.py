from flask import Blueprint, jsonify, request
from backend.models.libro import LibroModel
from backend.app import db 

libros_bp = Blueprint('libros', __name__, url_prefix='/api/libros')

def create_libro():
    data = request.get_json()
    nuevo_libro = LibroModel(
        titulo=data['titulo'],
        autor=data['autor'],
        precio=data['precio']
    )
    db.session.add(nuevo_libro)
    db.session.commit()
    return jsonify({"id": nuevo_libro.id}), 201

def listar_libros():
    libros = LibroModel.query.all()
    resultado = [
        {"id": l.id, "titulo": l.titulo, "autor": l.autor, "precio": l.precio}
        for l in libros
    ]
    return jsonify(resultado)

@libros_bp.route('/', methods=['POST', 'GET'])
def handle_libros():
    if request.method == 'POST':
        return create_libro()
    elif request.method == 'GET':
        return listar_libros()
    elif request.method == 'DELETE':
        pass
    else:
        return jsonify({"error": "Método no permitido"}), 405

