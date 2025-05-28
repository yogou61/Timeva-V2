// src/components/Header.jsx
export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={`${import.meta.env.BASE_URL}logo-congeProV2.png`} alt="Logo" className="h-8 mr-2" />
        <h1 className="text-2xl font-bold">Timeva</h1>
      </div>
      <span className="text-gray-500">Bienvenue !</span>
    </header>
  );
}