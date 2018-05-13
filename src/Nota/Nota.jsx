import React, {Component} from 'react';
import {Button, Grid,Row,Col, Image} from 'react-bootstrap';
import './Nota.css';
import propTypes from 'prop-types';

class Nota extends Component{

    constructor(props){
        super(props);
        this.notaTitulo = props.notaTitulo;
        this.notaContenido=props.notaContenido;
        this.notaImagen = props.notaImagen;
        this.notaId = props.notaId;

        this.handleRemoveNote =  this.handleRemoveNote.bind(this);
    }

    handleRemoveNote(id){
        this.props.removeNota(id);
    }
    render(props){
        return(
            <div className="nota fade-in">
                <span className="closebtn" 
                onClick={() => this.handleRemoveNote(this.notaId)}>
                x</span>
                <h1 className="notaTitulo">{this.notaTitulo}</h1>
                <p className="notaContenido">{this.notaContenido}</p>
                <img className="notaImg" src={this.notaImagen+"nth/0/"} alt="Img"/>
            </div>
        )
    }
}
Nota.propTypes={
    notaTitulo: propTypes.string,
    notaContenido: propTypes.string,
    notaImagen: propTypes.string,
}

export default Nota;