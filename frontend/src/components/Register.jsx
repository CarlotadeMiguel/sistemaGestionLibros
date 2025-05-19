import { useState } from "react";
import { register } from "../services/api"; // Asegúrate de tener esta función
import { useNavigate, Link } from "react-router-dom";
import RoleSelect from "./RoleSelect";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "usuario"
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      window.alert("⚠️ Las contraseñas no coinciden");
      return;
    }

    const { username, password, role } = form;
    const res = await register({ username, password, role });

    if (res.token) {
      localStorage.setItem("token", res.token);
      navigate("/libros");
    } else {
      window.alert(res.error || "❌ No se pudo registrar el usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-yellow-300 text-center drop-shadow-md">
          📝 Registro de Hechiceros
        </h2>

        <div>
          <label className="block mb-2 text-white/80">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            placeholder="Tu nuevo nombre mágico"
            className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Contraseña secreta</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="🔒 Crea una palabra encantada"
            className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="🔒 Repite el hechizo"
            className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div>
          <label className="block mb-2 text-white/80">Rango</label>
          <RoleSelect value={form.role} onChange={(val) => setForm({ ...form, role: val })} />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-black font-bold py-2 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          🪄 Unirse al Reino
        </button>

        <div className="text-center mt-2">
          <div className="text-center mt-2">
            <Link
              to="/login"
              className="text-yellow-300 hover:text-pink-400 transition-colors duration-300 underline underline-offset-4 decoration-dotted"
            >
              🔐 ¿Ya tienes cuenta? Accede al Reino
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}