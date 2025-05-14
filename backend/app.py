from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)
# app.config.from_pyfile('config.py')
# db = SQLAlchemy(app)       

@app.route('/')
def home():
    return 'API OK'

if __name__ == '__main__':
    # Crear las tablas solo la primera vez
    # Descomenta estas líneas solo la primera vez que inicias la aplicación
    # with app.app_context():                #  ← necesario para acceder al contexto de Flask
    #     db.create_all()                    #  ← crea las tablas definidas en los modelos
    app.run(debug=True)