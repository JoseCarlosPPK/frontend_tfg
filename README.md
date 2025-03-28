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

Durante el desarrollo, la primera versión no se va a conectar a la API y será
una página prácticamente estática o usará un fichero .json con datos de prueba.

## Estado actual

Añadiendo puntos de entrada `index.js` a los módulos de `src`. Ver [issue 27](https://github.com/JoseCarlosPPK/frontend_tfg/issues/27)

## Iniciar el proyecto en desarrollo

En [package.json](./package.json) encuentra los diferentes scripts que puede
ejecutar, siendo el más importante para el desarrollo

```
npm run dev
```
