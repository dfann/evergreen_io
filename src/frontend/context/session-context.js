import React from 'react';

const SessionContext = React.createContext({
    session: {},
    errors: [],
    login: () => {},
    logout: () => {},
    signup: () => {},
});

export default SessionContext;
