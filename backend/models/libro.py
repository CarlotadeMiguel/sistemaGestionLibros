from flask_sqlalchemy import SQLAlchemy
from backend.app import db

class Libro:
    def __init__(self, titulo, autor, precio):
        self.__titulo = titulo
        self.__autor = autor
        self.__precio = None 
        self.precio = precio  

    @property
    def titulo(self):
        return self.__titulo

    @property
    def autor(self):
        return self.__autor

    @property
    def precio(self):
        return self.__precio

    @precio.setter
    def precio(self, valor):
        if valor < 0:
            raise ValueError('Precio negativo')
        self.__precio = valor

# Clase que mapea la tabla 'libros' en la base de datos
class LibroModel(db.Model):
    __tablename__ = 'libros'
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    autor = db.Column(db.String(255), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    
    def __init__(self, titulo, autor, precio):
        self.titulo = titulo
        self.autor = autor
        self.precio = precio

    def __repr__(self):
        return f"<Libro(id={self.id}, titulo={self.titulo}, autor={self.autor}, precio={self.precio})>"
