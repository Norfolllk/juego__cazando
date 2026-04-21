let canvas = document.getElementById("areajuego");
let ctx = canvas.getContext("2d");

// Gato
let gatoX = 0;
let gatoY = 0;
const ANCHO_GATO = 50;
const ALTO_GATO = 50;

// Comida
let comidaX = 50;
let comidaY = 50;
const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;

// Puntaje
let puntaje = 0;

// Tiempo
let tiempo = 15;

// Intervalo global
let cronometro = 15;

//Incremento de dificultad
let tiempoActual = 15;
const tiempoMinimo = 1;

// Cargar la imagen del gato
const imgGato = new Image();
imgGato.src = "icono_gato.JPG";  // Usando el nombre del archivo del HTML original

// Cargar la imagen de la comida
const imgComida = new Image();
imgComida.src = "icono_comida.JPG";

// Esperar a que ambas imágenes estén cargadas antes de iniciar
let imagenesListas = 0;
function onImagenLista() {
    imagenesListas++;
    if (imagenesListas === 2) {
        iniciarJuego();
    }
}
imgGato.onload = onImagenLista;
imgComida.onload = onImagenLista;

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
    ctx.drawImage(imgGato, gatoX, gatoY, ANCHO_GATO, ALTO_GATO);
}

function graficarComida() {
    ctx.drawImage(imgComida, comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA);
}

function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;

    tiempo = tiempoActual;
    mostrarEnSpan("tiempo", tiempo);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graficarGato();
    graficarComida();
    restarTiempo();
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const LIMITE_X = canvas.width - ANCHO_GATO;
const LIMITE_Y = canvas.height - ALTO_GATO;

function moverIzquierda() {
    if (gatoX > 0) {
        gatoX -= 10;
        limpiarCanvas();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverDerecha() {
    if (gatoX < LIMITE_X) {
        gatoX += 10;
        limpiarCanvas();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverArriba() {
    if (gatoY > 0) {
        gatoY -= 10;
        limpiarCanvas();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

function moverAbajo() {
    if (gatoY < LIMITE_Y) {
        gatoY += 10;
        limpiarCanvas();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}

document.getElementById("btnArriba").onclick = () => moverArriba();
document.getElementById("btnAbajo").onclick = () => moverAbajo();
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick = () => moverDerecha();

function detectarColision() {
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY) {

        comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
        comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);

        puntaje++;
        mostrarEnSpan("puntos", puntaje);
        
        // Incrementar dificultad: reducir tiempo en 1 segundo
        tiempoActual -= 1;
        if (tiempoActual < tiempoMinimo) {
            tiempoActual = tiempoMinimo;
        }
        
        tiempo = tiempoActual;
        mostrarEnSpan("tiempo", tiempo);
    }
}

function restarTiempo() {
    if (cronometro) clearInterval(cronometro);
    cronometro = setInterval(function () {
        tiempo--;
        mostrarEnSpan('tiempo', tiempo);

        if (puntaje >= 6) {
            clearInterval(cronometro);
            alert("¡Ganaste!");
            return;
        }

        if (tiempo <= 0) {
            clearInterval(cronometro);
            alert("¡Game Over!");
        }
    }, 1000);
}

function reiniciar() {
    if (cronometro) clearInterval(cronometro);
    tiempoActual = 15;
    tiempo = tiempoActual;
    puntaje = 0;
    mostrarEnSpan('tiempo', tiempo);
    mostrarEnSpan('puntos', puntaje);
    iniciarJuego();
}
