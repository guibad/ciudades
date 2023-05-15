import React, { useContext } from 'react'
import './NoResultados.css'
import { IdiomaContext } from '../../context/IdiomaContext';
import idiomas from '../../config/idiomas.json';

export const NoResultados = () => {
    const { idioma } = useContext(IdiomaContext);

    return (
        <div className='container-no-results'>
            <img src='/assets/img/no-results.png' alt="Lupa con cara triste" />
            <h4>{idiomas[idioma].BuscarPage.NoResultados.texto}</h4>
        </div>
    )
}
