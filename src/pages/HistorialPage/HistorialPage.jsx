import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boton } from '../../components/Boton/Boton';
import { InfoHistorialContext } from '../../context/InfoHistorialContext';
import './HistorialPage.css';

export const HistorialPage = () => {
  const { historial, setHistorial } = useContext(InfoHistorialContext);
  const navigate = useNavigate();

  const borrarHistorial = () => {
    setHistorial([]);
  }

  return (
    <>
      <div className='container-historial'>
        {
          historial.map((item, index) => {
            return (
              <div className='busqueda-container' onClick={() => navigate(`/buscar/${item.cp}`)}>
                <div key={index} className="busqueda">
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
              <Boton onClick={borrarHistorial} texto="Borrar historial" height="43px" />
            ) : <h4>No hay búsquedas recientes</h4>
          }
        </div>

      </div>
    </>

  )
}
