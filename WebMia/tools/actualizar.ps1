# ============================================================
#  KINDRED.JAVA - SCRIPT QUE ACTUALIZA LOS DATOS DE LA WEB
#  ----------------------------------------------------------
#  Que hace:  mira dentro de estas carpetas y crea el archivo
#             js\datos.js con TODO lo que encuentra:
#
#       ..\TAREAS                        -> trabajos de clase
#       ..\Practicas_Manuales_De_La_Tareas -> practicas de casa
#       ..\Informacion_De_Clase          -> PDF, fotos y notas
#
#  Los titulos se leen del <title> de cada HTML.
#  Las descripciones y etiquetas se sacan de  datos\meta.js
#  (si un archivo no esta en meta.js, se muestra con texto por defecto).
#
#  USO:  doble clic en  ACTUALIZAR.bat   (o ejecuta este archivo)
#  ============================================================



# ---------- DONDE ESTOY? ----------

$web = Split-Path -Parent $PSScriptRoot      # ...\WebMia
$base = Split-Path -Parent $web               # ...\java
$datos = Join-Path $web "datos\meta.js"
$salida = Join-Path $web "js\datos.js"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " ACTUALIZANDO LOS DATOS DE KINDRED.JAVA" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan


# ---------- LEER LOS DATOS QUE ESCRIBES TU (datos\meta.js) ----------
# meta.js es un archivo de JavaScript, asi que NO se ejecuta aqui:
# se lee como texto, se le quitan los comentarios y se busca dentro
# cada bloque "var NOMBRE = { ... };" para poder leerlo.

function Leer-VariableJs($texto, $nombre) {
    # quita los comentarios de bloque /* ... */
    $t = [regex]::Replace($texto, '(?s)/\*.*?\*/', '')

    # quita los comentarios de linea // SOLO si la linea empieza por ellos
    # (asi no se rompen las direcciones web que llevan https:// )
    $t = [regex]::Replace($t, '(?m)^[ \t]*//.*$', '')

    # busca "var <nombre> =" y devuelve el literal { } o [ ] que va detras
    $m = [regex]::Match($t, 'var\s+' + $nombre + '\s*=\s*')
    if (-not $m.Success) { return $null }

    $i = $m.Index + $m.Length
    while ($i -lt $t.Length -and ($t[$i] -eq ' ' -or $t[$i] -eq "`r" -or $t[$i] -eq "`n" -or $t[$i] -eq "`t")) { $i++ }
    if ($i -ge $t.Length) { return $null }

    $abre = $t[$i]                      # { o [
    $cierra = '}'                       # su pareja
    if ($abre -eq '[') { $cierra = ']' }
    elseif ($abre -ne '{') { return $null }

    $nivel = 0                          # contador de llaves
    $dentro = $false                    # estamos dentro de un texto?
    $escapado = $false                  # el caracter anterior era "\"?

    for ($k = $i; $k -lt $t.Length; $k++) {
        $c = $t[$k]

        if ($dentro) {                  # dentro de "texto"
            if ($escapado) { $escapado = $false }
            elseif ($c -eq '\') { $escapado = $true }
            elseif ($c -eq '"') { $dentro = $false }
            continue
        }

        if ($c -eq '"') { $dentro = $true; continue }
        if ($c -eq $abre) { $nivel++ }
        elseif ($c -eq $cierra) {
            $nivel--
            if ($nivel -eq 0) { return $t.Substring($i, $k - $i + 1) }   # bloque completo
        }
    }
    return $null
}


if (-not (Test-Path -LiteralPath $datos)) {
    Write-Host "  No encuentro datos\meta.js" -ForegroundColor Red
    exit 1
}

$textoMeta = Get-Content -LiteralPath $datos -Raw -Encoding UTF8

# Convierte cada bloque de meta.js en un objeto de PowerShell.
# OJO: ConvertFrom-Json devuelve un array como un solo elemento, asi que
# hay que guardarlo tal cual (sin envolverlo en @()) para poder recorrerlo.
$ORDEN_TAREAS = @()
$bloque = Leer-VariableJs $textoMeta "ORDEN_TAREAS"
if ($bloque) {
    $tmp = $bloque | ConvertFrom-Json
    $ORDEN_TAREAS = @($tmp)
}

$META_TAREAS = @{}
$bloque = Leer-VariableJs $textoMeta "META_TAREAS"
if ($bloque) { $META_TAREAS = $bloque | ConvertFrom-Json }

$META_PRACTICAS = @{}
$bloque = Leer-VariableJs $textoMeta "META_PRACTICAS"
if ($bloque) { $META_PRACTICAS = $bloque | ConvertFrom-Json }

$META_NOTAS = @{}
$bloque = Leer-VariableJs $textoMeta "META_NOTAS"
if ($bloque) { $META_NOTAS = $bloque | ConvertFrom-Json }

$META_FOTOS = @{}
$bloque = Leer-VariableJs $textoMeta "META_FOTOS"
if ($bloque) { $META_FOTOS = $bloque | ConvertFrom-Json }

$META_RECURSOS = @{}
$bloque = Leer-VariableJs $textoMeta "META_RECURSOS"
if ($bloque) { $META_RECURSOS = $bloque | ConvertFrom-Json }

$EXTERNAS = @()
$bloque = Leer-VariableJs $textoMeta "EXTERNAS"
if ($bloque) {
    $tmp = $bloque | ConvertFrom-Json
    $EXTERNAS = @($tmp)
}

# Comprueba que se ha leido todo (si no, avisa en vez de fallar en silencio)
if ($META_TAREAS.Count -eq 0) {
    Write-Host "  OJO: no he podido leer META_TAREAS de datos\meta.js" -ForegroundColor Yellow
}

# Busca la informacion de una ruta dentro de un bloque de meta.js.
# ConvertFrom-Json devuelve PSCustomObject, asi que se busca por Property.
function Get-Meta($bloque, $ruta) {
    if ($null -eq $bloque) { return $null }
    $p = $bloque.PSObject.Properties[$ruta]
    if ($null -ne $p) { return $p.Value }
    return $null
}


# ---------- UTILLES ----------

# Ruta del archivo con "/" y sin la carpeta java (ej: "TAREAS/Primera_Tarea/index.html")
function Get-RutaRelativa($archivo) {
    $r = $archivo.FullName.Substring($base.Length + 1)
    return $r -replace '\\', '/'
}

# Ruta para el href de la web: "../" + ruta codificada con %20 en los espacios
function Get-Href($rutaRel) {
    return "../" + ($rutaRel -replace ' ', '%20')
}

# Saca el texto de la etiqueta <title> de un HTML
function Get-TituloHtml($rutaCompleta) {
    try {
        $html = Get-Content -LiteralPath $rutaCompleta -Raw -Encoding UTF8
        $m = [regex]::Match($html, '(?is)<title[^>]*>(.*?)</title>')
        if ($m.Success) {
            $t = $m.Groups[1].Value.Trim()
            if ($t -ne "") { return $t }
        }
    } catch { }
    return ""      # si no hay title, se usa el nombre del archivo
}

# Convierte un nombre de archivo en un titulo legible ("box-sizing-border-box" -> "Box sizing border box")
function Get-TituloDesdeNombre($nombre) {
    $t = [IO.Path]::GetFileNameWithoutExtension($nombre)
    $t = $t -replace '[-_]+', ' '
    $t = $t -replace '\s+', ' '
    $t = $t.Trim()
    if ($t -ne "") { return (Get-Culture).TextInfo.ToTitleCase($t.ToLower()) }
    return $nombre
}

# Convierte un texto en algo valido dentro de comillas de JavaScript
function Q($texto) {
    $t = "" + $texto
    $t = $t -replace '\\', '\\'
    $t = $t -replace '"', '\"'
    return '"' + $t + '"'
}

# Convierte un array de valores ["a", "b"] en '["a", "b"]' de JavaScript
function Q-Array($valores) {
    $partes = @()
    foreach ($x in $valores) { $partes += (Q $x) }
    return "[" + ($partes -join ", ") + "]"
}

# Escribe un objeto de JavaScriptPretty, una clave por linea
function Objeto($campos) {
    $lineas = @()
    $lineas += "    {"
    foreach ($k in $campos.Keys) {
        $v = $campos[$k]
        if ($v -is [array]) { $lineas += ("      " + $k + ": " + (Q-Array $v) + ",") }
        else { $lineas += ("      " + $k + ": " + $v + ",") }
    }
    # quita la ultima coma para que el objeto sea JavaScript valido
    $lineas[$lineas.Count - 1] = $lineas[$lineas.Count - 1] -replace ',$', ''
    $lineas += "    }"
    return ($lineas -join "`r`n")
}


# ---------- 1. TRABAJOS DE CLASE (..\TAREAS) ----------
# Cada TARJETA de la web es un grupo de paginas de una misma carpeta:
#
#   TAREAS\Primera_Tarea\index.html + PrimerEjecicio.md   -> tarjeta 01
#   TAREAS\Cuarta_tarea\Tarea1\index.html + ...pdf       -> tarjeta 04
#   TAREAS\Cuarta_tarea\Tarea2\index.html + ...pdf       -> tarjeta 05
#
# COMO SE SABE QUE PDF ES DE QUE EJERCICIO:
# el PDF se asigna a la pagina que esta en la MISMA CARPETA.
#   Cuarta_tarea\Tarea1\ejercicios_funciones_javascript.pdf  -> Tarea1
#   Cuarta_tarea\Tarea2\ejercicios_javascript (1).pdf          -> Tarea2
# Asi no hay que suponer nada: el archivo de al lado es el de ese ejercicio.
#
# Si en meta.js una entrega declara "tarjetas", se respetan esas tarjetas
# en vez de agrupar por carpeta (sirve para cambiar el reparto).

$carpetaTareas = Join-Path $base "TAREAS"
$listaTareas = @()

if (Test-Path -LiteralPath $carpetaTareas) {

    # 1) se agrupan los archivos .html, .pdf y .md por carpeta
    $grupos = [ordered]@{}

    $archivos = Get-ChildItem -LiteralPath $carpetaTareas -Recurse -File |
        Where-Object { $_.Extension -match '^\.(html|pdf|md)$' } |
        Sort-Object FullName

    foreach ($a in $archivos) {

        $ruta = Get-RutaRelativa $a
        $relativo = $ruta.Substring("TAREAS/".Length)   # Cuarta_tarea/Tarea1/index.html
        $partes = $relativo -split '/'

        $entrega = $partes[0]                            # Cuarta_tarea
        if ($partes.Count -gt 2) {
            $grupo = ($partes[1..($partes.Count - 2)] -join '/')   # Tarea1 (subcarpeta)
        } else {
            $grupo = ""                                   # esta en la raiz de la entrega
        }
        $clave = $entrega + "/" + $grupo

        if (-not $grupos.Contains($clave)) {
            $grupos[$clave] = @{ entrega = $entrega; grupo = $grupo; html = @(); docs = @() }
        }

        if ($a.Extension -eq ".html") { $grupos[$clave].html += $a }
        else { $grupos[$clave].docs += $a }
    }

    # 2) orden: primero por la lista ORDEN_TAREAS y luego por subcarpeta
    $claves = @($grupos.Keys) | Sort-Object @{Expression = {
                          $entrega = $_.ToString().Split('/')[0]
                          $pos = [array]::IndexOf($ORDEN_TAREAS, $entrega)
                          if ($pos -lt 0) { 999 } else { $pos }
                      }},
                      @{Expression = { $_.ToString() }}

    $tarjetas = @()

    foreach ($clave in $claves) {

        $g = $grupos[$clave]

        # --- metadatos de la entrega (meta.js) y del grupo (meta.js -> "grupos") ---
        $meta = Get-Meta $META_TAREAS $g.entrega
        $metaGrupo = $null
        if ($meta -and $meta.grupos -and $g.grupo -ne "") {
            $metaGrupo = Get-Meta $meta.grupos $g.grupo
        }

        # --- descripcion, etiquetas, badge y nombre de la entrega ---
        $desc = "Trabajo de clase."
        $tags = @()
        $badge = "Guardado"
        $titulo = ""

        if ($meta) {
            if ($meta.desc) { $desc = $meta.desc }
            if ($meta.tags) { $tags = $meta.tags }
            if ($meta.badge) { $badge = $meta.badge }
            if ($meta.titulo) { $titulo = $meta.titulo }
        }
        if ($metaGrupo) {
            if ($metaGrupo.desc) { $desc = $metaGrupo.desc }
            if ($metaGrupo.tags) { $tags = $metaGrupo.tags }
            if ($metaGrupo.badge) { $badge = $metaGrupo.badge }
            if ($metaGrupo.titulo) { $titulo = $metaGrupo.titulo }
        }

        $nombreEntrega = $g.entrega -replace '[-_]', ' '
        if ($meta -and $meta.nombre) { $nombreEntrega = $meta.nombre }

        # --- caso normal: una tarjeta por carpeta ---
        if (-not ($meta -and $meta.tarjetas)) {

            if (-not $titulo -and @($g.html).Count -gt 0) {
                $primera = @($g.html | Sort-Object FullName)[0]
                $titulo = Get-TituloHtml $primera.FullName
                if ($titulo -eq "") { $titulo = Get-TituloDesdeNombre $primera.Name }
            }
            if (-not $titulo) { $titulo = Get-TituloDesdeNombre ($g.grupo -replace '/', ' ') }

            $tarjetas += @{
                entrega = $nombreEntrega; titulo = $titulo; desc = $desc
                tags = $tags; badge = $badge
                html = @($g.html | Sort-Object FullName); docs = @($g.docs)
                meta = $meta; metaGrupo = $metaGrupo
            }
        }
        else {

            # --- caso especial: la entrega declara como quieres las tarjetas ---
            $usados = @()

            foreach ($t in @($meta.tarjetas)) {

                $paginas = @()
                foreach ($nombreArchivo in @($t.botones)) {
                    $f = @($g.html | Where-Object { $_.Name -eq $nombreArchivo })
                    if ($f.Count -gt 0) {
                        $paginas += $f[0]
                        $usados += $f[0].FullName
                    }
                }

                $tituloT = $t.titulo
                if (-not $tituloT) {
                    if ($paginas.Count -gt 0) {
                        $tituloT = Get-TituloHtml $paginas[0].FullName
                        if ($tituloT -eq "") { $tituloT = Get-TituloDesdeNombre $paginas[0].Name }
                    } else { $tituloT = "Ejercicios" }
                }

                $descT = $desc
                if ($t.desc) { $descT = $t.desc }
                $tagsT = $tags
                if ($t.tags) { $tagsT = $t.tags }
                $badgeT = $badge
                if ($t.badge) { $badgeT = $t.badge }

                $tarjetas += @{
                    entrega = $nombreEntrega; titulo = $tituloT; desc = $descT
                    tags = $tagsT; badge = $badgeT
                    html = $paginas; docs = @()
                    meta = $meta; metaGrupo = $metaGrupo
                }
            }

            # los PDF de la carpeta se ponen en la PRIMERA tarjeta declarada
            if ($tarjetas.Count -gt 0 -and @($g.docs).Count -gt 0) {
                $indiceUltima = -1
                for ($i = 0; $i -lt $tarjetas.Count; $i++) {
                    if ($tarjetas[$i].entrega -eq $nombreEntrega) { $indiceUltima = $i }
                }
                if ($indiceUltima -ge 0) { $tarjetas[$indiceUltima].docs = @($g.docs) }
            }

            # si queda alguna pagina sin meter en una tarjeta, se crea una
            # tarjeta extra para que no se pierda ningun archivo
            $resto = @($g.html | Where-Object { $usados -notcontains $_.FullName } | Sort-Object FullName)
            if ($resto.Count -gt 0) {
                $tituloR = "Otros ejercicios"
                if ($meta.titulo) { $tituloR = $meta.titulo }
                $tarjetas += @{
                    entrega = $nombreEntrega; titulo = $tituloR; desc = $desc
                    tags = $tags; badge = $badge
                    html = $resto; docs = @()
                    meta = $meta; metaGrupo = $null
                }
            }
        }
    }

    # 3) se escribe cada tarjeta en el archivo de datos
    $num = 0

    foreach ($t in $tarjetas) {

        $num++
        $meta = $t.meta
        $metaGrupo = $t.metaGrupo

        # --- botones: un enlace por cada pagina de la tarjeta ---
        $botones = @()
        $paginas = @($t.html)
        $cuantas = $paginas.Count

        foreach ($f in $paginas) {

            $textoBoton = Get-TituloDesdeNombre $f.Name

            if ($f.Name -eq "index.html") {
                if ($cuantas -eq 1) { $textoBoton = "Ver tarea" }
                else { $textoBoton = $f.Directory.Name }
            }

            # texto personalizado desde meta.js
            $rel = Get-RutaRelativa $f
            $recorte = "TAREAS/"
            if ($f.Directory.Parent.Name) { $recorte = "TAREAS/" + $f.Directory.Parent.Name + "/" }
            if ($rel.StartsWith($recorte)) { $rel = $rel.Substring($recorte.Length) }

            $p = $null
            if ($metaGrupo -and $metaGrupo.botones) {
                $p = $metaGrupo.botones.PSObject.Properties[$rel]
                if (-not $p) { $p = $metaGrupo.botones.PSObject.Properties[$f.Name] }
            }
            if (-not $p -and $meta -and $meta.botones) {
                $p = $meta.botones.PSObject.Properties[$rel]
                if (-not $p) { $p = $meta.botones.PSObject.Properties[$f.Name] }
            }
            if ($p) { $textoBoton = $p.Value }

            $botones += (Q-Array @((Get-Href (Get-RutaRelativa $f)), $textoBoton))
        }

        # --- enunciados: los PDF / .md de la misma carpeta ---
        $listaDocs = @()
        $documentos = @($t.docs | Sort-Object @{Expression = {
            if ($_.Extension -eq ".pdf") { 0 } else { 1 } }}, FullName)

        foreach ($doc in $documentos) {

            $texto = "Enunciado"

            $p = $null
            if ($metaGrupo -and $metaGrupo.enunciados) {
                $p = $metaGrupo.enunciados.PSObject.Properties[$doc.Name]
            }
            if (-not $p -and $meta -and $meta.enunciados) {
                $p = $meta.enunciados.PSObject.Properties[$doc.Name]
            }
            if ($p) { $texto = $p.Value }

            # [ruta del enlace, texto del boton, nombre real del archivo]
            $listaDocs += (Q-Array @((Get-Href (Get-RutaRelativa $doc)), $texto, $doc.Name))
        }

        $campos = [ordered]@{
            entrega    = (Q $t.entrega)
            titulo     = (Q $t.titulo)
            desc       = (Q $t.desc)
            tags       = $t.tags
            badge      = (Q $t.badge)
            botones    = "[" + ($botones -join ", ") + "]"
            enunciados = "[" + ($listaDocs -join ", ") + "]"
        }
        $listaTareas += "    " + (Objeto $campos)
    }
}

# ---------- 2. PRACTICAS DE CASA (..\Practicas_Manuales_De_La_Tareas) ----------

$carpetaPracticas = Join-Path $base "Practicas_Manuales_De_La_Tareas"
$listaPracticas = @()

if (Test-Path -LiteralPath $carpetaPracticas) {
    $archivos = Get-ChildItem -LiteralPath $carpetaPracticas -Recurse -File |
        Where-Object { $_.Extension -match '^\.(html|css)$' } |
        Sort-Object FullName

    foreach ($a in $archivos) {

        $ruta = Get-RutaRelativa $a
        $esCss = ($a.Extension -eq ".css")

        # --- titulo ---
        if ($esCss) { $titulo = "Hoja de estilos: " + $a.Directory.Name }
        else {
            $titulo = Get-TituloHtml $a.FullName
            if ($titulo -eq "") { $titulo = Get-TituloDesdeNombre $a.Name }
        }

        # --- metadatos ---
        $desc = "Practica manual de " + $a.Directory.Name + "."
        $tags = @()
        $badge = "Hecha"
        $icono = "HTML"

        $meta = Get-Meta $META_PRACTICAS $ruta
        if ($meta) {
            if ($meta.desc) { $desc = $meta.desc }
            if ($meta.tags) { $tags = $meta.tags }
            if ($meta.badge) { $badge = $meta.badge }
        }
        if ($esCss) { $icono = "CSS" }
        elseif ($a.Extension -eq ".html" -and $a.Directory.Name -match "JS") { $icono = "JS" }
        else { $icono = "HTML" }

        $campos = [ordered]@{
            ruta   = (Q $ruta)
            href   = (Q (Get-Href $ruta))
            titulo = (Q $titulo)
            desc   = (Q $desc)
            tags   = $tags
            badge  = (Q $badge)
            icono  = (Q $icono)
        }
        $listaPracticas += "    " + (Objeto $campos)
    }
}


# ---------- 3. RECURSOS DE CLASE (..\Informacion_De_Clase) ----------

$carpetaInfo = Join-Path $base "Informacion_De_Clase"
$grupos = [ordered]@{ html = @(); css = @(); manual = @(); vscode = @() }
$listaNotas = @()
$listaFotos = @()

if (Test-Path -LiteralPath $carpetaInfo) {

    # --- PDF: cada carpeta va a su grupo ---
    $pdfs = Get-ChildItem -LiteralPath $carpetaInfo -Recurse -File -Filter *.pdf | Sort-Object FullName
    foreach ($a in $pdfs) {
        $ruta = Get-RutaRelativa $a
        $titulo = ""
        $meta = Get-Meta $META_RECURSOS $ruta
        if ($meta -and $meta.titulo) { $titulo = $meta.titulo }
        if (-not $titulo) { $titulo = Get-TituloDesdeNombre $a.Name }

        # OJO: primero se mira HTML_Y_CSS porque su nombre tambien lleva "CSS"
        $grupo = "html"
        if ($a.Directory.Name -match "HTML_Y_CSS") { $grupo = "manual" }
        elseif ($a.Directory.Name -match "VsCODE") { $grupo = "vscode" }
        elseif ($a.Directory.Name -match "CSS") { $grupo = "css" }

        $grupos[$grupo] += (Q-Array @((Get-Href $ruta), $titulo))
    }

    # --- imagenes: van a la galeria de fotos ---
    $imgs = Get-ChildItem -LiteralPath $carpetaInfo -Recurse -File |
        Where-Object { $_.Extension -match '^\.(jpg|jpeg|png)$' } |
        Sort-Object FullName
    foreach ($a in $imgs) {
        $ruta = Get-RutaRelativa $a
        $titulo = "Foto de clase"
        $meta = Get-Meta $META_FOTOS $ruta
        if ($meta -and $meta.titulo) { $titulo = $meta.titulo }
        $listaFotos += (Q-Array @((Get-Href $ruta), $titulo, $a.Name))
    }

    # --- notas .md ---
    $mds = Get-ChildItem -LiteralPath $carpetaInfo -Recurse -File -Filter *.md | Sort-Object FullName
    foreach ($a in $mds) {
        $ruta = Get-RutaRelativa $a
        $titulo = Get-TituloDesdeNombre $a.Name
        $desc = "Apunte guardado de clase."
        $meta = Get-Meta $META_NOTAS $ruta
        if ($meta) {
            if ($meta.titulo) { $titulo = $meta.titulo }
            if ($meta.desc) { $desc = $meta.desc }
        }
        $listaNotas += (Q-Array @((Get-Href $ruta), $titulo, $desc, $a.Extension.TrimStart('.').ToUpper()))
    }
}


# ---------- 4. PAGINAS EXTERNAS (escritas a mano en meta.js) ----------

$listaExternas = @()
foreach ($x in $EXTERNAS) {
    $campos = [ordered]@{
        url    = (Q $x.url)
        titulo = (Q $x.titulo)
        desc   = (Q $x.desc)
    }
    $listaExternas += "    " + (Objeto $campos)
}


# ---------- 5. ESCRIBIR EL ARCHIVO js\datos.js ----------

$totalRecursos = $grupos.html.Count + $grupos.css.Count + $grupos.manual.Count + $grupos.vscode.Count

$L = @()
$L += "/* ============================================================"
$L += "   KINDRED.JAVA - DATOS DE LA WEB (ARCHIVO GENERADO)"
$L += "   ----------------------------------------------------------"
$L += "   NO LO EDITES A MANO! Se reescribe cada vez que ejecutas"
$L += "   ACTUALIZAR.bat."
$L += ""
$L += "   Para cambiar textos o descripciones edita  datos\meta.js"
$L += "   y vuelve a ejecutar ACTUALIZAR.bat."
$L += ""
$L += "   Se ha generado con:"
$L += ("   " + (Get-Date -Format "dd/MM/yyyy HH:mm"))
$L += "   ============================================================ */"
$L += ""
$L += "var DATOS = {"
$L += ""
$L += "  /* Trabajos de clase encontrados en ..\TAREAS */"
$L += "  tareas: ["
$L += ($listaTareas -join ",`r`n")
$L += "  ],"
$L += ""
$L += "  /* Practicas de casa encontradas en ..\Practicas_Manuales_De_La_Tareas */"
$L += "  practicas: ["
$L += ($listaPracticas -join ",`r`n")
$L += "  ],"
$L += ""
$L += "  /* PDF de ..\Informacion_De_Clase, agrupados por carpeta */"
$L += "  recursos: {"
$L += "    html:   [" + ($grupos.html -join ", ") + "],"
$L += "    css:    [" + ($grupos.css -join ", ") + "],"
$L += "    manual: [" + ($grupos.manual -join ", ") + "],"
$L += "    vscode: [" + ($grupos.vscode -join ", ") + "]"
$L += "  },"
$L += ""
$L += "  /* Notas y analisis (.md). Formato: [ruta, titulo, desc, extension] */"
$L += "  notas: [" + ($listaNotas -join ", ") + "],"
$L += ""
$L += "  /* Fotos de clase. Formato: [ruta, titulo, nombre del archivo] */"
$L += "  fotos: [" + ($listaFotos -join ", ") + "],"
$L += ""
$L += "  /* Paginas externas (escritas a mano en meta.js) */"
$L += "  externas: ["
$L += ($listaExternas -join ",`r`n")
$L += "  ]"
$L += "};"
$L += ""
$L += "/* Numeros que se ven en la portada (se cuentan solos) */"
$L += "DATOS.resumenes = {"
$L += "  tareas: " + $listaTareas.Count + ","
$L += "  practicas: " + $listaPracticas.Count + ","
$L += "  pdf: " + $totalRecursos + ","
$L += "  notas: " + $listaNotas.Count + ","
$L += "  fotos: " + $listaFotos.Count + ","
$L += "  recursos: " + ($totalRecursos + $listaNotas.Count + $listaFotos.Count)
$L += "};"

$texto = $L -join "`r`n"
[IO.File]::WriteAllText($salida, $texto, (New-Object System.Text.UTF8Encoding $true))


# ---------- 6. RESUMEN POR PANTALLA ----------

Write-Host ""
Write-Host "  TAREAS    : $($listaTareas.Count) trabajos" -ForegroundColor Green
Write-Host "  PRACTICAS : $($listaPracticas.Count) archivos" -ForegroundColor Green
Write-Host "  PDF       : $totalRecursos" -ForegroundColor Green
Write-Host "  NOTAS .md : $($listaNotas.Count)" -ForegroundColor Green
Write-Host "  FOTOS     : $($listaFotos.Count)" -ForegroundColor Green
Write-Host "  TOTAL     : $($totalRecursos + $listaNotas.Count + $listaFotos.Count) recursos" -ForegroundColor Green
Write-Host ""
Write-Host "  Archivo escrito en: js\datos.js" -ForegroundColor Cyan
Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host " LISTO. Abre la web para ver los cambios." -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
