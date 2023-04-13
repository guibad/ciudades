import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BuscarPage } from "./pages/BuscarPage/BuscarPage";
import { HistorialPage } from "./pages/HistorialPage/HistorialPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { Navbar } from "./components/Navbar/Navbar";

export const AppRouter = () => {

    return (
        <Router forceRefresh={true}>
            <Navbar />
            <Switch>
                <Route exact path="/" component={BuscarPage} />
                <Route path="/historial" component={HistorialPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </Router>
    );
};
