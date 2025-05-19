import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./components/Login";
import ListarLibros from "./components/ListarLibros";
import FormularioLibro from "./components/FormularioLibro";
import Header from "./components/Header";

function ProtectedRoute({ children }) {
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  return children;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };


  return (
    <BrowserRouter>
      {isLoggedIn && <Header onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/libros"
          element={
            <ProtectedRoute>
              <ListarLibros />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nuevo"
          element={
            <ProtectedRoute>
              <FormularioLibro />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/libros" />} />
      </Routes>
    </BrowserRouter>
  );
}
