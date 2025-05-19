from flask import Blueprint, jsonify, request
from backend.models.libro import LibroModel
from backend.app import db 

libros_bp = Blueprint('libros', __name__, url_prefix='/api/libros')

@libros_bp.route('/', methods=['POST'])
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


@libros_bp.route('/', methods=['GET'])
def listar_libros():
    libros = LibroModel.query.all()
    resultado = [
        {"id": l.id, "titulo": l.titulo, "autor": l.autor, "precio": l.precio}
        for l in libros
    ]
    return jsonify(resultado)

@libros_bp.route('/<int:libro_id>/', methods=['DELETE'])
def delete_libro(libro_id):
    libro = LibroModel.query.get(libro_id)
    if not libro:
        return jsonify({"error": "Libro no encontrado"}), 404
    db.session.delete(libro)
    db.session.commit()
    return jsonify({"message": "Libro borrado"}), 200

@libros_bp.route('/<int:libro_id>/', methods=['PUT', 'PATCH'])
def update_libro (libro_id):
    libro = LibroModel.query.get(libro_id)
    if not libro:
        return jsonify({"error": "Libro no encontrado"}), 404
    data = request.get_json()
    if 'titulo' in data:
        libro.titulo = data['titulo']
    if 'autor' in data:
        libro.autor = data['autor']
    if 'precio' in data:
        libro.precio = data['precio']
    db.session.commit()
    return jsonify({"message": "Libro actualizado"}), 200
