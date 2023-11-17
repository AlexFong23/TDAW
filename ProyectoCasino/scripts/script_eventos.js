// Lista de eventos
const eventos = [
    { nombre: "Partido de fútbol", opciones: ["Gana 2.00", "Empata 3.50", "Pierde 4.50"] },
    { nombre: "Carrera de Fórmula 1", opciones: ["Gana 1.80", "Segundo lugar 2.50", "Retiro del piloto 5.00"] },
    { nombre: "Torneo de tenis", opciones: ["Gana 1.90", "Más de 3.5 sets 2.20", "Retiro de un jugador 6.50"] },
    { nombre: "Carrera de caballos", opciones: ["Caballo 1 gana 5.00", "Caballo 2 gana 4.00", "Empate 8.00"] },
    { nombre: "Campeonato de golf", opciones: ["Ganador 3.00", "Hoyo en uno 15.00", "Retiro de un jugador 7.50"] },
    { nombre: "Partida de ajedrez", opciones: ["Gana con jaque mate 2.50", "Empate 3.20", "Tablas por tiempo 6.00"] },
    { nombre: "Competencia de natación", opciones: ["Nadador 1 gana 2.80", "Nadador 2 gana 3.00", "Descalificación 10.00"] },
    { nombre: "Juego de baloncesto", opciones: ["Local por más de 10 puntos 2.20", "Empate 4.50", "Visitante en tiempo extra 5.50"] },
    { nombre: "Maratón", opciones: ["Corredor 1 llega primero 3.50", "Corredor 2 llega primero 3.80", "Ningún corredor completa 12.00"] },
    { nombre: "Partido de cricket", opciones: ["Local por más de 50 carreras 2.00", "Empate 6.00", "Visitante por menos de 10 carreras 4.50"] },
];



showNotification();

showOtherNotification();


// Función para mostrar la otra notificación
function showOtherNotification() {
    var otherNotificationContainer = document.getElementById('otherNotificationContainer');
    otherNotificationContainer.style.display = 'block';
}

// Función para cerrar la otra notificación
function closeOtherNotification() {
    var otherNotificationContainer = document.getElementById('otherNotificationContainer');
    otherNotificationContainer.style.display = 'none';
}

// Función para mostrar la notificación
function showNotification() {
    var notificationContainer = document.getElementById('notificationContainer');
    notificationContainer.style.display = 'block';
}

// Función para cerrar la notificación
function closeNotification() {
    var notificationContainer = document.getElementById('notificationContainer');
    notificationContainer.style.display = 'none';
}

// Función para generar la lista de eventos
function generarListaEventos() {
    const eventosLista = document.getElementById("evento-vista");

    eventos.forEach(evento => {
        const eventoElemento = document.createElement("section");
        eventoElemento.classList.add("apuesta");

        const nombreEvento = document.createElement("article");
        nombreEvento.classList.add("evento");

        const etiqueta = document.createElement("h3");
        etiqueta.textContent = evento.nombre;
        etiqueta.id = "nomEvento";  // Puedes cambiar "miId" por el id que desees


        nombreEvento.appendChild(etiqueta);

        const momiosElemento = document.createElement("article");
        momiosElemento.classList.add("momios");

        evento.opciones.forEach(opcion => {
            const botonElemento = document.createElement("a");
            //botonElemento.addEventListener("click",openSidebar);
            botonElemento.addEventListener("click", function (event) {
                openSidebar(event);
                apostar(event);
            });
            botonElemento.classList.add("boton");

            const botonTexto = document.createElement("button");
            botonTexto.innerHTML = opcion;

            botonElemento.appendChild(botonTexto);
            momiosElemento.appendChild(botonElemento);
        });

        eventoElemento.appendChild(nombreEvento);
        eventoElemento.appendChild(momiosElemento);
        eventosLista.appendChild(eventoElemento);
    });
}

generarListaEventos();

function apostar(event) {
    const botonMomio = event.currentTarget;

    // Si encontramos un botón que cumple con las condiciones
    if (botonMomio) {
        // Obtén el momio del botón clicado
        const momio = obtenerMomio(botonMomio);

        // Actualiza el contenido del elemento con id "momio"
        let etiqueta = document.getElementById('momio');
        etiqueta.innerText = momio;

        // Obtener el contenido del elemento h3 con id 'nomEvento'
        let etiqueta2 = document.getElementById('nomEvento');
        let nombreEvento = etiqueta2.innerHTML;

        // Asignar el contenido al elemento h3 con id 'nombreEvento'
        let etiqueta3 = document.getElementById('nombreEvento');
        etiqueta3.innerText = nombreEvento;

    }
}

function obtenerMomio(elementoBoton) {
    // Obtenemos el contenido del botón
    const contenidoBoton = elementoBoton.textContent.trim();

    // Separamos las palabras del contenido
    const palabras = contenidoBoton.split(/\s+/);

    // Filtramos las palabras que parecen números
    const numeros = palabras.filter(palabra => !isNaN(parseFloat(palabra)));

    // Tomamos el primer número encontrado (asumiendo que es el momio)
    const momio = parseFloat(numeros[0]);

    return momio;
}

function obtenerMomioTexto(elementoBoton) {
    // Obtenemos el texto del botón
    const contenidoBoton = elementoBoton.innerText.trim();

    // Separamos las palabras del contenido
    const palabras = contenidoBoton.split(/\s+/);

    // Filtramos las palabras que parecen números
    const numeros = palabras.filter(palabra => !isNaN(parseFloat(palabra)));

    // Tomamos el primer número encontrado (asumiendo que es el momio)
    const momio = parseFloat(numeros[0]);

    console.log(momio);

    return momio;
}


function openSidebar(event) {
    //document.getElementById("sidebar").style.display = block;
    document.getElementById("sidebar").style.width = "30%"; // Ajusta el porcentaje según tus necesidades
    cancelar();
}

function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
    cancelar();
}


// Función para validar que solo se ingresen cantidades numéricas
function validarCantidad() {
    let inputCantidad = document.getElementById('cantidadInput');
    inputCantidad.value = inputCantidad.value.replace(/[^0-9]/g, ''); // Eliminar caracteres no numéricos
}

// Función para sumar diez a la cantidad
function sumarCantidad() {
    let inputCantidad = document.getElementById('cantidadInput');
    let cantidad = parseInt(inputCantidad.value) || 0;
    cantidad += 10;
    inputCantidad.value = cantidad;
    calcularGanancia()
}

// Función para restar diez a la cantidad
function restarCantidad() {
    let inputCantidad = document.getElementById('cantidadInput');
    let cantidad = parseInt(inputCantidad.value) || 0;
    if (cantidad >= 10) {
        cantidad -= 10;
        inputCantidad.value = cantidad;
    }
    calcularGanancia()
}

function calcularGanancia() {
    let inputCantidad = document.getElementById('cantidadInput');
    let momio = parseFloat(document.getElementById('momio').textContent) || 0;
    let cantidad = parseInt(inputCantidad.value) || 0;
    let ganancia = (momio * cantidad)-cantidad;

    // Actualizar la etiqueta de Ganancia
    document.getElementById('ganancia').innerText = '$' + ganancia.toFixed(2);
}

function cancelar() {
    document.getElementById('cantidadInput').value = '';
    document.getElementById('ganancia').innerText = '$0';
}


function validateLogin() {
    var aceptarCambioMomio = document.getElementById('cambioMomio').checked;
    var noComercial = document.getElementById('comercial').checked;
    var errorMessage = document.getElementById('error');

    // Reinicia el mensaje de error
    errorMessage.style.display = 'none';

    // Validación simple, puedes ajustar según tus necesidades
    if (!aceptarCambioMomio && !noComercial) {
        errorMessage.style.display = 'block';
        errorMessage.innerText = 'Por favor, acepta los términos y condiciones.';
        return false;
    }

    alert("Apuesta realizada.");
    return false; 
}

