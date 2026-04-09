// Canvas y contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Variables de posición
let gatoX = 0;
let gatoY = 0;
let comidaX = 0;
let comidaY = 0;

// Constantes de tamaño
const ANCHO_GATO = 60;
const ALTO_GATO = 60;
const ANCHO_COMIDA = 30;
const ALTO_COMIDA = 30;


function graficarRectangulo(x, y, ancho, alto, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
  graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "red");
}

function graficarComida() {
  graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "gray");
}

function iniciarJuego() {
  // Gato centrado
  gatoX = (canvas.width  - 50)  / 2;
  gatoY = (canvas.height - 50)   / 2;

  comidaX = canvas.width  - ANCHO_COMIDA - 10;
  comidaY = canvas.height - ALTO_COMIDA  - 10;

    graficarGato();
    graficarComida();
}
    
iniciarJuego();