import React, {Component} from 'react';
import {Button, Checkbox,Grid,Row,Col, Image} from 'react-bootstrap';
import './Nota.css';
import propTypes from 'prop-types';


//var GphApiClient = require('giphy-js-sdk-core');
//client = GphApiClient("YOUR_API_KEY");

class Nota extends Component{

    constructor(props){
        super(props);
        this.notaTitulo = props.notaTitulo;
        this.notaContenido=props.notaContenido;
        this.notaImagen = props.notaImagen;
        this.notaId = props.notaId;
        this.notaGif = props.notaGif;
        console.log("Aqui esta el gif",this.notaGif);
        this.handleChange= this.handleChange.bind(this);
        this.handleRemoveNote =  this.handleRemoveNote.bind(this);
        this.state={
            notaDone:false,
        }

        
    }
    handleChange(evt) {
        console.log("se hizo el cambio done:",evt.target.checked);
        this.setState({ notaDone: evt.target.checked });
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
                {this.state.notaDone && <img className="notaImg" src={this.notaGif} alt="Gif"/>} 
                {!this.state.notaDone && <img className="notaImg" src={this.notaImagen+"nth/0/"} alt="Img"/>}
                <Checkbox id="done" className="ch" 
                onChange={this.handleChange}
                 readOnly>
                    Done
                </Checkbox>
            </div>
        )
    }
}
Nota.propTypes={
    notaGif:propTypes.string,
    notaTitulo: propTypes.string,
    notaContenido: propTypes.string,
    notaImagen: propTypes.string,

}

export default Nota;