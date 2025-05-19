import { useState } from "react";
import { crearLibro } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function FormularioLibro() {
  const [form, setForm] = useState({ titulo: "", autor: "", precio: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await crearLibro({
      ...form,
      precio: parseFloat(form.precio),
    });
    if (res.id) {
      window.alert("📚 ¡Libro creado exitosamente!");
      navigate("/libros");
    } else {
      window.alert("⚠️ Error al crear el libro");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-yellow-300 drop-shadow-md">
          ✨ Nuevo Libro ✨
        </h2>

        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          placeholder="Título"
          className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          required
        />
        <input
          name="autor"
          value={form.autor}
          onChange={handleChange}
          placeholder="Autor"
          className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          required
        />
        <input
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          type="number"
          step="0.01"
          className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-black font-bold py-3 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
        >
          🪄 Crear Libro
        </button>
      </form>
    </div>
  );
}
