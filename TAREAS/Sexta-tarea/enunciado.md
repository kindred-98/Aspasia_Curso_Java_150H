<!--
    ============================================================
    EJERCICIO: ¿PUEDO CONDUCIR?
    Tema: condicionales (if / else) y validación de datos
    ============================================================

    Crea un programa que le pida al usuario tres cosas:

    1. SU EDAD
       - Escribe un número con su edad.
       - Si tiene menos de 18 años, NO PUEDE CONDUCIR.

    2. SI TIENE CARNET DE CONDUCIR
       - Se pregunta con dos botones: "Sí, tengo carnet"
         y "No, no tengo carnet".
       - Si es mayor de 18 años pero NO tiene carnet,
         NO PUEDE CONDUCIR.

    3. SUS AÑOS DE EXPERIENCIA AL VOLANTE
       - Esta pregunta SOLO se hace si tiene carnet.
       - De 2 a 5 años de experiencia .... conductor de experiencia MEDIA.
       - Más de 5 años de experiencia .... conductor EXPERIMENTADO.
       - Menos de 2 años de experiencia .. conductor NOVEL.

    IMPORTANTE:

       El programa se va parando según lo que conteste el usuario:
       si no puede conducir, NO debe seguir preguntando.

       - Si es menor de 18 años, no se le pregunta por el carnet
         ni por la experiencia.
       - Si dice que NO tiene carnet, no se le pregunta la experiencia.

    ============================================================
    CÓMO PUEDES HACERLO (PISTAS)
    ============================================================

    - Cada pregunta va en su propio recuadro (por ejemplo, un <div>).
      Los que todavía no toca se esconden con una clase que lleve
      display: none, y se enseñan quitándosela con classList.remove().

    - Las respuestas del usuario se leen con .value de los <input>,
      y se convierten a número con parseInt().

    - Con isNaN() compruebas si lo que ha escrito es un número
      (por ejemplo, si dejó la caja vacía).

    - Con <input type="number" min="0"> solo se pueden escribir números
      y además se indica el valor mínimo.

    - Los operadores de comparación son:
          >   mayor que          <    menor que
          >=  mayor o igual     <=   menor o igual
          === igual (para comparar, con dos iguales)

    - El operador && significa "Y": las dos cosas tienen que cumplirse.
      El rango de 2 a 5 se escribe:
          anios >= 2 && anios <= 5

    - El if / else if / else ejecuta UN SOLO bloque: el primero que
      se cumple. Por eso, cuando el usuario no puede conducir, el
      programa se detiene ahí.

    - Ojo: cuando la página ya está cargada NO se puede usar
      document.write() porque borraría toda la página.
      Para escribir en la página se usa innerHTML.

    ============================================================
-->