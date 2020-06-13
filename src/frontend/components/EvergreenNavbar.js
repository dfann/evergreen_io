import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../logo.svg';

const EvergreenNavbar = () => (
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
    </Navbar>
);

export default EvergreenNavbar;
