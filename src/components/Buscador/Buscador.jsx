import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Boton } from '../Boton/Boton';
import './Buscador.css';
import idiomas from '../../config/idiomas.json';
import { IdiomaContext } from '../../context/IdiomaContext';

export const Buscador = (props) => {
    const [busqueda, setBusqueda] = useState('');
    const [mensajeError, setMensajeError] = useState('');
    const navigate = useNavigate();
    const { idioma } = useContext(IdiomaContext);

    const handleInputChange = event => {
        setBusqueda(event.target.value);
    };

    function handleInputKeyDown(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    const handleSearch = async () => {
        if (busqueda === '') setMensajeError(idiomas[idioma].Buscador.errorCPVacio);
        else if (busqueda.length !== 5) setMensajeError(idiomas[idioma].Buscador.errorCP5Digitos);
        else if (isNaN(busqueda)) {
            setMensajeError(idiomas[idioma].Buscador.errorNumerico);
        } else {
            let url = "/buscar/" + busqueda;
            navigate(url);
            setMensajeError('');
        }
    };

    return (
        <div className='buscador-container'>
            <div className='buscador'>
                <input type="text" className="input-buscador form-control" value={busqueda} onChange={handleInputChange} placeholder={idiomas[idioma].Buscador.placeholder} onKeyDown={handleInputKeyDown} />
                <Boton style={{ opacity: props.loading ? "0" : "100", pointerEvents: props.loading ? "none" : "all" }} onClick={handleSearch} texto={idiomas[idioma].Buscador.boton} />
            </div>
            <h6 className='mensaje-error' style={{ display: mensajeError.length > 0 ? "block" : "none" }}>{mensajeError}</h6>
        </div>
    )
}
