/* ============================================================
   SELECTOR DE COLOR - JAVASCRIPT (script.js)
   ------------------------------------------------------------
   Este archivo controla toda la lógica del selector de color:
   - Cambiar color con el input nativo
   - Paleta de 5 colores predefinidos
   - Color aleatorio
   - Copiar al portapapeles
   ============================================================ */


/* ============ 1. GUARDAR REFERENCIAS A LOS ELEMENTOS ============ */
/* Buscamos los elementos una sola vez al cargar y los guardamos
   en variables para no buscar them cada vez (más eficiente) */

const previa = document.getElementById('previa');           // el recuadro grande que cambia de color
const selector = document.getElementById('selector');       // input type="color" nativo
const textoHex = document.getElementById('hex');            // span donde se muestra el HEX
const textoRgb = document.getElementById('rgb');            // span donde se muestra el RGB
const botonAleatorio = document.getElementById('aleatorio'); // botón "Color aleatorio"
const botonCopiar = document.getElementById('copiar');       // botón "Copiar color"
const aviso = document.getElementById('aviso');             // zona de mensajes (copiado, error...)

/* Paleta de 5 colores predefinidos (botones pequeños) */
const muestras = document.querySelectorAll('.muestra');

/* Variable para guardar el color actual (se actualiza cada vez que cambia) */
let colorActual = '#00f0ff';  // color inicial (cian)


/* ============================================================
   2. FUNCIONES AUXILIARES
   ============================================================ */

/* ------------------------------------------------------------
   Convierte un color HEX (#RRGGBB) a objeto {r, g, b} decimal
   Ejemplo: "#00f0ff"  ->  {r: 0, g: 240, b: 255}
   ------------------------------------------------------------ */
function hexToRgb(hex) {
    // quitamos el # del principio
    const limpio = hex.replace('#', '');

    // slice(0,2) = primeros 2 caracteres (rojo)
    // slice(2,4) = siguientes 2 (verde)
    // slice(4,6) = últimos 2 (azul)
    // IMPORTANTE: usamos limpio.slice, no hex.slice (hex tiene el #)
    const r = parseInt(limpio.slice(0, 2), 16);   // base 16 = hexadecimal
    const g = parseInt(limpio.slice(2, 4), 16);
    const b = parseInt(limpio.slice(4, 6), 16);

    return { r, g, b };
}

/* ------------------------------------------------------------
   Pinta el color en la previa y actualiza los textos HEX/RGB
   ------------------------------------------------------------ */
function pintar(color) {
    // guardamos el color actual para usarlo luego (copiar, etc.)
    colorActual = color;

    // 1) Cambia el fondo del recuadro grande (la previa)
    document.getElementById('previa').style.backgroundColor = color;

    // 2) Muestra el HEX en mayúsculas (más legible)
    document.getElementById('hex').textContent = color.toUpperCase();

    // 3) Calcula y muestra el RGB
    const rgb = hexToRgb(colorActual);
    document.getElementById('rgb').textContent =
        `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

    // Actualizamos también el input type="color" para que
    // su paletita muestre el color actual
    document.getElementById('selector').value = colorActual;
}

/* Genera un color hexadecimal completamente aleatorio */
function colorAleatorio() {
    // Math.random() da un decimal entre 0 y 1
    // Math.floor(Math.random() * 256) -> entero 0..255
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // toString(16) convierte a hexadecimal (base 16)
    // padStart(2, '0') asegura 2 dígitos: "f" -> "0f"
    const hex = '#' +
        r.toString(16).padStart(2, '0') +
        g.toString(16).padStart(2, '0') +
        b.toString(16).padStart(2, '0');

    // actualizamos también el input nativo para que su paletita
    // muestre el nuevo color
    document.getElementById('selector').value = hex;

    pintar(hex);
}

/* Copia el color actual al portapapeles del sistema */
function copiarColor() {
    // navigator.clipboard.writeText() es la API moderna
    // Solo funciona en https:// o localhost (contextos seguros)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(colorActual)
            .then(() => {
                // Éxito: mostramos mensaje verde 2 segundos
                const aviso = document.getElementById('aviso');
                aviso.textContent = '¡Color copiado: ' + colorActual + '!';
                aviso.style.color = '#2ecc71';
                setTimeout(() => {
                    document.getElementById('aviso').textContent = '';
                }, 2000);
            })
            .catch(() => {
                // Error inesperado al copiar
                const aviso = document.getElementById('aviso');
                aviso.textContent = 'No se ha podido copiar';
                aviso.style.color = '#e74c3c';
            });
    } else {
        // Navegador sin clipboard API (raro hoy día, pero por si acaso)
        const aviso = document.getElementById('aviso');
        aviso.textContent = 'Tu navegador no permite copiar';
        aviso.style.color = '#e74c3c';
    }
}

/* ============================================================
   3. EVENTOS: "ESCUCHAMOS" LO QUE HACE EL USUARIO
   ============================================================ */

// -----------------------------------------------------------
// 1) INPUT TIPO COLOR: cuando el usuario elige un color
// -----------------------------------------------------------
document.getElementById('selector').addEventListener('change', function () {
    // .value trae el color en formato #RRGGBB
    pintar(this.value);
});

// -----------------------------------------------------------
// 2) PALETA DE 5 COLORES PREDEFINIDOS (botones redondos)
// -----------------------------------------------------------
const botonesMuestra = document.querySelectorAll('.muestra');

muestras.forEach(function (boton) {
    boton.addEventListener('click', function () {
        // data-color es un atributo personalizado: data-color="#a855f7"
        const color = this.dataset.color;
        pintar(color);

        // También movemos el input type="color" para que su
        // paletita muestre el mismo color
        document.getElementById('selector').value = colorActual;
    });
});

/* Botón: Color aleatorio */
document.getElementById('aleatorio').addEventListener('click', colorAleatorio);

/* Botón: Copiar color al portapapeles */
document.getElementById('copiar').addEventListener('click', function () {
    copiarColor();
});


/* ============================================================
   4. INICIALIZACIÓN: PINTAR EL COLOR INICIAL AL CARGAR
   ============================================================ */
pintar(colorActual);