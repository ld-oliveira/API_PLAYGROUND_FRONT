import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import Apitempo from "./pages/Apitemp";
import Patchnotes from "./pages/Patchnotes";

import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/global.scss";
import LoginPage from "./pages/LoginPage";
import CadPage from "./pages/CadPage";
import PetList from "./pages/petList";
import AddPet from "./pages/addPet";
import Cv from "./pages/Cv";

import { AuthProvider } from "./context/AuthContext";


function App() {
  useEffect(() => {
    fetch("https://api-playground-back.onrender.com/users/csrf/", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => console.log("CSRF token carregado:", data))
      .catch((err) => console.error("Erro ao buscar CSRF:", err));
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/Apitemp" element={<Apitempo />} />
              <Route path="/Patchnotes" element={<Patchnotes />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/CadPage" element={<CadPage />} />
              <Route path="/petList" element={<PetList />} />
              <Route path="/AddPet" element={<AddPet />} />
              <Route path="/Cv" element={<Cv />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}


export default App;
