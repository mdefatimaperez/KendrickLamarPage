//CREAR USUARIO 

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;
 console.log(nombre)
  try {
    const response = await fetch('/signup', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, apellido, email, contraseña })
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      window.location.href = '/login.html';
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error(error);
  }
});
