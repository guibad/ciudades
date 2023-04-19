import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BuscarPage } from "./pages/BuscarPage/BuscarPage";
import { HistorialPage } from "./pages/HistorialPage/HistorialPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Navbar } from "./components/Navbar/Navbar";
import { InicioPage } from "./pages/InicioPage/InicioPage";
import { InfoPoliticaContext } from "./context/InfoPoliticaContext";

export const AppRouter = () => {
    const [infoPolitica, setInfoPolitica] = useState([]);

    return (
        <Router>
            <Navbar />
            <InfoPoliticaContext.Provider value={{ infoPolitica, setInfoPolitica }}>
                <Routes>
                    <Route exact path="/" element={<InicioPage />} />
                    <Route exact path="/buscar/:cp" element={<BuscarPage />} />
                    <Route path="/historial" element={<HistorialPage />} />
                    <Route component={<NotFoundPage />} />
                </Routes>
            </InfoPoliticaContext.Provider>
        </Router>
    );
};
