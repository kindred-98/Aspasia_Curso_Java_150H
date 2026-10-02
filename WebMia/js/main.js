/* ============================================================
   KINDRED.JAVA - JAVASCRIPT PRINCIPAL (main.js)
   ------------------------------------------------------------
   Efectos de TODAS las páginas:
   menú móvil, contadores, barras de progreso, animaciones al
   hacer scroll, cursor personalizado, fondo de partículas,
   máquina de escribir y visor de fotos.

   Cada efecto está en su propia función KJ.xxx() para poder
   volver a lanzarla cuando render.js añada tarjetas nuevas.
   ============================================================ */


/* Objeto que guarda las funciones (así las llama render.js) */
var KJ = {};


/* ============ ARRANQUE ============ */
/* Al cargar la página, se lanzan todos los efectos */

document.addEventListener('DOMContentLoaded', function () {
    KJ.menu();
    KJ.reveal();
    KJ.contadores();
    KJ.barras();
    KJ.typing();
    KJ.cursor();
    KJ.canvas();
    KJ.lightbox();
});


/* ============ MENÚ MÓVIL (hamburguesa) ============ */
/* Al pulsar las 3 barritas se abre y se cierra el menú */

KJ.menu = function () {
    var hamburguesa = document.getElementById('hamburger');
    var menuMovil = document.getElementById('mobile-menu');

    if (!hamburguesa || !menuMovil) { return; }   /* la página no tiene menú */

    hamburguesa.addEventListener('click', function () {
        hamburguesa.classList.toggle('open');     /* añade o quita la clase open */
        menuMovil.classList.toggle('open');
    });

    /* al pulsar un enlace del menú móvil, se cierra */
    var enlaces = menuMovil.querySelectorAll('a');
    for (var i = 0; i < enlaces.length; i++) {
        enlaces[i].addEventListener('click', function () {
            hamburguesa.classList.remove('open');
            menuMovil.classList.remove('open');
        });
    }
};


/* ============ APARECER AL HACER SCROLL (REVEAL) ============ */
/* Los elementos con la clase .reveal aparecen cuando entran en pantalla */

KJ.reveal = function () {
    var elementos = document.querySelectorAll('.reveal:not(.visible)');
    if (elementos.length === 0) { return; }

    /* Si el navegador es antiguo no hay IntersectionObserver:
       los elementos se muestran directamente, sin animación */
    if (navegadorAntiguo()) {
        for (var v = 0; v < elementos.length; v++) { elementos[v].classList.add('visible'); }
        return;
    }

    /* IntersectionObserver vigila cuándo un elemento entra en pantalla */
    var observador = new IntersectionObserver(function (entradas) {
        for (var i = 0; i < entradas.length; i++) {
            if (entradas[i].isIntersecting) {
                entradas[i].target.classList.add('visible');
                observador.unobserve(entradas[i].target);   /* deja de vigilarlo */
            }
        }
    }, { threshold: 0.15 });   /* se activa cuando se ve el 15% del elemento */

    for (var j = 0; j < elementos.length; j++) {
        observador.observe(elementos[j]);
    }
};

/* ¿El navegador es antiguo y no soporta IntersectionObserver? */
function navegadorAntiguo() {
    return !('IntersectionObserver' in window);
}


/* ============ CONTADORES ANIMADOS ============ */
/* Los números suben desde 0 hasta el valor de data-target */

KJ.contadores = function () {
    var contadores = document.querySelectorAll('[data-target]');
    if (contadores.length === 0) { return; }

    /* Navegador antiguo: se pone el número final sin animación */
    if (navegadorAntiguo()) {
        for (var v = 0; v < contadores.length; v++) {
            contadores[v].textContent = contadores[v].getAttribute('data-target');
        }
        return;
    }

    var observador = new IntersectionObserver(function (entradas) {
        for (var i = 0; i < entradas.length; i++) {
            if (entradas[i].isIntersecting) {
                animar(entradas[i].target);
                observador.unobserve(entradas[i].target);
            }
        }
    }, { threshold: 0.5 });   /* se activa cuando se ve la mitad del número */

    for (var j = 0; j < contadores.length; j++) {
        observador.observe(contadores[j]);
    }
};

/* Cuenta un número desde 0 hasta su data-target */
function animar(elemento) {
    var objetivo = parseInt(elemento.getAttribute('data-target'));
    var duracion = 1500;                        /* milisegundos que dura */
    var inicio = null;

    function paso(momento) {
        if (!inicio) { inicio = momento; }      /* guardamos el primer instante */
        var progreso = momento - inicio;
        var tanto = Math.min(progreso / duracion, 1);   /* de 0 a 1 */
        /* easeOutCubic: empieza rápido y frena al final */
        var valor = Math.floor((1 - Math.pow(1 - tanto, 3)) * objetivo);
        elemento.textContent = valor;

        if (tanto < 1) {
            requestAnimationFrame(paso);        /* pide el siguiente fotograma */
        } else {
            elemento.textContent = objetivo;    /* asegura el número exacto */
        }
    }

    requestAnimationFrame(paso);
}


/* ============ BARRAS DE PROGRESO ============ */
/* La barra se rellena hasta el porcentaje de data-progress */

KJ.barras = function () {
    var barras = document.querySelectorAll('.progress-fill');
    if (barras.length === 0) { return; }

    /* Navegador antiguo: la barra se llena directamente, sin animación */
    if (navegadorAntiguo()) {
        for (var v = 0; v < barras.length; v++) {
            barras[v].style.width = barras[v].getAttribute('data-progress') + '%';
        }
        return;
    }

    var observador = new IntersectionObserver(function (entradas) {
        for (var i = 0; i < entradas.length; i++) {
            if (entradas[i].isIntersecting) {
                var porcentaje = entradas[i].target.getAttribute('data-progress');
                entradas[i].target.style.width = porcentaje + '%';
                observador.unobserve(entradas[i].target);
            }
        }
    }, { threshold: 0.4 });

    for (var j = 0; j < barras.length; j++) {
        observador.observe(barras[j]);
    }
};


/* ============ MÁQUINA DE ESCRIBIR ============ */
/* Escribe y borra textos en bucle dentro de #typing-text */

KJ.typing = function () {
    var elemento = document.getElementById('typing-text');
    if (!elemento) { return; }

    var textos = [
        'Angel Echenique',      /* lo que va apareciendo letra a letra */
        'Kindred.Java',
        'Estudiante de Web'
    ];
    var cual = 0;              /* texto que se está escribiendo */
    var letra = 0;             /* letra por la que vamos */
    var borrando = false;      /* ¿estamos borrando? */

    function escribir() {
        var texto = textos[cual];
        var espera = borrando ? 50 : 120;   /* borra rápido y escribe despacio */

        if (borrando) {
            letra--;                        /* quita una letra */
            elemento.textContent = texto.substring(0, letra);
            if (letra <= 0) {
                borrando = false;
                cual = (cual + 1) % textos.length;   /* siguiente texto */
            }
        } else {
            letra++;                        /* añade una letra */
            elemento.textContent = texto.substring(0, letra);
            if (letra >= texto.length) {
                borrando = true;
                espera = 2000;              /* pausa 2 segundos antes de borrar */
            }
        }

        setTimeout(escribir, espera);       /* se llama a sí misma al esperar */
    }

    escribir();
};


/* ============ CURSOR PERSONALIZADO ============ */
/* Un círculo cian sigue al ratón y un punto morado deja estela.
   Solo en ordenadores: en el móvil el ratón no existe. */

KJ.cursor = function () {
    var cursor = document.getElementById('cursor');
    var estela = document.getElementById('cursor-trail');

    var hayRaton = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (!cursor || !estela || !hayRaton) {
        if (cursor) { cursor.style.display = 'none'; }
        if (estela) { estela.style.display = 'none'; }
        return;
    }

    var x = 0, y = 0;          /* posición del cursor */
    var ex = 0, ey = 0;        /* posición de la estela */

    document.addEventListener('mousemove', function (e) {
        x = e.clientX;         /* coordenada horizontal del ratón */
        y = e.clientY;
    });

    function mover() {
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';

        /* la estela va "atrasada": se acerca un 15% en cada fotograma */
        ex += (x - ex) * 0.15;
        ey += (y - ey) * 0.15;
        estela.style.left = ex + 'px';
        estela.style.top = ey + 'px';

        requestAnimationFrame(mover);
    }

    mover();

    /* el cursor crece al pasar sobre enlaces y tarjetas */
    var grandes = document.querySelectorAll('a, button, .btn, .glass-card');
    for (var i = 0; i < grandes.length; i++) {
        grandes[i].addEventListener('mouseenter', function () { cursor.classList.add('big'); });
        grandes[i].addEventListener('mouseleave', function () { cursor.classList.remove('big'); });
    }
};


/* ============ FONDO DE PARTÍCULAS (CANVAS) ============ */
/* Estrellas que caen despacio detrás de todo el contenido */

KJ.canvas = function () {
    var lienzo = document.getElementById('bg-canvas');
    if (!lienzo) { return; }

    var ctx = lienzo.getContext('2d');     /* contexto de dibujo 2D */
    var estrellas = [];                    /* lista de estrellas */

    function tamano() {
        lienzo.width = window.innerWidth;      /* ancho = ancho de ventana */
        lienzo.height = window.innerHeight;    /* alto = alto de ventana */
    }

    function crear() {
        estrellas = [];
        for (var i = 0; i < 90; i++) {         /* 90 estrellas */
            estrellas.push({
                x: Math.random() * lienzo.width,
                y: Math.random() * lienzo.height,
                tam: Math.random() * 2 + 0.5,   /* tamaño entre 0.5 y 2.5 */
                vel: Math.random() * 0.4 + 0.1, /* velocidad de caída */
                alfa: Math.random()             /* brillo aleatorio */
            });
        }
    }

    function dibujar() {
        ctx.clearRect(0, 0, lienzo.width, lienzo.height);   /* borra el lienzo */

        for (var i = 0; i < estrellas.length; i++) {
            var e = estrellas[i];
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.tam, 0, Math.PI * 2);      /* círculo */
            ctx.fillStyle = 'rgba(0, 240, 255, ' + e.alfa + ')';
            ctx.fill();

            e.y += e.vel;                       /* cae un poco */
            if (e.y > lienzo.height) {          /* si sale por abajo... */
                e.y = 0;                        /* ...vuelve arriba */
                e.x = Math.random() * lienzo.width;
            }
        }

        requestAnimationFrame(dibujar);
    }

    tamano();
    crear();
    dibujar();

    window.addEventListener('resize', function () { tamano(); crear(); });
};


/* ============ LIGHTBOX: ABRIR FOTOS AL HACER CLIC ============ */
/* Al pulsar una foto se abre grande a pantalla completa */

KJ.lightbox = function () {
    var visor = document.getElementById('lightbox');
    var fotos = document.querySelectorAll('.foto-item img');

    /* solo funciona en la página que tiene visor (clase.html)
       y si queda alguna foto sin vincular */
    if (!visor || fotos.length === 0) { return; }
    if (visor.getAttribute('data-listo') === 'si') { return; }   /* ya estaba montado */
    visor.setAttribute('data-listo', 'si');

    var fotoGrande = document.getElementById('lightbox-img');
    var pie = document.getElementById('lightbox-caption');
    var original = document.getElementById('lightbox-open');
    var indice = 0;                            /* foto que está abierta */

    /* Abre el visor con la foto que toca (el número puede ser -1 o +1) */
    function mostrar(cual) {
        indice = (cual + fotos.length) % fotos.length;   /* si pasa del final, vuelve a la primera */
        var foto = fotos[indice];

        fotoGrande.setAttribute('src', foto.getAttribute('src'));   /* misma foto, tamaño grande */
        fotoGrande.setAttribute('alt', foto.getAttribute('alt'));
        pie.textContent = foto.parentNode.querySelector('figcaption').textContent;
        original.setAttribute('href', foto.getAttribute('src'));

        visor.classList.add('open');
        document.body.style.overflow = 'hidden';      /* bloquea el scroll de fondo */
    }

    /* Cierra el visor y devuelve el scroll */
    function cerrar() {
        visor.classList.remove('open');
        document.body.style.overflow = '';
    }

    /* Cada foto, al hacer clic, abre el visor */
    for (var i = 0; i < fotos.length; i++) {
        (function (posicion) {
            fotos[posicion].addEventListener('click', function () { mostrar(posicion); });
        })(i);
    }

    document.getElementById('lightbox-close').addEventListener('click', cerrar);
    document.getElementById('lightbox-prev').addEventListener('click', function () { mostrar(indice - 1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { mostrar(indice + 1); });

    /* Clic fuera de la foto (sobre el fondo oscuro) = cerrar */
    visor.addEventListener('click', function (e) {
        if (e.target === visor) { cerrar(); }
    });

    /* Teclado: Esc cierra y las flechas cambian de foto */
    document.addEventListener('keydown', function (e) {
        if (!visor.classList.contains('open')) { return; }
        if (e.key === 'Escape') { cerrar(); }
        if (e.key === 'ArrowLeft') { mostrar(indice - 1); }
        if (e.key === 'ArrowRight') { mostrar(indice + 1); }
    });
};
