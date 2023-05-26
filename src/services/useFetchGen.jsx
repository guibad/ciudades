import React, { useEffect, useState } from 'react'

export const useFetchGen = (url) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([])
    const [error, setError] = useState(false)

    useEffect(() => {
        (async () => {
            const response = await fetch(url);
            const result = await response.json();
            console.log('object :>> ', result);
            setData(result)
        })()

    }, [url])


    return { loading, setLoading, error, setError, data }
}
