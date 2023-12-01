
//Cogemos el elemento por su clase

//Como getElementByClassName devuelve un array hay que decirle el elemento (en este caso la primera posicion [0])
//Se puede usar también document.querySelector('.trash')
// document.getElementsByClassName("trash")[0].addEventListener("click", function () {
  
//   document.getElementsByClassName("trash")[0].style.backgroundImage="none"; //Tambien puede ponerse :backgroundImage="url('')";  
//   alert("La papelera se ha vaciado");
// },false);


document.getElementsByClassName("trash")[0].addEventListener("click", function () {
  
 this.style.backgroundImage="url('vacia.png')"; //Tambien puede ponerse :backgroundImage="url('')";  
 
 setTimeout(()=>alert("La papelera se ha vaciado"),50); //Para que se vacie la papelera y luego salte el alert

},false);


//Aoartado 2
document.addEventListener("contextmenu",function(){
  this.innerHTML="";
});

