package TAREAS.Novena_tarea;

public class precioDescuento {
    public static void main(String[] args) {
        
        double precio = 50.00;
        int cantidad = 5;
        double total = precio * cantidad;
        double descuento = 10;
        double importeDescuento = total * descuento / 100;
        double precioDescontado = total - importeDescuento;
        double iva = 21;
        double importeIVA = precioDescontado * iva / 100;
        double precioFinal = precioDescontado + importeIVA;
        
        
        System.out.println("Precio del producto: " + precio + " Euros");
        System.out.println("Cantidad: " + cantidad);
        System.out.println("Importe inicial: " + total + "Euros");
        System.out.println("Descuento aplicado: " + importeDescuento + "Euros");
        System.out.println("Precio con descuento: "+ precioDescontado + "Euros");
        System.out.println("IVA aplicado: "+ importeIVA + "Euros");
        System.out.println("Precio Final: " + precioFinal + "Euros");
    }
    
}
