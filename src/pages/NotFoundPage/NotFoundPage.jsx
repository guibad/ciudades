import React from 'react';
import { Boton } from '../../components/Boton/Boton';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center error-container">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3"> <span className="text-danger">Oops!</span> Página no encontrada.</p>
        <p className="lead">
          La página que buscabas no existe.
        </p>
        <a href="/">
          <Boton texto="Volver" width="100px" />
        </a>
      </div>
    </div>
  )
}
