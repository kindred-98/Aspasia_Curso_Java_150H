/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package Tarea4_java;

/**
 * TAREA 4 - Precio con descuento e IVA (version sencilla, todo dentro del main).
 *
 * El enunciado pide:
 *  1. Crear la variable para la cantidad y el precio.
 *  2. Calcular el importe total.
 *  3. Calcular un descuento del 10 %.
 *  4. Calcular cuanto dinero se descuenta en total.
 *  5. Restar el descuento al importe total.
 *  6. Calcular el IVA del 21 % sobre el precio despues de aplicar el descuento.
 *  7. Obtener el precio final.
 *  8. Mostrarlo en pantalla.
 *
 * @author mañana
 */
public class PrecioConDescuentoEIVA {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        // ---------- 1. Variables: cantidad y precio ----------
        String nombre_producto = "Zapatillas deportivas"; // nombre del producto
        int cantidad = 3;                                // cantidad de productos
        double precio = 45.50;                           // precio de UN solo producto

        // ---------- 2. Importe total (sin descuentos) ----------
        // se multiplica la cantidad de productos por el precio de cada uno
        double importe_inicial = cantidad * precio;

        // ---------- 3. Descuento del 10 % ----------
        double porcentaje_descuento = 10; // el 10 % que se descuenta

        // ---------- 4. Cuanto dinero se descuenta en total ----------
        // el porcentaje se divide entre 100 para pasarlo a decimal (10 / 100 = 0.10)
        // y se multiplica por el importe inicial
        double importe_descuento = importe_inicial * (porcentaje_descuento / 100);

        // ---------- 5. Restar el descuento al importe total ----------
        double importe_despues_descuento = importe_inicial - importe_descuento;

        // ---------- 6. IVA del 21 % (sobre el precio ya descontado) ----------
        double porcentaje_iva = 21; // el 21 % de IVA
        double importe_iva = importe_despues_descuento * (porcentaje_iva / 100);

        // ---------- 7. Precio final ----------
        // es el precio con descuento mas el IVA
        double precio_final = importe_despues_descuento + importe_iva;

        // ---------- 8. Mostrar todo en pantalla ----------
        System.out.println("========== TIENDA ==========");
        // %.2f muestra el numero con 2 decimales
        System.out.printf("Precio del producto  : %.2f euros%n", precio);
        System.out.println("Cantidad de producto : " + cantidad);
        System.out.println("Producto             : " + nombre_producto);
        System.out.printf("Importe inicial      : %.2f euros%n", importe_inicial);
        System.out.printf("Importe del descuento: %.2f euros (10 %% de descuento)%n", importe_descuento);
        System.out.printf("Precio tras descuento: %.2f euros%n", importe_despues_descuento);
        System.out.printf("Importe del IVA      : %.2f euros (21 %% de IVA)%n", importe_iva);
        System.out.printf("PRECIO FINAL         : %.2f euros%n", precio_final);
        System.out.println("===========================");
    }

}