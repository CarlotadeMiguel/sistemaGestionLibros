# backend/models/libro.py

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
