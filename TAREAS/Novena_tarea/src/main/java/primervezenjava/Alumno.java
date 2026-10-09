/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package primervezenjava;

/**
 *
 * @author mañana
 */
public class Alumno {
    private String nombre;
    private double nota;
    private int faltas; 
    private boolean evaluacion;

    public Alumno(String nombre, double nota, int faltas, boolean apobado) {
        this.nombre = nombre;
        this.nota = nota;
        this.faltas = faltas;
        this.evaluacion = apobado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public double getNota() {
        return nota;
    }

    public void setNota(double nota) {
        this.nota = nota;
    }

    public int getFaltas() {
        return faltas;
    }

    public void setFaltas(int faltas) {
        this.faltas = faltas;
    }

    public boolean isApobado() {
        return evaluacion;
    }

    public void setApobado(boolean apobado) {
        this.evaluacion = apobado;
    }

    @Override
    public String toString() {
        return "Alumno: " + "nombre=" + nombre + ", nota=" + nota + ", faltas=" + faltas + ", apobado=" + evaluacion;
    }

public void mostrar (){

    System.out.println("Nombre: " +  nombre);
    System.out.println("Nota: " +  nota);
    System.out.println("Faltas: " +  faltas);
    System.out.println("Evalucaion: " +  evaluacion);
    

}
    
}


