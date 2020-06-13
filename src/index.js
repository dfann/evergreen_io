import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './frontend/components/App';
import { checkLoggedIn } from './frontend/util/session';

const renderApp = (preloadedState) => {
    ReactDOM.render(
        <React.StrictMode>
            <App preSession={preloadedState.session} />
        </React.StrictMode>,
        document.getElementById('root')
    );
};

(async () => renderApp(await checkLoggedIn()))();
