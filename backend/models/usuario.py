import re

class Usuario:
    def __init__(self, username, password):
        self.username = username
        self._password = password

    def autenticar(self, pwd):
        """Método base para comparar la contraseña"""
        return self._password == pwd


class Moderador(Usuario):
    def autenticar(self, pwd):
        """La contraseña debe comenzar con 'mod_' para un moderador"""
        if pwd.startswith("mod_"):
            return super().autenticar(pwd)
        return False


class Admin(Usuario):
    def autenticar(self, pwd):
        """La contraseña debe contener al menos un carácter especial (@ o #)"""
        if re.search(r'[@#]', pwd) and super().autenticar(pwd):
            return True
        return False
