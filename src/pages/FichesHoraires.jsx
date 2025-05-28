import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import PrintPreview from "../components/PrintPreview";

export default function FichesHoraires() {
  const [horaires, setHoraires] = useState([]);
  const [form, setForm] = useState({ date: "", heures: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHoraires();
    const subscription = supabase
      .channel('public:fiches_horaires')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fiches_horaires' }, fetchHoraires)
      .subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  async function fetchHoraires() {
    setLoading(true);
    const { data } = await supabase.from("fiches_horaires").select("*").order("date", { ascending: false });
    setHoraires(data || []);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await supabase.from("fiches_horaires").insert([form]);
    setForm({ date: "", heures: "" });
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Fiche Horaire</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
        <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2" required />
        <input type="number" name="heures" value={form.heures} onChange={handleChange} placeholder="Heures" className="border p-2" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
      {loading ? <p>Chargement...</p> : (
        <ul>
          {horaires.map((h) => (
            <li key={h.id}>{h.date} - {h.heures} h</li>
          ))}
        </ul>
      )}
      <PrintPreview type="horaire" data={horaires} />
    </div>
  );
}