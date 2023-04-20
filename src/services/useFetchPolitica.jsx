import { useContext, useEffect, useState } from 'react'
import { InfoHistorialContext } from '../context/InfoHistorialContext';

export const useFetchPolitica = (cp) => {
    const { infoPolitica, setInfoPolitica, historial, setHistorial } = useContext(InfoHistorialContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const req1 = await fetch(`https://api.zippopotam.us/es/${cp}`);
                const res1 = await req1.json();
                setInfoPolitica(res1)
                if (Object.keys(res1).length === 0) setError(true);
                else {
                    setHistorial([{ "cp": cp, "ciudad": res1.places[0]["place name"], "comunidad": res1.places[0].state }, ...historial,]);
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
