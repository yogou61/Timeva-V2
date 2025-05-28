import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Conges() {
  const [conges, setConges] = useState([]);
  const [form, setForm] = useState({ debut: "", fin: "", motif: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConges();
    const subscription = supabase
      .channel('public:conges')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conges' }, fetchConges)
      .subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  async function fetchConges() {
    setLoading(true);
    const { data } = await supabase.from("conges").select("*").order("debut", { ascending: false });
    setConges(data || []);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await supabase.from("conges").insert([form]);
    setForm({ debut: "", fin: "", motif: "" });
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Congés</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
        <input type="date" name="debut" value={form.debut} onChange={handleChange} className="border p-2" required />
        <input type="date" name="fin" value={form.fin} onChange={handleChange} className="border p-2" required />
        <input type="text" name="motif" value={form.motif} onChange={handleChange} placeholder="Motif" className="border p-2" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
      {loading ? <p>Chargement...</p> : (
        <ul>
          {conges.map((c) => (
            <li key={c.id}>{c.debut} au {c.fin} - {c.motif}</li>
          ))}
        </ul>
      )}
    </div>
  );
}