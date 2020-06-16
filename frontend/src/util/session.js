export const signup = async (user) => {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        mode: 'cors', // no-cors,
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost',
        },
    });
    const json = await response.json();
    return json;
};
export const login = async (user) => {
    const response = await fetch('http://localhost:3000/api/session', {
        method: 'POST',
        mode: 'cors', // no-cors,
        body: JSON.stringify(user),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json;
};
export const logout = () =>
    fetch('http://localhost:3000/api/session', {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
    });

export const checkLoggedIn = async (preloadedState) => {
    const response = await fetch('http://localhost:3000/api/session', {
        credentials: 'include',
    });
    const { user } = await response.json();
    let userSession = { session: { userId: null, username: null } };
    if (user) {
        userSession = {
            session: user,
        };
    }
    return userSession;
};
