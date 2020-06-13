import React, { useContext } from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import SessionContext from '../context/session-context';

const useLoggedIn = () => {
    const session = useContext(SessionContext);
    const {
        session: { userId },
    } = session;
    const loggedIn = Boolean(userId);
    return loggedIn;
};

const Auth = ({ path, component: Component }) => {
    const isLoggedIn = useLoggedIn();
    return (
        <Route
            path={path}
            render={(props) =>
                isLoggedIn ? (
                    <Redirect to="/questions" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};
const Protected = ({ path, component: Component }) => {
    const isLoggedIn = useLoggedIn();
    return (
        <Route
            path={path}
            render={(props) =>
                isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};

export const AuthRoute = withRouter(Auth);
export const ProtectedRoute = withRouter(Protected);
