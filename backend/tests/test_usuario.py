import unittest
from backend.models.usuario import Usuario, Moderador, Admin  

class TestUsuario(unittest.TestCase):
    
    def test_usuario_autenticar(self):
        usuario = Usuario("user1", "password123")
        
        # Casos válidos
        self.assertTrue(usuario.autenticar("password123"))
        
        # Casos inválidos
        self.assertFalse(usuario.autenticar("wrongpassword"))
    
    def test_moderador_autenticar(self):
        moderador = Moderador("mod1", "mod_123")
        
        # Casos válidos (comienza con "mod_")
        self.assertTrue(moderador.autenticar("mod_123"))
        
        # Casos inválidos
        self.assertFalse(moderador.autenticar("password123"))
        self.assertFalse(moderador.autenticar("mod123"))
    
    def test_admin_autenticar(self):
        admin = Admin("admin1", "mi@pass")
        
        # Casos válidos (contiene un carácter especial '@')
        self.assertTrue(admin.autenticar("mi@pass"))
        
        # Casos inválidos
        self.assertFalse(admin.autenticar("password123"))
        self.assertFalse(admin.autenticar("mi_pass"))
        self.assertFalse(admin.autenticar("mi#pass"))

    def test_admin_autenticar_sin_caracter_especial(self):
        admin = Admin("admin1", "password")
        
        # Caso inválido (sin carácter especial)
        self.assertFalse(admin.autenticar("password"))

if __name__ == '__main__':
    unittest.main()
