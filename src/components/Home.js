import _ from 'lodash'
import React, { Component } from 'react'
import { Label, Search, Input, Menu, Container, Grid, Divider} from 'semantic-ui-react'
import * as api from '../api'
import { connect } from 'react-redux'
import List from './monicas/List'
import * as actions from '../actions'
import PropTypes from 'prop-types'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Admin from './Admin'
import ModalEnviar from './ModalEnviar'
import Favoritas from './monicas/Favoritas'

let source = []
let mapMonicas = api.getMonicas().then(monicas => monicas.map(x => source.push(x)))

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
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
      const isMatch = result => re.test(result.tags)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  handleItemClick = (e, { name }) => (this.setState({ activeItem: name }, api.fetchMonicas().then( monicas => {
    this.props.dispatch(actions.receiveMonicas(monicas))})))

  handleModal = () => {
    this.setState({modalOpen: !this.state.modalOpen})
  }
  
  render() {
    const { isLoading, value, results, activeItem} = this.state
   
    return (
      <Router>
        <div>
          <Menu pointing  color='red' inverted>
            <Menu.Item>
            <Grid.Column width={14}>
              <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                color='red'
              />
            </Grid.Column>
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
            <ModalEnviar 
              modalOpen= {this.state.modalOpen}
              handleModal = {this.handleModal}
            />
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
  <div>
    <Favoritas />
    <Divider horizontal>Todos</Divider>
    <List />
  </div>
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
