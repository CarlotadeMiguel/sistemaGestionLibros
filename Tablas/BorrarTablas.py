import sqlite3
import os

db_path = '../backend/libros.db'  # Busca en la raíz de backend
if not os.path.exists(db_path):
    print(f"El archivo {db_path} no existe.")
else:
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM libros;")
    cursor.execute("DELETE FROM usuarios;")
    conn.commit()
    conn.close()
