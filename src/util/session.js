export const signup = async (user) => {
    const response = await fetch('http://localhost:80/api/users', {
        method: 'POST',
        mode: 'cors', // no-cors,
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json;
};
export const login = async (user) => {
    const response = await fetch('http://localhost:80/api/session', {
        method: 'POST',
        mode: 'cors', // no-cors,
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();
    return json;
};
export const logout = () =>
    fetch('api/session', { method: 'DELETE', mode: 'cors' });

export const checkLoggedIn = async (preloadedState) => {
    const response = await fetch('http://localhost:80//api/session');
    const { user } = await response.json();
    let userSession = { session: { userId: null, username: null } };
    if (user) {
        userSession = {
            session: user,
        };
    }
    return userSession;
};
