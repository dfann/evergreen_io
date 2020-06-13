import React from 'react';
import { login } from '../with_redux/util/session';

const SessionContext = React.createContext({
    session: {},
    errors: [],
    login: () => {},
    logout: () => {},
    signup: () => {},
});

export default SessionContext;
