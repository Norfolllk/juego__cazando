// Canvas y contexto
let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// Variables de posición
let gatoX = 0;
let gatoY = 0;

function graficarRectangulo(x, y, ancho, alto, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
  graficarRectangulo(gatoX, gatoY, 50, 50, "red");
}

function iniciarJuego() {
  // Gato centrado
  gatoX = (canvas.width  - 50)  / 2;
  gatoY = (canvas.height - 50)   / 2;
    graficarGato();
}
    
iniciarJuego();