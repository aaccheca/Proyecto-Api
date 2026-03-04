# Proyecto API CRUD con PostgreSQL

Este repositorio contiene una API REST simple en Node.js / Express que se conecta a una base de datos PostgreSQL. La API expone los métodos **GET**, **POST**, **PUT** y **DELETE** sobre un recurso `items`.

Se adapta para desplegarse en Railway (u otro proveedor que soporte Node.js, como Heroku, Vercel, etc.).

---

## Estructura

```
/proyecto-api
  ├─ src/
  │   ├─ app.js         # punto de entrada
  │   ├─ db.js          # configuración de conexión a PostgreSQL
  │   ├─ routes.js      # rutas HTTP
  │   ├─ controllers/   # lógica de manejo de peticiones
  │   └─ models/        # consultas SQL
  ├─ sql/
  │   └─ schema.sql     # script de creación de tabla y datos de ejemplo
  ├─ scripts/
  │   └─ export-db.ps1  # script PowerShell para exportar la base de datos
  ├─ .env.example       # plantilla para variables de entorno
  ├─ package.json
  └─ README.md
```

---

## Configuración local

1. Clonar el repositorio y posicionarse en la carpeta:
   ```powershell
   cd "c:\Users\ASUS\Desktop\Proyecto Api"
   ```
2. Instalar dependencias:
   ```powershell
   npm install
   ```
3. Crear un fichero `.env` copiando el ejemplo:
   ```powershell
   copy .env.example .env
   ```
   y completar `DATABASE_URL` con la cadena de conexión de PostgreSQL.
4. Preparar la base de datos (puedes ejecutar `sql/schema.sql` con psql):
   ```powershell
   psql "postgres://usuario:clave@localhost:5432/mi_base" -f sql/schema.sql
   ```
5. Iniciar la API en modo desarrollo:
   ```powershell
   npm run dev
   ```
   o para producción:
   ```powershell
   npm start
   ```
6. Probar endpoints con `curl` o Postman:
   - `GET  http://localhost:3000/api/items`
   - `POST http://localhost:3000/api/items`  
     Body JSON: `{ "name": "algo", "description": "texto" }`
   - `PUT  http://localhost:3000/api/items/1`  con body similar
   - `DELETE http://localhost:3000/api/items/1`

---

## Exportar la base de datos

Ejecuta el script de PowerShell para obtener un volcado comprimido:
```powershell
cd scripts
.\export-db.ps1 -Host localhost -Port 5432 -Username usuario -Database mi_base -File backup.sql
```
Introduce la contraseña del usuario cuando se solicite. El archivo `backup.sql` contendrá la copia.

También puedes usar `pg_dump` manualmente:
```powershell
pg_dump -h localhost -U usuario -d mi_base -F c -f backup.sql
```

---

## Despliegue en Railway

1. [Crea una cuenta en Railway](https://railway.app/) si no la tienes.
2. Haz click en "New Project" y elige "Deploy from GitHub Repo".
3. Conecta tu repositorio (puedes subirlo a GitHub o usar el enlace a tu proyecto).
4. Railway detecta el `package.json` y usará `npm start`.
5. En Settings > Variables, añade `DATABASE_URL` con la cadena de conexión provista por un plugin de PostgreSQL de Railway.
6. Pulsa "Deploy". La URL pública se mostrará en la interfaz y tu profesora podrá usarla.

Railway automáticamente configura `PORT` y otras variables de entorno.

> **Nota:** Si usas SSL en la conexión, activa la opción `ssl` en `db.js` o configura `DATABASE_URL` con `?sslmode=require`.

---

## Conclusión

`src/app.js` escucha en el puerto definido y expone la API bajo `/api/items`. Cualquier cliente HTTP puede consultar y modificar los recursos.

¡Éxito con tu proyecto! Si tu profesora tiene la URL, podrá utilizarla desde su computadora sin problemas.  😊
