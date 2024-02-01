// ---- LÓGICA -------

window.addEventListener("load", inicio, false);

function inicio() {
  document.getElementById("ok").addEventListener("submit", elegirNivel, false);
} //inicio


//creamos un array para guardar los atributos de cada casilla del tablero
let arrayTablero = new Array();
let lado;

function elegirNivel(evento) {
  evento.preventDefault(); //evitamos que al enviar el formulario se refresque la página

  if (confirm('¿Elegir esta dificultad?')) {

    document.querySelector('input').value = "RESETEAR";
    let dificultad;
    dificultad = document.getElementById("nivel").value;
    //según la dificultad seleccionada

    switch (dificultad) {
      case "FÁCIL":
        lado = 9;
        break;

      case "MEDIO":
        lado = 13;
        break;

      case "DIFÍCIL":
        lado = 19;
        break;
    }

    //Dibujamos el tablero en html y un array
    dibujarTableroHTML(lado);

    //Colocamos aleatoriamente minas en el array
    colocarMinas(numeroMinas());
    console.log(arrayTablero);
  }

}//elegirNivel

// ---- FUNCIONES -------

function dibujarTableroHTML(lado) {


  let boton, intro;
  let tablero = document.getElementById("tablero"); //recogemos la etiqueta main donde guardar el tablero
  tablero.remove(); //eliminamos el contenido por si ya hubiera un tablero
  tablero = document.createElement("main"); //creamos la etiqueta main
  tablero.id = "tablero"; //asignamos a main el id=tablero
  document.body.appendChild(tablero); //agregamos la etiqueta al body

  for (let indiceFila = 0; indiceFila < lado; indiceFila++) {
    for (let inidiceColumna = 0; inidiceColumna < lado; inidiceColumna++) {
      boton = document.createElement("button"); //Creamos el boton
      boton.className = indiceFila + " " + inidiceColumna; //Le damos una clase con su coordenada y la pasamos a numero entero
      tablero.appendChild(boton); //Metemos el boton en el main

      //A la vez que creamos el tablero, generamos un array acorde a su tamaño
      //Metemos un objeto en el array por cada posición del tablero con identicas propiedades (salvo la posiciónX y posiciónY) 
      arrayTablero.push({ 
        posicionX: indiceFila, 
        posicionY: inidiceColumna, 
        bomba: false,
        banderilla: false,
        contador: 0 
      });

    }
    intro = document.createElement("br"); //Creamos un salto de linea
    tablero.appendChild(intro); //Introducimos el salto de linea
  }
}//dibujarTableroHTML

function colocarMinas(numMinas) {

  for (let i = 0; i < numMinas;) {
    let x = Math.floor(Math.random() * lado);
    let y = Math.floor(Math.random() * lado);

    //comprobamos si la posicion aleatoria ya tiene una bomba
    let casilla = arrayTablero.find(casilla => casilla.posicionX === x && casilla.posicionY === y);

    if (casilla && casilla.bomba===false) {
      i++;
      casilla.bomba=true;
      
      // console.log(casilla);
    }
  }
} //colocarMinas


function numeroMinas() {
  //El numero de minas será el 13% del tamaño del tablero
  return (arrayTablero.length * 0.13).toFixed(0);
} //numeroMinas