function apostar(event) {

    console.log('hola')
    const botonMomio = event.currentTarget;

        // Si encontramos un botón que cumple con las condiciones
        if (botonMomio) {
            // Obtén el momio del botón clicado
            const momio = obtenerMomio(botonMomio);
    
            let etiqueta = document.getElementById('momio');

            etiqueta.innerText = momio;
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

    console.log(momio)

    return momio;
}