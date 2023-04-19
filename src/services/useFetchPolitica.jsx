import { useContext, useEffect, useState } from 'react'
import { InfoPoliticaContext } from '../context/InfoPoliticaContext';

export const useFetchPolitica = (cp) => {
    const { infoPolitica, setInfoPolitica } = useContext(InfoPoliticaContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const req1 = await fetch(`https://api.zippopotam.us/es/${cp}`);
                const res1 = await req1.json();
                setInfoPolitica(res1)
                if (Object.keys(res1).length === 0) setError(true);
                else {
                    let historial = JSON.parse(localStorage.getItem('historial')) || [];
                    historial.push({ "cp": cp, "ciudad": res1.places[0]["place name"], "comunidad": res1.places[0].state });
                    localStorage.setItem('historial', JSON.stringify(historial));
                    setError(false);
                }
                setLoading(false)
            } catch (error) {
                console.log('error1 :>> ', error);
                setLoading(false)
                setError(true)
            }
        }
        fetchData();
    }, [cp])

    return { infoPolitica, loading, error }
}
