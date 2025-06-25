import { serverEndpoint } from '../constant';

export async function queryServer(inputText, setServerCrashed, setError) {
    try {
        const res = await fetch(`${serverEndpoint}/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: inputText }),
        });

        if (!res.ok) {
            setServerCrashed(true);
            setError(`שגיאה מהשרת: ${res.status}`);
            return null;
        }

        const data = await res.json()
        cleanErrors(setServerCrashed, setError)
        return data;
    } catch (err) {
        console.error("Failed to query server:", err);
        return null;
    }
}

const cleanErrors = (setServerCrashed, setError) => {
    setServerCrashed(false)
    setError('')
}