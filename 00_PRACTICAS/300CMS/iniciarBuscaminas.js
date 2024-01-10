// ---- LÓGICA -------

window.addEventListener("load",inicio);

function inicio(){
  document.getElementById("ok").onclick(elegirNivel);
}


function elegirNivel(){
  let filas,columnas,dificultad;
  dificultad=document.getElementById("nivel").value;
  

  //según la dificultad seleccionada 

  switch (dificultad) {
    case "FÁCIL":
      filas=columnas=9
      dibujarTableroHTML(filas,columnas);
      break;

    case "MEDIO":
      filas=columnas=13;
      document.write(dibujarTableroHTML(filas,columnas));
      break;
  
    case "DIFÍCIL":
      filas=columnas=19;
      document.write(dibujarTableroHTML(filas,columnas));
      break;
  } 
}
// ---- FUNCIONES -------

function dibujarTableroHTML(filas,columnas){

let tablero=document.getElementById("tablero"); //etiqueta donde guardar el tablero
let boton,intro;

for (let indiceFila = 0; indiceFila < filas; indiceFila++) {
  for (let inidiceColumna = 0; inidiceColumna < columnas; inidiceColumna++) {
    boton=document.createElement("button");
    boton.id=indiceFila+inidiceColumna;
    tablero.appendChild(boton);
    // boton+="<button id=\""+indiceFila+inidiceColumna+"\"> X </button>";
   }
   intro=document.createElement("br");
   tablero.appendChild(intro);
  //  boton+="\n</br>";
}


// return a;

}//dibujarTableroHTML

function generarTableroJS(){

}//generarTableroJS



function calcularNumMinas(x,y){

  let dificultad;
  dificultad=document.getElementById("nivel").value; 
  switch (dificultad) {
    case "FÁCIL":
        
      break;
  
    case "MEDIO":
      
      break;
  
    case "DIFÍCIL":
      
      break;
  }

}//calcularNumMinas

function numeroAleatorio(array,numeroMinas){


  Math.floor(Math.random());

}//numeroAleatorio

function colocarBombasTableroJS(){

}//colocarBombasTableroJS

