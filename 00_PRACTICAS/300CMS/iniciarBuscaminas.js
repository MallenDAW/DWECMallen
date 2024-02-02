
//Esperamos a que cargue la página para ejecutar el código
window.addEventListener("load", inicio);


// ------------ LISTENERS ------------ \\

function inicio() {
  document.getElementById("ok").addEventListener("submit", elegirNivel);         //---> elegir nivel
  document.getElementById("tablero").addEventListener("click", ponerBandera);    //---> PONER BANDERA
  //document.getElementById("tablero").addEventListener("click", descubrirCasilla);
} //inicio


// ------------ TEST ------------ \\

function prueba(e){
  console.log("prueba");
  console.log(e);
  console.log(e.target);

}


// ------------ VARIABLES GLOBALES ------------ \\

//creamos un array para guardar los atributos de cada casilla del tablero
let arrayTablero = new Array();
let lado;





// ------------ FUNCIONES ------------ \\


function elegirNivel(evento) {
  evento.preventDefault(); //evitamos que al enviar el formulario se refresque la página

  if (confirm('¿Elegir esta dificultad?')) {

    document.querySelector('input').value = "RESETEAR";
    let dificultad;
    dificultad = document.getElementById("nivel").value;
    
    //vaciamos el array para que no se acumulen los valores del tablero anterior
    arrayTablero=[]; 
    
    //según la dificultad seleccionada tenemos un tamaño de tablero
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

}//elegirNivel(evento)





function dibujarTableroHTML(lado) {


  let boton, intro;
  let tablero = document.getElementById("tablero"); //recogemos la etiqueta main donde guardar el tablero
  
  while (tablero.firstChild) {
    tablero.removeChild(tablero.firstChild);
  }

  for (let indiceFila = 0; indiceFila < lado; indiceFila++) {
    for (let inidiceColumna = 0; inidiceColumna < lado; inidiceColumna++) {
      boton = document.createElement("button"); //Creamos el boton
      boton.id = indiceFila + " " + inidiceColumna; //Le damos una id con su coordenada y la pasamos a numero entero
      tablero.appendChild(boton); //Metemos el boton en el main

      //A la vez que creamos el tablero, generamos un array acorde a su tamaño
      //Metemos un objeto en el array por cada botón del tablero con las misma propiedades (salvo la posición) 
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
}//dibujarTableroHTML(tablero)




function colocarMinas(numMinas) {

  //crearemos una coordenada X e Y aleatoria en funcion del numero de minas
  for (let i = 0; i < numMinas;) {

    //Creamos coordneadas aleatorias usando el lado como limite
    let x = Math.floor(Math.random() * lado);
    let y = Math.floor(Math.random() * lado);

    //comprobamos si la posición aleatoria existe y si ya tiene una bomba
    let casilla = encontrarCasilla(x, y);

    if (casilla && casilla.bomba===false) {
      i++; //el FOR solo avanza cuando se ha colocado una mina en una casilla correcta
      casilla.bomba=true;
      document.getElementById(x + " " + y).className = "bomba";
      // console.log(casilla);
    }
  }
} //colocarMinas(numMinas)




function numeroMinas() {
  //El numero de minas será el 13% del tamaño del tablero
  return (arrayTablero.length * 0.13).toFixed(0);
} //numeroMinas()



function encontrarCasilla(x, y) {
  //segun el id del boton que pulsen, buscamos esa posicion en el array
  return arrayTablero.find(casilla => casilla.posicionX === x && casilla.posicionY === y);
}//encontrarCasilla(x, y)



function ponerBandera(evento) {

  //evitamos que salga el menú contextual
  evento.preventDefault();

  //recojemos la posición del botón que ha sido pulsado
  let boton=evento.target.id.split(" ");

  //buscamos el botón en el array
  let casilla=encontrarCasilla(parseInt(boton[0]), parseInt(boton[1]));
  
  //Si la casilla no tiene bandera se pone
  if(casilla && casilla.banderilla==false){
    casilla.banderilla = true;
    evento.target.classList.toggle("bandera");

  //Si ya hay una bandera se quita  
  }else{
    casilla.banderilla = false;
    evento.target.classList.toggle("bandera");
  }
}//ponerBandera(evento)
