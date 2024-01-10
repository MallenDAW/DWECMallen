// ---- LÓGICA -------

window.addEventListener("load", inicio, false);

function inicio() {
  document.getElementById("ok").addEventListener("submit", elegirNivel, false);
} //inicio

function elegirNivel(evento) {
  evento.preventDefault();
  let filas, columnas, dificultad;
  dificultad = document.getElementById("nivel").value;
  //según la dificultad seleccionada

  switch (dificultad) {
    case "FÁCIL":
      filas = columnas = 9;
      dibujarTableroHTML(filas, columnas);
      break;

    case "MEDIO":
      filas = columnas = 13;
      dibujarTableroHTML(filas, columnas);
      break;

    case "DIFÍCIL":
      filas = columnas = 19;
      dibujarTableroHTML(filas, columnas);
      break;
  }
}//elegirNivel

// ---- FUNCIONES -------

function dibujarTableroHTML(filas, columnas) {
  let tablero = document.getElementById("tablero"); //etiqueta Main donde guardar el tablero
  let boton, intro;

  for (let indiceFila = 0; indiceFila < filas; indiceFila++) {
    for (let inidiceColumna = 0; inidiceColumna < columnas; inidiceColumna++) {
      boton = document.createElement("button"); //Creamos el boton
      boton.className = parseInt(indiceFila +""+ inidiceColumna); //Le damos una clase con su coordenada y la pasamos a numero entero
      tablero.appendChild(boton); //Metemos el boton en el main
    }
    intro = document.createElement("br"); //Creamos un salto de linea
    tablero.appendChild(intro); //Introducimos un salto de linea
  }
}//dibujarTableroHTML

function generarTableroJS() {} //generarTableroJS

function calcularNumMinas(x, y) {
  let dificultad;
  dificultad = document.getElementById("nivel").value;
  switch (dificultad) {
    case "FÁCIL":
      break;

    case "MEDIO":
      break;

    case "DIFÍCIL":
      break;
  }
} //calcularNumMinas

function numeroAleatorio(array, numeroMinas) {
  Math.floor(Math.random());
} //numeroAleatorio

function colocarBombasTableroJS() {} //colocarBombasTableroJS
