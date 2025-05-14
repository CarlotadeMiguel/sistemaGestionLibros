from flask_sqlalchemy import SQLAlchemy

# Inicializamos la base de datos
db = SQLAlchemy()

class Libro:
    def __init__(self, titulo, autor, precio):
        self.__titulo = titulo
        self.__autor = autor
        self.__precio = None  # Inicializamos el precio con None
        self.precio = precio  # Usamos el setter para validar el precio

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
    __tablename__ = 'libros'  # Nombre de la tabla en la base de datos

    id = db.Column(db.Integer, primary_key=True)  # Columna id como clave primaria
    titulo = db.Column(db.String(255), nullable=False)  # Columna titulo
    autor = db.Column(db.String(255), nullable=False)  # Columna autor
    precio = db.Column(db.Float, nullable=False)  # Columna precio

    def __init__(self, titulo, autor, precio):
        self.titulo = titulo
        self.autor = autor
        self.precio = precio

    def __repr__(self):
        return f"<Libro(id={self.id}, titulo={self.titulo}, autor={self.autor}, precio={self.precio})>"
