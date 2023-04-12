import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { InicioPage } from "./pages/InicioPage/InicioPage";
import { HistorialPage } from "./pages/HistorialPage/HistorialPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Navbar } from "./components/Navbar/Navbar";

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/inicio" component={InicioPage} />
                <Route exact path="/historial" component={HistorialPage} />
                <Route path="/" component={NotFoundPage} />
            </Switch>
        </Router>
    );
};
