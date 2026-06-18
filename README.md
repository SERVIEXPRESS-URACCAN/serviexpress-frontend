<p align="center">
  <img src="public/logos/logo-light.png" alt="SERVIEXPRESS Logo" width="300">
</p>

<h1 align="center">SERVIEXPRESS Frontend</h1>

Frontend web de **SERVIEXPRESS**, una plataforma de delivery desarrollada con Next.js y NestJs que permite la interacción entre administradores, propietarios de negocios, mandaderos y clientes.


<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=nextdotjs" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Shadcn_UI-000000" />
  <img src="https://img.shields.io/badge/Zustand-State_Management-brown" />
  <img src="https://img.shields.io/badge/Zod-Validation-blue" />
  <img src="https://img.shields.io/badge/NestJS-Backend-E0234E?logo=nestjs" />
</p>

---
# SERVIEXPRESS Frontend

## Características

* Autenticación mediante JWT.
* Gestión de usuarios y perfiles.
* Gestión de negocios.
* Gestión de productos y categorías.
* Gestión de pedidos.
* Control de acceso basado en roles (administradores y propietarios de negocios).
* Carga y visualización de imágenes.
* Interfaz moderna utilizando Tailwind CSS y Shadcn UI.

---

## Tecnologías Utilizadas

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Shadcn UI
* Lucide React
* React Hook Form
* Zustand
* zod

---

## Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

* Node.js 20 o superior
* npm 10 o superior

Verificar versiones:

```bash
node -v
npm -v
```

---

## Instalación

Clonar el repositorio:

```bash
git clone git@github.com:SERVIEXPRESS-URACCAN/serviexpress-frontend.git
```

Ingresar al directorio del proyecto:

```bash
cd frontend-serviexpress
```

Instalar dependencias:

```bash
npm install
```

---

## Configuración de Variables de Entorno

Crear un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
AUTH_SECRET=
NEXT_PUBLIC_API_IMG_URL=http://localhost:4000
```

> Debes ajustar la URL según la configuración del backend.

---

## Ejecución en Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Abrir el navegador en:

```text
http://localhost:3000
```

te redirige al login http://localhost:3000/login

---

## Scripts Disponibles

### Ejecutar entorno de desarrollo

```bash
npm run dev
```

### Compilar para producción

```bash
npm run build
```

### Ejecutar versión de producción

```bash
npm run start
```

### Ejecutar lint

```bash
npm run lint
```

---

## Estructura del Proyecto

```text
app/
├── components/
├── config/
├── constants/
├── hooks/
├── lib/
├── services/
├── schemas/
├── types/
├── auth.ts
└── proxy.ts
```

### Descripción

| Carpeta    | Descripción                 |
| ---------- | --------------------------- |
| app        | Rutas y páginas del sistema |
| components | Componentes reutilizables   |
| services   | Consumo de la API           |
| hooks      | Hooks personalizados        |
| types      | Tipos e interfaces          |
| constants      | Estado global               |
| schemas     | Funciones auxiliares        |
| config     | Configuración general       |

---

## Roles del Sistema

### Administrador

* Gestiona usuarios.
* Gestiona ciudades.
* Gestiona negocios.
* Gestiona pedidos.

### Propietario

* Administra su negocio.
* Gestiona productos.
* Gestiona pedidos asociados a su negocio.

### Mandadero

* Visualiza pedidos disponibles.
* Acepta pedidos.
* Actualiza estados de entrega.

### Cliente

* Explora negocios.
* Consulta catálogos.
* Realiza pedidos.
* Da seguimiento a sus órdenes.

---

## Funcionalidades Implementadas

### Seguridad

* Inicio de sesión.
* Cierre de sesión.
* Protección de rutas privadas.
* Control de acceso por roles.

### Negocios

* Creación y edición de negocios.
* Gestión de categorías.
* Gestión de productos.

### Pedidos

* Creación de pedidos.
* Seguimiento de estados.
* Actualización de estados según flujo del sistema.

Estados del pedido:

```text
ORDER-STATUS
PENDING
ACCEPTED
PREPARING
READY
CANCELLED

DELIVERY-STATUS
WAITING
ASSIGNED
PICKED_UP
ON_THE_WAY
DELIVERED
```

---

## Integración con Backend

Este proyecto consume la API REST desarrollada en NestJS.

Ejemplos de endpoints utilizados:

```text
POST   /api/v1/auth/login
POST   /api/v1/auth/register

GET    /api/v1/city
POST   /api/v1/city
PATCH  /api/v1/city/:id

GET    /api/v1/product
POST   /api/v1/product

GET    /api/v1/order
POST   /api/v1/order
```

---

## Compilación para Producción

Generar el build:

```bash
npm run build
```

Ejecutar el proyecto compilado:

```bash
npm run start
```

---

## Equipo de Desarrollo

Proyecto desarrollado para la plataforma SERVIEXPRESS como solución de gestión de delivery, negocios y pedidos en línea.
