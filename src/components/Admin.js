import React from 'react'
import { connect } from 'react-redux'
import * as api from '../api'
import * as actions from '../actions/index'
import { Image, Grid, Label, Card, Button, Checkbox} from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Admin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      monicas: []
    }
  }

  componentDidMount() {
    api.getMonicas().then( monicas => {
      this.props.dispatch(actions.receiveMonicas(monicas)),
      this.setState({monicas: monicas})
    })
  }

  handleChange = (e, {value}) => {
    const tmp = this.state.monicas;
    tmp[value].show= !this.state.monicas[value].show;
    this.setState({monicas: tmp});
    api.setShowMonica(value+1, tmp[value].show)
  }

  handleRemove = (e, {value}) => {
    const tmp = this.state.monicas.filter(monica => {if(monica.id !== value ){ return monica}})
    this.setState({monicas: tmp});
    api.deleteMonica(value)
  }
   
  render(){
    return (
      <Card.Group color='teal'>
        {this.state.monicas.map( monica => (
          <Card color='red' key={monica.id}>
            <Image src={monica.image} size='medium'/>
            <Card.Content>
              <Card.Header>{monica.title}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Label.Group tag color='red'>{monica.tags.map( (tag, index) => (<Label as='a' key={index}>{tag}</Label>))}</Label.Group>
            </Card.Content>
            <Card.Content>
              <Checkbox value={monica.id - 1} onChange={this.handleChange} label="Visível" checked={monica.show}/>
            </Card.Content>
            <Card.Content>
              <Button  color='red' value={monica.id} onClick={this.handleRemove}>Remover</Button>
            </Card.Content>
          </Card>))}
      </ Card.Group>  
    )
  }
}

const mapStateToProps = state => ({
  monicas: state.monicas
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin)

