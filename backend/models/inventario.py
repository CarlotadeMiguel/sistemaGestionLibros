# backend/models/inventario.py

import logging
from backend.models.libro import Libro

class Inventario:
    def __init__(self):
        self._libros = []  
        self.logger = logging.getLogger(__name__) 

    def agregar_libro(self, libro):
        """Agrega un libro al inventario."""
        self._libros.append(libro)

    def buscar_libro(self, titulo):
        """Busca un libro por su título exacto."""
        for libro in self._libros:
            if libro.titulo == titulo:
                return libro
        return None  # Si no se encuentra el libro, retorna None

    def registrar_venta(self, titulo, cantidad):
        """Registra una venta, si el libro existe."""
        libro = self.buscar_libro(titulo)
        if libro is None:
            raise ValueError('Libro no encontrado')
        # Si el libro existe, registramos la venta con un log de nivel INFO
        self.logger.info(f"Venta registrada: {cantidad} copias de '{libro.titulo}' vendidos.")
