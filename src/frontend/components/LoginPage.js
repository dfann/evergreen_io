import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvergreenNavbar from './EvergreenNavbar';
import { Link } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';

const Signup = () => {
    const [showToast, setShowToast] = useState(false);
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [email , setEmail] = useState('');
    
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
                        <Form className="Form">
                            <div className="page-header">
                                <h1>Login</h1>
                            </div>

                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="input"
                                    placeholder="Username"
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Group>

                            <Link to="/questions">
                                <Button
                                    className="btn btn-success"
                                    variant="primary"
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </Link>
                        </Form>
                    </Col>
                    <Col xs={{ offset: 2, span: 5 }}>
                        <Form
                            className="Form"
                            onSubmit={(e) => {
                                e.preventDefault();
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
