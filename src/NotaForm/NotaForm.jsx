import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import './NotaForm.css';

class NotaForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            newNotaTitulo:'',
            newNotaContenido:'',
            
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputTitle = this.handleUserInputTitle.bind(this);
        this.writeNota = this.writeNota.bind(this);
    }

    handleUserInput(e){
        this.setState({
            newNotaContenido: e.target.value,
            newNotaTitulo: this.state.newNotaTitulo,           
        });
    }
    handleUserInputTitle(ee){
        this.setState({
            newNotaTitulo:ee.target.value,
            newNotaContenido:this.state.newNotaContenido,
        });
    }
    writeNota(){
        this.props.agregaNota(
            this.state.newNotaTitulo,
            this.state.newNotaContenido);
        this.setState({
            newNotaContenido:'',
            newNotaTitulo:'',
        });
    }

    render(){
        return(
            <div>
                <input  className="tituloI"
                        placeholder="Titulo de la nota"
                        value={this.state.newNotaTitulo}
                        onChange={this.handleUserInputTitle}/>

                <input  className="notaInput"
                        placeholder="Detalles de la nota"
                        value={this.state.newNotaContenido}
                        onChange={this.handleUserInput}/>
                
                <Button className="btn" 
                        bsSize='sm'  bsStyle='info'
                        onClick={this.writeNota}>Agrega</Button>
                <input type="hidden" role="uploadcare-uploader"
                       name="content" data-images-only="true" />        
            </div>        
        )
    }
}

export default NotaForm;