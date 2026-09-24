# Analisis Completo - Lo que Debes Aprender

## Indice
1. [Estructura de un Proyecto Web](#1-estructura-de-un-proyecto-web)
2. [Etiquetas Semanticas HTML5](#2-etiquetas-semanticas-html5)
3. [Herramientas: VS Code y Extensiones](#3-herramientas-vs-code-y-extensiones)
4. [Herramientas: Validador W3C y Responsively](#4-herramientas-validador-w3c-y-responsively)
5. [Errores Comunes en tu Codigo](#5-errores-comunes-en-tu-codigo)
6. [Ejemplos Corregidos](#6-ejemplos-corregidos)
7. [Resumen de lo Mas Importante](#7-resumen-de-lo-mas-importante)

---

## 1. Estructura de un Proyecto Web

### Que es
Es la forma en que organizas archivos y carpetas dentro de tu proyecto. Una buena organizacion facilita el mantenimiento y escalabilidad.

### Estructura recomendada (estandar)
```
mi-proyecto/
├── index.html          ← Pagina principal
├── css/
│   ├── style.css       ← Estilos generales
│   └── paginas.css     ← Estilos especificos
├── img/                ← Imagenes
│   ├── logo.png
│   └── fondo.jpg
├── js/                 ← JavaScript (futuro)
│   └── script.js
└── paginas/            ← Otras paginas HTML
    ├── nosotros.html
    └── contacto.html
```

### Reglas de nombrado
| Malo | Bueno | Por que |
|------|-------|---------|
| `Mi Pagina.html` | `mi-pagina.html` | Sin espacios, sin mayusculas |
| `fondo de pantalla.jpg` | `fondo-pantalla.jpg` | Guiones en vez de espacios |
| `style (1).css` | `style.css` | Sin caracteres especiales |
| `IMG/` | `img/` | Siempre minusculas |

### Rutas de archivos
```html
<!-- Mismo carpeta -->
<link rel="stylesheet" href="style.css">

<!-- Subcarpeta -->
<img src="img/foto.png">

<!-- Carpeta padre -->
<a href="../index.html">Volver al inicio</a>
```

**IMPORTANTE:** Siempre usa `/` (barra normal), nunca `\` (barra invertida de Windows), aunque estes en Windows.

---

## 2. Etiquetas Semanticas HTML5

### Que son
Etiquetas que describen el **propósito** del contenido, no solo su apariencia. Ayudan a navegadores, lectores de pantalla y motores de busqueda a entender tu pagina.

### Etiquetas principales

| Etiqueta | Funcion | Ejemplo de uso |
|----------|---------|----------------|
| `<header>` | Cabecera de pagina o seccion | Logo, titulo, navegacion principal |
| `<nav>` | Navegacion principal | Menu de enlaces |
| `<main>` | Contenido principal (UNO por pagina) | Articulo principal, formulario |
| `<section>` | Seccion tematica | Capitulos, bloques de contenido |
| `<article>` | Contenido independiente | Blog post, noticia, tweet |
| `<aside>` | Contenido secundario | Sidebar, enlaces relacionados |
| `<footer>` | Pie de pagina | Copyright, contacto, enlaces |
| `<figure>` | Imagen con leyenda | Imagen + `<figcaption>` |
| `<figcaption>` | Leyenda de figure | Descripcion de la imagen |
| `<time>` | Fecha/hora | `<time datetime="2026-09-20">20 sept</time>` |
| `<blockquote>` | Cita larga | Frase de otra fuente |
| `<dl>` / `<dt>` / `<dd>` | Lista de definiciones | Glosario, clave-valor |

### Jerarquia de encabezados
```
<h1> → Titulo principal (UNO por pagina)
  <h2> → Subtitulo principal
    <h3> → Sub-subtitulo
      <h4> → ...
        <h5> → ...
          <h6> → ...
```

**NUNCA** saltes de `<h1>` a `<h3>` sin pasar por `<h2>`.

### Estructura semantica basica
```html
<body>
    <header>
        <h1>Mi Sitio</h1>
        <nav>
            <ul>
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Contacto</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Titulo del articulo</h2>
            <p>Contenido...</p>
        </article>

        <aside>
            <h2>Contenido relacionado</h2>
            <ul>
                <li><a href="#">Link 1</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 Mi Sitio</p>
    </footer>
</body>
```

---

## 3. Herramientas: VS Code y Extensiones

### Extensiones esenciales para HTML/CSS

| Extension | Que hace | Por que es importante |
|-----------|----------|----------------------|
| **Live Server** | Abre tu HTML con recarga automatica | No tienes que refrescar el navegador cada vez que guardas |
| **Prettier** | Formatea tu codigo automaticamente | Mantiene el codigo limpio y consistente |
| **Auto Rename Tag** | Renombra etiquetas HTML automaticamente | Si cambias `<div>` a `<section>`, cambia el cierre tambien |
| **CSS Peek** | Ctrl+Click en una clase para ir al CSS | Ahorra tiempo buscan estilos |
| **HTML CSS Support** | Autocompletado de clases CSS en HTML | Evita errores de tipeo |
| **ESLint** | Detecta errores de JavaScript | Para cuando aprendas JS |

### Como instalar
1. Abre VS Code
2. Presiona `Ctrl+Shift+X` (barra lateral de extensiones)
3. Busca el nombre de la extension
4. Click en "Install"

### Atajos utiles de VS Code
| Atajo | Que hace |
|-------|----------|
| `Ctrl+S` | Guardar archivo |
| `Ctrl+Shift+L` | Seleccionar todas las ocurrencias |
| `Alt+Shift+F` | Formatear documento |
| `Ctrl+/` | Comentar/Descomentar linea |
| `Ctrl+D` | Seleccionar siguiente igual |
| `Ctrl+Space` | Autocompletado |

---

## 4. Herramientas: Validador W3C y Responsively

### W3C Validator (validator.w3.org)
**Que es:** Herramienta oficial que valida si tu HTML cumple con los estandares.

**Como usarlo:**
1. Ve a https://validator.w3.org/
2. Pega la URL de tu pagina O sube el archivo HTML
3. Click "Check"
4. Revisa los errores y advertencias

**Que detecta:**
- Etiquetas mal cerradas
- Etiquetas anidadas incorrectamente
- Atributos invalidos
- Falta de DOCTYPE
- Encoding incorrecto

### Responsively App (responsively.app)
**Que es:** Navegador que muestra tu pagina en multiples dispositivos al mismo tiempo.

**Para que sirve:**
- Ver como se ve tu pagina en movil, tablet y desktop simultaneamente
- Detectar problemas de responsive design
- Tomar screenshots de todos los dispositivos a la vez
- Inspeccionar elementos en todas las vistas

**Como usarlo:**
1. Descarga desde https://responsively.app/
2. Abre tu archivo HTML
3. Selecciona los dispositivos que quieres ver
4. Navega y verifica que todo se vea bien

---

## 5. Errores Comunes en tu Codigo

### Errores encontrados en main.html

#### Error 1: Links dentro de `<ul>` sin `<li>`
```html
<!-- MAL -->
<nav>
    <ul>
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
    </ul>
</nav>

<!-- BIEN -->
<nav>
    <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Productos</a></li>
    </ul>
</nav>
```
**Por que:** Los links deben estar dentro de `<li>` porque `<ul>` solo acepta `<li>` como hijo directo.

#### Error 2: Nav vacio sin contenido semantico
```html
<!-- MAL - el nav no tiene utilidad sin links -->
<nav></nav>
```

#### Error 3: Links apuntan a "#"
```html
<!-- MAL - no llevan a ningun lado -->
<a href="#">Inicio</a>

<!-- BIEN - apuntan a una pagina real -->
<a href="inicio.html">Inicio</a>
```
**Nota:** "#" es aceptable solo durante desarrollo, pero en produccion debe tener una ruta real.

#### Error 4: Falta el atributo `lang` descriptivo
```html
<!-- MAL -->
<html lang="en">

<!-- BIEN -->
<html lang="es">
```
**Por que:** La pagina esta en espanol, asi que `lang="es"` es correcto.

#### Error 5: Falta link al CSS externo
```html
<!-- MAL - no hay referencia al CSS -->
<head>
    <title>Mi pagina</title>
</head>

<!-- BIEN -->
<head>
    <title>Mi pagina</title>
    <link rel="stylesheet" href="Style.css">
</head>
```

#### Error 6: No hay estructura completa (falta main, aside, footer)
El HTML original solo tenia header y nav. Faltaban las partes principales de la pagina.

### Errores encontrados en Style.css

#### Error 1: Margin negativo en nav
```css
/* MAL - usa margin negativo para "pegar" el nav al header */
nav {
    margin: -1rem;
}

/* BIEN - el header y nav se pegan solos si no tienen margen */
header { margin: 0; padding: 0; }
nav { margin: 0; padding: 0; }
```
**Por que:** El margin negativo es un hack que rompe el layout. Usa flexbox o margin: 0 para alinear.

#### Error 2: No hay reset completo
```css
/* MAL - solo resetea box-sizing */
* { box-sizing: border-box; }

/* BIEN - reset mas completo */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

---

## 6. Ejemplos Corregidos

### Ejemplo 1: Estructura HTML correcta
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Angel Echenique</title>
    <link rel="stylesheet" href="Style.css">
</head>
<body>
    <!-- Cabecera -->
    <header>
        <h1>Angel Echenique</h1>
        <p>Jugador de League of Legends</p>
    </header>

    <!-- Navegacion -->
    <nav>
        <ul>
            <li><a href="index.html">Inicio</a></li>
            <li><a href="productos.html">Productos</a></li>
            <li><a href="nosotros.html">Nosotros</a></li>
            <li><a href="contacto.html">Contacto</a></li>
        </ul>
    </nav>

    <!-- Contenedor principal -->
    <div class="contenedor">
        <main>
            <h2>Bienvenidos</h2>
            <p>Contenido principal de la pagina.</p>
        </main>

        <aside>
            <h2>Info extra</h2>
            <p>Barra lateral.</p>
        </aside>
    </div>

    <!-- Pie de pagina -->
    <footer>
        <p>&copy; 2026 Angel Echenique</p>
    </footer>
</body>
</html>
```

### Ejemplo 2: CSS correcto
```css
/* Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 20px;
}

body {
    font-family: Arial, sans-serif;
    background-color: #010101;
    color: #e0e0e0;
}

/* Header: 100% ancho, 150px alto */
header {
    height: 150px;
    background-color: #7c7730;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid #c89b3c;
}

/* Nav: 100% ancho, 70px alto */
nav {
    height: 70px;
    background-color: rgb(0, 98, 128);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #00a8cc;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
}

nav a {
    color: white;
    text-decoration: none;
}

/* Contenedor: 90% ancho, centrado */
.contenedor {
    width: 90%;
    margin: 0 auto;
    display: flex;
    gap: 1rem;
}

/* Main: 70% del contenedor */
main {
    width: 70%;
    height: 400px;
    border: 2px solid #e74c3c;
    padding: 1.5rem;
}

/* Aside: 30% del contenedor */
aside {
    width: 30%;
    height: 400px;
    border: 2px solid #3498db;
    padding: 1.5rem;
}

/* Footer: 100% ancho, 120px alto */
footer {
    height: 120px;
    background-color: #7c7730;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #c89b3c;
}
```

### Ejemplo 3: Lista de definiciones (dl)
```html
<!-- Usar dl para pares clave-valor -->
<dl>
    <dt>Nivel</dt>
    <dd>394</dd>

    <dt>Servidor</dt>
    <dd>EUW</dd>
</dl>
```

### Ejemplo 4: Imagen con leyenda
```html
<figure>
    <img src="img/foto.jpg" alt="Descripcion de la imagen">
    <figcaption>Descripcion de la imagen</figcaption>
</figure>
```

### Ejemplo 5: Tiempo con datetime
```html
<time datetime="2026-09-20">20 de septiembre de 2026</time>
<time datetime="PT29M31S">29:31</time>  <!-- Duracion -->
```

---

## 7. Resumen de lo Mas Importante

### Top 5 cosas que DEBES recordar

1. **Etiquetas semanticas**: Usa `header`, `nav`, `main`, `section`, `aside`, `footer` en vez de `div` para todo.

2. **Jerarquia de encabezados**: `h1` → `h2` → `h3` sin saltarte niveles.

3. **Estructura de archivos**: Organiza en carpetas `css/`, `img/`, `js/`, usa minusculas y guiones.

4. **Validacion**: Siempre valida tu HTML con https://validator.w3.org/ antes de entregar.

5. **Responsive**: Usa Responsively App para verificar que se vea bien en todos los dispositivos.

### Orden de aprendizaje recomendado
```
1. HTML basico (etiquetas, atributos)
   ↓
2. HTML semantico (header, nav, main, etc.)
   ↓
3. CSS basico (selectores, propiedades)
   ↓
4. CSS layout (flexbox, grid)
   ↓
5. CSS responsive (media queries)
   ↓
6. Herramientas (VS Code, W3C, Responsively)
   ↓
7. JavaScript basico
```

---

## Fuentes de Informacion
- MDN Web Docs: https://developer.mozilla.org/
- W3C Validator: https://validator.w3.org/
- Responsively App: https://responsively.app/
- W3C Web Accessibility Tutorials: https://www.w3.org/WAI/tutorials/
