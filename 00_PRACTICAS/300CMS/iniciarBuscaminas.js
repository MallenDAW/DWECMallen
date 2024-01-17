// ---- LÓGICA -------

window.addEventListener("load", inicio, false);

function inicio() {
  document.getElementById("ok").addEventListener("submit", elegirNivel, false);
} //inicio

function elegirNivel(evento) {
  evento.preventDefault(); //evitamos que al enviar el formulario se refresque la página

  if(confirm('¿Elegir esta dificultad?')){
  
  document.querySelector('input').value="RESETEAR";
  let filas, columnas, dificultad;
  dificultad = document.getElementById("nivel").value;
  //según la dificultad seleccionada

  switch (dificultad) {
    case "FÁCIL":
      filas = columnas = 9;
      break;
      
      case "MEDIO":
        filas = columnas = 13;
        break;
        
      case "DIFÍCIL":
        filas = columnas = 19;
        break;
        }
    
    dibujarTableroHTML(filas, columnas);
}

}//elegirNivel

// ---- FUNCIONES -------

function dibujarTableroHTML(filas, columnas) {
  
  let boton, intro;
  let tablero = document.getElementById("tablero"); //recogemos la etiqueta main donde guardar el tablero
  tablero.remove(); //eliminamos el contenido por si ya hubiera un tablero
  tablero=document.createElement("main"); //creamos la etiqueta main
  tablero.id="tablero"; //asignamos a main el id=tablero
  document.body.appendChild(tablero); //agregamos la etiqueta al body

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

function numeroAleatorio(numeroMinas) {
  Math.floor(Math.random());
} //numeroAleatorio

function colocarBombasTableroJS() {} //colocarBombasTableroJS
