import { useEffect, useState } from 'react'

export const useFetchClima = (latitud, longitud) => {
    const [infoClima, setInfoClima] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const req2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m`);
                const res2 = await req2.json();
                setInfoClima(res2);
                setLoading(false);
                setError(false);
            } catch (error) {
                console.log('error2 :>> ', error);
                setLoading(false);
                setError(true)
            }
        }
        fetchData();
    }, [latitud, longitud])

    return { infoClima, loading, error }
}
