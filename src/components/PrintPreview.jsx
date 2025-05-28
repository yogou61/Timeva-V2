import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function PrintPreview({ type, data }) {
  const ref = useRef();
  let imgSrc = "";
  if (type === "frais-recto") imgSrc = `${import.meta.env.BASE_URL}modele fiche de frais recto.png`;
  if (type === "frais-verso") imgSrc = `${import.meta.env.BASE_URL}modele fiche de frais verso.png`;
  if (type === "horaire") imgSrc = `${import.meta.env.BASE_URL}modele fiche horaire.png`;

  return (
    <div className="mt-4">
      <div ref={ref} className="relative w-[800px] h-[1131px]">
        <img src={imgSrc} alt="Modèle" className="absolute w-full h-full" />
        {/* Affichage dynamique sur le modèle */}
        <div className="absolute top-40 left-20">
          {data && data.map((item, i) => (
            <div key={i} className="text-black">{Object.values(item).join(" - ")}</div>
          ))}
        </div>
      </div>
      <ReactToPrint
        trigger={() => <button className="mt-2 bg-gray-700 text-white px-4 py-2 rounded">Imprimer</button>}
        content={() => ref.current}
      />
    </div>
  );
}