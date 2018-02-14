import React from 'react'
import { connect } from 'react-redux'
import * as api from '../../api'
import * as actions from '../../actions'
import { Divider, Image, Icon, Grid, Label, Segment, Card, Button} from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      copied: false
    }}

  componentDidMount() {
    api.fetchMonicas().then( monicas => {
      this.props.dispatch(actions.receiveMonicas(monicas))
    })
  }

  handleCopy(){

  }


  render() {
    return (
      <Card.Group color='teal'>
        {this.props.monicas.map( monica => monica.show? 
          (<Card color='red'>
              <Image src={monica.photo_link} size='medium'/>
              <Card.Content>
                <Card.Header>{monica.title}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Label.Group tag color='red'>{monica.keys.map( k => (<Label as='a'>{k}</Label>))}</Label.Group>
              </Card.Content>
              <Card.Content>
                <Button color='red' href={monica.photo_link} download>Salvar</Button>
                <CopyToClipboard text={monica.photo_link} onCopy={() => this.setState({copied: true})}><Button color='red'>Copiar link</Button></CopyToClipboard>
              </Card.Content>
            </Card>
            )
          :null)}
      </ Card.Group>  
  )
  }
}

const mapStateToProps = state => ({
  monicas: state.monicas,
})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

