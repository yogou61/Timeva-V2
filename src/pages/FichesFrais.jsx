import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import PrintPreview from "../components/PrintPreview";

export default function FichesFrais() {
  const [frais, setFrais] = useState([]);
  const [form, setForm] = useState({ date: "", montant: "", motif: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFrais();
    const subscription = supabase
      .channel('public:fiches_frais')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fiches_frais' }, fetchFrais)
      .subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  async function fetchFrais() {
    setLoading(true);
    const { data } = await supabase.from("fiches_frais").select("*").order("date", { ascending: false });
    setFrais(data || []);
    setLoading(false);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await supabase.from("fiches_frais").insert([form]);
    setForm({ date: "", montant: "", motif: "" });
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Fiche de Frais</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2 flex-wrap">
        <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2" required />
        <input type="number" name="montant" value={form.montant} onChange={handleChange} placeholder="Montant" className="border p-2" required />
        <input type="text" name="motif" value={form.motif} onChange={handleChange} placeholder="Motif" className="border p-2" required />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
      {loading ? <p>Chargement...</p> : (
        <ul>
          {frais.map((f) => (
            <li key={f.id}>{f.date} - {f.montant} € - {f.motif}</li>
          ))}
        </ul>
      )}
      <PrintPreview type="frais-recto" data={frais} />
    </div>
  );
}