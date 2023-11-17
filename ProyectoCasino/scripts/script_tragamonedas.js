var realizandoGiro = false;
var sonidosGiro = [new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3"),new Audio("res/sounds/spin.mp3")];
var sonidosMoneda = [new Audio("res/sounds/coin.mp3"),new Audio("res/sounds/coin.mp3"),new Audio("res/sounds/coin.mp3")];
var sonidoVictoria = new Audio("/res/sounds/win.mp3");
var sonidoDerrota = new Audio("/res/sounds/lose.mp3");
var audioHabilitado = false;
let estado = document.getElementById("estado");
var informacionVisible = true;

function hacerGiro() {
	if (realizandoGiro) { return null; }
	realizandoGiro = true;
	var cambios = generarAleatorio(1, 4) * 7
	var numeroRanura1 = cambios + generarAleatorio(1, 7)
	var numeroRanura2 = cambios + 2 * 7 + generarAleatorio(1, 7)
	var numeroRanura3 = cambios + 4 * 7 + generarAleatorio(1, 7)

	var i1 = 0;
	var i2 = 0;
	var i3 = 0;
	var sonido = 0
	estado.innerHTML = "GIRANDO"
	ranura1 = setInterval(girarRanura1, 50);
	ranura2 = setInterval(girarRanura2, 50);
	ranura3 = setInterval(girarRanura3, 50);

	function girarRanura1() {
		i1++;
		if (i1 >= numeroRanura1) {
			sonidosMoneda[0].play()
			clearInterval(ranura1);
			return null;
		}
		ranuraActual = document.getElementById("ranura1");
		if (ranuraActual.className == "a7") {
			ranuraActual.className = "a0";
		}
		ranuraActual.className = "a" + (parseInt(ranuraActual.className.substring(1)) + 1)
	}

	function girarRanura2() {
		i2++;
		if (i2 >= numeroRanura2) {
			sonidosMoneda[1].play()
			clearInterval(ranura2);
			return null;
		}
		ranuraActual = document.getElementById("ranura2");
		if (ranuraActual.className == "a7") {
			ranuraActual.className = "a0";
		}
		ranuraActual.className = "a" + (parseInt(ranuraActual.className.substring(1)) + 1)
	}

	function girarRanura3() {
		i3++;
		if (i3 >= numeroRanura3) {
			sonidosMoneda[2].play()
			clearInterval(ranura3);
			verificarVictoria();
			return null;
		}
		ranuraActual = document.getElementById("ranura3");
		if (ranuraActual.className == "a7") {
			ranuraActual.className = "a0";
		}
		sonido++;
		if (sonido == sonidosGiro.length) {
			sonido = 0;
		}
		sonidosGiro[sonido].play();
		ranuraActual.className = "a" + (parseInt(ranuraActual.className.substring(1)) + 1)
	}
}

function verificarVictoria() {
	var ranura1 = document.getElementById("ranura1").className
	var ranura2 = document.getElementById("ranura2").className
	var ranura3 = document.getElementById("ranura3").className

	if (((ranura1 == ranura2 && ranura2 == ranura3) ||
		(ranura1 == ranura2 && ranura3 == "a7") ||
		(ranura1 == ranura3 && ranura2 == "a7") ||
		(ranura2 == ranura3 && ranura1 == "a7") ||
		(ranura1 == ranura2 && ranura1 == "a7") ||
		(ranura1 == ranura3 && ranura1 == "a7") ||
		(ranura2 == ranura3 && ranura2 == "a7")) && !(ranura1 == ranura2 && ranura2 == ranura3 && ranura1 == "a7")) {
		estado.innerHTML = "¡HAS GANADO!";
		sonidoVictoria.play();
	} else {
		estado.innerHTML = "¡HAS PERDIDO!"
		sonidoDerrota.play();
	}
	realizandoGiro = false;
}

function toggleAudio() {
	if (!audioHabilitado) {
		audioHabilitado = !audioHabilitado;
		for (var x of sonidosGiro) {
			x.volume = 0.5;
		}
		for (var x of sonidosMoneda) {
			x.volume = 0.5;
		}
		sonidoVictoria.volume = 1.0;
		sonidoDerrota.volume = 1.0;
	} else {
		audioHabilitado = !audioHabilitado;
		for (var x of sonidosGiro) {
			x.volume = 0;
		}
		for (var x of sonidosMoneda) {
			x.volume = 0;
		}
		sonidoVictoria.volume = 0;
		sonidoDerrota.volume = 0;
	}
	document.getElementById("audio").src = "/res/icons/audio" + (audioHabilitado ? "On" : "Off") + ".png";
}

function generarAleatorio(min, max) {
	return Math.floor((Math.random() * (max - min + 1)) + min);
}


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
