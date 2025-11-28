import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/components/Header.scss";
import Logo2 from "../assets/images/Logo (2).png";

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const { isAuthenticated, authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuAberto((v) => !v);

  const handleLogout = async () => {
    await logout();                // garante que a sessão foi encerrada no backend
    navigate("/LoginPage");        // redireciona após logout
    setMenuAberto(false);
  };

  if (authLoading) {
    return (
      <header className="header">
        <nav>
          <div className="nav-buttons">
            <span style={{ opacity: 0.6 }}>...</span>
          </div>
          <div className="hamburger" onClick={toggleMenu}>☰</div>
          <div className="logo-area">
            <img src={Logo2} alt="Logo" className="logo" />
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="header">
      <nav>
        <div className={`nav-buttons ${menuAberto ? "ativo" : ""}`}>
          {!isAuthenticated ? (
            <>
              <Link to="/" onClick={() => setMenuAberto(false)}><button type="button">Home</button></Link>
              <Link to="/CadPage" onClick={() => setMenuAberto(false)}><button type="button">Cadastro</button></Link>
              <Link to="/LoginPage" onClick={() => setMenuAberto(false)}><button type="button">Login</button></Link>
              <Link to="/petList" onClick={() => setMenuAberto(false)}><button type="button">Petlist</button></Link>
              <Link to="/apitemp" onClick={() => setMenuAberto(false)}><button type="button">Temperatura</button></Link>
              <Link to="/Patchnotes" onClick={() => setMenuAberto(false)}><button type="button">Patch Notes</button></Link>
              <Link to="/contato" onClick={() => setMenuAberto(false)}><button type="button">Sobre mim</button></Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMenuAberto(false)}><button type="button">Home</button></Link>
              <Link to="/apitemp" onClick={() => setMenuAberto(false)}><button type="button">Temperatura</button></Link>
              <Link to="/addPet" onClick={() => setMenuAberto(false)}><button type="button">addPet</button></Link>
              <Link to="/petList" onClick={() => setMenuAberto(false)}><button type="button">Petlist</button></Link>
              <Link to="/contato" onClick={() => setMenuAberto(false)}><button type="button">Sobre mim</button></Link>
              <Link to="/Patchnotes" onClick={() => setMenuAberto(false)}><button type="button">Patch Notes</button></Link>
              <button type="button" onClick={handleLogout}>Sair</button>
            </>
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu} aria-label="Menu">☰</div>

        <div className="logo-area">
          <img src={Logo2} alt="Logo" className="logo" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
