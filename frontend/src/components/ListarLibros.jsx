import { useState, useEffect } from "react";
import { getLibros, borrarLibro, actualizarLibro } from "../services/api";

export default function ListarLibros() {
  const [libros, setLibros] = useState([]);
  const [libroEditando, setLibroEditando] = useState(null);

  const cargarLibros = () => {
    getLibros().then(setLibros);
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const handleBorrar = async (id) => {
    await borrarLibro(id);
    cargarLibros();
    window.alert("📖 Libro borrado exitosamente");
  };

  const handleEditar = (libro) => {
    setLibroEditando(libro);
  };

  const handleEditarSubmit = async (e) => {
    e.preventDefault();
    await actualizarLibro(libroEditando.id, {
      ...libroEditando,
      precio: parseFloat(libroEditando.precio),
    });
    setLibroEditando(null);
    cargarLibros();
    window.alert("✨ Libro actualizado con éxito");
  };

  const handleEditarChange = (e) => {
    setLibroEditando({ ...libroEditando, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex flex-col items-center py-10 px-4 relative">
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
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => handleEditar(libro)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 px-3 rounded-lg shadow-md transition duration-200"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleBorrar(libro.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg shadow-md transition duration-200"
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

      {/* Formulario de edición mágico */}
      {libroEditando && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <form
            onSubmit={handleEditarSubmit}
            className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl text-white space-y-6"
          >
            <h2 className="text-2xl font-bold text-yellow-300 text-center drop-shadow-md">
              🪄 Editar Libro
            </h2>

            <input
              name="titulo"
              value={libroEditando.titulo}
              onChange={handleEditarChange}
              placeholder="Título encantado"
              className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <input
              name="autor"
              value={libroEditando.autor}
              onChange={handleEditarChange}
              placeholder="Autor legendario"
              className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />
            <input
              name="precio"
              value={libroEditando.precio}
              onChange={handleEditarChange}
              placeholder="Precio en monedas doradas"
              type="number"
              step="0.01"
              className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              required
            />

            <div className="flex justify-between space-x-4">
              <button
                type="button"
                onClick={() => setLibroEditando(null)}
                className="w-full bg-gray-400 hover:bg-gray-500 text-black font-bold py-2 rounded-xl shadow-lg transition duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 text-black font-bold py-2 rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
              >
                ✨ Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
