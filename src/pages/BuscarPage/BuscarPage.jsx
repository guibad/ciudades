import React, { useContext } from 'react';
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
import { IdiomaContext } from '../../context/IdiomaContext';
import idiomas from '../../config/idiomas.json';

const BuscarPage = () => {
  const { cp } = useParams();
  const { infoPolitica, loading1: loading, error } = useFetchPolitica(cp);
  const { idioma } = useContext(IdiomaContext);

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
              <Recuadro texto={idiomas[idioma].BuscarPage.InfoPolitica.titulo} >
                <InfoPolitica infoPolitica={infoPolitica} />
              </Recuadro>
              <Recuadro texto={idiomas[idioma].BuscarPage.InfoClima.titulo} altura="365px">
                <InfoClima infoPolitica={infoPolitica} />
              </Recuadro>
              <Recuadro texto={idiomas[idioma].BuscarPage.InfoGeo.titulo} >
                <InfoGeo infoPolitica={infoPolitica} />
              </Recuadro>
            </>
          )
        )
      }
    </div>
  )
}

export default BuscarPage;
