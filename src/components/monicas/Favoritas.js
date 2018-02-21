import React from 'react'
import { connect } from 'react-redux'
import * as api from '../../api'
import * as actions from '../../actions'
import { Divider, Image, Icon, Grid, Label, Segment, Card, Button, Form} from 'semantic-ui-react'
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Favoritas extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      copied: false,
      favorites: []
    }}

  componentDidMount() {
    api.getMonicas().then( monicas => {
      this.props.dispatch(actions.receiveMonicas(monicas)), this.setFavorites(monicas)
    })
  }

  handleScore = (e, {value}) => {
    const nScore = value.score + 1
    const tmp = this.state.favorites
    tmp[value.id].score = nScore
    this.setState({favorites: tmp})
    api.updateMonicaScore(value.id, nScore)
  }

  setFavorites = function(monicas){
    let tmp = monicas.filter(monicas => monicas.show? monicas:null)
    for(var i=0; i<4; i++){
      const max = tmp.reduce((prev, current) => (prev.score > current.score) ? prev : current)
      if(max.score > 0){
        this.setState({favorites: [...this.state.favorites, max]})
      }
      tmp = tmp.filter(monica => {if(monica.id !== max.id){ return monica}})
    }   
  }
  
  render() {
    const hasFavorite = (this.state.favorites.length > 0)
    return (  
      (hasFavorite)? (  
      <div>
        <Divider horizontal>Favoritos</Divider>
        <Card.Group color='red'>
          {this.state.favorites.map( monica => 
            <Card color='red' key={monica.id}>
              <Image src={monica.image} size='medium' label={{ as: 'a', color: 'red', corner: 'right', icon: 'trophy'}}/>
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
            </Card>)}
        </ Card.Group>  
      </div>):null
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
)(Favoritas)

