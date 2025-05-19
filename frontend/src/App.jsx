import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import ListarLibros from "./components/ListarLibros";
import FormularioLibro from "./components/FormularioLibro";

function ProtectedRoute({ children }) {
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-800 via-pink-700 to-indigo-800 text-white shadow-md border-b border-white/20 backdrop-blur-md">
        <h1 className="text-xl font-bold tracking-wide">📚 Tienda Mágica de Libros</h1>
        <nav className="flex gap-6 text-lg">
          <a href="/login" className="hover:text-pink-300 transition duration-200">🗝️ Login</a>
          <a href="/libros" className="hover:text-pink-300 transition duration-200">📖 Libros</a>
          <a href="/nuevo" className="hover:text-pink-300 transition duration-200">✨ Nuevo</a>
        </nav>
      </header>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/libros" element={
          <ProtectedRoute><ListarLibros /></ProtectedRoute>
        } />
        <Route path="/nuevo" element={
          <ProtectedRoute><FormularioLibro /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
