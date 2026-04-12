let canvas = document.getElementById("areajuego");
let ctx = canvas.getContext("2d");
const VELOCIDAD = 15;

 
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

//Punaje
let puntaje = 0;
 
//Tiempo
let tiempo = 10;

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
};
 
function graficarGato() {
    graficarRectangulo(gatoX, gatoY, ANCHO_GATO, ALTO_GATO, "#000000");
};
 
function graficarComida() {
    graficarRectangulo(comidaX, comidaY, ANCHO_COMIDA, ALTO_COMIDA, "#ff0000");
};
 
function iniciarJuego() {
    
        //GATO INICIAL EN EL CENTRO DEL CANVAS
    gatoX = (canvas.width / 2) - (ANCHO_GATO / 2);
    gatoY = (canvas.height / 2) - (ALTO_GATO / 2);

      //COMIDA ESQUINA INFERIOR DERECHA
    comidaX = canvas.width - ANCHO_COMIDA;
    comidaY = canvas.height - ALTO_COMIDA;
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    graficarGato();
    graficarComida();

}
 
function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const LIMITE_X = canvas.width - ANCHO_GATO; 
const LIMITE_Y = canvas.height - ALTO_GATO;
 
function moverIzquierda(){
   if (gatoX > 0){
    gatoX -= 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
    }
}
 
function moverDerecha(){
    if (gatoX < LIMITE_X){
    gatoX += 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
    }
}
 
function moverArriba(){
   if (gatoY > 0){   
    gatoY -= 10;
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
    }
}
 
function moverAbajo(){
    if (gatoY < LIMITE_Y){
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

function detectarColision(){
    if (gatoX < comidaX + ANCHO_COMIDA &&
        gatoX + ANCHO_GATO > comidaX &&
        gatoY < comidaY + ALTO_COMIDA &&
        gatoY + ALTO_GATO > comidaY){
        comidaX = generarAleatorio(0, canvas.width - ANCHO_COMIDA);
        comidaY = generarAleatorio(0, canvas.height - ALTO_COMIDA);
        alert("¡El gato ha atrapado la comida!"); 
         
        puntaje++;
        mostrarEnSpan("puntos", puntaje);  

    }
}

function restarTiempo() {
  let cronometro = setInterval(function () {
    tiempo--;
    mostrarEnSpan('tiempo', tiempo);

    if (tiempo <= 0) {
      alert("Game Over!");
      clearInterval(cronometro);
    }

    if (puntaje >= 6) {
      alert("Ganaste!");
      clearInterval(cronometro);
    }
  }, 1000);
  
}

    if (!(tiempo <= 0)) {
    restarTiempo();
    }


function reiniciar() {
    tiempo = 10;
    puntaje = 0;
    mostrarEnSpan('tiempo', tiempo);
    mostrarEnSpan('puntos', puntaje);
    limpiarCanvas();
    graficarGato();
    graficarComida();
    restarTiempo();
    iniciarJuego();
}