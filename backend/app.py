# backend/app.py
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    CORS(app, origins=["http://localhost:5173"], supports_credentials=True)
    app.config.from_object('backend.config.Config')
    
    db.init_app(app)
    

    from backend.routes.libros import libros_bp
    from backend.routes.auth import auth_bp

    app.register_blueprint(libros_bp)
    app.register_blueprint(auth_bp)
    
    # with app.app_context():
    #     db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
