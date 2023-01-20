const socket = io()
let user = null

// Login
Swal.fire({
  title: 'Hola',
  input: 'text',
  text: 'Username',
  allowOutsideClick: false,
  inputValidator: (value) => {
    return !value && 'Username required field to continue'
  }
})
  .then((data) => {
    user = data.value
    socket.emit('newUser', user)
    document.querySelector('#name').innerHTML = data.value
  })


socket.on('wellcome', (data) => {
  let messages = ''
  data.forEach(msg => {
    messages = messages + `<strong>${msg.user}:</strong> ${msg.message}</br>`
  })
  document.querySelector('#messages').innerHTML = messages
})

socket.on('message', (data) => {
  let messages = ''
  data.forEach(msg => {
    messages = messages + `<strong>${msg.user}:</strong> ${msg.message}</br>`
  })
  document.querySelector('#messages').innerHTML = messages
})

socket.on('newUser', (newUser) => {
  Swal.fire({
    text: `New user ${newUser}`,
    toast: true,
    position: 'top-right'
  })
})

// Send message event handler
document.querySelector('#submit').addEventListener('click', (evt) => {
  evt.preventDefault()
  const message = document.querySelector('#message').value.trim()
  document.querySelector('#message').value = ''
  socket.emit('message', { user: user, message: message })
})