import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import RoleSelect from "./RoleSelect";

export default function  Login ({ onLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "usuario"
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await login(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      onLogin?.(); 
      navigate("/libros");
    } else {
      window.alert(res.error || "❌ Hechizo fallido: error de autenticación");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white space-y-6"
      >
        <h2 className="text-3xl font-bold text-yellow-300 text-center drop-shadow-md">
          🔐 Acceso al Reino Literario
        </h2>

        <div>
          <label className="block mb-2 text-white/80">Nombre de usuario</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="Tu identidad mágica"
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
            className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            placeholder="🔒 Palabra encantada"
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
          ✨ Entrar al Reino
        </button>
      </form>
    </div>
  );
}
