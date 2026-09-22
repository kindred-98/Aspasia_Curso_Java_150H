# Analisis de la Tarea - Primera Tarea de HTML/CSS

## Que pide la profe (resumen)

La tarea consiste en crear una **pagina web basica** usando las **etiquetas semanticas principales de HTML5** con un layout clasico de sitio web: header, nav, contenedor con main + aside, y footer.

---

## Desglose de lo que busca la profe

### 1. Que entiendas la estructura basica de una pagina web

| Zona | Que es | Medida exacta |
|------|--------|---------------|
| **HEADER** | Cabecera con titulo/logo | 100% ancho, 150px alto |
| **NAV** | Barra de navegacion | 100% ancho, 70px alto |
| **CONTENEDOR** | Envoltorio de main+aside | 90% ancho, centrado |
| **MAIN** | Contenido principal | 70% del contenedor, 400px alto |
| **ASIDE** | Informacion secundaria | 30% del contenedor, 400px alto |
| **FOOTER** | Pie de pagina | 100% ancho, 120px alto |

**Que busca:** Que sepas **donde va cada cosa** en una pagina web real.

---

### 2. Que uses CSS externo (no inline ni internal)

```html
<!-- BIEN -->
<head>
    <link rel="stylesheet" href="Style.css">
</head>

<!-- MAL -->
<body style="background: blue;">
```

**Que busca:** Que separes **estructura** (HTML) de **presentacion** (CSS). Esto es un concepto fundamental del desarrollo web.

---

### 3. Que entiendas unidades de medida

La tarea pide usar **px**, **rem** y **porcentajes**:

| Unidad | Cuando se usa | Ejemplo |
|--------|---------------|---------|
| **px** | Valores fijos (alturas, bordes) | `height: 150px;` |
| **rem** | Tipografia y espaciado relativo | `padding: 1rem;` (1rem = 20px) |
| **%** | Anchos relativos al padre | `width: 70%;` |

**Que busca:** Que entiendas que no todo se mide en pixeles y que existen unidades relativas.

---

### 4. Que sepas que es box-sizing: border-box

```css
/* Sin border-box: padding y border SUMAN al ancho */
/* Con border-box: padding y border se INCLUYEN en el ancho */
```

**Ejemplo:**
```css
/* Este div tiene 200px de ancho + 20px de padding a cada lado */
/* Sin border-box: 240px total */
/* Con border-box: 200px total (el padding esta dentro) */
```

**Que busca:** Es el concepto mas importante de CSS para layouts. Sin esto, los calculos de ancho son un desastre.

---

### 5. Que sepas centrar un contenedor

```css
.contenedor {
    width: 90%;
    margin: 0 auto;  /* Centra horizontalmente */
}
```

**Que busca:** Que entiendas como funciona el centrado basico con `margin: auto`.

---

### 6. Que MAIN y ASIDE esten uno al lado del otro

```css
.contenedor {
    display: flex;  /* Flexbox pone los hijos en fila */
}
```

**Que busca:** Que entiendas el concepto de **layout** y como hacer que dos bloques esten lado a lado (no uno debajo del otro).

---

### 7. Que uses bordes para distinguir zonas

```css
header { border: 2px solid #c89b3c; }
nav { border: 2px solid #00a8cc; }
main { border: 2px solid #e74c3c; }
aside { border: 2px solid #3498db; }
footer { border: 2px solid #c89b3c; }
```

**Que busca:** Que visualices claramente donde empieza y termina cada zona. Es una tecnica de depuracion visual.

---

## Que QUIERE que aprendas (el proposito real)

### A nivel tecnico
1. **Estructura semantica** - Saber que etiqueta va en cada lugar
2. **CSS basico** - Selectores, propiedades, unidades
3. **Box model** - Entender border-box
4. **Layout basico** - Flexbox para alinear elementos
5. **Organizacion** - Archivos separados (HTML + CSS)

### A nivel conceptual
1. **Separar estructura de presentacion** - HTML describe QUE es, CSS describe COMO se ve
2. **Pensar en componentes** - Una pagina se divide en zonas con propósitos distintos
3. **Trabajar con estandares** - Usar CSS externo, DOCTYPE correcto, encoding UTF-8
4. **Depurar visualmente** - Los bordes ayudan a ver problemas de layout

---

## Errores que debiste evitar

### En HTML
- Usar `<a href="#">` sin contenido real
- No poner `<li>` dentro de `<ul>`
- No vincular el CSS externo
- No usar `lang="es"` en `<html>`

### En CSS
- Usar `margin: -1rem` (hack, no solucion)
- No resetear margenes de `*`
- No usar flexbox para alinear main y aside

---

## Nivel de dificultad

**Principiante** - Es una de las primeras tareas. La profe busca que:

1. Entiendas la **estructura logica** de una pagina web
2. Sepas **asignar tamaños** con CSS
3. Comprendas que es **box-sizing: border-box**
4. Sepas **centrar** un contenedor
5. Sepas que **main y aside** van lado a lado

---

## Cómo verificar que esta bien

1. Abre la pagina en el navegador con **Live Server**
2. Deberias ver:
   - Header dorado arriba (150px)
   - Nav azul debajo (70px)
   - Main rojo a la izquierda (70%)
   - Aside azul a la derecha (30%)
   - Footer dorado abajo (120px)
3. Valida con https://validator.w3.org/
4. Prueba con Responsively App que se vea en movil

---

## Resumen para la profe

La tarea busca que el alumno comprenda los **bloques fundamentales** de una pagina web: la estructura semantica con HTML5, la separacion de CSS externo, el modelo de caja con border-box, y el layout basico con flexbox. Es el primer paso para construir sitios web reales.