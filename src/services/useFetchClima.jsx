import { useEffect, useState } from 'react'
import { useFetchGen } from './useFetchGen';

export const useFetchClima = (latitud, longitud) => {
    const [infoClima, setInfoClima] = useState([])
    const { loading, error, data } = useFetchGen(`https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m`);
    const [loading1, setLoading1] = useState(true)

    useEffect(() => {
        console.log('infoClima :>> ', data);
        if (error) {
            setLoading1(false)
            return
        } else if (data && data.hourly) {
            setInfoClima(data);
            setLoading1(false)
        }
    }, [latitud, longitud, data, error])

    return { infoClima, loading1, error }
}
