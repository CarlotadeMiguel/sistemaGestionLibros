import { useState, useEffect } from "react";
import { getLibros } from "../services/api";

export default function ListarLibros() {
  const [libros, setLibros] = useState([]);

  const cargarLibros = () => {
    getLibros().then(setLibros);
  };

  useEffect(() => { cargarLibros(); }, []);

  const handleBorrar = async (id) => {
    console.log(id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl text-yellow-300 font-extrabold mb-8 drop-shadow-lg">
        📚 Biblioteca Mágica
      </h1>

      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
        <table className="min-w-full text-white">
          <thead className="bg-white/10 border-b border-white/20">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Título</th>
              <th className="px-4 py-3 text-left">Autor</th>
              <th className="px-4 py-3 text-left">Precio</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro, index) => (
              <tr
                key={libro.id}
                className={index % 2 === 0 ? "bg-white/5" : "bg-white/0"}
              >
                <td className="px-4 py-3">{libro.id}</td>
                <td className="px-4 py-3">{libro.titulo}</td>
                <td className="px-4 py-3">{libro.autor}</td>
                <td className="px-4 py-3">{libro.precio}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleBorrar(libro.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-200 shadow-md"
                  >
                    🗑️ Borrar
                  </button>
                </td>
              </tr>
            ))}
            {libros.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-white/70">
                  No hay libros mágicos aún...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
