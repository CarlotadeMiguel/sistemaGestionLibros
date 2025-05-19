# Pruebas manuales

# Importamos las clases
from backend.models.libro import Libro
from backend.models.inventario import Inventario

# Creamos un libro con precio válido
libro1 = Libro("El Quijote", "Miguel de Cervantes", 19.99)
print(libro1.titulo)  # Debería imprimir "El Quijote"
print(libro1.precio)  # Debería imprimir 19.99

# Intentamos crear un libro con precio negativo (debe fallar)
try:
    libro2 = Libro("Don Juan Tenorio", "Tirso de Molina", -5.99)
except ValueError as e:
    print(e)  # Debería imprimir "Precio negativo"

# Crear un inventario
inventario = Inventario()

# Agregar libros al inventario
inventario.agregar_libro(libro1)

# Buscar un libro por título exacto
libro_buscado = inventario.buscar_libro("El Quijote")
if libro_buscado:
    print(f"Libro encontrado: {libro_buscado.titulo}")
else:
    print("Libro no encontrado.")

# Intentamos registrar una venta de un libro existente
inventario.registrar_venta("El Quijote", 3)  # Debería registrar la venta

# Intentamos registrar una venta de un libro que no existe
try:
    inventario.registrar_venta("El Loro de la Plaza", 2)
except ValueError as e:
    print(e)  # Debería imprimir "Libro no encontrado"
