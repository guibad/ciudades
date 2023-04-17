import React, { useState } from 'react'
import './Recuadro.css';

export const Recuadro = (props) => {
    const [minimizada, setMinimizada] = useState(false);

    function toggleMinimizada() {
        setMinimizada(!minimizada);
    }

    return (
        <div className="pestanya-container">
            <div className="pestanya" style={{ height: minimizada ? '30px' : '200px' }}>
                <div className="cabecera" onClick={toggleMinimizada}>
                    <span className="titulo-pestanya">{props.texto}</span>
                    <button className="boton-minimizar">-</button>
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
