import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Buscador.css';

export const Buscador = (props) => {
    const [busqueda, setBusqueda] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = event => {
        setBusqueda(event.target.value);
    };

    const handleSearch = async () => {
        if (busqueda === '') setMensajeError('Se debe introducir un código postal.');
        else if (busqueda.length !== 5) setMensajeError('El código postal debe tener 5 dígitos.');
        else if (isNaN(busqueda)) {
            setMensajeError('El codigo postal debe ser númerico.');
        } else {
            let url = "/buscar/" + busqueda;
            navigate(url);
            setMensajeError('');
        }
    };

    return (
        <div className='buscador-container'>
            <div className="buscador">
                <input type="text" className="input-buscador form-control" value={busqueda} onChange={handleInputChange} placeholder="Introduce código postal..." />
                <button className="btn" type="button" onClick={handleSearch}>Buscar</button>
            </div>
            <h6 className='mensaje-error'>{mensajeError}</h6>
        </div>
    )
}
