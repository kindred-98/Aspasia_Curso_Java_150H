/* ============================================================
   CUARTA TAREA - EJERCICIOS DE FUNCIONES JAVASCRIPT
   Archivo: script.js
   Contiene las 5 funciones pedidas en el enunciado.
   ============================================================ */


/* ============ EJERCICIO 1 - SALUDO ============ */
/* Bloque 1: creamos la función sin parámetros y la ejecutamos */

function saludar() {
    /* firma de la función: "function" declara la función,
       "saludar" es su nombre y los paréntesis () están vacíos
       porque no recibe ningún parámetro */

    document.write("<h3>Ejercicio 1 - Saludo</h3>");
    /* document.write() escribe texto dentro de la página.
       Aquí pintamos un título en negrita (etiqueta <h3>) */

    document.write("<p>Hola, bienvenido a JavaScript</p>");
    /* escribimos el mensaje pedido, dentro de <p> para que sea un párrafo */
}

saludar();
/* llamada a la función: al escribir saludar() con paréntesis
   ejecutamos todo el código que hay dentro de su bloque { } */


/* ============ EJERCICIO 2 - MOSTRAR UN NOMBRE ============ */
/* Bloque 2: función con 1 parámetro */

function mostrarNombre(nombre) {
    /* "nombre" es el PARÁMETRO: el hueco que la función espera recibir.
       Al llamarla le pasaremos el argumento real */

    document.write("<h3>Ejercicio 2 - Mostrar un nombre</h3>");
    /* pintamos el título del ejercicio 2 */

    document.write("<p>Hola " + nombre + "</p>");
    /* concatenamos (unimos) cadenas con el símbolo + :
       "Hola " + "Patricia"  ->  "Hola Patricia".
       La variable "nombre" se sustituye por el valor que le pasemos */
}

mostrarNombre("Patricia");
/* llamada: "Patricia" es el ARGUMENTO que entra en la variable "nombre" */


/* ============ EJERCICIO 3 - SUMAR DOS NÚMEROS ============ */
/* Bloque 3: función con 2 parámetros que pinta el resultado */

function sumar(numero1, numero2) {
    /* "numero1" y "numero2" son los dos PARÁMETROS de la función */

    var resultado = numero1 + numero2;
    /* declaramos la variable "resultado" con var y guardamos la suma.
       El operador + aquí suma porque los dos valores son números */

    document.write("<h3>Ejercicio 3 - Sumar dos números</h3>");
    /* pintamos el título del ejercicio 3 */

    document.write("<p>La suma es: " + resultado + "</p>");
    /* mostramos el mensaje con el valor calculado:
       "La suma es: " + 15  ->  "La suma es: 15" */
}

sumar(7, 8);
/* llamada con dos argumentos: 7 entra en numero1 y 8 entra en numero2
   (7 + 8 = 15, como pide el enunciado) */


/* ============ EJERCICIO 4 - CALCULAR EL DOBLE ============ */
/* Bloque 4: función que devuelve un valor con return */

function doble(numero) {
    /* "numero" es el parámetro que recibimos */

    var resultado = numero * 2;
    /* calculamos el doble multiplicando por 2 con el operador * */

    return resultado;
    /* "return" DEVUELVE el valor al lugar donde se llamó la función
       y DETIENE la ejecución de la función en esa línea */
}

var dobleDe8 = doble(8);
/* guardamos en la variable "dobleDe8" lo que la función devuelve (16).
   Sin return, aquí se guardaría undefined */

document.write("<h3>Ejercicio 4 - Calcular el doble</h3>");
/* pintamos el título del ejercicio 4 */

document.write("<p>El doble de 8 es " + dobleDe8 + "</p>");
/* mostramos el resultado: "El doble de 8 es 16" */


/* ============ EJERCICIO 5 - CALCULAR PRECIO TOTAL ============ */
/* Bloque 5: función con 2 parámetros y return (la más completa) */

function calcularTotal(precio, cantidad) {
    /* dos parámetros: "precio" (coste de un artículo)
       y "cantidad" (cuántos artículos compramos) */

    var total = precio * cantidad;
    /* multiplicamos precio por cantidad para obtener el total */

    return total;
    /* devolvemos el total para usarlo fuera de la función */
}

var precio = 20;
/* variable con el precio de un artículo (20 €) */

var cantidad = 3;
/* variable con la cantidad comprada (3 unidades) */

var total = calcularTotal(precio, cantidad);
/* llamamos a la función y guardamos el resultado (60) en la variable "total" */

document.write("<h3>Ejercicio 5 - Calcular precio total</h3>");
/* pintamos el título del ejercicio 5 */

document.write("<p>Precio: " + precio + " &euro;</p>");
/* mostramos el precio; &euro; es la entidad HTML del símbolo € */

document.write("<p>Cantidad: " + cantidad + "</p>");
/* mostramos la cantidad de artículos */

document.write("<p>Total: " + total + " &euro;</p>");
/* mostramos el total calculado: 20 * 3 = 60 € */
