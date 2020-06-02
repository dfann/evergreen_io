import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvergreenNavbar from './EvergreenNavbar';
const Signup = () => {
    const [emailAddress, setEmailAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = ({target}) => {
        const {name, value} = target;
        switch(name){
            case "email":
                setEmailAddress(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
        }


    };

    return(
    <div>
    <EvergreenNavbar />
    <Container>
        <Row>
            
            <Col xs={{offset: 2, span: 6}}>           
                <Form  className="Form" onSubmit={(e) => {console.log(e.target.value); e.preventDefault();return false;}}>
                    <div className="page-header">
                        <h1>Sign Up For An Account</h1>
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name="email" value={emailAddress} onChange={handleChange} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value={username} onChange={handleChange} type="input" placeholder="Username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" value={password} onChange={handleChange} type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control name="confirmPassword" value={confirmPassword} onChange={handleChange} type="password" placeholder="Password" />
                    </Form.Group>
                
                    <Button className="btn btn-success" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Col>
        </Row>
    </Container>
    </div>
  );
}
export default Signup;
  