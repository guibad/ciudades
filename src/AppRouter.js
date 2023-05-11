import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BuscarPage } from "./pages/BuscarPage/BuscarPage";
import { HistorialPage } from "./pages/HistorialPage/HistorialPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Navbar } from "./components/Navbar/Navbar";
import { InicioPage } from "./pages/InicioPage/InicioPage";

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<InicioPage />} />
                <Route exact path="/buscar/:cp" element={<BuscarPage />} />
                <Route path="/historial" element={<HistorialPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};
