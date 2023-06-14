import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../../components/Boton/Boton';
import { InfoHistorialContext } from '../../context/InfoHistorialContext';
import { IdiomaContext } from '../../context/IdiomaContext';
import idiomas from '../../config/idiomas.json';
import './HistorialPage.css';

const HistorialPage = () => {
  const { historial, setHistorial } = useContext(InfoHistorialContext);
  const { idioma } = useContext(IdiomaContext);
  const navigate = useNavigate();

  const borrarHistorial = () => {
    console.log("borrando historial");
    setHistorial([]);
  }

  return (
    <div className='container-historial'>
      {
        historial.map((item, index) => {
          return (
            <div className='busqueda-container' onClick={() => navigate(`/buscar/${item.cp}`)} key={index}>
              <div className="busqueda">
                <div className='codigo-postal-container'>
                  <p className='codigo-postal'>{item.cp}</p>
                </div>
                <div className='info-container'>
                  <p className='info'>{item.ciudad} ({item.comunidad})</p>
                </div>
              </div>
            </div>
          );
        })
      }
      <div className='boton-container'>
        {
          historial.length !== 0 ? (
            <Boton onClick={borrarHistorial} texto={idiomas[idioma].HistorialPage.boton} height="43px" />
          ) : <h4 className='texto-no-historial'>{idiomas[idioma].HistorialPage.texto}</h4>
        }
      </div>
    </div>
  )
}

export default HistorialPage;
