export const RECEIVE_MONICAS = 'RECEIVE_MONICAS'
export const SEARCH_MONICAS = 'SEARCH_MONICAS'
export const FILTER_MONICAS = 'FILTER_MONICAS'
export const ADD_MONICA = 'ADD_MONICA'
export const SET_SHOW_MONICA = 'SET_SHOW_MONICA'

export const receiveMonicas = (monicas)=> ({
  type: RECEIVE_MONICAS,
  monicas
})

export const searchMonicas = (monica) => ({
  type: SEARCH_MONICAS,
  monica
})

export const filterMonicas = (monica) => ({
  type: FILTER_MONICAS,
  monica
})

export const addMonica = (monica) => ({
  type: ADD_MONICA,
  monica
})

export const setShowMonica = (monica) => ({
  type: SET_SHOW_MONICA,
  monica
})



