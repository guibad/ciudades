import { useContext, useEffect, useState } from 'react'
import { InfoHistorialContext } from '../context/InfoHistorialContext';
import { useFetchGen } from './useFetchGen';

export const useFetchPolitica = (cp) => {
    const { infoPolitica, setInfoPolitica, historial, setHistorial } = useContext(InfoHistorialContext);
    const { loading, error, data } = useFetchGen(`https://api.zippopotam.us/es/${cp}`);
    const [loading1, setLoading1] = useState(true)

    useEffect(() => {
        (() => {
            if (error) {
                setLoading1(false)
                return
            } else if (data && data.places) { // Verificar si data y data.places son definidos
                if (cp.slice(0, 2) === "35") {
                    data.places[0].latitude = 28.1;
                    data.places[0].longitude = -15.5;
                }
                setInfoPolitica(data);
                setHistorial([{ "cp": cp, "ciudad": data.places[0]["place name"], "comunidad": data.places[0].state }, ...historial]);
                setLoading1(false);
            }
        })();
    }, [cp, data, error]);

    return { infoPolitica, loading1, error }
}