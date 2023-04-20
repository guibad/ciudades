import React from 'react';
import { useParams } from 'react-router-dom';
import { Buscador } from '../../components/Buscador/Buscador';
import { Cargando } from '../../components/Cargando/Cargando';
import { InfoClima } from '../../components/InfoClima/InfoClima';
import { InfoGeo } from '../../components/InfoGeo/InfoGeo';
import { InfoPolitica } from '../../components/InfoPolitica/InfoPolitica';
import { NoResultados } from '../../components/NoResultados/NoResultados';
import { Recuadro } from '../../components/Recuadro/Recuadro';
import { useFetchPolitica } from '../../services/useFetchPolitica';
import './BuscarPage.css';

export const BuscarPage = () => {
  const { cp } = useParams();
  const { loading, error } = useFetchPolitica(cp);

  return (
    <div className='container_buscar'>
      <Buscador loading={loading} />
      {
        loading ? (
          <Cargando />
        ) : (
          error ? (
            <NoResultados />
          ) : (
            <>
              <Recuadro texto="Información política" >
                <InfoPolitica />
              </Recuadro>
              <Recuadro texto="Información climática" >
                <InfoClima />
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
