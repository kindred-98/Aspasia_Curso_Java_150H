/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
   
 */
    
         
package SegundoDia;

import java.util.Scanner;

/*
 * @KINDRED
 */

public class AngelEjercicio {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        Scanner teclado = new Scanner(System.in); 
        
        System.out.print("Introduce tu nombre: ");
        String nombre = teclado.nextLine();
        System.out.print("Introduce tu edad: ");
        int edad = Integer.parseInt(teclado.nextLine());
        System.out.print("Introduce tu altura: ");
        double altura = Double.parseDouble(teclado.nextLine());
        
        System.out.println("Nombre: " + nombre);
        System.out.println("Edad: "+ edad);
        System.out.println("Altura: "+ altura);
        
        teclado.close();
        
                
    }
    
}
