# Construction API

API REST en Node.js (Express 5 + mysql2) que consume dos bases de datos MySQL: `profesionales` y `obras`.

## Puesta en marcha

1. Ejecutar `profesionales.sql` y `obras.sql` en MySQL Workbench.
2. Copiar `.env.example` a `.env` y ajustar las credenciales.
3. `npm install`
4. `npm start`

## Estructura

- `env/`: lectura y validación de variables de entorno.
- `constants/`: estados, límites y reglas de negocio.
- `routes/`: definición de rutas.
- `controllers/`: manejo de petición y respuesta.
- `validators/`: validación de datos de entrada.
- `services/`: reglas de negocio y conexiones a MySQL.
- `dao/`: consultas SQL.
- `middlewares/` y `errors/`: manejo centralizado de errores.

## Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| POST | `/engineers` | Registrar un ingeniero |
| POST | `/projects` | Registrar una obra (director obligatorio, supervisor opcional, máximo 2 obras activas por ingeniero) |
| GET | `/projects/:projectId/status` | Consultar el estado de una obra |
| GET | `/projects/contractor-counts?status=PLANNED&minimumValue=1000` | Número de contratistas por obra en un estado, con contrato de valor mayor o igual al mínimo |
| POST | `/contractors` | Registrar un contratista |
| POST | `/projects/:projectId/contractors` | Asignar un contratista a una obra |

Una obra está activa mientras su estado sea distinto de `FINISHED`.
