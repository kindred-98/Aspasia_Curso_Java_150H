<!--
    ============================================================
    EJERCICIO: SELECTOR DE COLOR
    Tema: eventos, funciones y conversiones de color (HEX y RGB)
    ============================================================

    Crea una página con un selector de color que cumpla esto:

    1. Un recuadro (la "previa") que va cambiando de color.

    2. Un control para elegir el color:
       - Un <input type="color"> para elegir cualquier color.
       - Una paleta con 5 colores ya hechos, cada uno en su botón.

    3. Al cambiar el color, debajo se muestran dos datos:
       - El color en HEX:      #00F0FF
       - El color en RGB:      rgb(0, 240, 255)

    4. Dos botones más:
       - "Color aleatorio": que elija un color al azar.
       - "Copiar color": que copie el color al portapapeles.

    ============================================================
    ARCHIVOS DEL EJERCICIO
    ============================================================

       Selector_de_color.html   la estructura de la página
       style.css                los estilos
       script.js                la lógica (los eventos y funciones)

    ============================================================
    PISTAS
    ============================================================

    - Cada elemento tiene su id, y desde el JavaScript se localiza
      con document.getElementById('id').

    - addEventListener('change', ...) se dispara cuando el usuario
      termina de elegir un color en el input type="color".

    - El valor de un input type="color" viene en hexadecimal (#RRGGBB).

    - Para pasar de HEX a RGB hay que partir el texto en trozos de dos
      caracteres (con slice) y convertirlos con parseInt(..., 16),
      porque el 16 es la base hexadecimal.

    - Para un color al azar se generan 6 caracteres con Math.random(),
      usando toString(16) para pasarlos a hexadecimal y padStart(2, '0')
      para que siempre ocupen dos caracteres.

    - La paleta usa querySelectorAll('.muestra') y forEach() para
      recorrer los 5 botones, y el color de cada uno está en el
      atributo data-color (se lee con boton.dataset.color).

    ============================================================
-->