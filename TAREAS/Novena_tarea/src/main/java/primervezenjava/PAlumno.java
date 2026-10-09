/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package primervezenjava;

/**
 *
 * @author mañana
 */
public class PAlumno {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        Alumno alumno = new Alumno ("Angel", 9.8, 1, true );
        alumno.toString();
        alumno.mostrar();
        System.out.println(alumno.toString());
    }
    
}
