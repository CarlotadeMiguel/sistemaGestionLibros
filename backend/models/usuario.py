import re
from backend.app import db
from werkzeug.security import generate_password_hash, check_password_hash

class Usuario:
    def __init__(self, username, password):
        self.username = username
        self._password_hash = generate_password_hash(password)

    def autenticar(self, pwd):
        return check_password_hash(self._password_hash, pwd)


class Moderador(Usuario):
    def autenticar(self, pwd):
        if pwd.startswith("mod_"):
            return super().autenticar(pwd)
        return False


class Admin(Usuario):
    def autenticar(self, pwd):
        if re.search(r'[@#]', pwd) and super().autenticar(pwd):
            return True
        return False


class UsuarioDB(db.Model):
    __tablename__ = "usuarios"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False, default="usuario")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)