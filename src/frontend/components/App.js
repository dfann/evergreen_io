import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import LandingPage from './LandingPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import QuestionsPage from './QuestionsPage';
import AddQuestionPage from './AddQuestionPage';
import SessionContext from '../context/session-context';
import ViewQuestionPage from './ViewQuestionPage';
import * as sessionUtil from '../util/session';

const App = ({ preSession }) => {
    const [session, setSession] = useState(preSession);
    const login = async (user) => {
        const newSession = await sessionUtil.login(user);
        setSession(newSession);
    };

    const signup = async (user) => {
        const newSession = await sessionUtil.signup(user);
        setSession(newSession);
    };

    const logout = async () => {
        await sessionUtil.logout();
    };

    return (
        <>
            <SessionContext.Provider value={{ session, login, signup, logout }}>
                <Router>
                    <Switch>
                        <Route
                            path="/view/question"
                            component={ViewQuestionPage}
                        />
                        <Route
                            path="/add/question"
                            component={AddQuestionPage}
                        />
                        <Route path="/questions" component={QuestionsPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/signup" component={SignupPage} />
                        <Route path="/" component={LandingPage} />
                    </Switch>
                </Router>
            </SessionContext.Provider>
        </>
    );
};

export default App;
