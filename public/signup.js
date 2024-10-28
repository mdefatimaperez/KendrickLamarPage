//ESTE ARCHIVO CONTIENE FRONT

/*
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const passwordError = document.getElementById('passwordError');

function login() {
    if (emailInput.value.length >5 || passwordInput.value.length >5) {
     
        
     
     
        swal({
            title: "UPS!",
            text: "Completa los campos para continuar",
            icon: "warning",
            
        });
    } else {
        console.log('Inicio de sesión exitoso!');
    }
}

//error contraseña corta
passwordInput.addEventListener('input', function () {
    if (passwordInput.value.length < 6) {
        passwordError.textContent = '*Tu respuesta es demasiado corta*';
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
    }
});
**/

//CREAR USUARIO 

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;

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
      window.location.href = '/index.html';
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error(error);
  }
});
