const userMenuButton = document.getElementById('user-menu-button');
const userMenu = document.getElementById('user-menu');

// Función para mostrar u ocultar el menú
userMenuButton.addEventListener('click', () => {
  userMenu.classList.toggle('hidden');
  updateMenu();
});

// Función para actualizar el menú en base a la autenticación
function updateMenu() {
  // Limpiar el contenido del menú
  userMenu.innerHTML = '';

  // Obtener el token de localStorage
  const token = localStorage.getItem('token');

  if (token) {
    // Mostrar "Cerrar sesión" si el usuario está autenticado
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.innerText = 'Cerrar Sesión';
    logoutLink.addEventListener('click', handleLogout);

    userMenu.appendChild(logoutLink);
  } else {
    // Mostrar "Iniciar sesión" si el usuario no está autenticado
    const loginLink = document.createElement('a');
    loginLink.href = '/login.html'; // Asegúrate de que esta ruta apunte a tu formulario de inicio de sesión
    loginLink.innerText = 'Iniciar Sesión';

    userMenu.appendChild(loginLink);
  }
}

// Función para cerrar sesión
function handleLogout() {
  // Elimina el token de localStorage
  localStorage.removeItem('token');
  alert('Has cerrado sesión.');
  updateMenu();
}

// Actualizar el menú en carga de página
updateMenu();