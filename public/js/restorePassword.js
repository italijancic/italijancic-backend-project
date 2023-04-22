
document.querySelector('#register').addEventListener('click', (evt) => {
  evt.preventDefault()

  const body = {
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value
  }

  fetch('http://localhost:3000/api/restorePassword', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(response => {
      if (response.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Info',
          text: 'Password restored',
          confirmButtonText: 'Ok',
        }).then(result => {
          if (result.isConfirmed) {
            window.location.replace('http://localhost:3000/login')
          }
        })
      }
      else {
        console.log(response)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: `${response.message}`,
          confirmButtonText: 'Retry',
        }).then(result => {
          if (result.isConfirmed) {
            location.reload()
          }
        })
      }

    })
    .catch(error => {
      console.error(error)
    })

})