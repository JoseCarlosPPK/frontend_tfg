# React Frontend TFG

Se va a realizar una aplicación web para el Grado de Farmacia
de la Facultad de Farmacia (URG).

En este repositorio se va a desarrollar el frontend en la tecnología
React. Se seguirá el prototipo realizado en [prototype](./prototype/README.md).

El desarrollo del frontend irá por rutas o endpoints, es decir, primero
se hará /path_1 y las rutas que dependan de esta, luego /path_2, etc.
Los endpoints principales son:

1. / (página de inicio)
2. /login
3. /centros
4. /convocatorias
5. /correo
6. /administración

Durante el desarrollo, se permite que la primera versión no se conecte a la API y sea
una página prácticamente estática o use un fichero .json con datos de prueba.

Se está utilizando el paquete `prettier` con comillas simples para las cadenas,
espacios en vez de tabulador de tamaño 3, tamaño de línea 80 y se añaden las extensiones
de los ficheros al hacer import.

## Estado actual

Desarrollando /login. Como es el primero se necesita:

- [ ] El header
- [ ] El footer
- [ ] La página de login

## Iniciar el proyecto en desarrollo

En [package.json](./package.json) encuentra los diferentes scripts que puede
ejecutar, siendo el más importante para el desarrollo

```
npm run dev
```
