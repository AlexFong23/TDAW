var miniaturas = document.querySelectorAll('.miniatura');

miniaturas.forEach(function (miniatura) {
    miniatura.addEventListener('mouseenter', function () {
        // Nuevo elemento imagen grande
        var imagenGrande = document.createElement('img');
        imagenGrande.src = this.src;
        imagenGrande.classList.add('imagen-grande');

        // Obtener varios elementos del estilo de la imagen 
        var rect = this.getBoundingClientRect();

        // Posicionamos la imagen 30 pixeles a la derecha
        imagenGrande.style.left = rect.left + rect.width + 25 + 'px';
        imagenGrande.style.top = rect.top + 'px';

        var factorAgrandamiento = 1.5;  // Escala de agrandamietno

        // Operaciones para agrandar las imagenes
        imagenGrande.style.width = (rect.width * factorAgrandamiento) + 'px';
        imagenGrande.style.height = (rect.height * factorAgrandamiento) + 'px';

        document.body.appendChild(imagenGrande);

        // Cambiamos el display 
        imagenGrande.style.display = 'block';
    });

    miniatura.addEventListener('mouseleave', function () {
        // Oculta y elimina la imagen grande al salir del hover
        var imagenGrande = document.querySelector('.imagen-grande');
        if (imagenGrande) {
            imagenGrande.style.display = 'none';
            document.body.removeChild(imagenGrande);
        }
    });
});


document.getElementById('filtrar').addEventListener('click', function () {
    // Obtengo el valor de la selección 
    var opcionSeleccionada = document.getElementById('filtroSelect').value;

    // Index de la opción seleccionada
    var index = document.getElementById('filtroSelect').selectedIndex

    // Obtengo el texto seleccionado
    var textoSeleccionado = document.getElementById('filtroSelect').options[index].textContent;

    // Iterar sobre las filas dentro de la tabla con el id "art" y mostrar u ocultar según la opción seleccionada
    var tabla = document.getElementById('art').getElementsByTagName('table')[0];
    var filas = tabla.getElementsByTagName('tr');

    // Cambio el display de las tr que tenga diferente descripción 
    for (var i = 1; i < filas.length; i++) {
        var generoFila = filas[i].cells[5].textContent;

        if (opcionSeleccionada === '0' || textoSeleccionado === generoFila) {
            filas[i].style.display = 'table-row';
        } else {
            filas[i].style.display = 'none';
        }
    }
});



function mostrarEditor(idFila) {
    // Obtener los datos de la fila seleccionada
    var fila = document.getElementById(idFila);
    var titulo = fila.cells[2].textContent;
    var artista = fila.cells[3].textContent;
    var año = fila.cells[4].textContent;
    var genero = fila.cells[5].textContent;
    var imagenSrc = fila.cells[1].querySelector('img').src;

    // Contenido del div editor
    var contenidoModal = `
    <h2>Editar</h2>
    <img src="${imagenSrc}" alt="${titulo}">
    <label for="titulo">Título:</label>
    <input type="text" id="titulo" value="${titulo}">
    <label for="artista">Artista:</label>
    <input type="text" id="artista" value="${artista}">
    <label for="año">Año:</label>
    <input type="text" id="año" value="${año}">
    <label for="genero">Género:</label>
    <input type="text" id="genero" value="${genero}">
    <button onclick="cambiarElementos('${idFila}'); cerrarEditor();">Cambiar</button>
  `;

    // Crear y mostrar el modal
    var modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = contenidoModal;
    document.body.appendChild(modal);
}

function cerrarEditor() {
    // Eliminar el modal del DOM
    var modal = document.querySelector('.modal');
    if (modal) {
      modal.parentNode.removeChild(modal);
    }
}

function cambiarElementos(idFila) {
    // Obtener los valores de los inputs del modal
    var nuevoTitulo = document.getElementById('titulo').value;
    var nuevoArtista = document.getElementById('artista').value;
    var nuevoAño = document.getElementById('año').value;
    var nuevoGenero = document.getElementById('genero').value;

    // Actualizar los elementos de la fila en la tabla
    var fila = document.getElementById(idFila);
    fila.cells[2].innerHTML = `<em>${nuevoTitulo}</em>`;
    fila.cells[3].textContent = nuevoArtista;
    fila.cells[4].textContent = nuevoAño;
    fila.cells[5].textContent = nuevoGenero;

    // Cerrar el modal
    cerrarEditor();
}









