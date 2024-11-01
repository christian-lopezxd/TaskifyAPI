# Taskify API

Taskify API es una API desarrollada con Node.js, NestJS, y Prisma ORM, diseñada para la gestión de tareas y usuarios. Este proyecto provee endpoints para la creación, edición, y eliminación de tareas y usuarios, y está configurado para conectarse a una base de datos SQL Server.

## Tabla de Contenidos
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Documentación de la API](#documentación)

---

## Instalación

### Requisitos previos
- Node.js (versión 18 o superior)
- npm (se instala automáticamente con Node.js)
- SQL Server (local o remoto)

### Clonar el repositorio
Clona este repositorio en tu máquina local:
```bash
git clone https://github.com/christian-lopezxd/TaskifyAPI.git
cd TaskifyAPI
cd taskify_api
```
### Instalar dependencias
```bash
npm install
```

## Configuración

Para configurar el proyecto, sigue los siguientes pasos:

1. **Configurar Variables de Entorno**: Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```dotenv
    DATABASE_URL="sqlserver://<HOST>:<PORT>;database=taskifybd;user=<USER>;password=<PASSWORD>;encrypt=true;trustServerCertificate=true"
    ```

   - Reemplaza `<USER>`, `<PASSWORD>`, `<HOST>`, `<PORT>`, y `<DATABASE>` con los valores correspondientes a tu configuración de base de datos.

2. **Ejecutar Migraciones**: Para aplicar las migraciones a la base de datos, ejecuta el siguiente comando en la terminal:

    ```bash
    npx prisma migrate dev --name init
    ```

3. **Generar el Cliente de Prisma**: Genera el cliente de Prisma para interactuar con la base de datos.

    ```bash
    npx prisma generate
    ```

4. **Verificar Conexión con la Base de Datos**: Asegúrate de que la base de datos esté correctamente configurada y en ejecución antes de iniciar la aplicación.

## Ejecución del Proyecto

Para ejecutar el proyecto localmente, sigue estos pasos:

1. **Compilar el Proyecto**: Asegúrate de que el proyecto está correctamente compilado. Puedes compilar el proyecto ejecutando:

    ```bash
    npm run build
    ```

2. **Iniciar el Proyecto**: Una vez compilado, puedes iniciar el servidor utilizando el siguiente comando:

    ```bash
    npm run start:prod
    ```

3. **Ejecutar en Modo de Desarrollo**: Si prefieres trabajar en modo de desarrollo, utiliza el siguiente comando para que el servidor se reinicie automáticamente con cada cambio guardado:

    ```bash
    npm run start:dev
    ```

4. **Verificar la Ejecución**: Una vez que el servidor esté en funcionamiento, podrás acceder a la API en `http://localhost:3000`. Asegúrate de que el puerto `3000` esté libre en tu máquina o configura uno diferente en el archivo `.env`.

## Documentación

Este proyecto utiliza Swagger para generar la documentación automática de la API, lo que permite explorar y probar los endpoints de manera interactiva.

### Acceso a la Documentación de la API

1. **Levantar el Proyecto**: Asegúrate de que el proyecto esté en ejecución utilizando el comando:

    ```bash
    npm run start
    ```

2. **Acceder a Swagger**: Una vez que el proyecto esté en funcionamiento, abre tu navegador y visita la siguiente URL para acceder a la documentación de la API generada automáticamente:

    ```
    http://localhost:3000/api-docs
    ```

En esta página, podrás explorar todos los endpoints disponibles, ver sus descripciones, parámetros requeridos y respuestas posibles. Además, Swagger permite realizar pruebas directamente desde la interfaz.

