/* ============================================================
   KINDRED.JAVA - JAVASCRIPT PRINCIPAL (main.js)
   Efectos de TODAS las páginas:
   menú móvil, contadores, barras de progreso, reveal,
   cursor personalizado, fondo de partículas y máquina de escribir.
   ============================================================ */


/* ============ MENÚ MÓVIL (hamburguesa) ============ */
/* Al pulsar las 3 barritas se abre/cierra el menú */

var hamburger = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');

if (hamburger) {
    /* comprobamos que el elemento existe (en páginas sin menú no falla) */

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('open');      /* añade/quita la clase "open" */
        mobileMenu.classList.toggle('open');     /* abre/cierra el desplegable */
    });

    /* al pulsar un enlace del menú móvil, se cierra */
    mobileMenu.querySelectorAll('a').forEach(function (enlace) {
        enlace.addEventListener('click', function () {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        });
    });
}


/* ============ APARECER AL HACER SCROLL (REVEAL) ============ */
/* Los elementos con la clase .reveal aparecen cuando entran en pantalla */

var elementos = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    /* IntersectionObserver vigila cuándo un elemento entra en el viewport */

    var observer = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');  /* le pone la clase visible */
                observer.unobserve(entrada.target);       /* deja de vigilarlo */
            }
        });
    }, { threshold: 0.15 });   /* se activa cuando se ve el 15% del elemento */

    elementos.forEach(function (el) { observer.observe(el); });
} else {
    /* navegador antiguo: los mostramos todos de una vez */
    elementos.forEach(function (el) { el.classList.add('visible'); });
}


/* ============ CONTADORES ANIMADOS ============ */
/* Los números suben desde 0 hasta el valor final (data-target) */

var contadores = document.querySelectorAll('[data-target]');

function animarContador(el) {
    var objetivo = parseInt(el.getAttribute('data-target'));  /* número final */
    var duracion = 1500;                        /* duración en milisegundos */
    var inicio = null;

    function paso(timestamp) {
        if (!inicio) inicio = timestamp;        /* guardamos el primer instante */
        var progreso = timestamp - inicio;      /* cuánto tiempo ha pasado */
        var porcentaje = Math.min(progreso / duracion, 1);  /* de 0 a 1 */
        /* easeOutCubic: empieza rápido y frena al final */
        var valor = Math.floor((1 - Math.pow(1 - porcentaje, 3)) * objetivo);
        el.textContent = valor;                 /* escribimos el número en pantalla */

        if (porcentaje < 1) {
            requestAnimationFrame(paso);        /* pide el siguiente fotograma */
        } else {
            el.textContent = objetivo;          /* aseguramos el número exacto final */
        }
    }

    requestAnimationFrame(paso);                /* arranca la animación */
}

if (contadores.length > 0 && 'IntersectionObserver' in window) {
    var obsContadores = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                animarContador(entrada.target);     /* anima el contador */
                obsContadores.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.5 });   /* se activa cuando se ve la mitad del número */

    contadores.forEach(function (el) { obsContadores.observe(el); });
}


/* ============ BARRAS DE PROGRESO ============ */
/* Al entrar en pantalla, la barra se rellena hasta el ancho del data-progress */

var barras = document.querySelectorAll('.progress-fill');

if (barras.length > 0 && 'IntersectionObserver' in window) {
    var obsBarras = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                var porcentaje = entrada.target.getAttribute('data-progress');
                entrada.target.style.width = porcentaje + '%';  /* rellena la barra */
                obsBarras.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.4 });

    barras.forEach(function (barra) { obsBarras.observe(barra); });
}


/* ============ MÁQUINA DE ESCRIBIR ============ */
/* Escribe y borra textos en bucle dentro del elemento #typing-text */

var typingEl = document.getElementById('typing-text');

if (typingEl) {
    var textos = [
        'Angel Echenique',      /* lo que va apareciendo letra a letra */
        'Kindred.Java',
        'Estudiante de Web'
    ];
    var idxTexto = 0;            /* índice del texto actual */
    var idxLetra = 0;            /* índice de la letra actual */
    var borrando = false;        /* ¿estamos borrando? */

    function escribir() {
        var texto = textos[idxTexto];
        var espera = borrando ? 50 : 120;   /* borra rápido, escribe despacio */

        if (borrando) {
            idxLetra--;                       /* quita una letra */
            typingEl.textContent = texto.substring(0, idxLetra);
            if (idxLetra <= 0) {
                borrando = false;             /* terminó de borrar */
                idxTexto = (idxTexto + 1) % textos.length;  /* pasa al siguiente */
            }
        } else {
            idxLetra++;                       /* añade una letra */
            typingEl.textContent = texto.substring(0, idxLetra);
            if (idxLetra >= texto.length) {
                borrando = true;              /* terminó de escribir: empieza a borrar */
                espera = 2000;                /* pausa de 2 segundos antes de borrar */
            }
        }

        setTimeout(escribir, espera);         /* se llama a sí misma después de esperar */
    }

    escribir();                               /* arranca el efecto */
}


/* ============ CURSOR PERSONALIZADO ============ */
/* Un círculo cian sigue al ratón y un punto morado deja estela.
   Solo se activa en ordenadores (donde hay ratón real). */

var cursor = document.getElementById('cursor');
var trail = document.getElementById('cursor-trail');

if (cursor && trail && window.matchMedia('(pointer: fine)').matches) {

    var posX = 0, posY = 0;      /* posición del cursor */
    var trailX = 0, trailY = 0;  /* posición de la estela */

    document.addEventListener('mousemove', function (e) {
        posX = e.clientX;        /* coordenada horizontal del ratón */
        posY = e.clientY;        /* coordenada vertical */
    });

    function moverCursor() {
        cursor.style.left = posX + 'px';
        cursor.style.top = posY + 'px';

        /* la estela va "atrasada": se acerca un 15% en cada fotograma */
        trailX += (posX - trailX) * 0.15;
        trailY += (posY - trailY) * 0.15;
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';

        requestAnimationFrame(moverCursor);    /* repite en cada fotograma */
    }

    moverCursor();

    /* el cursor crece cuando pasa sobre enlaces y botones */
    document.querySelectorAll('a, button, .btn, .glass-card').forEach(function (el) {
        el.addEventListener('mouseenter', function () { cursor.classList.add('big'); });
        el.addEventListener('mouseleave', function () { cursor.classList.remove('big'); });
    });
} else {
    /* en móvil no hace falta: los escondemos */
    if (cursor) cursor.style.display = 'none';
    if (trail) trail.style.display = 'none';
}


/* ============ LIGHTBOX: ABRIR FOTOS AL HACER CLIC ============ */
/* Al pulsar una foto se abre grande en pantalla completa (solo en la
   página de Clase, que es la única que tiene .foto-item) */

var lightbox = document.getElementById('lightbox');
var fotos = document.querySelectorAll('.foto-item img');

if (lightbox && fotos.length > 0) {

    var lbImg = document.getElementById('lightbox-img');         /* foto grande */
    var lbCap = document.getElementById('lightbox-caption');     /* pie de foto */
    var lbOpen = document.getElementById('lightbox-open');       /* enlace original */
    var indice = 0;                                              /* foto que está abierta */

    /* Muestra la foto que toca (con índice) y abre el visor */
    function mostrarFoto(i) {
        indice = (i + fotos.length) % fotos.length;  /* si pasa del final, vuelve a la 1ª */
        var foto = fotos[indice];

        lbImg.src = foto.getAttribute('src');                     /* misma foto, tamaño grande */
        lbImg.alt = foto.getAttribute('alt');
        lbCap.textContent = foto.parentElement.querySelector('figcaption').textContent;  /* su pie */
        lbOpen.href = foto.getAttribute('src');                   /* enlace al original */

        lightbox.classList.add('open');                          /* abre el visor */
        document.body.style.overflow = 'hidden';                 /* bloquea el scroll de fondo */
    }

    /* Cierra el visor y devuelve el scroll a la página */
    function cerrarLightbox() {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    /* Cada foto, al hacer clic, abre el visor con su posición */
    fotos.forEach(function (foto, i) {
        foto.addEventListener('click', function () {
            mostrarFoto(i);
        });
    });

    /* Botones del visor */
    document.getElementById('lightbox-close').addEventListener('click', cerrarLightbox);
    document.getElementById('lightbox-prev').addEventListener('click', function () {
        mostrarFoto(indice - 1);                                 /* foto anterior */
    });
    document.getElementById('lightbox-next').addEventListener('click', function () {
        mostrarFoto(indice + 1);                                 /* foto siguiente */
    });

    /* Clic fuera de la foto (sobre el fondo oscuro) = cerrar */
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) cerrarLightbox();
    });

    /* Teclado: Esc cierra, flechas cambian de foto */
    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('open')) return;        /* solo si está abierto */
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowLeft') mostrarFoto(indice - 1);
        if (e.key === 'ArrowRight') mostrarFoto(indice + 1);
    });
}


/* ============ FONDO DE PARTÍCULAS (CANVAS) ============ */
/* Estrellas que se mueven lento detrás de todo el contenido */

var canvas = document.getElementById('bg-canvas');

if (canvas) {
    var ctx = canvas.getContext('2d');         /* contexto de dibujo 2D */
    var estrellas = [];                        /* array con las estrellas */

    function redimensionar() {
        canvas.width = window.innerWidth;      /* ancho = ancho de ventana */
        canvas.height = window.innerHeight;    /* alto = alto de ventana */
    }

    function crearEstrellas() {
        estrellas = [];
        var cantidad = 90;                     /* número de estrellas */
        for (var i = 0; i < cantidad; i++) {
            estrellas.push({
                x: Math.random() * canvas.width,     /* posición x aleatoria */
                y: Math.random() * canvas.height,    /* posición y aleatoria */
                tam: Math.random() * 2 + 0.5,        /* tamaño entre 0.5 y 2.5 */
                vel: Math.random() * 0.4 + 0.1,      /* velocidad de caída */
                alfa: Math.random()                 /* opacidad aleatoria */
            });
        }
    }

    function dibujar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  /* borra el canvas */

        estrellas.forEach(function (e) {
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.tam, 0, Math.PI * 2);     /* dibuja un círculo */
            ctx.fillStyle = 'rgba(0, 240, 255, ' + e.alfa + ')';  /* color cian */
            ctx.fill();

            e.y += e.vel;                       /* cae un poco */
            if (e.y > canvas.height) {          /* si sale por abajo... */
                e.y = 0;                        /* ...vuelve arriba */
                e.x = Math.random() * canvas.width;
            }
        });

        requestAnimationFrame(dibujar);         /* repite el dibujo */
    }

    redimensionar();                            /* primer tamaño */
    crearEstrellas();                           /* crea las estrellas */
    dibujar();                                  /* arranca la animación */

    /* al cambiar el tamaño de la ventana, se adapta */
    window.addEventListener('resize', function () {
        redimensionar();
        crearEstrellas();
    });
}
