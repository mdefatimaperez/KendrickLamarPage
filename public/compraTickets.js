// EL SIGUIENTE CODIGO CORRESPONDE AL NOMBRE DEL USUARIO
let nombre = prompt("Cuál es tu nombre?").toUpperCase();
while (nombre.length < 3) {
    nombre = prompt(
        "Mmmm, tu nombre no puede ser tan corto, ingresa al menos 3 letras",
    ).toUpperCase();
}
const span = document.getElementById("nombre");
span.textContent = `${nombre}`;

// Función para obtener la edad del usuario
function obtenerEdad() {
    let edad = parseInt(prompt("Ingresa tu edad:"));
    return edad;
}

// Función para mostrar SweetAlert si es menor de edad
function mostrarAlertaMenor() {
    swal({
        title: "Acceso restringido",
        text: "¡Lo sentimos! No se permiten menores de edad en este evento.",
        icon: "warning",
    });
}

// Función para deshabilitar los botones de compra
function deshabilitarBotones() {
    const botonesCompra = document.querySelectorAll('.boton-compra'); // Selecciona todos los botones de compra

    // Recorre cada botón y deshabilítalo
    botonesCompra.forEach(boton => {
        boton.disabled = true; 

        boton.style.backgroundColor = 'gray';
        boton.style.color = 'black';
    });
}

// Lógica principal
function verificarEdad() {
    let edad = obtenerEdad();

    if (edad < 18) {
        mostrarAlertaMenor();
        deshabilitarBotones();
    }
}

// Llama a la función verificarEdad() al cargar la página
window.onload = verificarEdad;



// EL SIGUIENTE CODIGO CORRESPONDE A COMPRA DE TICKETS
function getTickets(hayTickets, lugar) {
    if (hayTickets) {
        swal({
            title: "Tickets Adquiridos!",
            text: "Felicitaciones, " + nombre + ", has conseguido entradas para el concierto en " + lugar + "!",
            icon: "success",
        });
    } else {
        swal({
            title: "Lo sentimos",
            text: "No hay tickets disponibles para el concierto en " + lugar + ".",
            icon: "error",
        });
    }
}