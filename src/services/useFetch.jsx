import { useState } from "react";

export const useFetch = (initValue) => {
    const [data, setData] = useState(initValue);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const call = async (url) => {
        setLoading(true);
        setError(false)
        try {
            const response = await fetch(url);
            if (!response.ok) {
                setError(true);
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            } else {
                const data = await response.json();
                setData(data);
            }
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    };

    return { call, data, loading, error };
};
