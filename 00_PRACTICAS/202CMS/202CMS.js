
//Creamos un listener de Load para que todo el html este cargado antes de 
window.addEventListener("load", iniciar, false);




// --------------  [  LISTENER  ] -------------- //

function iniciar() {

  document.getElementById("enviar").addEventListener('click', validar);
  document.getElementById("textArea").addEventListener('keyup', contadorCaracteres);
  document.getElementById("cursos").addEventListener('change', cursoAcademico);


  //Usamos la DELEGACIÓN DE EVENTOS a nuestro favor, utilizando la PROPAGACIÓN
  //El listener escucha un elemento contenedor, podemos capturar que elemento lo ha disparado.
  document.getElementById("dias").addEventListener('click', checkTodos);
  /*

      PROPAGACIÓN (bubble) funciona de la siguiente manera:

        -Un elemento dispara un evento
        -El evento sube a su elemento padre
        -Esto se repite hasta que llega al elemento html
  

      DELEGACIÓN DE EVENTOS

        Para ahorrarnos tener que poner manualmente un listener para cada elemento,
        podemos poner un listener a su elemento padre.
        Para saber quien dispara el evento tendremos que utilizar event.target       
  
  */

} //iniciar()




// --------------  [  VALIDACIONES ] -------------- //


function validar(evento) {

  //Limpiamos los campos de error que puedan exsistir
  limpiarError();
  evento.preventDefault();

  //Incluimos un setTimeout() para que el confirm() no salte antes de limpiarError()
  setTimeout(() => {
    if (
      validarNombre() &&  
      validarNIF() &&
      validarMensaje() &&
      validarCheck() &&
      confirm("¿Quieres enviar estos datos?")
    ) {
      document.getElementById('miFormulario').submit();
    }
  }, 10);

} //validar()


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

  //Letras validas para un DNI
  let letrasDNI = "TRWAGMYFPDXBNJZSQVHLCKE";

  //Sacamos la letra según el número del NIF
  let posicion = numeroDNI % 23;

  //Sacamos la letra de las posibles letras válidas
  let letraCalculada = letrasDNI.charAt(posicion);

  //Comprobamos que la letra calculada coincida con la del NIF a validar
  if (letraCalculada.toUpperCase() === letraDNI.toUpperCase()) {
    return true;

  }else if(nif===""){
    error(document.getElementById('nif'), 'El NIF es un campo obligatorio');
    return false;
  }else if(nif.length>9 ){
    error(document.getElementById('nif'), 'El NIF tiene que tener un máximo de 9 caracteres');
    return false;
  }else if(nif.length<7 ){
    error(document.getElementById('nif'), 'El NIF tiene que tener un mínimo de 7 caracteres');
    return false;
  }else {
    error(document.getElementById('nif'), `El NIF '${nif}' es incorrecto`);
    return false;
  }
} //validarNIF()



function validarCheck(evento) {

  //propagacion
  let arrayDias = Array.from(document.forms[0].dispo);
  let contador=0;

  arrayDias.forEach(element => {
    if(element.checked==true) contador++;
  });

  if(contador >= 2){

    return true;
  } else{
    error(document.getElementById('dias'), 'Hay que marcar 2 como mínimo');
   return false; 
  }

}//validaCheck()


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





// --------------  [  FUNCIONALIDADES ] -------------- //


function cursoAcademico(){

  //Si pulsan en añadir
  if(this.value==="crear"){
    let nuevo=prompt("Inserta el campo nuevo"); //Nuevo elemento a añadir

    //Creamos un option y agregamos 
    let opcion=document.createElement("option"); 
    opcion.textContent=nuevo;

    //Insertamos el option al final antes de la opcion "Añadir..."
    this.insertBefore(opcion,this.lastElementChild); //(elemento a insertar,posicion a insertar)
  }
}//cursoAcademico()


function checkTodos(evento) {

  //Guardamos en un array todos los elementos con nombre dispo para poder iterar 
  let checkbox = Array.from(document.forms[0].dispo);

  //Si pulsa sobre todos
  if (evento.target.id == 'all') {

    //Seleccionar todos
    if (evento.target.checked == true) {

      checkbox.forEach(element => {
        element.checked = true;
      });

      //Deseleccionar todos
    } else {
      checkbox.forEach(element => {
        element.checked = false;
      });
    }

    //En cuanto algun elemento deja de estar checked se deselecciona la opcion todos   
  } else if (evento.target.id != 'all') {
    document.getElementById('all').checked = false;
  }
}//checkTodos()


function contadorCaracteres() {
  let numero = document.getElementById('textArea').value.length;
  let elemento = document.getElementById('contCaracteres');

  switch (true) {
    case numero > 250 && numero <= 450:
      elemento.style.color='orange';
      break;
    case numero > 450:
      elemento.style.color='red';
      break;
    default:
      elemento.style.color='green';
      break;
  }

  document.getElementById('contCaracteres').innerHTML = 500 - numero;
}//contadorCaracteres()




// --------------  [  GESTIÓN ERRORES ] -------------- //


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
