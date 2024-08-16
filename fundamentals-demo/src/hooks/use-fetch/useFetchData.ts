import { useState, useEffect } from "react";

const useFectchData = (url: string) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const resp = await response.json();
                setData(resp);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [url])

    return { loading, data, error }

}

export default useFectchData;