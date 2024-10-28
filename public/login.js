const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const contraseña = document.getElementById('contraseña').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, contraseña })
    });

    if (response.ok) {
      const data = await response.json();
      // Almacenar el token JWT en el almacenamiento local
      localStorage.setItem('token', data.token);
      // Redirigir a la página principal o a una página protegida
      window.location.href = '/index.html';
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    console.error(error);
  }
});