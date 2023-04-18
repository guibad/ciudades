import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Navbar.css';

export const Navbar = () => {
    const [activeLink, setActiveLink] = useState(null);
    const navigate = useNavigate();

    const handleClick = (divId) => {
        if (divId === "linkBuscar") {
            navigate('/');
        } else {
            navigate('/historial');
        }
        setActiveLink(divId);
    };

    useEffect(() => {
        const pathname = window.location.pathname
        if (pathname === "/") setActiveLink("linkBuscar");
        if (pathname === "/buscar") setActiveLink("linkBuscar");
        else if (pathname === "/historial") setActiveLink("linkHistorial");
    }, [])

    return (
        <nav className="navbar justify-content-between">
            <a className="navbar-brand" href='/inicio'>
                <img src={'/assets/img/logo.png'} style={{ width: "170px" }} alt="Imagen de ciudad" />
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