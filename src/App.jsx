// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pointage from "./pages/Pointage";
import FichesFrais from "./pages/FichesFrais";
import FichesHoraires from "./pages/FichesHoraires";
import Conges from "./pages/Conges";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
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
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;