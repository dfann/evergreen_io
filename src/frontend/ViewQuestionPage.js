import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import EvergreenNavbar from './EvergreenNavbar';
import {Link} from 'react-router-dom';
import Toast from 'react-bootstrap/Toast'

const Signup = () => {
    const [showToast, setShowToast] = useState(false);

    return(
        <div>
            <EvergreenNavbar />
            <Toast style={{ position: 'absolute',top: 0, right: 0,}}show={showToast} onClose={() => setShowToast(false)}>
            <Toast.Header>                
                <strong className="mr-auto">Reset Link Sent</strong>                
            </Toast.Header>
            <Toast.Body>A password reset link has been sent to your email address</Toast.Body>
            </Toast>
            <Container>
                <Row>            
                    <Col >           
                        <Form  className="Form">
                            <div className="page-header">
                                <h1>Login</h1>
                            </div>

                            <Form.Group controlId="formUsername">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="input" placeholder="Username" />
                            </Form.Group>


                            <Form.Group controlId="formUsername">
                                <Form.Label>Average Comfort Level</Form.Label>
                                <Form.Control type="input" placeholder="Username" />
                            </Form.Group>
   

                            <Form.Group controlId="formUsername">
                                <Form.Label>Average Time</Form.Label>
                                <Form.Control type="input" placeholder="Username" />
                            </Form.Group>

                            <Form.Group controlId="formUsername">
                                <Form.Label>Current Time</Form.Label>
                                <Form.Control type="input" placeholder="Username" />
                            </Form.Group>

                            <Form.Check 
                                type="switch"
                                id="custom-switch"
                                label="Render Text As MarkDown"
                            />                

                            <Form.Group  controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control className="Textbox-control" as="textarea" rows="3" />
                            </Form.Group>

                            <Form.Group  controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Solution</Form.Label>
                                <Form.Control className="Textbox-control" as="textarea" rows="3" />
                            </Form.Group>

                            <Form.Group  controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Notes</Form.Label>
                                <Form.Control className="Textbox-control" as="textarea" rows="3" />
                            </Form.Group>                          
                           
                            <Form.Group  controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Comfort Level</Form.Label>
                                <div>
                                <Form.Check
                                    custom
                                    inline
                                    label="1"
                                    type="checkbox"
                                    id="custom-inline-checkbox-1"
                                />
                                <Form.Check
                                    custom
                                    inline
                                    label="2"
                                    type="checkbox"
                                    id="custom-inline-checkbox-2"
                                />
                                <Form.Check
                                    custom
                                    inline                                    
                                    label="3"
                                    type="checkbox"
                                    id="custom-inline-checkbox-3"
                                />
                                </div>
                            </Form.Group> 
                        
                            <Link to="/questions">
                                <Button className="btn btn-success" variant="primary" type="submit">
                                Save Attempt
                                </Button>
                            </Link>
                        </Form>
                    </Col>              
                </Row>
            </Container>
        </div>
    )
};

export default Signup;
  