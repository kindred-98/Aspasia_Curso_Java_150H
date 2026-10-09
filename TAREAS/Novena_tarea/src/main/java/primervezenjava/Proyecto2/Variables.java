/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package primervezenjava.Proyecto2;

/**
 * OJO: para que esta clase exista al correr, hay que compilar el proyecto completo.
 * Si solo se ejecuta el archivo VariableRun.java (Shift+F6 = "Run File"), NetBeans
 * compila unicamente ese archivo y esta clase no se genera, dando el error:
 *     NoClassDefFoundError: primervezenjava/Proyecto2/Variables
 * Solucion: usar F6 ("Run Project") o hacer "Clean and Build" una vez.
 *
 * @author mañana
 */
public class Variables {
    
    
    private int puntos_iniciales ;

    public Variables(int puntos_iniciales) {
        this.puntos_iniciales = puntos_iniciales;
    }

    public int getPuntos_iniciales() {
        return puntos_iniciales;
    }

    public void setPuntos_iniciales(int puntos_iniciales) {
        this.puntos_iniciales = puntos_iniciales;
    }

    @Override
    public String toString() {
        return "Variables{" + "puntos_iniciales=" + puntos_iniciales + '}';
    }

public void mostrar_variables(){
    System.out.println("Variable: " +  puntos_iniciales);

}
    
}
