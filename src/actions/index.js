export const RECEIVE_MONICAS = 'RECEIVE_MONICAS'
export const FILTER_MONICAS = 'FILTER_MONICAS'
export const ADD_MONICA = 'ADD_MONICA'

export const receiveMonicas = (monicas)=> ({
  type: RECEIVE_MONICAS,
  monicas
})

export const filterMonicas = (monica) => ({
  type: FILTER_MONICAS,
  monica
})

export const addMonica = (monica) => ({
  type: ADD_MONICA,
  monica
})



