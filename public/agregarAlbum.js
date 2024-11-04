const newAlbumForm = document.getElementById("newAlbumForm");
const albumListItems = document.getElementById("albumListItems");
let currentAlbumId = null; // Variable para almacenar el ID del álbum actual

// Función para obtener las canciones de un álbum específico
const getSongsForAlbum = async (albumId) => {
  try {
    const response = await fetch(`/album/${albumId}/songs`);
    const songs = await response.json();
    return songs;
  } catch (error) {
    console.error("Error fetching songs for album:", error);
  }
};

// OBTENER TODOS LOS ALBUMS
const getAlbums = async () => {

  try {
    const response = await fetch("/album");
    const albums = await response.json();
    displayAlbums(albums);
  } catch (error) {
    console.error("Error fetching albums:", error);
  }
};

// AGREGAR ALBUM
const addAlbum = async (albumData) => {
  try {

    const response = await fetch("/album", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(albumData),
    });
    if (response.ok) {
      getAlbums();
      newAlbumForm.reset();
      alert("Álbum agregado correctamente!");
    } else {
      const error = await response.json();
      alert("Error al agregar álbum:", error.message);
    }
  } catch (error) {
    console.error("Error adding album:", error);
  }
};

// ELIMINAR ALBUM
const deleteAlbum = async (albumId) => {

  try {
    const response = await fetch(`/album/${albumId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getAlbums();
      alert("Álbum eliminado correctamente!");
    } else {
      const error = await response.json();
      alert("Error al eliminar álbum:", error.message);
    }
  } catch (error) {
    console.error("Error deleting album:", error);
  }
};

// MOSTRAR ALBUMS

const displayAlbums = async (albums) => {
  const albumListItems = document.getElementById("albumListItems");
  albumListItems.innerHTML = ""; // Limpia la lista

  if (albums) {
    for (const album of albums) {
      const albumItem = document.createElement("li");
      albumItem.innerHTML = `
        <div class="flex p-6 border-b">
          <img class='w-24 h-24 object-cover' src="${album.portada}" alt="prueba">
          <div class="flex flex-col px-2 w-full"> 
            <span class="text-3xl text-white uppercase font-medium ">
              <h3 class="mb-2">${album.titulo}</h3>
            </span>
            <span class="text-2xl text-yellow-500 capitalize font-semibold pt-1">
              <p class="mb-2">Descripción: ${album.descripcion}</p>
            </span>
            <span class="text-base text-gray-500 uppercase font-medium ">
              <p class="mb-2">Año de Lanzamiento: ${album.añoLanzamiento}</p>  
            </span>
            <ul class="song-list" data-album-id="${album._id}" class="list-disc pl-5">
            </ul>
            <div class="flex justify-between p-2"> 
              <div class="flex gap-2">
                <button data-album-id="${album._id}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" onclick="openSongForm(this)">Agregar Canción</button>
                <button data-album-id="${album._id}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"">Eliminar Álbum</button>
                <button data-album-id="${album._id}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500" onclick="openEditForm(this)">Editar Álbum</button>
              </div>
              <div class="flex">
                <img class="w-6 h-6 cursor-pointer" src="img/star.png" /> 
                <img class="w-6 h-6 cursor-pointer" src="img/star.png" />
                <img class="w-6 h-6 cursor-pointer" src="img/star.png" />
                <img class="w-6 h-6 cursor-pointer" src="img/star.png" />
                <img class="w-6 h-6 cursor-pointer" src="img/star.png" />
              </div>
            </div>
          </div>
        </div>
      `;
      albumListItems.appendChild(albumItem);

      const deleteAlbumButton = albumItem.querySelector("button.bg-red-500");
      deleteAlbumButton.addEventListener("click", () => {
        const albumId = deleteAlbumButton.dataset.albumId;
        if (confirm('¿Estás seguro de que quieres eliminar el álbum?')) {
          deleteAlbum(albumId); // Llama a la función para eliminar el álbum
        }
      });

      // Obtener y mostrar las canciones del álbum actual
      const songs = await getSongsForAlbum(album._id);
      if (songs) {
        const songList = albumItem.querySelector(".song-list");
        songs.forEach((cancion, index) => {
          const songItem = document.createElement("li");
          songItem.innerHTML = `
            <h3>Canciones de este album</h3>
            <div class="bg-black flex border-black"> 
              <span>${cancion.titulo} - ${cancion.duracion} segundos</span>
              <span class="ml-2" data-song-id="${cancion._id}" data-album-id="${album._id}" data-song-index="${index}">
                <svg class="w-4 h-4 text-red-500 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </span>
            </div>
          `;
          songList.appendChild(songItem);

          // Agregar evento para eliminar la canción
          const deleteButton = songItem.querySelector("span.ml-2");
          deleteButton.addEventListener("click", () => {
            const songId = deleteButton.dataset.songId;
            const albumId = deleteButton.dataset.albumId;
            const songIndex = deleteButton.dataset.songIndex;

            if (
              confirm(
                `¿Estás seguro de que quieres eliminar el álbum ${cancion.titulo}?`
              )
            ) {
              deleteSongFromAlbum(albumId, songId, songIndex);
            }
          });
        });
      }
    }
  }
};




         
//EDIT ALBUM

function openEditForm(button) {
  const albumId = button.dataset.albumId;

  // Obtener los datos del álbum
  fetch(`/album/${albumId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener el álbum');
      }
      return response.json();
    })
    .then(album => {
      // Crear el formulario pop-up
      const popup = document.createElement('div');
      popup.classList.add('fixed', 'inset-0', 'flex', 'items-center', 'justify-center', 'z-50', 'bg-black', 'bg-opacity-50');
      popup.innerHTML = `
        <div class="bg-white p-8 rounded-lg shadow-md w-1/3">
          <h2 class="text-xl font-bold mb-4">Editar Álbum</h2>
          <form id="editForm" class="flex flex-col gap-4">
            <input type="hidden" id="albumId" value="${album._id}">
            <div>
              <label for="editTitle" class="block text-gray-700 text-sm font-bold mb-2">Título:</label>
              <input type="text" id="editTitle" value="${album.titulo}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div>
              <label for="editDescription" class="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
              <textarea minlength="5" id="editDescription" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">${album.descripcion}</textarea>
            </div>
            <div>
              <label for="editYear" class="block text-gray-700 text-sm font-bold mb-2">Año de Lanzamiento:</label>
              <input type="number" id="editYear" value="${album.añoLanzamiento}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div>
              <label for="editCover" class="block text-gray-700 text-sm font-bold mb-2">Portada:</label>
              <input type="text" id="editCover" value="${album.portada}" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="flex justify-end gap-4">
              <button type="button" onclick="closeEditForm()" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancelar</button>
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar Cambios</button>
            </div>
          </form>
        </div>
      `;

      // Agregar el formulario al DOM
      document.body.appendChild(popup);

      // Agregar evento de envío al formulario
      const editForm = popup.querySelector("#editForm");
      editForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await updateAlbum(albumId, editForm);
        closeEditForm();
      });
    })
    .catch(error => {
      console.error('Error al obtener el álbum:', error);
    });
}

// Función para cerrar el formulario
function closeEditForm() {
  const popup = document.querySelector('.fixed.inset-0');
  if (popup) {
    popup.remove();
  }
}

// Función para actualizar el álbum
async function updateAlbum(albumId, form) {
  const title = form.querySelector("#editTitle").value;
  const description = form.querySelector("#editDescription").value;
  const year = parseInt(form.querySelector("#editYear").value);
  const cover = form.querySelector("#editCover").value;

  try {
    const response = await fetch(`/album/${albumId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        titulo: title,
        descripcion: description,
        añoLanzamiento: year,
        portada: cover
      })
    });

    if (response.ok) {
      getAlbums(); // Actualizar la lista de álbumes
      alert('Álbum actualizado correctamente');
    } else {
      console.error('Error al actualizar el álbum:', response.statusText);
      alert('Error al actualizar el álbum');
    }
  } catch (error) {
    console.error('Error al actualizar el álbum:', error);
    alert('Error al actualizar el álbum');
  }
}

//SE ACTIVA CUANDO EL USUARIO ENVIA LA INFO DEL NUEVO ALBUM

window.addEventListener("DOMContentLoaded", () => {
  const newAlbumForm = document.getElementById("newAlbumForm");
  newAlbumForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const albumData = {
      titulo: document.getElementById("titulo").value,
      descripcion: document.getElementById("descripcion").value,
      añoLanzamiento: parseInt(document.getElementById("añoLanzamiento").value),
      portada: document.getElementById("portada").value,
      canciones: [], // Inicializar el array de canciones
    };
    await addAlbum(albumData);
  });
});

//---------------------------- FORM , DELETE , ADD CANCIONES

// AGREGAR CANCION AL ALBUM
const addSongToAlbum = async (albumId, songData) => {
  try {
    const response = await fetch(`/album/${albumId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ canciones: songData }),
    });
    if (response.ok) {
      getAlbums();
    } else {
      const error = await response.json();
      alert("Error al agregar canción:", error.message);
    }
  } catch (error) {
    console.error("Error adding song:", error);
  }
};

// Función para eliminar una canción del álbum
const deleteSongFromAlbum = async (albumId, songId, songIndex) => {
  try {

    // Actualizar el array de canciones en el servidor (puedes usar PATCH o DELETE)
    const response = await fetch(`/album/${albumId}/songs/${songId}`, {
      method: "DELETE", // O "PATCH" si necesitas actualizar el array
    });
    if (response.ok) {
      getAlbums(); // Actualiza la lista de álbumes
    } else {
      const error = await response.json();
      alert("Error al eliminar la canción:", error.message);
    }
  } catch (error) {
    console.error("Error deleting song:", error);
  }
};

// Función para abrir el formulario de agregar canción
function openSongForm(button) {
  // Obtener el ID del álbum
  const albumId = button.dataset.albumId;

  // Crear el formulario para cancion
  const songForm = document.createElement("div");
  songForm.innerHTML = `
    <div class="fixed text-white inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div class="bg-black rounded-lg shadow-lg p-6 w-1/3">
        <h2 class="text-lg font-bold mb-2">Agregar Canción</h2>
        <form class="flex flex-col gap-2" id="add-song-form">
          <div>
            <label for="tituloCancion" class="block font-medium mb-1">Título de la Canción:</label>
            <input type="text" id="tituloCancion" name="tituloCancion" required class="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div>
            <label for="duracionCancion" class="block font-medium mb-1">Duración (en segundos):</label>
            <input type="number" id="duracionCancion" name="duracionCancion" required class="border rounded px-3 py-2 focus:outline-none focus:ring-2 text-black focus:ring-blue-500">
          </div>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">Agregar Canción</button>
          <button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500" onclick="closeSongForm()">Cancelar</button>
        </form>
      </div>
    </div>
   `;

  // Agregar el formulario al DOM
  document.body.appendChild(songForm);

  // Agregar evento de envío al formulario
  const addSongForm = songForm.querySelector("#add-song-form");
  addSongForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const songData = {
      titulo: addSongForm.querySelector("#tituloCancion").value,
      duracion: parseInt(addSongForm.querySelector("#duracionCancion").value),
    };
    await addSongToAlbum(albumId, songData);
    closeSongForm();
  });
}

// Función para cerrar el formulario de agregar canción
function closeSongForm() {
  const songForm = document.querySelector(".fixed.inset-0");
  if (songForm) {
    songForm.remove();
  }
}

// Llamar a la función para mostrar los álbums después de que el DOM esté cargado.
window.addEventListener("DOMContentLoaded", getAlbums);

displayAlbums();