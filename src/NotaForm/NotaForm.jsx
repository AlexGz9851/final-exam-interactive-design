import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Uploader from '../components/Uploader'
import './NotaForm.css';
import axios from 'axios';

class NotaForm extends Component{
    constructor(props){
        super(props);
        this.state= {
            newNotaTitulo:'',
            newNotaContenido:'',
            newNotaImagen:'',
            newGifRandom:'', 
             
        };
        var api="http://api.giphy.com";
        var path="/v1/gifs/random";
        var apiKey="?api_key=4m9DrqZymsUjGiiL1bIgZGcoto3HHAIM";
        var limTag="&tag=cat";
        this.url=api+path+apiKey+limTag;

        this.getGif = this.getGif.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserInputTitle = this.handleUserInputTitle.bind(this);
        this.writeNota = this.writeNota.bind(this);
        this.handleImgInput = this.handleImgInput.bind(this);
    }
    getGif() {
        axios.get(this.url)
          .then(res => {
            const gifUrl = res.data.data.images.fixed_height_still.url;
            const gif=gifUrl;
            this.setState({ newGifRandom: gif });
        console.log(res);
        console.log(gif);
          })
      }

    handleUserInput(e){
        this.setState({
            newNotaContenido: e.target.value,
            newNotaTitulo: this.state.newNotaTitulo, 
            newNotaImagen:this.state.newNotaImagen,          
        });
    }
    handleUserInputTitle(ee){
        this.setState({
            newNotaTitulo:ee.target.value,
            newNotaContenido:this.state.newNotaContenido,
            newNotaImagen:this.state.newNotaImagen,
        });
    }
    handleImgInput(strImagen){
        this.getGif();
        this.setState({
            newNotaTitulo:this.state.newNotaTitulo,
            newNotaContenido:this.state.newNotaContenido,
            newNotaImagen:strImagen,
        });
    }
    writeNota(){

        this.props.agregaNota(
            this.state.newNotaTitulo,
            this.state.newNotaContenido,
            this.state.newNotaImagen,
            this.state.newGifRandom);
        console.log(this.state.newGifRandom);
        this.setState({
            newNotaContenido:'',
            newNotaTitulo:'',
            newNotaImagen:'',
            newGifRandom:'',
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
                <Uploader id='images' name='images'
                          data-clearable='false'
                          onChange={()=>{ }}
                          onUploadComplete={info=>  {console.log(info);this.handleImgInput (info.cdnUrl);}}
                          data-images-only data-multiple /> 

                <Button className="btnF" 
                        bsSize='sm'  bsStyle='info'
                        onClick={this.writeNota}>Agrega</Button>
       
            </div>        
        )
    }
}

export default NotaForm;