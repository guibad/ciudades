import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Navbar.css';
import ciudades from '../../assets/img/cities.png';

export const Navbar = () => {
    const [activeLink, setActiveLink] = useState(null);
    const history = useHistory();

    const handleClick = (divId) => {
        if (divId === "linkBuscar") {
            history.push('/');
        } else {
            history.push('/historial');
        }
        setActiveLink(divId);
    };

    useEffect(() => {
        const pathname = window.location.pathname
        if (pathname === "/") setActiveLink("linkBuscar");
        else if (pathname === "/historial") setActiveLink("linkHistorial");
        else setActiveLink(null);
    }, [])

    return (
        <nav className="navbar justify-content-between">
            <a className="navbar-brand" href='/inicio'>
                <img src={ciudades} style={{ width: "250px" }} alt="Imagen de ciudad" />
            </a>
            <h2 className='titulo'>Ciudades</h2>
            <div className="links-container">
                <div className={activeLink === "linkBuscar" ? "link_activo" : "link"} onClick={() => handleClick("linkBuscar")}>
                    <h5>Buscar</h5>
                </div>
                <div className={activeLink === "linkHistorial" ? "link_activo" : "link"} onClick={() => handleClick("linkHistorial")}>
                    <h5>Historial</h5>
                </div>
            </div>
        </nav>
    );
}