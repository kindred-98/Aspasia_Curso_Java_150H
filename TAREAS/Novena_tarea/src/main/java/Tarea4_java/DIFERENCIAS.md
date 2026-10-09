# Tarea 4: precio con descuento e IVA — diferencia entre las dos versiones

Las dos versiones **hacen exactamente lo mismo y dan el mismo resultado**. Lo único que
cambia es cómo está organizado el código.

| | Versión sencilla | Versión con clase |
|---|---|---|
| Archivo | `PrecioConDescuentoEIVA.java` | `Compra.java` |
| Dónde viven los datos | Variables locales dentro del `main` | Atributos de la clase |
| Dónde vive el cálculo | Todo seguido dentro del `main`, en orden | Un método por cada cálculo |
| Para cambiar un dato | Editás el código y recompilás | `compra.setPrecio(50)` sin tocar los cálculos |
| Para cambiar el porcentaje | Editás la línea del cálculo | Cambiás la constante `PORCENTAJE_DESCUENTO` |
| Se puede reutilizar | No: al copiarlo tenés que copiar todo el cálculo | Sí: `new Compra(...)` desde cualquier clase |
| Tamaño del `main` | Largo, hace él todas las cuentas | 2 líneas |
| Cuándo usarla | Para practicar la sintaxis | Cuando el programa crece |

---

## 1. Versión sencilla

Todo en un solo `main`, siguiendo el orden del enunciado.

```java
int cantidad = 3;                    // 1. cantidad y precio
double precio = 45.50;               // 1. cantidad y precio

double importe_inicial = cantidad * precio;                          // 2. importe total
double porcentaje_descuento = 10;                                   // 3. descuento del 10 %
double importe_descuento = importe_inicial * (porcentaje_descuento / 100); // 4. dinero que se descuenta
double importe_despues_descuento = importe_inicial - importe_descuento;   // 5. restar el descuento
double importe_iva = importe_despues_descuento * (21 / 100);        // 6. IVA del 21 %
double precio_final = importe_despues_descuento + importe_iva;       // 7. precio final

System.out.printf("PRECIO FINAL : %.2f euros%n", precio_final);      // 8. mostrar
```

Los datos viven solo mientras dura el `main`: al terminar el programa se pierden.

## 2. Versión con clase

Los datos se guardan en atributos y cada cálculo va en su método.

```java
private String nombre_producto;                       // atributo
private int cantidad;                                 // atributo
private double precio;                                // atributo

private static final double PORCENTAJE_DESCUENTO = 10;  // constante
private static final double PORCENTAJE_IVA = 21;         // constante

public double getImporte_inicial() {                  // 2.
    return cantidad * precio;
}

public double getImporte_descuento() {                // 3. y 4.
    return getImporte_inicial() * (PORCENTAJE_DESCUENTO / 100);
}

public double getImporte_despues_descuento() {        // 5.
    return getImporte_inicial() - getImporte_descuento();
}

public double getImporte_iva() {                      // 6.
    return getImporte_despues_descuento() * (PORCENTAJE_IVA / 100);
}

public double getPrecio_final() {                     // 7.
    return getImporte_despues_descuento() + getImporte_iva();
}

public void mostrar() { ... }                         // 8.

public static void main(String[] args) {
    Compra compra = new Compra("Zapatillas deportivas", 3, 45.50);
    compra.mostrar();
}
```

Ventaja clave: los métodos se llaman entre sí (`getImporte_iva()` usa
`getImporte_despues_descuento()`), así que el cálculo del precio final está escrito
**una sola vez**. Si hay un fallo en la fórmula del IVA, se corrige en un único sitio.

---

## Salida de las dos (idéntica)

```
========== TIENDA ==========
Precio del producto  : 45,50 euros
Cantidad de producto : 3
Producto             : Zapatillas deportivas
Importe inicial      : 136,50 euros
Importe del descuento: 13,65 euros (10 % de descuento)
Precio tras descuento: 122,85 euros
Importe del IVA      : 25,80 euros (21 % de IVA)
PRECIO FINAL         : 148,65 euros
===========================
```

Comprobación a mano: 3 × 45,50 = 136,50 → 10 % = 13,65 → 136,50 − 13,65 = 122,85
→ 21 % = 25,80 → 122,85 + 25,80 = **148,65 €**

---

## Cómo correr cada una

Clic derecho sobre el archivo → **Run File**. Como las dos tienen `main`, al pulsar
**F6** (Run Project) NetBeans preguntará cuál de las dos clases quieres ejecutar.