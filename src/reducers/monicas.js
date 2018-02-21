import { RECEIVE_MONICAS, FILTER_MONICAS, ADD_MONICA, SET_SHOW_MONICA } from '../actions'
import * as api from '../api'

const initialState = [];
let mapS = api.getMonicas().then(monicas => monicas.map(x => initialState.push(x)))

const monicas = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_MONICAS:
      return [
        ...state = initialState    
      ]
    case FILTER_MONICAS:
      return [
        ...state = initialState.filter(monica => (monica.id === action.monica))
      ]
    case ADD_MONICA:
        return [
          ...state.concat(action.monica)
        ]
    default:
      return []
  }
}

export default monicas
