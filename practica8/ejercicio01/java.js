//a función esBlanco, que ayudará a determinar su uno de los campos requeridos esta vacío
function esBlanco(entradaCampo){
  if(entradaCampo.type === "checkbox"){
      if(entradaCampo.checked){
          return false;
      }
      return true;
  }

  if (entradaCampo.value === ""){
      return true;
  }
  return false;
}

//  Crear dos funciones para aplicar el estilo de error a travé de JS
function estiloRojo(entradaDiv){
  entradaDiv.style.backgroundColor = 'rgb(170, 0, 0)';
  entradaDiv.parentNode.style.backgroundColor = 'rgb(170, 0, 0)';
  entradaDiv.parentNode.style.color = 'white';
}

function estiloReset(entradaDiv){
  entradaDiv.parentNode.style.backgroundColor = 'white';
  entradaDiv.parentNode.style.color = 'black';
  entradaDiv.style.backgroundColor = 'white';
}

// Recuperar los elementos obligatorios del formulario, podemos hacerlo agregando una clase a  los elementos requeridos de la página HTML
var entradadasRequeridas = document.querySelectorAll(".requerido");

for (let elemento of entradadasRequeridas){
  elemento.onfocus = function () {
      this.style.backgroundColor = 'yellow';
  }
}

// Obtener el elemento formulario usando el método getElementById(), Si el formulario no tiene id se debé agregar. Después agregar los eventos de validación 
var formulario = document.getElementById("formulario");

formulario.onsubmit = function (event){
  let error = false;

  for(let elemento of entradadasRequeridas){
      if(esBlanco(elemento)){
          event.preventDefault();
          estiloRojo(elemento);
          error = true;
      }
      else{
          estiloReset(elemento);
      }
  }

  if(error){
      let requeridos = document.querySelector("#error");
      requeridos.classList.remove('oculto');
      requeridos.classList.add('mensajeError');
      let mensajeError = document.querySelector("#errorMensaje");
      mensajeError.textContent = "Debes proporcionar todos los campos marcados como obligatorios";
  }
}

formulario.onreset = function(event){
  let mensajeError = document.querySelector('#error');
  mensajeError.classList.add('oculto');
  mensajeError.classList.remove('mensajeError');
  for(let elemento of entradadasRequeridas){
      estiloReset(elemento);
  }
}