# Cafetería

Pedidos de la cafetería interna: el menú del día, el pedido de cada empleado y su historial.

## Correr en local

Necesitas Node.js 22 o superior.

```bash
npm install
npm run dev
```

- Web: http://localhost:5173
- API: http://localhost:3001

La primera vez, la API crea `apps/api/data/db.json` con el menú y dos empleados de prueba:

| Correo | PIN |
|---|---|
| ana.torres@cafeteria.test | 1234 |
| luis.ramos@cafeteria.test | 5678 |

Para empezar de cero, borra `apps/api/data/db.json`.

## Pruebas

```bash
npm test
npm run typecheck
```

## Estructura

```
apps/
  api/   Express + TypeScript. Datos en un archivo JSON.
  web/   React + Vite.
```
