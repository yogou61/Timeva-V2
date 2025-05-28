// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4 flex items-center">
        <img
          src={`${import.meta.env.BASE_URL}logo-congeProV2.png`}
          alt="Logo"
          className="h-10 mr-2"
        />
        <span className="font-bold text-lg">Timeva</span>
      </div>
      <nav className="mt-6">
        <Link to="/" className="block py-2 px-4 hover:bg-gray-100">Accueil</Link>
        <Link to="/pointage" className="block py-2 px-4 hover:bg-gray-100">Pointage</Link>
        <Link to="/fiches-frais" className="block py-2 px-4 hover:bg-gray-100">Fiche de Frais</Link>
        <Link to="/fiches-horaires" className="block py-2 px-4 hover:bg-gray-100">Fiche Horaire</Link>
        <Link to="/conges" className="block py-2 px-4 hover:bg-gray-100">Congés</Link>
      </nav>
    </aside>
  );
}