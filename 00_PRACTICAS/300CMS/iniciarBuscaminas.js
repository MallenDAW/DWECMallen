// ---- LÓGICA -------



function elegirNivel(){
  let filas,columnas,dificultad;
  dificultad=document.getElementById("nivel").value; 
  //según la dificultad seleccionada 

  switch (dificultad) {
    case "FÁCIL":
      filas=columnas=9
      document.getElementById("tablero").innerHTML=dibujarTableroHTML(filas,columnas);
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

let tablero="<table border=1>"

for (let indiceFila = 0; indiceFila < filas; indiceFila++) {
   tablero+="\n<tr>"
  for (let inidiceColumna = 0; inidiceColumna < columnas; inidiceColumna++) {
    tablero+="\n<td>"+indiceFila+"-"+inidiceColumna+"</td>";
   }
   tablero+="\n</tr>";
}
tablero+="\n</table>";
console.log(tablero);
return tablero;

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

