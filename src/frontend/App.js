import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import React from 'react';
import LandingPage from './LandingPage';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import QuestionsPage from './QuestionsPage';
import AddQuestionPage from './AddQuestionPage';
import ViewQuestionPage from './ViewQuestionPage';

const App = () => (
  <Router>
    <Switch>
    <Route path="/view/question" component={ViewQuestionPage} />
    <Route path="/add/question" component={AddQuestionPage} />
    <Route path="/questions" component={QuestionsPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/" component={LandingPage} />                  
    </Switch>
  </Router>
);

export default App;
