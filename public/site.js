//EL SIGUIENTE CODIGO CORRESPONDE A : Profile dropdown
const userMenu = document.getElementById("user-menu");
const userMenuButton = document.getElementById("user-menu-button");
const token = localStorage.getItem('token');


// Función para mostrar el menú
function showMenu() {
  userMenu.classList.remove("hidden");
}
// Función para ocultar el menú
function hideMenu() {
  userMenu.classList.add("hidden");
}
// Mostrar el menú al hacer clic en el botón
userMenuButton.addEventListener("click", showMenu);
// Ocultar el menú al hacer clic fuera del menú
document.addEventListener("click", function (event) {
  if (
    !userMenu.contains(event.target) &&
    !userMenuButton.contains(event.target)
  ) {
    hideMenu();
  }
});

// EL SIGUIENTE CODIGO CORRESPONDE AL MENU MOVIL
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenuContent = document.getElementById("mobile-menu-content");

mobileMenuButton.addEventListener("click", () => {
  mobileMenuContent.classList.toggle("hidden");

  // Actualizar el atributo aria-expanded del botón
  mobileMenuButton.setAttribute(
    "aria-expanded",
    mobileMenuContent.classList.contains("hidden") ? "false" : "true"
  );

  // Cambiar el ícono del botón
  const openIcon = mobileMenuButton.querySelector("svg.block");
  const closeIcon = mobileMenuButton.querySelector("svg.hidden");
  openIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

/*
// FUNCIONES PARA  ESTILO ALBUM

function handleAlbumHover(albumContainerId) {
  const albumContainer = document.getElementById(albumContainerId);
  const albumImage = document.getElementById(
    `albumImage${albumContainerId.slice(-1)}`
  );
  const hoverText = document.getElementById(
    `hoverText${albumContainerId.slice(-1)}`
  );

  albumContainer.addEventListener("mouseover", () => {
    albumImage.style.filter = "blur(3px)";
    hoverText.classList.toggle("hidden");
    hoverText.classList.add("block");
  });

  albumContainer.addEventListener("mouseout", () => {
    albumImage.style.filter = "blur(0px)";
    hoverText.classList.remove("block");
    hoverText.classList.add("hidden");
  });

  hoverText.addEventListener("click", () => {
    // Mapeo de IDs de contenedores con URLs
    const urls = {
      albumContainer1: "album1.html",
      albumContainer2: "album2.html",
      albumContainer3: "album3.html",
    };
    window.location.href = urls[albumContainerId]; // Redirige a la URL correspondiente
  });
}

// Función para inicializar los eventos de los álbums después de que el DOM esté cargado
function initAlbumHoverEvents() {
  const albumContainers = [
    "albumContainer1",
    "albumContainer2",
    "albumContainer3",
  ];

  for (const albumContainerId of albumContainers) {
    handleAlbumHover(albumContainerId);
  }
}

// Llama a la función para inicializar los eventos de los álbums 
// después de que el DOM esté cargado.
window.addEventListener("DOMContentLoaded", initAlbumHoverEvents);

//ME GUSTA ALBUM

const favoriteIcons = document.querySelectorAll(".favorite-icon");

favoriteIcons.forEach((favoriteIcon) => {
  const favoriteSvg = favoriteIcon.querySelector("svg");

  favoriteIcon.addEventListener("click", () => {
    favoriteSvg.classList.toggle("text-red-500");
    favoriteSvg.classList.toggle("text-gray-400");
  });
});

//get
async function obtenerUserById() {
  try {
    var id = document.querySelector(".idClase").value;
    var nombre = document.querySelector(".nombre");
    var apellido = document.querySelector(".apellido");
    var email = document.querySelector(".email");
    var contraseña = document.querySelector(".contraseña");

    const response = await axios.get("http://localhost:3000/user/" + id); //se le agrega el enpoint :D
    nombre.textContent = response.data.nombre;
    apellido.textContent = response.data.apellido;
    // email.textContent=response.data.email
    // contraseña.textContent=response.data.contraseña
    // variable               respuesta api

    //ejemplos con input
    email.value = response.data.email;
    contraseña.value = response.data.contraseña;

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

document.querySelector(".getUser").addEventListener("click", obtenerUserById);
//                      clase asignada en button           funcion :D
*/

/*
//post

async function crearUser() {
  try {
    var nombre = document.querySelector("input");

    const response = await axios.post("http://localhost:3000/user/", {
      nombre: nombre.value, //valor de la variable que llega del front uwu
      apellido: apellido.value,
      email: email.value,
      contraseña: contraseña.value,
    }); //se le agrega el endpoint :D
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

//la funcion solo se ejecuta si el usuario hace click :D
document
  .querySelector(".enviarUsuarioNuevo")
  .addEventListener("click", crearUser);


//OBTENER USUARIO POR NOMBRE,solo el primero

async function obtenerUserByName() {
  try {
    var nombreBuscado = document.querySelector(".nombreClase").value; // Obtener el nombre del input

    // Seleccionar los elementos SPAN
    var nombre = document.querySelector(".nombre2");
    var apellido = document.querySelector(".apellido2");
    var email = document.querySelector(".email2");
    var contraseña = document.querySelector(".contraseña2");

    // Se asume que el backend tiene una ruta para buscar por nombre
    const response = await axios.get(`http://localhost:3000/user/nombre/${nombreBuscado}`); 

    // Verificar si el usuario fue encontrado
    if (response.data.error) {
      // Mostrar un mensaje de error al usuario
      alert("Usuario no encontrado");
      return; // Detiene la ejecución de la función
    }

    // Actualizar el contenido de los elementos SPAN
    nombre.textContent = response.data.nombre;
    apellido.textContent = response.data.apellido;
    email.textContent = response.data.email;
    contraseña.textContent = response.data.contraseña;

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

document.querySelector(".obtenerPorNombre").addEventListener("click", obtenerUserByName);

const resultadosDiv = document.getElementById("resultadosAll");

async function buscarUsuarios() {
  const nombreBuscado = document.getElementById("nombreAll").value;
  resultadosDiv.innerHTML = ""; // Limpiar resultados anteriores

  try {
    const response = await fetch(
      `http://localhost:3000/user/nombre/${nombreBuscado}`
    );
    const usuarios = await response.json();

    if (usuarios.length > 0) {
      usuarios.forEach((usuario) => {
        const usuarioDiv = document.createElement("div");
        usuarioDiv.innerHTML = `
          <h2>${usuario.nombre} ${usuario.apellido}</h2>
          <p>Email: ${usuario.email}</p>
          <p>Email: ${usuario.contraseña}</p>
          <p>Email: ${usuario.apellido}</p>`;
        resultadosDiv.appendChild(usuarioDiv);
      });
    } else {
      resultadosDiv.innerHTML =
        "<p>No se encontraron usuarios con ese nombre</p>";
    }
  } catch (error) {
    console.error("Error al buscar usuarios:", error);
    resultadosDiv.innerHTML = "<p>Error al buscar usuarios</p>";
  }
}

/* //CERRAR INICIAR SESION
const isLog = window.location.search.includes("user=true");
if(isLog){
   userMenu.insertAdjacentHTML("beforeend",'<a href="index.html" id="usuarioOn" class="block px-4 py-2 text-sm text-blue-500 hover:text-yellow-300"role="menuitem" tabindex="-1" id="user-menu-item-2">Cerrar sesion</a>')
}else{
  userMenu.insertAdjacentHTML("beforeend",'<a href="login.html" id="usuarioOn" class="block px-4 py-2 text-sm text-red-500 hover:text-yellow-300"role="menuitem" tabindex="-1" id="user-menu-item-2">Iniciar sesion</a>')
}*/


//LOGIN
if (token) {
  userMenu.insertAdjacentHTML("beforeend", `<a href="#" id="usuarioOn" class="block px-4 py-2 text-sm text-red-500 hover:text-yellow-300" role="menuitem" tabindex="-1" id="user-menu-item-2">Cerrar Sesion</a>`);

  // Agregar evento de clic para cerrar sesión
  const cerrarSesionBtn = document.getElementById('usuarioOn');
  cerrarSesionBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/index.html'; // Redirige al index
  });
} else {
  userMenu.insertAdjacentHTML("beforeend", `<a href="login.html" id="usuarioOn" class="block px-4 py-2 text-sm text-blue-500 hover:text-yellow-300" role="menuitem" tabindex="-1" id="user-menu-item-2">Iniciar Sesion</a>`);
}

