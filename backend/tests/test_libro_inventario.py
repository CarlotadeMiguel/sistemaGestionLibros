import unittest
import logging
from backend.models.libro import Libro
from backend.models.inventario import Inventario

class TestLibro(unittest.TestCase):
    
    def test_libro_creacion_valido(self):
        libro = Libro("El Quijote", "Miguel de Cervantes", 19.99)
        self.assertEqual(libro.titulo, "El Quijote")
        self.assertEqual(libro.autor, "Miguel de Cervantes")
        self.assertEqual(libro.precio, 19.99)
    
    def test_libro_precio_negativo(self):
        with self.assertRaises(ValueError) as context:
            Libro("Don Juan Tenorio", "Tirso de Molina", -5.99)
        self.assertEqual(str(context.exception), "Precio negativo")

class TestInventario(unittest.TestCase):
    
    def test_agregar_libro(self):
        inventario = Inventario()
        libro = Libro("El Quijote", "Miguel de Cervantes", 19.99)
        inventario.agregar_libro(libro)
        self.assertEqual(len(inventario._libros), 1)
    
    def test_buscar_libro(self):
        inventario = Inventario()
        libro = Libro("El Quijote", "Miguel de Cervantes", 19.99)
        inventario.agregar_libro(libro)
        encontrado = inventario.buscar_libro("El Quijote")
        self.assertEqual(encontrado.titulo, "El Quijote")
        self.assertEqual(encontrado.autor, "Miguel de Cervantes")
    
    def test_registrar_venta_libro_no_encontrado(self):
        inventario = Inventario()
        with self.assertRaises(ValueError) as context:
            inventario.registrar_venta("El Loro de la Plaza", 2)
        self.assertEqual(str(context.exception), "Libro no encontrado")
    
    def test_registrar_venta_libro_existe(self):
        inventario = Inventario()
        libro = Libro("El Quijote", "Miguel de Cervantes", 19.99)
        inventario.agregar_libro(libro)
        
        # Configura el logger para capturar la salida de los logs
        with self.assertLogs(inventario.logger, level='INFO') as log:
            inventario.registrar_venta("El Quijote", 3)
        
        # Verifica que se haya registrado el log
        self.assertIn("Venta registrada: 3 copias de 'El Quijote' vendidos.", log.output[0])

if __name__ == '__main__':
    unittest.main()
