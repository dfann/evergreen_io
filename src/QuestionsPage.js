import React, {useState, useEffect} from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Link} from 'react-router-dom';
import questions from './evergreen_data/questions'
import attempts from './evergreen_data/attempts'
import EvergreenNavbar from './EvergreenNavbar';




const QuestionsPage = () => {
const [stateQuestions, setQuestions] = useState([]);
const [stateAttempts, setAttempts] = useState([]);

useEffect(() => {
  setQuestions(questions.filter(question => question.userId === "5ed2f6b87164530535b435d8" ));
  setAttempts(attempts.filter(attempt => attempt.questionId === "5ed300917164530535b435da" || attempt.questionId === "5ed301f77164530535b435dd"));
}, [stateQuestions.length,stateAttempts.lenght])


  return (
    <div>
      <EvergreenNavbar />
      <Container>
        <Row>
          <Col>
              <Table striped bordered hover>
                  <thead>
                      <tr>
                      <th>Question</th>
                      <th>Category</th>
                      <th>Comfort Level</th>
                      <th>Description</th>
                      <th>Date Last Attempted</th>
                      <th>Notes</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      stateQuestions && stateQuestions.map((question => {                        
                        const questionAttempts = stateAttempts.filter((attempt => attempt.questionId === question._id));                        
                        const totalComfortLevel = questionAttempts.reduce((total, current) => total + current.comfortLevel, 0);                        
                        const averageComfortLevel = questionAttempts.length !== 0 ? Math.floor((totalComfortLevel / questionAttempts.length)) : 0;
                        return <TableRow key={question._id} question={question} averageComfortLevel={averageComfortLevel}/>
                      }))
                    }                    
                  </tbody>
              </Table>
          </Col>
        </Row>    
      </Container>
    </div>
  );
}

const TableRow = ({question, averageComfortLevel}) => {
  // console.log(question);
  const {title, category, description, notes} = question;
  const comfortLevelClass = ["Comfort-level-red", "Comfort-level-yellow", "Comfort-level-green"];
  return (
    <tr>
      <td>{title}</td>
      <td>{category}</td>
      <td className={comfortLevelClass[averageComfortLevel]}/>
      <td>{description}</td>
      <td>1</td>
      <td>{notes}</td>
    </tr>   
  )
};



export default QuestionsPage;