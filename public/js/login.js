
// Send message on button click
document.querySelector('#restorePassword').addEventListener('click', (evt) => {
  evt.preventDefault()

  fetch('http://localhost:3000/api/restorePassword', {
    method: 'POST',
    body: JSON.stringify({ email: document.querySelector('#email').value }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => {
      console.log(response)
      if (response.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Info',
          text: 'Check your inbox to restore your password',
          confirmButtonText: 'Ok',
        }).then(result => {
          if (result.isConfirmed) {
            window.location.replace('http://localhost:3000/login')
          }
        })

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error sending email to restore password, check no empty email field',
        })
      }
    })
    .catch(error => {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Check no empty email field',
        confirmButtonText: 'Retry',
      }).then(result => {
        if (result.isConfirmed) {
          window.location.replace('http://localhost:3000/login')
        }
      })
    })


})