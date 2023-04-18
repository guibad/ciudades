import React from 'react'
import { useNavigate } from 'react-router-dom'

export const HistorialPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>HistorialPage</h2>
      <div onClick={() => navigate('/buscar/08020')}>Prueba busqueda</div>
    </div>
  )
}
