import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ToDoList from './ToDoList';
import LandingPage from './LandingPage';

class App extends React.Component{
  render(){
    return (
      <Switch>
        {}
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/todo' component={ToDoList}/>
      </Switch>
    )
  }
}

App.propTypes = {
  //  children: PropTypes.element
  };
  
  export default App;
  