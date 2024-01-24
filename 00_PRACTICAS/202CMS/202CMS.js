window.addEventListener("load", iniciar, false);

function iniciar() {
  document.getElementById("enviar", validar);
} //iniciar()

function validar() {


  //
} //validar()


function validarDNI(nif) {
  // Separamos el número y la letra al DNI
  let numeroDNI = parseInt(nif.slice(0, 8), 10);
  let letraDNI = nif.charAt(8);

  // Letras validas del DNI
  let letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";

  // sacamos la letra según el número del NIF 
  let posicion = numeroDNI % 23;

  // sacamos la letra de las posibles letras válidas
  let letraCalculada = letrasDNI.charAt(posicion);

  // Comprobamos que la letra calculada coincida con el NIF a validar
  if (letraCalculada.toUpperCase() === letraDNI.toUpperCase()) {
    return true;
  } else {
    return false;
  }
}//validarDNI()