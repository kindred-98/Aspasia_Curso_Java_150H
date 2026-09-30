/* ============================================================
   TAREA 2 - JAVASCRIPT: VARIABLES Y document.write()
   Archivo: script.js
   Contiene los 5 ejercicios del enunciado.
   ============================================================ */


/* ============ EJERCICIO 1 - DATOS PERSONALES ============ */
/* Bloque 1: declaramos tres variables y las mostramos */

var nombre = "Laura";
/* "var" declara una variable; "nombre" es su nombre y "Laura" es el valor
   guardado (entre comillas = cadena de texto) */

var edad = 25;
/* variable numérica: 25 NO lleva comillas para poder hacer cálculos con ella */

var ciudad = "Gijón";
/* variable de texto con la ciudad */

document.write("<h3>Ejercicio 1 - Datos personales</h3>");
/* document.write() escribe HTML dentro de la página; aquí pintamos un título */

document.write("<p>Nombre: " + nombre + "</p>");
/* unimos con + el texto fijo y la variable:  "Nombre: " + "Laura"  ->  "Nombre: Laura" */

document.write("<p>Edad: " + edad + "</p>");
/* mostramos la edad */

document.write("<p>Ciudad: " + ciudad + "</p>");
/* mostramos la ciudad */


/* ============ EJERCICIO 2 - DATOS DE UN PRODUCTO ============ */
/* Bloque 2: variables + una variable calculada con multiplicación */

var producto = "Teclado";
/* nombre del producto (texto) */

var precio = 30;
/* precio unitario en EUR (número) */

var cantidad = 2;
/* unidades compradas (número) */

var total = precio * cantidad;
/* NUEVA variable calculada: precio x cantidad = 60.
   El operador * multiplica */

document.write("<h3>Ejercicio 2 - Datos de un producto</h3>");
/* título del ejercicio 2 */

document.write("<p>Producto: " + producto + "</p>");
/* mostramos el nombre del producto */

document.write("<p>Precio: " + precio + " EUR</p>");
/* mostramos el precio uniendo el número con el texto " EUR" */

document.write("<p>Cantidad: " + cantidad + "</p>");
/* mostramos la cantidad */

document.write("<p>Total: " + total + " EUR</p>");
/* mostramos el total calculado con la unidad: 30 * 2 = 60 EUR */


/* ============ EJERCICIO 3 - CÁLCULO DE EDAD ============ */
/* Bloque 3: variable calculada con resta y frase con varias variables */

var nombre = "Ana";
/* nueva variable "nombre" para este ejercicio: al usar var otra vez,
   el valor anterior ("Laura") se sustituye por "Ana" */

var anioNacimiento = 1990;
/* año de nacimiento de la persona (número) */

var anioActual = 2026;
/* año actual, el enunciado lo fija con el valor 2026 */

var edadCalculada = anioActual - anioNacimiento;
/* el operador - resta: 2026 - 1990 = 36. Guardamos el resultado en una variable */

document.write("<h3>Ejercicio 3 - Cálculo de edad</h3>");
/* título del ejercicio 3 */

document.write("<p>" + nombre + " nació en " + anioNacimiento +
               " y tiene aproximadamente " + edadCalculada + " años.</p>");
/* frase completa uniendo varias variables y textos en una sola línea:
   "Ana" + " nació en " + "1990" + " y tiene aproximadamente " + "36" + " años."
   (aquí usamos la variable "nombre", que ahora vale "Ana") */


/* ============ EJERCICIO 4 - PRECIO CON DESCUENTO ============ */
/* Bloque 4: porcentaje, cantidad descontada y precio final */

var nombreProducto = "Monitor";
/* nombre del producto (texto) */

var precioOriginal = 200;
/* precio antes del descuento (número) */

var porcentajeDescuento = 15;
/* descuento del 15 % (número, sin el símbolo %) */

var cantidadDescontada = precioOriginal * porcentajeDescuento / 100;
/* calculamos cuánto dinero se descuenta: 200 * 15 / 100 = 30.
   Multiplicamos primero y dividimos después (mismo nivel de prioridad) */

var precioFinal = precioOriginal - cantidadDescontada;
/* precio final: 200 - 30 = 170 (el operador - resta) */

document.write("<h3>Ejercicio 4 - Precio con descuento</h3>");
/* título del ejercicio 4 */

document.write("<p>Producto: " + nombreProducto + "</p>");
/* mostramos el producto */

document.write("<p>Precio original: " + precioOriginal + " EUR</p>");
/* mostramos el precio antes del descuento */

document.write("<p>Descuento: " + porcentajeDescuento + " %</p>");
/* mostramos el porcentaje de descuento */

document.write("<p>Cantidad descontada: " + cantidadDescontada + " EUR</p>");
/* mostramos el dinero que se descuenta: 30 EUR */

document.write("<p>Precio final: " + precioFinal + " EUR</p>");
/* mostramos el precio final: 170 EUR */


/* ============ EJERCICIO 5 - COMPRA COMPLETA ============ */
/* Bloque 5: todas las variables juntas y resumen con etiquetas HTML */

var productoCompra = "Portátil";
/* producto comprado (texto) */

var precioUnidad = 650;
/* precio de una unidad en EUR (número) */

var unidades = 2;
/* número de unidades (número) */

var descuentoCompra = 10;
/* descuento del 10 % (número) */

var gastosEnvio = 15;
/* gastos de envío en EUR (número) */

var subtotal = precioUnidad * unidades;
/* subtotal: 650 * 2 = 1300 (antes de aplicar el descuento) */

var descuentoAplicado = subtotal * descuentoCompra / 100;
/* dinero descontado: 1300 * 10 / 100 = 130 */

var precioConDescuento = subtotal - descuentoAplicado;
/* precio después del descuento: 1300 - 130 = 1170 */

var precioFinalCompra = precioConDescuento + gastosEnvio;
/* precio final sumando el envío: 1170 + 15 = 1185 */

document.write("<h3>Ejercicio 5 - Compra completa</h3>");
/* título del ejercicio 5 */

document.write("<h4>RESUMEN DE COMPRA</h4>");
/* h4 = subtítulo pequeño; encabezado del resumen */

document.write("<p>Producto: " + productoCompra + "</p>");
/* primera línea del resumen */

document.write("<p>Precio unidad: " + precioUnidad + " EUR</p>");
/* precio de una unidad */

document.write("<p>Cantidad: " + unidades + "</p>");
/* unidades compradas */

document.write("<p>Subtotal: " + subtotal + " EUR</p>");
/* subtotal de la compra: 1300 EUR */

document.write("<p>Descuento: " + descuentoCompra + " %</p>");
/* porcentaje de descuento aplicado */

document.write("<p>Descuento aplicado: " + descuentoAplicado + " EUR</p>");
/* dinero que se descuenta: 130 EUR */

document.write("<p>Gastos de envío: " + gastosEnvio + " EUR</p>");
/* gastos de envío: 15 EUR */

document.write("<p><strong>TOTAL: " + precioFinalCompra + " EUR</strong></p>");
/* total final en negrita con la etiqueta <strong>: 1185 EUR */
