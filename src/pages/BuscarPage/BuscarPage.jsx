import React from 'react';
import { Buscador } from '../../components/Buscador/Buscador';
import { Recuadro } from '../../components/Recuadro/Recuadro';
import './BuscarPage.css';

export const BuscarPage = () => {
  return (
    <div className='container_buscar'>
      <Buscador />
      <Recuadro texto="Información política" >

      </Recuadro>
      <Recuadro texto="Información climática" >

      </Recuadro>
      <Recuadro texto="Información geográfica">

      </Recuadro>
    </div>
  )
}
