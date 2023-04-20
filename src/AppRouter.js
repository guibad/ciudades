import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BuscarPage } from "./pages/BuscarPage/BuscarPage";
import { HistorialPage } from "./pages/HistorialPage/HistorialPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Navbar } from "./components/Navbar/Navbar";
import { InicioPage } from "./pages/InicioPage/InicioPage";
import { InfoHistorialContext } from "./context/InfoHistorialContext";

export const AppRouter = () => {
    const [infoPolitica, setInfoPolitica] = useState([]);
    const [historial, setHistorial] = useState([]);

    return (
        <Router>
            <Navbar />
            <InfoHistorialContext.Provider value={{ infoPolitica, setInfoPolitica, historial, setHistorial }}>
                <Routes>
                    <Route exact path="/" element={<InicioPage />} />
                    <Route exact path="/buscar/:cp" element={<BuscarPage />} />
                    <Route path="/historial" element={<HistorialPage />} />
                    <Route component={<NotFoundPage />} />
                </Routes>
            </InfoHistorialContext.Provider>
        </Router>
    );
};
