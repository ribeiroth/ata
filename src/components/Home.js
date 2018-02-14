import _ from 'lodash'
import React, { Component } from 'react'
import { Label, Search, Input, Menu, Segment,  Button, Header, Image, Modal, Icon, Form, Container, Divider} from 'semantic-ui-react'
import * as api from '../api'
import { connect } from 'react-redux'
import List from './monicas/List'
import * as actions from '../actions'
import PropTypes from 'prop-types'
import { saveMonicas } from '../api'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Admin from './Admin'

let source = []
let mapS = api.fetchMonicas().then(monicas => monicas.map(x => getMonicas(x)))

function getMonicas(monicas){
  source.push(monicas)
}

console.log(source.length)

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      url: "",
      submittedTitle: "",
      submittedUrl: "",
      tags: [],
      submittedTags: [],
      modalOpen: false,
      //urlError: false,
      //tituloError: false,
      //tagsError: false
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title }, this.props.dispatch(actions.filterMonicas(result.id)))

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.keys)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  handleItemClick = (e, { name }) => (this.setState({ activeItem: name }, api.fetchMonicas().then( monicas => {
    this.props.dispatch(actions.receiveMonicas(monicas))})))

  handleSubmit = () => {
    const { title, url, submittedTags} = this.state
    
    this.setState({ submittedTitle: title, submittedUrl: url, modalOpen: false })

    var myMonica = {
      title: this.state.title,
      keys: this.state.submittedTags,
      photo_link: this.state.url,
      show: false
    }

    saveMonicas(myMonica)
    this.setState({title: "", url: "", submittedTags: []})
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleModal = () => {
    this.setState({modalOpen: !this.state.modalOpen})
  }

  handleChangeTags = () => this.setState({submittedTags: [...this.state.submittedTags, this.state.tag], tag: ""})
  
  render() {
    const { isLoading, value, results, activeItem, title, url, submittedTitle, submittedUrl, tag, submittedTags} = this.state
   
    return (
      <Router>
    <div>
      <Menu pointing  color='red' inverted>
        <Menu.Item>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            color='red'
            {...this.props}
          />
        </Menu.Item>
        <Menu.Item
          name='Ver todos'
          active={activeItem === 'Todos'}
          onClick={this.handleItemClick}
          as={Link}
          to='/'
        >
        </Menu.Item>
        <Menu.Item
          name='Enviar Novo'
          active={activeItem === 'Enviar Novo'}
          onClick={this.handleModal}
        >
        </Menu.Item>
      </Menu>
      <Container fluid>
      <Modal size='fullscreen' open={this.state.modalOpen} closeOnDocumentClick={true} closeOnEscape={true}>
        <Modal.Header >Enviar Novo Meme da Mônica</Modal.Header>
          <Modal.Content scrolling>
            <Form color='red'>
              <Form.Group >
                <Form.Input required={true} placeholder='Título' name='title' value={title} onChange={this.handleChange} />
                <Form.Input required={true} placeholder='URL da imagem' name='url' value={url} onChange={this.handleChange} />
                <Form.Input required={true} placeholder='Tags' name='tag' value={tag} onChange={this.handleChange} /><Button onClick={this.handleChangeTags} content="Adicionar"/>
              </Form.Group>
              <Label.Group tag color='red'>{submittedTags.map( k => (<Label as='a'>{k}</Label>))}</Label.Group>
              <Form.Group>
                <Image src={url} size='medium'/>
              </Form.Group>
              <Form.Group>
                <Form.Button content='Enviar' onClick={this.handleSubmit} /> <Button negative onClick={this.handleModal}>Cancelar</Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
        <Route exact path="/" component={listMonicas} />
        <Route exact path="/admin" component={showAdmin} />  
      </Container>
      
    </div>
    </Router>
    )
  }
}

const mapStateToProps = state => ({
  monicas: state.value,
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

const listMonicas = () => (
  <div><List /></div>
)

const showAdmin = () => (
  <div>
    <h2><Admin /></h2>
  </div>
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
