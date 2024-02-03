

//Esperamos a que cargue la página para ejecutar el código
window.addEventListener("load", inicio);


// ------------ LISTENERS ------------ \\

function inicio() {
  document.getElementById("ok").addEventListener("submit", elegirNivel);             //---> elegir nivel
  document.getElementById("tablero").addEventListener("contextmenu", pulsarBoton);   //---> poner bandera
  document.getElementById("tablero").addEventListener("click", pulsarBoton);         //---> pulsar boton
} //inicio


// ------------ TEST ------------ \\

function prueba(e) {
  console.log("prueba");
  console.log(e);
  console.log(e.target);

}


// ------------ VARIABLES GLOBALES ------------ \\

//creamos un array para guardar los atributos de cada casilla del tablero
let arrayTablero = new Array();
let lado, numeroBanderas,celdasRestantes;




// ------------ UTILIDADES ------------ \\



function ponerClase(casilla, nombreClase) {
  document.getElementById(casilla.posicionX + " " + casilla.posicionY).classList.add(nombreClase);
}//ponerClase(casilla,nombreClase)



function ponerNumero(casilla, numero) {
  document.getElementById(casilla.posicionX + " " + casilla.posicionY).textContent = numero;
}//ponerClase(casilla,nombreClase)



function numeroMinas() {
  //El numero de minas será el 13% del tamaño del tablero
  return (arrayTablero.length * 0.13).toFixed(0);
} //numeroMinas()



function encontrarCasilla(x, y) {
  //segun el id del boton que pulsen, buscamos esa posicion en el array
  return arrayTablero.find(casilla => casilla.posicionX === x && casilla.posicionY === y);
}//encontrarCasilla(x, y)






// ------------ LÓGICA ------------ \\


function elegirNivel(evento) {
  evento.preventDefault(); //evitamos que al enviar el formulario se refresque la página

  if (confirm('¿Elegir esta dificultad?')) {

    document.querySelector('input').value = "RESETEAR";
    let dificultad;
    dificultad = document.getElementById("nivel").value;

    //vaciamos el array para que no se acumulen los valores del tablero anterior
    arrayTablero = [];

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
    console.log(arrayTablero.length);

    //calculamos y mostramos el número de banderas
    numeroBanderas = numeroMinas();
    celdasRestantes = arrayTablero.length - 1 - numeroBanderas;
    document.getElementById("flag").innerHTML = numeroBanderas;

  }

}//elegirNivel(evento)





function dibujarTableroHTML(lado) {

  let boton, intro;
  let tablero = document.getElementById("tablero"); //recogemos la etiqueta main donde guardar el tablero

  //Vaciamos el tablero por si ya hay uno (mientras tenga un primer hijo sigue borrando)
  while (tablero.firstChild) {
    tablero.removeChild(tablero.firstChild);
  }

  for (let indiceFila = 0; indiceFila < lado; indiceFila++) {

    //Creamos un div para cada fila y su indice
    let div = document.createElement("div");
    div.id = indiceFila;


    for (let inidiceColumna = 0; inidiceColumna < lado; inidiceColumna++) {

      //Creamos el boton y le ponemos como id una coordenada
      boton = document.createElement("button");
      boton.id = indiceFila + " " + inidiceColumna;

      //Metemos el boton en el div
      div.appendChild(boton);

      //A la vez que creamos el tablero, generamos un array acorde a su tamaño
      //Metemos un objeto en el array por cada botón del tablero con las misma propiedades (salvo la posición) 
      arrayTablero.push({
        posicionX: indiceFila,
        posicionY: inidiceColumna,
        bloquear: false,
        bomba: false,
        banderilla: false,
        contador: 0
      });

    }

    tablero.appendChild(div); //Introducimos los div de cada fila en el tablero
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

    if (casilla && casilla.bomba === false) {
      i++; //el FOR solo avanza cuando se ha colocado una mina en una casilla correcta
      casilla.bomba = true;
      //document.getElementById(x + " " + y).className = "bomba";
      sumarAlrededorBomba(casilla);
      // console.log(casilla);
    }
  }
} //colocarMinas(numMinas)



function sumarAlrededorBomba(casilla) {

  //console.log(casilla);

  //posicion de las filas
  for (let i = 0; i < 3; i++) {

    //recorremos una columna
    for (let j = 0; j < 3; j++) {
      let x = casilla.posicionX - 1 + i;
      let y = casilla.posicionY - 1 + j;
      let casillaAdyacente = encontrarCasilla(x, y);

      //Si esta dentro de los límites del tablero
      if ((x >= 0 && x < lado) && (y >= 0 && y < lado)) {

        //si la casilla tiene una bomba el contador sera -1
        if (casillaAdyacente.bomba === true) {
          casillaAdyacente.contador = -1;
          //document.getElementById(x + " " + y).textContent = "";

          //si no es una bomba suma 1 al contador 
        } else if (casillaAdyacente.bomba === false) {
          casillaAdyacente.contador++;
          //document.getElementById(x + " " + y).textContent = casillaAdyacente.contador;
        }
      }
    }
  }
}//sumarAlrededorBomba(casilla)





function pulsarBoton(evento) {

  //recojemos la posición del botón que ha sido pulsado en X e Y
  let boton = evento.target.id.split(" ");

  //buscamos el botón en el array
  let casilla = encontrarCasilla(parseInt(boton[0]), parseInt(boton[1]));


  //si quiere pulsar el boton
  if (evento.type == "click") {

    //si no le quedan celdas has ganado
    if(celdasRestantes == 0){
      arrayTablero.forEach(element => {
        element.bloquear = true;
      });

      /* HAS GANADOOOOOOOOOO */
      Swal.fire({
        title: "!VICTORIA ROYAL!",
        text: "BUENA PARTIDA",
        imageUrl: "img/victoria.png",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image"
      });
     
      
    }

    if (casilla.bloquear == false) {
      //si hay una bandera no se puede pulsar
      if (casilla.banderilla == true) {
        evento.preventDefault();
        alert("QUITA LA BANDERA ANTES DE PULSAR");

        //si la casilla tiene una bomba, GAME OVER
      } else if (casilla.bomba == true) {
        ponerClase(casilla, "bomba");
        arrayTablero.forEach(element => {
          element.bloquear = true;
          if (element.bomba == true) {
            ponerClase(element, "bomba");
          }
        });

        /* HAS PERDIDO */
      Swal.fire({
        title: "MALA SUERTE",
        text: "PRUEBA OTRA VEZ",
        imageUrl: "img/derrota.jpg",
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Custom image",
        
      });




        //si la casilla tiene un numero se muestra
      } else if (casilla.contador > 0) {
        casilla.bloquear = true;
        celdasRestantes--;
        ponerNumero(casilla, casilla.contador);
        ponerClase(casilla, "numero");

        //si esta vacio se llama a buscar Minas
      } else {
        buscarMinas(casilla);
      }
    }


    //si quiere poner bandera
  } else if (evento.type == "contextmenu") {

    //evitamos que salga el menú contextual
    evento.preventDefault();

    //si la casilla esta descubierta se bloquea y no se puede interactuar con ella
    if (casilla.bloquear == false) {

      //Si la casilla no tiene bandera se pone
      if (casilla.banderilla == false) {
        casilla.banderilla = true;
        evento.target.classList.toggle("bandera");
        numeroBanderas--;

        //Si ya hay una bandera se quita  
      } else {
        casilla.banderilla = false;
        evento.target.classList.toggle("bandera");
        numeroBanderas++;
      }
    }

    document.getElementById("flag").innerHTML = numeroBanderas;
  }
}//pulsarBoton(evento)



/* Funcion recursiva buscarMinas() 
    - si el contador es mayor que 0, se muestra el contador
    - Si el contador es 0, se muestra el boton y se llama a si misma para buscar minas adyacentes
*/

function buscarMinas(casilla) {
  //console.log('Buscando minas...');
  //console.log(casilla, casilla.contador);

  //recorremos fila
  for (let i = 0; i < 3; i++) {

    //recorremos una columna
    for (let j = 0; j < 3; j++) {
      let x = casilla.posicionX - 1 + i;
      let y = casilla.posicionY - 1 + j;
      let casillaAdyacente = encontrarCasilla(x, y);

      //Si esta dentro de los límites del tablero
      if ((x >= 0 && x < lado) && (y >= 0 && y < lado)) {

        //si la casilla tiene una bomba o ya ha sido descubierta nos la saltamos
        if (
          casillaAdyacente.contador < 0 ||
          casillaAdyacente.banderilla == true ||
          document.getElementById(casillaAdyacente.posicionX + " " + casillaAdyacente.posicionY).classList.contains("descubierto") ||
          document.getElementById(casillaAdyacente.posicionX + " " + casillaAdyacente.posicionY).classList.contains("numero")) {
          continue;

          //si tiene un contador se muestra
        } else if (casillaAdyacente.contador > 0) {
          celdasRestantes--;
          casillaAdyacente.bloquear = true;
          ponerNumero(casillaAdyacente, casillaAdyacente.contador);
          ponerClase(casillaAdyacente, "numero");

        }

        //si esta vacio se descubre y se vuelve a llama a si msmas
        else if (casillaAdyacente.contador == 0) {
          celdasRestantes--;
          casillaAdyacente.bloquear = true;
          ponerClase(casillaAdyacente, "descubierto");
          buscarMinas(casillaAdyacente);
        }
      }
    }
  }
}//buscarMinas(casilla)
