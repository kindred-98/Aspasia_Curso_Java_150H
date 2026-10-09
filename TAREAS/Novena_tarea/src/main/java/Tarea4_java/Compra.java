/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Tarea4_java;

/**
 * TAREA 4 - Precio con descuento e IVA (version con clase).
 *
 * En vez de hacer todos los calculos dentro del main, se guardan los datos
 * (nombre, cantidad y precio) en los atributos de la clase y cada calculo
 * se hace en su propio metodo. Asi el programa queda mas ordenado y la clase
 * se puede reutilizar desde cualquier otro sitio.
 *
 * @author mañana
 */
public class Compra {

    // ---------- atributos de la compra ----------
    private String nombre_producto; // nombre del producto
    private int cantidad;           // cuantos productos se compran
    private double precio;          // precio de UN solo producto

    // ---------- constantes de los porcentajes ----------
    private static final double PORCENTAJE_DESCUENTO = 10; // descuento del 10 %
    private static final double PORCENTAJE_IVA = 21;        // IVA del 21 %

    /**
     * Constructor: da los valores iniciales al crear el objeto.
     */
    public Compra(String nombre_producto, int cantidad, double precio) {
        this.nombre_producto = nombre_producto;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    // ---------- 1 y 2. importe total de la compra ----------
    /**
     * Importe total = cantidad de productos * precio de cada uno.
     */
    public double getImporte_inicial() {
        return cantidad * precio;
    }

    // ---------- 3 y 4. descuento del 10 % y dinero que se descuenta ----------
    /**
     * Importe del descuento = importe inicial * 10 %.
     */
    public double getImporte_descuento() {
        return getImporte_inicial() * (PORCENTAJE_DESCUENTO / 100);
    }

    // ---------- 5. restar el descuento al importe total ----------
    /**
     * Precio despues del descuento = importe inicial - importe del descuento.
     */
    public double getImporte_despues_descuento() {
        return getImporte_inicial() - getImporte_descuento();
    }

    // ---------- 6. IVA del 21 % sobre el precio ya descontado ----------
    /**
     * Importe del IVA = precio despues del descuento * 21 %.
     */
    public double getImporte_iva() {
        return getImporte_despues_descuento() * (PORCENTAJE_IVA / 100);
    }

    // ---------- 7. precio final ----------
    /**
     * Precio final = precio despues del descuento + importe del IVA.
     */
    public double getPrecio_final() {
        return getImporte_despues_descuento() + getImporte_iva();
    }

    // ---------- 8. mostrar todo en pantalla ----------
    /**
     * Muestra los 7 datos pedidos: precio, cantidad, importe inicial,
     * importe del descuento, precio tras el descuento, IVA y precio final.
     */
    public void mostrar() {
        System.out.println("========== TIENDA ==========");
        System.out.printf("Precio del producto  : %.2f euros%n", precio);
        System.out.println("Cantidad de producto : " + cantidad);
        System.out.println("Producto             : " + nombre_producto);
        System.out.printf("Importe inicial      : %.2f euros%n", getImporte_inicial());
        System.out.printf("Importe del descuento: %.2f euros (10 %% de descuento)%n", getImporte_descuento());
        System.out.printf("Precio tras descuento: %.2f euros%n", getImporte_despues_descuento());
        System.out.printf("Importe del IVA      : %.2f euros (21 %% de IVA)%n", getImporte_iva());
        System.out.printf("PRECIO FINAL         : %.2f euros%n", getPrecio_final());
        System.out.println("===========================");
    }

    // ---------- getters y setters ----------
    public String getNombre_producto() {
        return nombre_producto;
    }

    public void setNombre_producto(String nombre_producto) {
        this.nombre_producto = nombre_producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    @Override
    public String toString() {
        return "Compra{" + "nombre_producto=" + nombre_producto
                + ", cantidad=" + cantidad
                + ", precio=" + precio
                + ", precio_final=" + getPrecio_final() + '}';
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // se crea la compra: 3 unidades de un producto de 45.50 euros cada una
        Compra compra = new Compra("Zapatillas deportivas", 3, 45.50);
        compra.mostrar();
    }

}