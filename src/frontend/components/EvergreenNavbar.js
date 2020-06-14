import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.svg';
import SessionContext from '../context/session-context';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const EvergreenNavbar = () => {
    const session = useContext(SessionContext);
    const logOut = session.session.username ? (
        <Nav className="ml-auto">
            <Link to="/questions">
                <Button variant="link">View Question</Button>
            </Link>
            <Link to="/add/question">
                <Button variant="link">Add Question</Button>
            </Link>
            <Button onClick={session.logout} variant="link">
                Logout
            </Button>
        </Nav>
    ) : null;
    return (
        <Navbar>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                Evergreen.io
            </Navbar.Brand>
            {logOut}
        </Navbar>
    );
};

export default EvergreenNavbar;
