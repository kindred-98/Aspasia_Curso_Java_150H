/* ============================================================
   KINDRED.JAVA - METADATOS (ARCHIVO QUE EDITAS TÚ)
   ------------------------------------------------------------
   Los TÍTULOS y los ENLACES se sacan solos de tus carpetas:
   el script ACTUALIZAR.bat los lee y escribe en js\datos.js.

   En este archivo solo pones lo que una máquina no puede saber:
   la DESCRIPCIÓN y las ETIQUETAS de cada trabajo.

   Cuando añadas un trabajo nuevo a una carpeta no hace falta
   tocar este archivo: el script lo detecta y lo enseña con un
   texto por defecto. Rellena aquí solo si quieres nicer el texto.

   CÓMO AÑADIR UN TRABAJO NUEVO:
     1. Copia tu carpeta dentro de ..\TAREAS\  (ejemplo: Sexta_tarea)
     2. Doble clic en  ACTUALIZAR.bat
     3. Listo: la tarjeta aparece sola en la web.

   OJO: dentro de los { } las claves van entre comillas ("desc")
   y NO se pueden poner comentarios; los comentarios van con //
   en su propia línea.
   ============================================================ */


// ---- ORDEN DE LAS CARPETAS DE TAREAS ----
// El orden en el que se ven las tarjetas.
// Las carpetas que NO estén en esta lista saldrán al final
// por orden alfabético.
var ORDEN_TAREAS = [
    "Primera_Tarea",
    "Segunda_Tarea",
    "Tercera_Tarea",
    "Cuarta_tarea",
    "Quinta_tarea-Js-dentro-de-html"
];


// ---- TRABAJOS DE CLASE (dentro de ..\TAREAS) ----
//
// CÓMO SE AGRUPA (lo hace el script solo):
//   Cada CARPETA que tenga un .html es una tarjeta de la web.
//   El PDF de al lado se asigna a esa misma tarjeta. Por eso en la
//   Cuarta Tarea salen dos tarjetas: Tarea1 y Tarea2.
//
// QUÉ ESCRIBE AQUÍ CADA TARJETA:
//   "nombre"  = la etiqueta que sale arriba ("Cuarta Tarea")
//   "titulo"  = si lo pones, gana al <title> de la página
//   "desc"    = la descripción
//   "tags"    = las etiquetas de color
//   "badge"   = el texto de la etiqueta verde
//   "grupos"  = opcional: cosas que solo aplican a UNA subcarpeta
//   "botones" = opcional: cambiar el texto de un botón
//   "enunciados" = opcional: cambiar el texto de un PDF
var META_TAREAS = {

    "Primera_Tarea": {
        "nombre": "Primera Tarea",
        "desc": "Estructura básica de una página web con las etiquetas semánticas de HTML5 (header, nav, main, aside y footer) maquetadas con Flexbox.",
        "tags": ["HTML", "CSS"],
        "badge": "Completada"
    },

    "Segunda_Tarea": {
        "nombre": "Segunda Tarea",
        "desc": "Página con tabla de imágenes: 6 fotos de personajes colocadas en filas y columnas, con efecto hover que amplía y gira la imagen.",
        "tags": ["HTML", "CSS"],
        "badge": "Completada"
    },

    "Tercera_Tarea": {
        "nombre": "Tercera Tarea",
        "desc": "Web completa de turismo rural: galería de paisajes, tabla de precios, formulario de contacto y enlaces internos con identificadores (id).",
        "tags": ["HTML", "CSS"],
        "badge": "Completada"
    },

    // Esta entrega tiene DOS ejercicios en subcarpetas, así que cada
    // uno tiene su propia tarjeta (con su página y su PDF)
    "Cuarta_tarea": {
        "nombre": "Cuarta Tarea",
        "tags": ["HTML", "JS"],
        "badge": "Completada",
        "grupos": {
            "Tarea1": {
                "desc": "5 ejercicios de funciones: saludar, mostrar un nombre, sumar, calcular el doble con return y calcular el precio total de una compra.",
                "botones": { "index.html": "Ver tarea" }
            },
            "Tarea2": {
                "desc": "5 ejercicios de variables: datos personales, cálculo de un producto, edad, precio con descuento y resumen de compra completo.",
                "botones": { "index.html": "Ver tarea" }
            }
        }
    },

    "Quinta_tarea-Js-dentro-de-html": {
        "nombre": "Quinta Tarea - JavaScript en el HTML",
        "tags": ["HTML", "JS"],
        "badge": "Completada",

        // "tarjetas" es opcional: te permite decidir tú cómo se reparten
        // las páginas de una entrega en varias tarjetas de la web.
        //   "botones" = los archivos .html que van en cada tarjeta
        //   "titulo" / "desc" = el texto de esa tarjeta
        // (las páginas que no pongas aquí se agrupan solas en una tarjeta
        //  llamada "Otros ejercicios", para que no se pierda ningún archivo)
        "tarjetas": [
            {
                "titulo": "Ejercicios de variables y funciones",
                "desc": "Los mismos 10 ejercicios de la Cuarta Tarea (5 de variables y 5 de funciones), pero con el JavaScript escrito <em>dentro</em> de la propia etiqueta <em>&lt;script&gt;</em> en vez de en un archivo externo.",
                "botones": ["ejercicios.html", "ejercicios2.html"]
            },
            {
                "titulo": "Variables, condicionales y bucles",
                "desc": "Tipos de variables con let, const, array, object y typeof. Después, condicionales con if / else: pide un número con prompt y dice si es par o impar, y luego comprueba una contraseña.",
                "botones": ["variables.html", "bucles.html"]
            }
        ],

        // texto de los botones: la clave es el nombre del archivo
        "botones": {
            "variables.html": "Variables",
            "bucles.html": "Bucles",
            "ejercicios.html": "Ejercicios",
            "ejercicios2.html": "Funciones"
        }
    }

};


// ---- PRÁCTICAS DE CASA (dentro de ..\Practicas_Manuales_De_La_Tareas) ----
var META_PRACTICAS = {

    "Practicas_Manuales_De_La_Tareas/HTML-Practice/Proyecto1.html": {
        "desc": "Página hecha a mano con las etiquetas semánticas de HTML5 (header, nav, main, aside y footer) y un fondo de Kindred.",
        "tags": ["HTML"],
        "badge": "Abierta"
    },

    "Practicas_Manuales_De_La_Tareas/JS-Practice/js.html": {
        "desc": "Ejercicios de variables con let, const y tipos de datos. Los resultados se ven en la consola del navegador (pulsa F12 > Console).",
        "tags": ["JS"],
        "badge": "Abierta"
    },

    "Practicas_Manuales_De_La_Tareas/CSS-Practice/Style.css": {
        "desc": "Mi archivo de estilos manual: reset con box-sizing, base de 20px y estilos generales del body, con comentarios explicando cada línea.",
        "tags": ["CSS"],
        "badge": "Código"
    }

};


// ---- NOTAS Y ANÁLISIS (archivos .md de ..\Informacion_De_Clase) ----
var META_NOTAS = {

    "Informacion_De_Clase/Analisis_de_la_infomacion_de_clase_con_IA/analisis-Del-Profesor.md": {
        "titulo": "Análisis de la información del profesor",
        "desc": "Resumen de los apuntes de clase analizados con IA."
    },

    "Informacion_De_Clase/Analisis_de_la_infomacion_de_clase_con_IA/AnalisisCompleto.md": {
        "titulo": "Análisis completo",
        "desc": "Documento completo con todo lo visto en clase, ordenado por temas."
    },

    "Informacion_De_Clase/Paginas-Externa/paginas.md": {
        "titulo": "Mis páginas de apoyo",
        "desc": "Lista guardada de las páginas externas que uso para practicar."
    }

};


// ---- FOTOS DE CLASE (imágenes de ..\Informacion_De_Clase) ----
var META_FOTOS = {

    "Informacion_De_Clase/CSS-Informacion/CSS-INFO-2/WhatsApp Image 2026-09-17 at 09.58.40.jpeg": {
        "titulo": "Apunte CSS - 17/09"
    },

    "Informacion_De_Clase/CSS-Informacion/CSS-INFO-2/WhatsApp Image 2026-09-17 at 09.59.23.jpeg": {
        "titulo": "Apunte CSS - 17/09 (2)"
    },

    "Informacion_De_Clase/CSS-Informacion/CSS-INFO-2/WhatsApp Image 2026-09-23 at 09.38.49.jpeg": {
        "titulo": "Apunte CSS - 23/09"
    }

};


// ---- RECURSOS PDF (de ..\Informacion_De_Clase) ----
// El título sale del nombre del archivo; aquí puedes ponerlo más bonito.
var META_RECURSOS = {

    // ---- HTML ----
    "Informacion_De_Clase/HTML-Informacion/HTML-INFO-1/HTML y CSS_HTML5.pdf": { "titulo": "HTML5 (inicial)" },
    "Informacion_De_Clase/HTML-Informacion/HTML-INFO-1/HTML y CSS_Organizacion de un sitio web.pdf": { "titulo": "Organización de un sitio web" },
    "Informacion_De_Clase/HTML-Informacion/HTML-INFO-2/html-cheatsheet-2026.pdf": { "titulo": "HTML cheatsheet 2026" },
    "Informacion_De_Clase/HTML-Informacion/HTML-INFO-2/html5-cheatsheet-lite.pdf": { "titulo": "HTML5 cheatsheet lite" },
    "Informacion_De_Clase/HTML-Informacion/HTML-INFO-3/estructura_html.pdf": { "titulo": "Estructura HTML" },
    "Informacion_De_Clase/HTML-Informacion/HTML-INFO-3/tutorial-emmet1.pdf": { "titulo": "Tutorial Emmet" },

    // ---- CSS ----
    "Informacion_De_Clase/CSS-Informacion/CSS-INFO-1/css-cheatsheet-2026.pdf": { "titulo": "CSS cheatsheet 2026" },
    "Informacion_De_Clase/CSS-Informacion/CSS-INFO-1/css3-cheatsheet-lite.pdf": { "titulo": "CSS3 cheatsheet lite" },
    "Informacion_De_Clase/CSS-Informacion/CSS-INFO-3/box-sizing-border-box-explicacion.pdf": { "titulo": "box-sizing: border-box" },
    "Informacion_De_Clase/CSS-Informacion/CSS-INFO-3/propiedadesbordersmarginspaddings.pdf": { "titulo": "Borders, margins y paddings" },
    "Informacion_De_Clase/CSS-Informacion/CSS-INFO-3/unidades-css-px-rem-vh.pdf": { "titulo": "Unidades: px, rem y vh" },

    // ---- Manual HTML + CSS ----
    "Informacion_De_Clase/HTML_Y_CSS-Informacion/MANUAL-HTML-Y-CSS.pdf": { "titulo": "Manual HTML y CSS (juntos)" },

    // ---- Visual Studio Code ----
    "Informacion_De_Clase/VsCODE-Informacion/Extensiones-esenciales-para-Visual-Studio-Code.pdf": { "titulo": "Extensiones esenciales" },
    "Informacion_De_Clase/VsCODE-Informacion/HTML y CSS_El editor Visual Studio Code.pdf": { "titulo": "El editor Visual Studio Code" },
    "Informacion_De_Clase/VsCODE-Informacion/Navegadores principales.pdf": { "titulo": "Navegadores principales" }

};


// ---- PÁGINAS EXTERNAS ----
// Estas NO se escanean (son direcciones de internet), se escriben aquí.
// Añade las que quieras y aparecerán en la web sin tocar el HTML.
var EXTERNAS = [
    { "url": "https://validator.w3.org/", "titulo": "Validador W3C", "desc": "Comprueba si mi HTML está bien escrito." },
    { "url": "https://responsively.app/", "titulo": "Responsively App", "desc": "Para ver cómo se ve mi web en móvil, tablet y PC." },
    { "url": "https://flukeout.github.io/", "titulo": "CSS Diner", "desc": "Juego para practicar los selectores de CSS." },
    { "url": "http://ww.cdmon.com/es/", "titulo": "cdmon", "desc": "Tutoriales de HTML y CSS en español." }
];
