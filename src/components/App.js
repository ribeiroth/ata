import React from "react"
import { connect } from 'react-redux'
import * as actions from '../actions'
import SideMenu from 'react-burger-menu'
import PropTypes from 'prop-types'
import MonicasList from "./monicas/List"
import Home from "./home"

class App extends React.Component {

  render() {
    return (
      <div id="page-wrap">
        <div>
          <Home />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  dispatch
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
