# Consulta SRI Ecuador

Sistema de consulta de contribuyentes registrados en el Servicio de Rentas Internas (SRI) de Ecuador.

## Descripción

**Consulta SRI** es una aplicación web que permite buscar información de contribuyentes registrados en el SRI de Ecuador mediante sus nombres y apellidos. La aplicación consulta datos públicos y presenta información detallada sobre razón social, identificación, actividad económica, establecimientos y más.

### Características principales

- Búsqueda de contribuyentes por nombres y apellidos
- Visualización detallada de información del contribuyente
- Listado de establecimientos registrados
- Interfaz moderna y responsive
- Búsqueda rápida con indicadores de carga
- Filtrado automático de resultados

---

## Arquitectura del Proyecto

```
ConsultaSRI/
├── frontend/           # Aplicación React + Vite
│   ├── src/
│   │   └── App.jsx    # Componente principal
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/           # API Express.js
    ├── index.js       # Servidor y endpoints
    ├── package.json
    └── vercel.json    # Configuración de deployment
```

---

## Tecnologías Utilizadas

### Frontend
- **React** - Librería de interfaz de usuario
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos

---

## Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/ConsultaSRI.git
cd ConsultaSRI
```

### 2. Configurar el Frontend

```bash
cd frontend
npm install
```

Crear archivo `.env` en la carpeta `frontend`:
```env
VITE_API_URL=http://localhost:3000
```

Iniciar la aplicación:
```bash
npm run dev
```

---

## API Endpoints

### `GET /sri`

Busca contribuyentes en el SRI.

**Parámetros de consulta:**
- `nombres` (string, requerido): Nombres del contribuyente
- `apellidos` (string, requerido): Apellidos del contribuyente

**Ejemplo de petición:**
```bash
GET /sri?nombres=JUAN%20CARLOS&apellidos=GARCIA%20LOPEZ
```

**Respuesta exitosa (200):**
```json
[
  {
    "razonSocial": "GARCIA LOPEZ JUAN CARLOS",
    "nombreComercial": "COMERCIAL GARCIA",
    "identificacion": "1234567890",
    "tipoIdentificacion": "RUC",
    "clase": "PERSONA NATURAL",
    "estadoContribuyente": "ACTIVO",
    "obligado": "SI",
    "fechaInicioActividades": "01/01/2020",
    "actividadEconomicaPrincipal": "COMERCIO AL POR MENOR",
    "establecimientos": [
      {
        "nombreFantasiaComercial": "MATRIZ",
        "direccion": "AV. PRINCIPAL 123",
        "estado": "ABIERTO"
      }
    ]
  }
]
```

---

## Uso de la Aplicación

1. **Ingresar datos**: Escriba los nombres y apellidos del contribuyente a buscar
2. **Buscar**: Presione el botón "Buscar Contribuyente" o Enter
3. **Revisar resultados**: Se mostrarán todos los contribuyentes que coincidan con la búsqueda
4. **Ver detalles**: Cada resultado incluye:
   - Razón social y nombre comercial
   - Número de identificación (RUC/Cédula)
   - Estado del contribuyente
   - Obligación contable
   - Actividad económica
   - Establecimientos registrados

---

## Capturas de Pantalla

### Pantalla de Búsqueda
![Búsqueda](img/web.png)

### Resultados
![Resultados](img/results.jpg)

---

## Despliegue

### Frontend (Vercel)
```bash
cd frontend
npm run build
```

## Aviso Importante y Descargo de Responsabilidad

**Fuentes de Información y Datos Públicos:** Esta aplicación, Consulta SRI, está diseñada únicamente para consultar y presentar datos públicos de contribuyentes registrados en el Servicio de Rentas Internas (SRI) de Ecuador, accesibles a través de métodos de consulta disponibles públicamente. La aplicación no accede a información privada o confidencial.

**Responsabilidad de la API de Consulta:** La aplicación no es la fuente original ni la responsable de la disponibilidad o exposición pública de la API de consulta del SRI. El endpoint utilizado en el backend se basa en una interfaz de consulta pública existente. La responsabilidad por la arquitectura, la seguridad y la exposición al público de sus propios servicios de consulta recae en la entidad emisora de dichos servicios.

**Gestión de Credenciales (si aplica):** Para la consulta de datos, el backend utiliza un endpoint que, si requiere alguna clave de acceso o URL específica (distinta a la pública), está gestionado exclusivamente mediante variables de entorno privadas y no se expone en el código fuente de esta aplicación.

**Propósito de la Aplicación:** El objetivo de Consulta SRI es proveer una interfaz de usuario moderna y mejorada para facilitar la búsqueda de información pública, sin modificar, almacenar o monetizar de forma indebida los datos consultados.



# SRI Ecuador Query System

Tax contributor query system for Ecuador's Internal Revenue Service (SRI).



## Description

**Consulta SRI** is a web application that allows searching for registered taxpayer information in Ecuador's SRI through their names and surnames. The application queries public data and presents detailed information about business name, identification, economic activity, establishments, and more.

### Key Features

- Search taxpayers by first and last names
- Detailed taxpayer information display
- List of registered establishments
- Modern and responsive interface
- Fast search with loading indicators
- Automatic result filtering

---

## Project Architecture

```
ConsultaSRI/
├── frontend/           # React + Vite Application
│   ├── src/
│   │   └── App.jsx    # Main component
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── backend/           # Express.js API
    ├── index.js       # Server and endpoints
    ├── package.json
    └── vercel.json    # Deployment configuration
```

---

## Technologies Used

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icons

---

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ConsultaSRI.git
cd ConsultaSRI
```

### 2. Setup Frontend

```bash
cd frontend
npm install
```

Create `.env` file in `frontend` folder:
```env
VITE_API_URL=http://localhost:3000
```

Start the application:
```bash
npm run dev
```

---

## API Endpoints

### `GET /sri`

Search for taxpayers in the SRI.

**Query parameters:**
- `nombres` (string, required): Taxpayer's first names
- `apellidos` (string, required): Taxpayer's last names

**Example request:**
```bash
GET /sri?nombres=JUAN%20CARLOS&apellidos=GARCIA%20LOPEZ
```

**Successful response (200):**
```json
[
  {
    "razonSocial": "GARCIA LOPEZ JUAN CARLOS",
    "nombreComercial": "COMERCIAL GARCIA",
    "identificacion": "1234567890",
    "tipoIdentificacion": "RUC",
    "clase": "PERSONA NATURAL",
    "estadoContribuyente": "ACTIVO",
    "obligado": "SI",
    "fechaInicioActividades": "01/01/2020",
    "actividadEconomicaPrincipal": "COMERCIO AL POR MENOR",
    "establecimientos": [
      {
        "nombreFantasiaComercial": "MATRIZ",
        "direccion": "AV. PRINCIPAL 123",
        "estado": "ABIERTO"
      }
    ]
  }
]
```

---

## Application Usage

1. **Enter data**: Type the taxpayer's first and last names to search
2. **Search**: Press the "Search Taxpayer" button or Enter
3. **Review results**: All taxpayers matching the search will be displayed
4. **View details**: Each result includes:
   - Business name and trade name
   - Identification number (RUC/ID)
   - Taxpayer status
   - Accounting obligation
   - Economic activity
   - Registered establishments

---

## Deployment


### Frontend (Vercel)
```bash
cd frontend
npm run build
```

## Important Notice and Disclaimer

**Information Sources and Public Data:** This application, Consulta SRI, is designed solely to query and present public data of taxpayers registered with Ecuador's Internal Revenue Service (SRI), accessible through publicly available query methods. The application does not access private or confidential information.

**Responsibility for the Query API:** The application is neither the original source nor responsible for the availability or public exposure of the SRI query API. The endpoint used in the backend is based on an existing public query interface. The responsibility for the architecture, security, and public exposure of its own query services rests with the entity that issues those services.

**Credential Management (if applicable):** For data querying, the backend uses an endpoint which, if it requires any specific access key or URL (distinct from the public one), is managed exclusively through private environment variables and is not exposed in this application's source code.

**Application Purpose:** The objective of Consulta SRI is to provide a modern and improved user interface to facilitate the search for public information, without improperly modifying, storing, or monetizing the queried data.

