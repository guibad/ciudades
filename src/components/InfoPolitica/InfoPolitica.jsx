import React, { useContext } from 'react';
import './InfoPolitica.css';
import banderas from '../../config/banderas.json';
import { IdiomaContext } from '../../context/IdiomaContext';
import idiomas from '../../config/idiomas.json';

export const InfoPolitica = (props) => {
    const { infoPolitica } = props;
    let abbreviation = infoPolitica != undefined ? infoPolitica.places[0]["state abbreviation"] : "";
    const { idioma } = useContext(IdiomaContext);

    return (
        <div className='politica-container'>
            {
                abbreviation ? (
                    <>
                        <img src={banderas[`${abbreviation}`].src} className="imagen" alt={banderas[`${abbreviation}`].alt} />
                        <div className="texto">
                            <p className='ciudad-texto'><b>{idiomas[idioma].BuscarPage.InfoPolitica.ciudad}:</b> {infoPolitica.places[0]["place name"]}</p>
                            <p className='comunidad-texto'><b>{idiomas[idioma].BuscarPage.InfoPolitica.comunidad}:</b> {infoPolitica.places[0].state}</p>
                        </div>
                    </>
                ) : <h2 className='no-info'>No hay información disponible</h2>
            }
        </div>
    )
}
