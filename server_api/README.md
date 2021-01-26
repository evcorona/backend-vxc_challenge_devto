# Backend challenge **API de dev.to**

Endpoints:
* GET /posts -> listas posts
* POST /posts -> crear posts
* POST /auth/signup
* POST /auth/login
  
Conectar front de dev.to a su nuevo backend.

El reto debe usar:
* Arquitectura limpia. (OK)
  * File System
    * index.js: Este archivo tiene la tarea de levantar nuestra aplicación. (creado)
    * server.js: Este archivo guarda la definición del servidor. (creado)
      * Que rutas van a existir.
      * Que middlewares se van a usar.
      * Aquí se montan los routers al servidor.
    * models: Alberga nuestros modelos de bases de datos. (Un modelo es la representación  de una colección y consta de un nombre de colección, y un schema.) (creado)
    * usecases: Alberga funciones que puede ejecutar el usuario en el sistema. (Agrupadas por entidades.) (creado)
    * routes: Alberga las rutas de nuestro servidor (Agrupadas por entidades.) (creado)
    * lib: Alberga código reutilizable a traves de todas las capas de la architectura. (creado)
  * Proceso de desarrollo
    1. Modelo : Asegurarnos de tener el acceso a datos que necesitamos para la tarea o crear el modelo.
    2. UseCase: Asegurarnos de tener las funciones necesarias para la tarea o crear el caso de uso.
    3. Router: Asegurarnos de tener la(s) ruta(s) o crear la ruta/router necesarias.
    4. Asegurarnos de que nuestro router este montado en el server, si no proceder a montarlo.
* Express. 
  * Instalado
* Mongoose.
  * Instalado
* Modelos.
* Jwt.
  * Instalado
* Bcrypt
  * Instalado


// title, username, date, tags, content, URL
//username,email,password