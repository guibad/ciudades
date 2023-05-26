import React, { useEffect, useState } from 'react'

export const useFetchGen = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const response = await fetch(url);
            const result = await response.json();
            console.log('object :>> ', result);
            setData(result)
            setLoading(false)
        })()

    }, [url])


    return { loading, error, data }
}
