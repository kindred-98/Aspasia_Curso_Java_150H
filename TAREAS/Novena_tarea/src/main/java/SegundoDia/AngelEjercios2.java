/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package SegundoDia;

import java.util.Scanner;

/**
 * Triangulo: pide base y altura y calcula el area y el perimetro.
 *
 * @author mañana
 */
public class AngelEjercios2 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        // 1) Creamos el Scanner para poder leer lo que el usuario escribe por teclado.
        //    Scanner( System.in ) significa: "lee de la entrada estandar (el teclado)".
        Scanner teclado = new Scanner(System.in);

        // 2) Pedimos la base. print (sin ln) para que el cursor se quede en la misma linea
        //    y el usuario escriba justo despues del texto.
        System.out.print("Introduce la base del triangulo (metros): ");
        // nextLine() devuelve un String, asi que lo convertimos con Double.parseDouble().
        double base = Double.parseDouble(teclado.nextLine());

        // 3) Pedimos la altura de la misma manera.
        System.out.print("Introduce la altura del triangulo (metros): ");
        double altura = Double.parseDouble(teclado.nextLine());

        // 4) AREA del triangulo = (base * altura) / 2
        double area = (base * altura) / 2;

        // 5) Para el perimetro necesito el lado inclinado (la hipotenusa).
        //    Pitagoras: hipotenusa = raiz cuadrada de (base^2 + altura^2)
        //    Math.sqrt( ... ) es la raiz cuadrada y Math.pow( x, 2 ) es x elevado al cuadrado.
        double hipotenusa = Math.sqrt(Math.pow(base, 2) + Math.pow(altura, 2));

        // 6) PERIMETRO = base + altura + hipotenusa (suma de los 3 lados).
        double perimetro = base + altura + hipotenusa;

        // 7) Mostramos el resultado. Concatenamos con + para unir texto y numeros.
        System.out.println("-----------------------------");
        System.out.println("Base: " + base + " metros");
        System.out.println("Altura: " + altura + " metros");
        System.out.println("Area del triangulo: " + area + " m2");
        System.out.println("Hipotenusa: " + hipotenusa + " metros");
        System.out.println("Perimetro: " + perimetro + " metros");

        // 8) Cerramos el Scanner para liberar los recursos del teclado.
        teclado.close();
    }

}