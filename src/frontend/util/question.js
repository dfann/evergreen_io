export const new = async (question) => {
    const response = await fetch('http://localhost:3000/api/questions', {
        method: 'POST',
        mode: 'cors', // no-cors,
        body: JSON.stringify(question),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost',
        },
    });
    const json = await response.json();
    return json;
};
