import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ToDoList from './ToDoList';
import LandingPage from './LandingPage';
import Auth from './Auth/Auth';
import history from './history';
import Callback from './Callback';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


class App extends React.Component{
  render(){
    return (
      <div className="fullHeight">
        <Switch>


          <Route exact path='/'  render={(props) => <LandingPage auth={auth} {...props} />}/> 
          <Route exact path='/landing'  render={(props) => <LandingPage auth={auth} {...props} />} />
          <Route exact path='/todo'  render={(props) => <ToDoList auth={auth}{...props} />}/>
          <Route exact path='/callback' render={(props)=>{
            handleAuthentication(props);
            return <Callback {...props}/>;
          }} />
        </Switch>
      </div>
    )
  }
}

App.propTypes = {
  //  children: PropTypes.element
  };
  
  export default App;
  