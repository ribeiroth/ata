import _ from 'lodash'
import React, { Component } from 'react'
import { Label, Input, Button, Image, Modal, Form, Popup} from 'semantic-ui-react'
import * as api from '../api'
import { connect } from 'react-redux'
import * as actions from '../actions'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

class ModalEnviar extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            url: "",
            submittedTitle: "",
            submittedUrl: "",
            tags: [],
            submittedTags: [],
        }
    }

    handleSubmit = () => {
        const { title, url, submittedTags} = this.state
        
        this.setState({ submittedTitle: title, submittedUrl: url})
        
        var myMonica = {
          title: this.state.title,
          tags: this.state.submittedTags,
          image: this.state.url,
          show: false
        }
    
        saveMonicas(myMonica)
        this.setState({title: "", url: "", submittedTags: []})
        this.props.handleModal()
    }
    
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleChangeTags = () => this.setState({submittedTags: [...this.state.submittedTags, this.state.tag], tag: ""})

    render() {
        const {title, url, submittedTitle, submittedUrl, tag, submittedTags} = this.state

        return(
        <Modal size='fullscreen' open={this.props.modalOpen} closeOnDocumentClick={true} closeOnEscape={true}>
          <Modal.Header >Enviar Novo Meme da Mônica</Modal.Header>
            <Modal.Content scrolling>
              <Form color='red'>
                <Form.Group >
                  <Popup
                    trigger={<Form.Input required={true} placeholder='Título' name='title' value={title} onChange={this.handleChange} />}
                    header='Escolha um bom título'
                    content='Procure colocar a mesma frase que está na tela do computador da Mônica'
                    on='focus'
                    position='bottom center'
                    verticalOffset={50}
                  />
                  <Popup
                    trigger={<Form.Input required={true} placeholder='URL da imagem' name='url' value={url} onChange={this.handleChange} />}
                    header='Cole aqui o link da imagem'
                    content='Se ela estiver salva em seu computador/celular será necessário fazer o upload em algum site e depois colar o endereço aqui'
                    on='focus'
                    position='bottom center'
                    verticalOffset={50}
                  />
                  <Popup
                    trigger={<Form.Group><Form.Input required={true} placeholder='Tags' name='tag' value={tag} onChange={this.handleChange} /><Button onClick={this.handleChangeTags} content="Adicionar"/></Form.Group>}
                    header='Insira pelo menos uma Tag'
                    content='Coloque palavras-chave que podem facilitar a busca pelo meme'
                    on='focus'
                    position='bottom center'
                    verticalOffset={50}
                  />
                </Form.Group>
              <Label.Group tag color='red'>{submittedTags.map( (tag, index) => (<Label as='a' key={index}>{tag}</Label>))}</Label.Group>
              <Form.Group>
                <Image src={url} size='medium'/>
              </Form.Group>
              <Form.Group>
                <Form.Button content='Enviar' onClick={this.handleSubmit} /> <Button negative onClick={this.props.handleModal}>Cancelar</Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
        )
    } 
}

ModalEnviar.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    handleModal: PropTypes.func.isRequired
};
  
export default ModalEnviar;
