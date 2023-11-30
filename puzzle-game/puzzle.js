// Declarar matrizIncial en un ámbito global
let matrizIncial = null;

class MatrizJuego {
    num_nodo = 0;
    constructor(matriz = null, nodo_padre = null, ult_estado = null) {
        this.matriz = matriz;
        this.nodo_padre = nodo_padre;
        this.profundidad = nodo_padre ? nodo_padre.profundidad + 1 : 0;
        this.ult_estado = ult_estado;
        this.hijos = [];
        this.heuristica = this.calcularH() //+ this.profundidad;
        this.movimientos = 0;
    }

    encontrarPosicion(valor) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (this.matriz[i][j] === valor) {
                    return [i, j];
                }
            }
        }
    }

    intercambiarValores(pos1, pos2) {
        const temp = this.matriz[pos1[0]][pos1[1]];
        this.matriz[pos1[0]][pos1[1]] = this.matriz[pos2[0]][pos2[1]];
        this.matriz[pos2[0]][pos2[1]] = temp;
    }

    calcularH() {
        let distanciaTotal = 0;
        const sizeArray = this.matriz.length
        for (let i = 0; i < sizeArray; i++) {
            for (let j = 0; j < sizeArray; j++) {
                const valor = this.matriz[i][j] - 1;
                let x = valor % 4
                let y = Math.floor(valor/4)
                distanciaTotal += (Math.abs(j - x)) + (Math.abs(i - y));
            }
        }
        return distanciaTotal;
    }

    iniciarTiempo() {
        this.tiempoInicio = Date.now();
        this.tiempoIntervalo = setInterval(() => {
            this.actualizarEstadisticas();
        }, 1000);
    }
    
    detenerTiempo() {
        clearInterval(this.tiempoIntervalo);
    }

    actualizarEstadisticas() {
        const movimientosDiv = document.getElementById('movimientos');
        const tiempoDiv = document.getElementById('tiempo');
    
        movimientosDiv.innerText = `Movimientos: ${this.movimientos}`;
        tiempoDiv.innerText = `Tiempo: ${this.calcularTiempoTranscurrido()}s`;
    }
    
    reiniciarEstadisticas() {
        this.movimientos = 0;
        this.tiempoInicio = Date.now();
        this.actualizarEstadisticas();
    }

    calcularTiempoTranscurrido() {
        const tiempoActual = Date.now();
        const tiempoTranscurrido = Math.floor((tiempoActual - this.tiempoInicio) / 1000);
        return tiempoTranscurrido;
    }
    
}

class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift().element;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}


function crearBoton(index, matriz) {
    const boton = document.createElement("button");
    boton.classList.add('boton');
    if(index == 16){
        boton.textContent = index;
        boton.style.visibility = 'hidden';
        return boton;
    }
    boton.addEventListener('click',() => moverPieza(matriz));
    boton.textContent = index;
    return boton;
}

function iniciarJuego(row, col) {
    const cuadricula = document.querySelector('.cuadricula');
    let index = 1;
    const matriz = Array.from({ length: row }, () =>
        Array.from({ length: col }, () => index++)
    );
    matrizIncial = new MatrizJuego(matriz)

    matrizIncial.iniciarTiempo();

    for(let i = 0; i < col*row; i++)
        cuadricula.appendChild(crearBoton(i+1, matrizIncial));
}

function revolverPuzzle() {
    const cuadricula = document.querySelector('.cuadricula');
    cuadricula.innerHTML = '';

    matrizIncial.reiniciarEstadisticas();

    const matriz = Array.from({ length: 4 }, (_, i) => Array.from({ length: 4 }, (_, j) => i * 4 + j + 1));
    matriz.forEach((fila, i) => fila.forEach((_, j) => {
      const iRandom = Math.floor(Math.random() * (i + 1));
      const jRandom = Math.floor(Math.random() * (j + 1));
      [matriz[i][j], matriz[iRandom][jRandom]] = [matriz[iRandom][jRandom], matriz[i][j]];
    }));

    matrizIncial.matriz = matriz

    for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4; j++)
            cuadricula.appendChild(crearBoton(matriz[i][j], matrizIncial));
}

function moverPieza(matriz) {
    const coordenada = matriz.encontrarPosicion(16);
    const boton = event.target;
    const coordenada2 = matriz.encontrarPosicion(Number(boton.textContent));

    if (esAdyacente(coordenada, coordenada2)) {
        matriz.movimientos++;
        matriz.intercambiarValores(coordenada, coordenada2);
        intercambiarPosiciones();
        esMatrizObjetivo(matrizIncial.matriz)
    }
}

function esAdyacente(coordenada,coordenada2) {
    return (
        (coordenada[0] === coordenada2[0] - 1) && (coordenada[1] === coordenada2[1]) ||
        (coordenada[0] === coordenada2[0] + 1) && (coordenada[1] === coordenada2[1])||
        (coordenada[1] === coordenada2[1] - 1) && (coordenada[0] === coordenada2[0]) ||
        (coordenada[1] === coordenada2[1] + 1) && (coordenada[0] === coordenada2[0])
    );
}

function intercambiarPosiciones() {
    const cuadricula = document.querySelector('.cuadricula')
    const size = matrizIncial.matriz.length
    
    cuadricula.innerHTML = '';

    for(let i = 0; i < size; i++)
        for(let j = 0; j < size;j++)
            cuadricula.appendChild(crearBoton(matrizIncial.matriz[i][j], matrizIncial));

}

function mostrarMensajeGanador() {
    const mensajeDiv = document.getElementById('mensaje');
    const reiniciarBoton = document.getElementById('reiniciar');
    mensajeDiv.style.display = 'block';
    reiniciarBoton.style.display = 'block';
}
  
function ocultarMensajeYReiniciar() {
    const mensajeDiv = document.getElementById('mensaje');
    const reiniciarBoton = document.getElementById('reiniciar');
    mensajeDiv.style.display = 'none';
    reiniciarBoton.style.display = 'none';
    matrizIncial.reiniciarEstadisticas();
}

function esMatrizObjetivo(matrizActual) {
    let index=1;
    const sizeArray = matrizActual.length;

    const matrizObjetivo = Array.from({ length: sizeArray}, () =>
        Array.from({ length: sizeArray }, () => index++)
    );

    // Utilizar flat para convertir matrices en arreglos unidimensionales
    const arregloActual = matrizActual.flat();
    const arregloObjetivo = matrizObjetivo.flat();

    if(arregloActual.every((valor, indice) => valor === arregloObjetivo[indice])){
        mostrarMensajeGanador();
        matrizIncial.detenerTiempo();
        // Usar every para verificar si todos los elementos son iguales
        return true;
    }
}

function resolverPuzzle(matrizActual) {

    const coordenada = matrizActual.encontrarPosicion(16);

    if (matrizActual.ult_estado === 'izquierda') coordenada[1] -= 1;
    else if (matrizActual.ult_estado === 'arriba') coordenada[0] -= 1;
    else if (matrizActual.ult_estado === 'derecha') coordenada[1] += 1;
    else if (matrizActual.ult_estado === 'abajo') coordenada[0] += 1;

    const cuadricula = document.querySelector('.cuadricula')
    const size = matrizActual.matriz.length
    
    cuadricula.innerHTML = '';

    for(let i = 0; i < size; i++)
        for(let j = 0; j < size;j++)
            cuadricula.appendChild(crearBoton(matrizActual.matriz[i][j], matrizIncial));
}

function mostrarBFS(solucion) {
    let indice = solucion.length - 1;

    const intervalo = setInterval(() => {
        if (indice >= 0) {
            let nodoActual = solucion[indice];
            console.log(nodoActual.matriz)
            resolverPuzzle(nodoActual);
            indice--;
        } else {
            clearInterval(intervalo); 
        }
    }, 250); 
}

function searchA() {
    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(matrizIncial, matrizIncial.heuristica);

    while (!priorityQueue.isEmpty()) {
        let nodoActual = priorityQueue.dequeue();

        if (esMatrizObjetivo(nodoActual.matriz)) {
            console.log('Has encontrado la solución');
            const solucion = generarSolucion(nodoActual);
            mostrarBFS(solucion);
            break;
        }
        let hijos = calcularHijos(nodoActual);
        for(const hijo of hijos)
            priorityQueue.enqueue(hijo, hijo.heuristica);
    }
}

function generarSolucion(nodoActual) {
    const solucion = []
    while (nodoActual.nodo_padre !== null){
        solucion.push(nodoActual);
        nodoActual = nodoActual.nodo_padre
    }
    return solucion;
}


function calcularHijos(nodoActual) {

    // Movimientos
    let movimientos = ['izquierda', 'arriba', 'derecha', 'abajo'];
    // Lista que contendra las instancias de los posibles movimientos
    let nuevosNodos = [];
    const posicion = nodoActual.encontrarPosicion(16);
    const row = posicion[0];
    const col = posicion[1];

    let restriccion = calcularRestriccion(nodoActual.ult_estado);

    for (const movimiento of movimientos) {
        if (validarMovimiento(movimiento, restriccion, col, row)) {
            // Nueva matriz con el movimiento seleccionado 
            const matSwap = nodoActual.matriz.map(row => row.slice());

            // Realizar la nueva matriz de los posibles movimientos
            if (movimiento === 'izquierda') {
                [matSwap[row][col], matSwap[row][col - 1]] = [matSwap[row][col - 1], 16];
            } else if (movimiento === 'arriba') {
                [matSwap[row][col], matSwap[row - 1][col]] = [matSwap[row - 1][col], 16];
            } else if (movimiento === 'derecha') {
                [matSwap[row][col], matSwap[row][col + 1]] = [matSwap[row][col + 1], 16];
            } else if (movimiento === 'abajo') {
                [matSwap[row][col], matSwap[row + 1][col]] = [matSwap[row + 1][col], 16];
            }
            // Nuevo objeto de clase matrizJuego
            let nuevoNodo = new MatrizJuego(matSwap, nodoActual, movimiento);
            // Agregamos a los posibles nodos (movimientos)
            nuevosNodos.push(nuevoNodo);
            // A la propiedad hijos de nuestra instancia le agregamos los nuevos objetos MatrizJuego
            nodoActual.hijos.push(nuevoNodo);
        }
    }
    return nuevosNodos;
}

function validarMovimiento(movimiento, restriccion, col, fil) {
    return restriccion === movimiento ? false :
        movimiento === 'izquierda' ? col - 1 >= 0 :
        movimiento === 'arriba' ? fil - 1 >= 0 :
        movimiento === 'derecha' ? col + 1 < matrizIncial.matriz.length :
        movimiento === 'abajo' ? fil + 1 < matrizIncial.matriz.length :
        true;
}

function calcularRestriccion(movimiento) {
    return movimiento === 'izquierda' ? 'derecha' :
        movimiento === 'arriba' ? 'abajo' :
        movimiento === 'derecha' ? 'izquierda' :
        movimiento === 'abajo' ? 'arriba' :
        null;
}

const botonPlay = document.getElementById('play');
const botonBfs = document.getElementById('bfs');
const botonRevolver = document.getElementById('revolver');
const botonReiniciar = document.getElementById('reiniciar')

botonPlay.addEventListener('click', function() {
    const cuadricula = document.querySelector('.cuadricula') 
    cuadricula.innerHTML = '';
    if(matrizIncial !== null)
        matrizIncial.reiniciarEstadisticas();
    iniciarJuego(4, 4);
});

botonBfs.addEventListener('click',searchA);
botonRevolver.addEventListener('click',revolverPuzzle);
botonReiniciar.addEventListener('click',ocultarMensajeYReiniciar)
