/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package SegundoDia;

/**
 *
 * @author mañana
 */
public class PercioConDescuentos {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        double precio = 50.00;
        int cantidad = 5;
        double total = precio * cantidad;
        double descuento = 10;
        double importeDescuento = total * descuento /100 ;
        double precioDescontado = total - importeDescuento;
        double iva = 21;
        double importeIVA = precioDescontado * iva / 100;
        double precioFinal = precioDescontado + importeIVA;     
        
        System.out.println("Precio del producto: " + precio + " Euros");
        System.out.println("Cantidad: " + cantidad);
        System.out.println("Importe inicial: " + total + " Euro");
        System.out.println("Descuento aplicado: " + importeDescuento + " Euro");
        System.out.println("Precio con descuento: "+ precioDescontado + " Euro");
        System.out.println("IVA aplicado: "+ importeIVA + " Euro");
        System.out.println("Precio Final: " + precioFinal + " Euro");
}
    
}
