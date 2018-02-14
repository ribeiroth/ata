export const fetchMonicas = () => (
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

export function setShowMonica(id){
  fetch('http://localhost:3004/monicas/'+id, {
    method: 'PATCH',
    body: JSON.stringify({"show":true}),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
}






