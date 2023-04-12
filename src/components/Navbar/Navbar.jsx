import React, { useState } from 'react';
import './Navbar.css';
import ciudades from '../../assets/img/cities.png';

export const Navbar = () => {
    const [activeLink, setActiveLink] = useState(null);

    const handleClick = (divId) => {
        setActiveLink(divId);
    };

    return (
        <nav className="navbar justify-content-between">
            <a className="navbar-brand" href='/inicio'>
                <img src={ciudades} style={{ width: "250px" }} alt="Imagen de ciudad" />
            </a>
            <h2 className='titulo'>Ciudades</h2>
            <div className="links-container">
                <div className={activeLink === "linkBuscar" ? "link_activo" : "link"} onClick={() => handleClick("linkBuscar")}>
                    <h4>Buscar</h4>
                </div>
                <div className={activeLink === "linkHistorial" ? "link_activo" : "link"} onClick={() => handleClick("linkHistorial")}>
                    <h4>Historial</h4>
                </div>
            </div>
        </nav>
    )
}
