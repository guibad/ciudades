import React, { useEffect, useState } from 'react'

export const useFetchGen = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                if (response?.ok) {
                    if (Object.keys(result) == 0 || result.length == 0 || result == undefined) setError(true)
                    else {
                        setData(result)
                        setError(false);
                    }
                } else {
                    console.log('response.status :>> ', response.status);
                    setError(true);
                }
            } catch (err) {
                console.log('object :>> ', err);
                setError(true)
            }
            setLoading(false)
        })()

    }, [url])


    return { loading, error, data }
}
