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
