import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Pointage() {
  const [pointages, setPointages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPointages();
    const subscription = supabase
      .channel('public:pointages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'pointages' }, fetchPointages)
      .subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  async function fetchPointages() {
    setLoading(true);
    const { data } = await supabase.from("pointages").select("*").order("date", { ascending: false });
    setPointages(data || []);
    setLoading(false);
  }

  async function pointer() {
    await supabase.from("pointages").insert([{ date: new Date().toISOString() }]);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pointage</h2>
      <button
        onClick={pointer}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Pointer
      </button>
      {loading ? <p>Chargement...</p> : (
        <ul>
          {pointages.map((p) => (
            <li key={p.id}>{new Date(p.date).toLocaleString()}</li>
          ))}
        </ul>
      )}
    </div>
  );
}