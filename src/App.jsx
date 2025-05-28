import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Pointage from "./pages/Pointage";
import FichesFrais from "./pages/FichesFrais";
import FichesHoraires from "./pages/FichesHoraires";
import Conges from "./pages/Conges";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="p-4 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pointage" element={<Pointage />} />
              <Route path="/fiches-frais" element={<FichesFrais />} />
              <Route path="/fiches-horaires" element={<FichesHoraires />} />
              <Route path="/conges" element={<Conges />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;