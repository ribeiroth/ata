import { combineReducers } from 'redux'
import monicas from './monicas'
import search from './search'

const reducers = combineReducers({
  monicas,
  search
})

export default reducers

 /*"concurrently \"node server.js\" \"json-server --watch db.json --port 3004\"",*/