// src/components/Header.jsx
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={`${import.meta.env.BASE_URL}logo-congeProV2.png`} alt="Logo" className="h-8 mr-2" />
        <h1 className="text-2xl font-bold">Timeva</h1>
      </div>
      <div className="flex items-center">
        <span className="text-gray-500 mr-4">
          Bienvenue, {currentUser?.username || "Utilisateur"}
        </span>
        <button
          onClick={logout}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
}