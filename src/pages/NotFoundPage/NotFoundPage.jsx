import React, { useContext } from 'react';
import { Boton } from '../../components/Boton/Boton';
import './NotFoundPage.css';
import { IdiomaContext } from '../../context/IdiomaContext';
import idiomas from '../../config/idiomas.json';

export const NotFoundPage = () => {
  const { idioma } = useContext(IdiomaContext);

  return (
    <div className="d-flex align-items-center justify-content-center error-container">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3"> <span className="text-danger">Oops!</span> {idiomas[idioma].NotFoundPage.texto}</p>
        <p className="lead">
          {idiomas[idioma].NotFoundPage.subtexto}
        </p>
        <a href="/">
          <Boton texto={idiomas[idioma].NotFoundPage.boton} width="100px" />
        </a>
      </div>
    </div>
  )
}
