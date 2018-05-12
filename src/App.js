import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ToDoList from './ToDoList';
import LandingPage from './LandingPage';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


class App extends React.Component{
  render(){
    return (
      <Switch>
        {}
        <Route exact path='/landing'  render={(props) => <LandingPage auth={auth} {...props} />} />
        <Route exact path='/todo'  render={(props) => {
                                                        handleAuthentication(props);
                                                        return  <ToDoList auth={auth}{...props} /> }}/>
      </Switch>
    )
  }
}

App.propTypes = {
  //  children: PropTypes.element
  };
  
  export default App;
  