import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
} from 'react-router-dom';
import React from 'react';
import LandingPage from './LandingPage';
import SignupPage from './SignupPage';
import QuestionsPage from './QuestionsPage';

const App = () => (
  <Router>
    <Switch>
    <Route path="/questions" component={QuestionsPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/" component={LandingPage} />                  
    </Switch>
  </Router>
);

export default App;
