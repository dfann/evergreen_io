import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvergreenNavbar from './EvergreenNavbar';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import SessionContext from '../context/session-context';

const Signup = () => {
    const session = useContext(SessionContext);

    const [showToast, setShowToast] = useState(false);
    const [resetPasswordEmail, setresetPasswordEmail] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleChange = ({ target }) => {
        const { name, value } = target;
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'resetPasswordEmail':
                setresetPasswordEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    };

    const handleLoginSubmit = async (event) => {
        const creds = {
            email,
            password,
        };

        session.login(creds);
    };

    const handlePasswordReset = async (event) => {};

    return (
        <div>
            <EvergreenNavbar />
            <Toast
                style={{ position: 'absolute', top: 0, right: 0 }}
                show={showToast}
                onClose={() => setShowToast(false)}
            >
                <Toast.Header>
                    <strong className="mr-auto">Reset Link Sent</strong>
                </Toast.Header>
                <Toast.Body>
                    A password reset link has been sent to your email address
                </Toast.Body>
            </Toast>
            <Container>
                <Row>
                    <Col xs={{ offset: 2, span: 3 }}>
                        <Form
                            className="Form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleLoginSubmit();
                                return false;
                            }}
                        >
                            <div className="page-header">
                                <h1>Login</h1>
                            </div>

                            <Form.Group controlId="formUsername">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    type="input"
                                    placeholder="Email"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <Button
                                className="btn btn-success"
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col xs={{ offset: 2, span: 5 }}>
                        <Form
                            className="Form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handlePasswordReset();
                                setShowToast(true);
                                return false;
                            }}
                        >
                            <div className="page-header">
                                <h1>I forgot my password</h1>
                            </div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    name="resetPasswordEmail"
                                    value={resetPasswordEmail}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="Enter email"
                                />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone
                                    else.
                                </Form.Text>
                            </Form.Group>

                            <Button
                                className="btn btn-success"
                                variant="primary"
                                type="submit"
                            >
                                Reset My Password
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;
