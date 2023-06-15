import React, { useContext } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { IdiomaContext } from '../../context/IdiomaContext';
import SelectorIdioma from '../SelectorIdioma/SelectorIdioma';
import './Navbar.css';
import idiomas from '../../config/idiomas.json';

export const Navbar = () => {
    const location = useLocation();
    const { idioma } = useContext(IdiomaContext);

    const classHandler = ({ isActive }) => {
        return isActive || location.pathname.includes("buscar") ? "link_activo" : "link"
    }

    return (
        <nav className="navbar">
            <a className="navbar-brand" href='/'>
                <img src={'/assets/img/logo.png'} alt="Imagen de ciudad" />
            </a>
            <h2 className='titulo'>{idiomas[idioma].navbar.titulo}</h2>
            <div className="links-container">
                <SelectorIdioma />
                <div className='links'>
                    <NavLink id="linkBuscar" exact="true" to="/" className={classHandler}>{idiomas[idioma].navbar.buscar}</NavLink>
                    <NavLink id="linkHistorial" exact="true" to="/historial" className={({ isActive }) => isActive ? "link_activo" : "link"}>{idiomas[idioma].navbar.historial}</NavLink>
                </div>
            </div>
        </nav>
    );
}