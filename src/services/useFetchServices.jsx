import { useEffect, useState } from 'react'

export const useFetchServices = (cp) => {
    const [infoPolitica, setInfoPolitica] = useState([])
    const [infoClima, setInfoClima] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData1() {
            try {
                const req1 = await fetch(`https://api.zippopotam.us/es/${cp}`);
                const res1 = await req1.json();
                setInfoPolitica(res1)
                try {
                    let latitud = res1.places[0].latitude;
                    let longitud = res1.places[0].longitude;
                    const req2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&hourly=temperature_2m`);
                    const res2 = await req2.json();
                    setInfoClima(res2);
                    setLoading(false);
                } catch (error) {
                    console.log('error2 :>> ', error);
                }
            } catch (error) {
                console.log('error1 :>> ', error);
                setLoading(true)
            }
        }


        fetchData1();
    }, [cp])

    return { infoPolitica, infoClima, loading }
}
