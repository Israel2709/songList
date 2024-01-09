/*Seleccionamos los campos del formulario*/
let userField = document.getElementById("user");
let titleField = document.getElementById("title");
let authorField = document.getElementById("author");

/*seleccionamos el botón que guardará la canción*/
let saveSongButton = document.getElementById("save-song");

/*esta función guarda una canción en la base de datos*/
const saveSong = async (song) => {
  let response = await fetch(
    "https://javascript30js-default-rtdb.firebaseio.com/songList/.json",
    {
      method: "POST",
      body: JSON.stringify(song),
    }
  );
  let data = await response.json();
  return data;
};

/*esta función trae todas las canciones de la base de datos*/
const getAllSongs = async () => {
  let response = await fetch(
    "https://javascript30js-default-rtdb.firebaseio.com/songList/.json"
  );
  let data = await response.json();
  /*ya que tenemos las canciones, imprimimos todas las canciones*/
  printAllSongs(data);
};

/*Función para borrar una canción*/

const deleteSong = async (songKey) => {
  let response = await fetch(
    `https://javascript30js-default-rtdb.firebaseio.com/songList/${songKey}/.json`,
    {
      method: "DELETE",
    }
  );
  let data = await response.json();
  return data;
};

/*esta función imprime todas las canciones*/
const printAllSongs = (songs) => {
  console.log(songs);
  let songsList = document.getElementById("songs-list");
  songsList.innerHTML = "";

  /*Aquí convertimos las canciones de la base de datos en un array*/
  let songsArray = Object.keys(songs).map((key) => ({ ...songs[key], key }));
  console.log(songsArray);

  /*iteramos en el array para crear un li por cada canción*/
  songsArray.forEach((song) => {
    let songItem = createSongItem(song);
    songsList.append(songItem);
  });
};

/*esta función crea un li que representa una canción*/
const createSongItem = (songData) => {
  let { title, author, user, key } = songData;
  let songLi = document.createElement("li");
  songLi.classList.add("list-group-item", "d-flex", "gap-3");

  let userSpan = document.createElement("span");
  let userSpanText = document.createTextNode(`Creada por: ${user}`);
  userSpan.append(userSpanText);

  let titleSpan = document.createElement("span");
  let titleSpanText = document.createTextNode(title);
  titleSpan.append(titleSpanText);

  let authorSpan = document.createElement("span");
  let authorSpanText = document.createTextNode(author);
  authorSpan.append(authorSpanText);

  let buttonWrapper = document.createElement("div");
  buttonWrapper.classList.add("d-flex", "gap-3");

  let favButton = document.createElement("button");
  favButton.classList.add("btn", "btn-primary");
  let favButtonText = document.createTextNode("Agregar a Favoritos");
  favButton.append(favButtonText);

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("btn", "btn-danger");

  let deleteButtonText = document.createTextNode("Eliminar");
  deleteButton.append(deleteButtonText);
  deleteButton.addEventListener("click", async () => {
    let data = await deleteSong(key);
    getAllSongs();
  });

  buttonWrapper.append(favButton, deleteButton);

  songLi.append(userSpan, titleSpan, authorSpan, buttonWrapper);

  return songLi;
};

saveSongButton.addEventListener("click", async (event) => {
  event.preventDefault();

  let user = userField.value;
  let title = titleField.value;
  let author = authorField.value;

  let song = { user, title, author };

  console.log(song);
  let result = await saveSong(song);
  console.log(result);
  getAllSongs();
});

getAllSongs();
