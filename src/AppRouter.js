import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BuscarPage } from "./pages/BuscarPage/BuscarPage";
import { HistorialPage } from "./pages/HistorialPage/HistorialPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Navbar } from "./components/Navbar/Navbar";

export const AppRouter = () => {

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={BuscarPage} />
                <Route exact path="/historial" component={HistorialPage} />
                <Route path="/" component={NotFoundPage} />
            </Switch>
        </Router>
    );
};
