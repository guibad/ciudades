import React from 'react';
import { useParams } from 'react-router-dom';
import { Buscador } from '../../components/Buscador/Buscador';
import { InfoClima } from '../../components/InfoClima/InfoClima';
import { InfoGeo } from '../../components/InfoGeo/InfoGeo';
import { InfoPolitica } from '../../components/InfoPolitica/InfoPolitica';
import { Recuadro } from '../../components/Recuadro/Recuadro';
import { useFetchServices } from '../../services/useFetchServices';
import './BuscarPage.css';

export const BuscarPage = () => {
  const { cp } = useParams();
  const { infoClima, loading, error } = useFetchServices(cp);

  return (
    <div className='container_buscar'>
      <Buscador />
      {
        loading ? (
          <div>Cargando...</div>
        ) : (
          error ? (
            <div className='mensaje-error-resultados'>No se obtuvieron resultados.</div>
          ) : (
            <>
              <Recuadro texto="Información política" >
                <InfoPolitica />
              </Recuadro>
              <Recuadro texto="Información climática" >
                <InfoClima datos={infoClima} />
              </Recuadro>
              <Recuadro texto="Información geográfica">
                <InfoGeo />
              </Recuadro>
            </>
          )
        )
      }
    </div>
  )
}
