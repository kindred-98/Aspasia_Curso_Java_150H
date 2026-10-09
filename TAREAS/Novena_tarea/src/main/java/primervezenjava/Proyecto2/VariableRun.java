/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package primervezenjava.Proyecto2;

/**
 *
 * @author mañana
 */
public class VariableRun {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here

        // El tipo de la variable debe ser "Variables" (la clase que se instancia con new),
        // no "VariableRun". Antes estaba asi:
        //     VariableRun variables = new Variables(10);
        // y el error era:
        //     Uncompilable code - incompatible types:
        //     primervezenjava.Proyecto2.Variables cannot be converted to
        //     primervezenjava.Proyecto2.VariableRun
        // porque un objeto "Variables" no se puede asignar a una variable de tipo "VariableRun".
        Variables variables = new Variables ( 10 );

        variables.mostrar_variables();

        // Antes habia un "variables.toString();" suelto aqui: no imprimia nada,
        // porque toString() solo devuelve el texto. El println de abajo es el que lo muestra.
        System.out.println(variables.toString());
    }
    
}
