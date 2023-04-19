import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HistorialPage.css';

export const HistorialPage = () => {
  const [historial, setHistorial] = useState([])
  const navigate = useNavigate();

  const borrarHistorial = () => {
    localStorage.setItem('historial', JSON.stringify([]));
    refrescarHistorial();
  }

  const refrescarHistorial = () => {
    setHistorial(JSON.parse(localStorage.getItem('historial')) || []);
  }

  useEffect(() => {
    refrescarHistorial();
  }, [])


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
              <button className='btn' onClick={borrarHistorial}>Borrar historial</button>
            ) : <p>No hay búsquedas recientes.</p>
          }
        </div>

      </div>
    </>

  )
}
