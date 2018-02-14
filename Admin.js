import React from 'react'
import { connect } from 'react-redux'
import * as api from '../api'
import * as actions from '../actions/index'
import { Divider, Image, Icon, Grid, Label, Segment, Card, Button, Checkbox} from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { updateMonica } from '../api/index';

class Admin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      monicas: []
    }
  }

  componentDidMount() {
    api.fetchMonicas().then( monicas => {
      this.props.dispatch(actions.receiveMonicas(monicas)),
      this.setState({monicas: monicas})
    })
  }

  handleChange = (e, {value}) => {
    const mon = this.state.monicas;
    mon[value].show= !this.state.monicas[value].show;
    this.setState({monicas: mon});
    api.setShowMonica(value+1, mon[value].show)
    console.log(this.state.monicas)
  }
   

  render(){
    return (
      <Card.Group color='teal'>
        {this.state.monicas.map( monica => 
          (<Card color='red'>
              <Image src={monica.photo_link} size='medium'/>
              <Card.Content>
                <Card.Header>{monica.title}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Label.Group tag color='red'>{monica.keys.map( k => (<Label as='a'>{k}</Label>))}</Label.Group>
              </Card.Content>
              <Card.Content>
                <Checkbox value={monica.id - 1} onChange={this.handleChange} label="Visível" checked={monica.show}/>
              </Card.Content>
            </Card>
            ))}
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

