import { useEffect, useState } from 'react'
import { useFetch } from './useFetch';

export const useFetchClima = (latitud, longitud) => {
    const [infoClima, setInfoClima] = useState([])
    const { call, loading, error, data } = useFetch();
    const [loadingClima, setLoadingClima] = useState(true)

    useEffect(() => {
        call(`https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m`)
    }, [latitud, longitud]);

    useEffect(() => {
        if (error) {
            setLoadingClima(false)
            return
        } else if (data && data.hourly) {
            setInfoClima(data);
            setLoadingClima(false)
        }
    }, [latitud, longitud, data, error])

    return { infoClima, loadingClima, error }
}
