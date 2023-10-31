const entradaTarea = document.getElementById("tarea");
const botonTarea = document.getElementById("agregarTarea");
const listaTareas = document.getElementById("listaTareas");

function marcarElemento(event) {
    const tareaClicada = event.target;
    tareaClicada.classList.toggle("completado");
}


function agregarElemento() {
    const textoTarea = entradaTarea.value;

    if (textoTarea.trim() !== "") {
        const nuevaTarea = document.createElement("li");
        nuevaTarea.textContent = textoTarea;


        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        
        botonEliminar.addEventListener("click", () => {
            listaTareas.removeChild(nuevaTarea);
        });
        

        nuevaTarea.addEventListener("click", marcarElemento);

        nuevaTarea.appendChild(botonEliminar);

        listaTareas.appendChild(nuevaTarea);

        entradaTarea.value = "";
    }
}


botonTarea.addEventListener("click", agregarElemento);