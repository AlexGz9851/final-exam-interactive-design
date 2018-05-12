import React, { Component } from 'react';
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
  render() {
    //require("react-bootstrap/lib/NavbarHeader");
    return (
      <div className="notasWrapper">
        <Navbar className="notasHeader">
          <Navbar.Header>
            <Navbar.Brand className="title">
              To Do List
            </Navbar.Brand>
          </Navbar.Header>
          <Nav >
            <Button className="item">
              Log out
            </Button>
          </Nav>
        </Navbar>
            <div className="notasBody">
            
            {//boring
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
    );
  }
}

export default ToDolist;
