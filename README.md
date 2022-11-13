# Programacion Web I proyecto sockets
## Descripcion
El proyecto se basa en una arquitectura distribuida, cuenta con un cliente en react typescript y un servidor desarrollado en typescript con express.\
El cliente almacena el nombre de usuario en el local storage por lo que para usarlo como diferentes usuarios es necesario utilizar distintos navegadores o ventanas privadas para no hacer uso del mismo usuario.\
Además el cliente se conecta al servidor para enviar y recibir mensajes sean privados o publicos.\
Inicialmente el usuario está en una sala global de mensajes y puede enviar mensajes privados a modo de "whisper" a otros usuarios al hacer click sobre el nombre de estos.
Finalmente para volver a enviar mensajes globales debe dar click sobre el botón "Send general messages". 
## Como ejcutar
### Producción
#### Servidor
1. Abrir una terminal de comandos en el directorio raiz del proyecto y ejecutar el comando `cd server` para entrar al directorio del servidor.
2. Ejecutar el comando `npm i` para instalar las dependencias del servidor.
3. Posteriormente ejecutar el comando `npm run build` para transpilar el codigo de typescript a javascript.
4. Finalmente ejecutar el comando `node dist/server.js` para iniciar el servidor.

#### Cliente
1. Abrir una terminal de comandos en el directorio raiz del proyecto, y ejecutar el comando `cd client` para entrar al directorio del cliente.
2. Ejecutar el comando `npm i` para instalar las dependencias del cliente.
3. Posteriormente ejecutar el comando `npm run build` para transpilar el codigo de react typescript a un fichero html.
4. En la misma terminal ejecutar `npx serve -s build` para ejecutar el proyecto.
5. Abrir un navegador y entrar a la direccion `http://localhost:3000` para ver el proyecto.

### Desarrollo
#### Servidor
1. Abrir una terminal de comandos en el directorio raiz del proyecto y ejecutar el comando `cd server` para entrar al directorio del servidor.
2. Ejecutar el comando `npm i` para instalar las dependencias del servidor.
3. Posteriormente ejecutar el comando `npm run start` para iniciar el servidor en modo desarrollo.

#### Cliente
1. Abrir una terminal de comandos en el directorio raiz del proyecto, y ejecutar el comando `cd client` para entrar al directorio del cliente.
2. Ejecutar el comando `npm i` para instalar las dependencias del cliente.
3. Posteriormente ejecutar el comando `npm run start` para iniciar el cliente en modo desarrollo.
4. Abrir un navegador y entrar a la direccion `http://localhost:3000` para ver el proyecto.