import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Jumbotron from 'react-bootstrap/Jumbotron'

function App() {
  return (
    <header className="App-header">
    <Jumbotron className="Jumbo">
      <Container fluid className="App">
        <Row>                    
            <Col xs={{ span:2 }}><img src={logo}  className="App-logo" alt="logo" /></Col>
            <Col xs={{offset: 2, span: 8}} className="Logo-text">
            <p className="Logo-max-text">
              Evergreen.io
            </p>          
            <p className="Logo-min-text">Remember Everthing</p>
            <ButtonGroup className="Login-Buttons">
            <Button className="btn btn-success">Sign Up</Button>
            <Button className="btn btn-secondary">Log In</Button>
            </ButtonGroup>
            </Col>        
        </Row> 
      </Container>
    </Jumbotron>
    </header>
  );
}

export default App;
