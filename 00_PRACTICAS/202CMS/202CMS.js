//Load
window.addEventListener("load", iniciar, false);

function iniciar() {

  document.getElementById("enviar").addEventListener('click', validar);
  document.getElementById("all").addEventListener('click', checkTodos);
  document.getElementById("lunes").addEventListener('click', checkTodos);
} //iniciar()


function validar(evento) {
  limpiarError();
  evento.preventDefault();

  //Incluimos un setTimeout() para que el confirm() no salte antes de limpiarError()
  setTimeout(() => {
    if (
      validarNombre() &&
      validarNIF() &&
      validarFecha() &&
      validarMensaje() &&
      confirm("¿Quieres enviar estos datos?")
    ) {
      document.getElementById('miFormulario').submit();
    }
  }, 10);

} //validar()


// ---------- Validación por html y codigo sencillo
function validarNombre() {
  let elemento = document.getElementById("nombre");

  if (elemento.value == "") {

    error(elemento, 'No se admite el campo nombre vacío');
    return false;
  }
  return true;
} //validarNombre()


function validarNIF() {

  let nif = document.getElementById('nif').value;

  //Separamos el número y la letra del DNI
  let numeroDNI = parseInt(nif.slice(0, 8), 10);
  let letraDNI = nif.charAt(8);

  //Letras validas del DNI
  let letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";

  //Sacamos la letra según el número del NIF
  let posicion = numeroDNI % 23;

  //Sacamos la letra de las posibles letras válidas
  let letraCalculada = letrasDNI.charAt(posicion);

  //Comprobamos que la letra calculada coincida con la del NIF a validar
  if (letraCalculada.toUpperCase() === letraDNI.toUpperCase()) {
    return true;
  } else {
    error(document.getElementById('nif'), 'El NIF introducido es incorrecto');
    return false;
  }
} //validarDNI()


function validarFecha() {
  let elemento = document.getElementById('matriculacion');
  return true

}//validarFecha()



function checkTodos(){

  let checkbox=Array.from(document.forms[0].dispo);

  if(this.id=='all'){
    if(this.checked==true){
        
      checkbox.forEach(element => {
          element.checked=true;
      });
      
      }else{
        checkbox.forEach(element => {
          element.checked=false;
      });
    }
  }else if(!checkbox.some((value)=>{value==false})){
    document.getElementById('all').checked=false;
  }
}//checkTodos()


// ---------- Validación por API checkValidity()
function validarMensaje() {
  let elemento = document.getElementById('textArea');
  if (!elemento.checkValidity()) {
    // error(elemento);
    if (elemento.validity.valueMissing) {
      error(elemento, 'No puede dejar el mensaje vacío');
    }
    if (elemento.validity.tooLong) {
      error(elemento, 'Máximo de 500 caracteres en el mensaje');
    }
    return false;
  }
  return true;
}//validarMensaje()





// ----------- FUNCIONES DE ERROR

function error(elemento, mensaje) {
  document.getElementById("mensajeError").innerHTML = mensaje;
  elemento.className = "error";
  elemento.focus();
} //error()

function limpiarError() {
  let formulario = document.forms[0];
  for (let i = 0; i < formulario.elements.length; i++) {
    formulario.elements[i].className = "";
  }
  document.getElementById("mensajeError").innerHTML = "";
} //limpiarError()
