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
  const { infoPolitica, infoClima, loading } = useFetchServices(cp);
  console.log('infoPolitica :>> ', infoPolitica);
  console.log('infoClima :>> ', infoClima);

  return (
    loading ? (
      <div>Cargando...</div>
    ) : (
      <div className='container_buscar'>
        <Buscador />
        <Recuadro texto="Información política" >
          <InfoPolitica datos={infoPolitica} />
        </Recuadro>
        <Recuadro texto="Información climática" >
          <InfoClima datos={infoClima} />
        </Recuadro>
        <Recuadro texto="Información geográfica">
          <InfoGeo datos={infoPolitica} />
        </Recuadro>
      </div>
    )
  )
}
