@echo off
REM ============================================================
REM  KINDRED.JAVA - ACTUALIZAR LOS DATOS DE LA WEB
REM  Doble clic en este archivo despues de anadir algo nuevo
REM  a tus carpetas de TAREAS, PRACTICAS o INFORMACION.
REM ============================================================

title Kindred.Java - Actualizar datos

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\actualizar.ps1"

echo.
echo. Pulsa una tecla para cerrar esta ventana...
pause > nul
