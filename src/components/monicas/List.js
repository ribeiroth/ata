import React from 'react'
import { connect } from 'react-redux'
import * as api from '../../api'
import * as actions from '../../actions'
import { Image, Label, Card, Button, Form} from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      copied: false,
      monicas: []
    }}

  componentDidMount() {
    api.getMonicas().then( monicas => {
      this.props.dispatch(actions.receiveMonicas(monicas)),
      this.setState({monicas: monicas})
    })
  }

  handleScore = (e, {value}) => {
    const nScore = value.score + 1
    const tmp = this.state.monicas
    tmp[value.id-1].score = nScore
    this.setState({monicas: tmp})
    api.updateMonicaScore(value.id, nScore)
  }
  
  render() {
    return (
      <Card.Group color='teal'>
        {this.state.monicas.map( monica => monica.show?(
          <Card color='red' key={monica.id}>
            <Image src={monica.image} size='medium'/>
            <Card.Content>
              <Card.Header>{monica.title}</Card.Header>
            </Card.Content>
            <Card.Content extra>
              <Label.Group tag color='red'>{monica.tags.map( (tag, index) => (<Label as='a' key={index}>{tag}</Label>))}</Label.Group>
            </Card.Content>
            <Card.Content>
              <CopyToClipboard text={monica.image} onCopy={() => this.setState({copied: true})}>
                <Form>
                  <Form.Input>
                    <Button color='red' value={monica} href={monica.image} download onClick={this.handleScore}>Salvar</Button>
                    <Form.Button value={monica} color='red' onClick={this.handleScore}>Copiar link</Form.Button>
                  </Form.Input>
                </Form>
              </CopyToClipboard>
            </Card.Content>
          </Card>)      
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

