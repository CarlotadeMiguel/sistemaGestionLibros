import { Link, useNavigate } from "react-router-dom";

export default function Header({ onLogout }) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        onLogout?.();
        navigate("/login");
    };

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-800 via-pink-700 to-indigo-800 text-white shadow-md border-b border-white/20 backdrop-blur-md">
            <h1 className="text-xl font-bold tracking-wide">📚 Tienda Mágica de Libros</h1>
            <nav className="flex gap-6 text-lg">

                <Link className="hover:text-pink-300 transition duration-200" to="/libros">Libros</Link>
                <Link className="hover:text-pink-300 transition duration-200" to="/nuevo">Nuevo</Link>

                <button
                    className="ml-auto hover:text-pink-300 transition duration-200"
                    onClick={handleLogout}
                >
                    🗝️ Logout
                </button>
            </nav>
        </header>
    );
}
