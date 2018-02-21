export const getMonicas = () => (
    fetch('http://localhost:3004/monicas', {
      method: 'GET'
    })
    .then(response => response.json())
  )

export function saveMonicas(data){
  fetch('http://localhost:3004/monicas', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
}

export function setShowMonica(id, value){
  fetch('http://localhost:3004/monicas/'+id, {
    method: 'PATCH',
    body: JSON.stringify({"show":value}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
}

export function updateMonicaScore(id, value){
  fetch('http://localhost:3004/monicas/'+id, {
    method: 'PATCH',
    body: JSON.stringify({"score":value}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
}

export function deleteMonica(id) {
  fetch('http://localhost:3004/monicas/'+id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
}








