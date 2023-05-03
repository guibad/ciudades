import React, { useState } from 'react'
import './Recuadro.css';

export const Recuadro = (props) => {
    const [minimizada, setMinimizada] = useState(false);

    function toggleMinimizada() {
        setMinimizada(!minimizada);
    }

    return (
        <div className="pestanya-container">
            <div className="pestanya" style={{ height: minimizada ? '30px' : (props.altura || "200px") }}>
                <div className="cabecera">
                    <span className="titulo-pestanya">{props.texto}</span>
                    <button className="boton-minimizar" onClick={toggleMinimizada}> {minimizada ? <>&#9634;</> : "-"}</button>
                </div>
                {!minimizada && (
                    <div className="contenido">
                        {props.children}
                    </div>
                )}
            </div>
        </div>
    );
}
