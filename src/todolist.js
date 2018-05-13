import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button,Navbar,Nav,NavItem,FormControl,FormGroup, Image} from 'react-bootstrap';
import Nota from './Nota/Nota';
import NotaForm from './NotaForm/NotaForm'
import {DB_CONFIG} from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './ToDoList.css';

class ToDolist extends Component {
  constructor(props){
    super(props);
    this.logout=this.logout.bind(this);
    this.agregaNota=this.agregaNota.bind(this);
    this.removeNota=this.removeNota.bind(this);
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('notas');
    this.state={
      notas: [],
    }
  }

  componentWillMount(){
      const previousNotas = this.state.notas;

      this.database.on('child_added', snap => {
        previousNotas.push({
          id: snap.key,
          notaTitulo: snap.val().notaTitulo,
          notaContenido: snap.val().notaContenido,
        })
        this.setState({
          notas: previousNotas,
        })
      })

      this.database.on('child_removed',snap=>{
        for(var i=0; i<previousNotas.length;i++){
          if(previousNotas[i].id=== snap.key){
            previousNotas.splice(i,1);
          }
        }
        this.setState({
          notas: previousNotas,
        })
      })
  }

  agregaNota(notaTit, notaCont){
    this.database.push().set({notaTitulo : notaTit,
                              notaContenido: notaCont})
  }
  removeNota(notaId){
    this.database.child(notaId).remove();
  }
  logout() {
    this.props.auth.logout();
  }
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    //require("react-bootstrap/lib/NavbarHeader");
    return (
      <div>
      {
              !isAuthenticated() && (
                <div className="notasWrapper">
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.goTo.bind(this, 'landing')}
                  >
                    Go to landing page
                  </Button>
                </div>
                )
            }
            {
              isAuthenticated() && (
                <div className="notasWrapper">
                  <Navbar className="notasHeader">
                    <Navbar.Header>
                      <Navbar.Brand className="title">
                        To Do List
                      </Navbar.Brand>
                    </Navbar.Header>
                    <Nav >
                      <Button className="item"
                        onClick={this.logout} >
                        Log out
                      </Button>
                    </Nav>
                  </Navbar>
                  <div className="notasBody">     
                  {
                    this.state.notas.map((nota)=>{
                      return(
                      <Nota notaTitulo={nota.notaTitulo} notaContenido={nota.notaContenido} notaId={nota.id} key={nota.id} removeNota={this.removeNota}/>
                      )
                    })
                  }
                  </div>
                <div className="notasFooter">
                  <NotaForm agregaNota={this.agregaNota}/>
                </div>
              </div>
                )
            }
      </div>
    );
  }
}
ToDolist.propTypes = {
  history: PropTypes.object,
  auth: PropTypes.object,
}
export default ToDolist;
