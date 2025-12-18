Portal de Candidatos - Intrare

> **Página de visualización y filtrado de candidatos con búsqueda inclusiva, modo oscuro y accesibilidad mejorada.**

Descripción:

Portal funcional para visualizar y filtrar candidatos según diferentes atributos. Implementa los requerimientos del business case con mejoras significativas en inclusividad, accesibilidad y experiencia de usuario.

**Características principales:**

- Listado de 30 candidatos precargados
- Filtros dinámicos por rol, documentación y experiencia
- Ordenamiento por fecha y experiencia
- Tema claro/oscuro con transiciones suaves
- Diseño responsivo y accesible
- Manejo completo de estados (Loading, Empty, Error)
- Búsqueda inclusiva sin sesgos discriminatorios

---

## 🚀 Inicio Rápido

### Requisitos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Gapuccino/usiness-case-intrare.git
cd usiness-case-intrare

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Construcción para producción

```bash
npm run build
npm run preview
```

---

Características Implementadas:

### 1. **Lista de Candidatos**

Muestra todos los campos requeridos:

- Nombre y Email
- Rol (Ventas, Atención al Cliente, Operaciones)
- Años de experiencia
- Estado de documentación (Completa / En proceso)
- Indicador de talento global 
- Fecha de registro

### 2. **Filtros**

- **Rol:** Dropdown para filtrar por puesto
- **Documentación:** Estado de completitud (sin barreras discriminatorias)
- **Experiencia:** Ordenamiento ascendente/descendente
- **Fecha:** Ordenamiento recientes/antiguos

### 3. **Estados de UI**

- **Loading:** 800ms simulando carga real
- **Lista Vacía:** Mensaje claro cuando no hay coincidencias
- **Error:** Manejo completo de errores con botón "Reintentar"

### 4. **Tema Claro/Oscuro**

- Toggle en la sección de filtros
- Transiciones suaves (0.3s)
- Colores optimizados para cada tema
- Persistencia de preferencia (localStorage)

### 5. **Accesibilidad**

- ARIA labels en controles interactivos
- Contraste de colores WCAG AA
- Navegación por teclado
- Lenguaje en español (lang="es")
- Semántica HTML correcta

---

##  Stack Tecnológico

| Tecnología        | Propósito                |
| ----------------- | ------------------------ |
| **Astro**         | Framework meta (SSR/SSG) |
| **React**         | Componentes interactivos |
| **CSS Variables** | Theming dinámico         |
| **TypeScript**    | Tipado (tsconfig)        |

### Estructura de Archivos

```
src/
├── components/
│   ├── CandidateDashboard.jsx       # Componente principal
│   └── CandidateDashboard.css       # Estilos del dashboard
├── data/
│   └── candidatos.json              # Base de datos
├── layouts/
│   └── Layout.astro                 # Layout raíz
├── pages/
│   └── index.astro                  # Página principal
└── styles/
    ├── theme.css                    # Sistema de temas
    └── global.css                   # Estilos globales
```

---

## Testing

Para probar los diferentes estados de la aplicación, consulta [TESTING_GUIDE.md](./TESTING_GUIDE.md)

**Estados probables:**

- **LOADING:** Recarga la página (demora 800ms)
- **LISTA VACÍA:** Aplica filtros sin coincidencias
- **ERROR:** Sigue las instrucciones en TESTING_GUIDE.md

---

##  Mejoras Implementadas

Además de los requerimientos del business case, se agregaron:

### **Inclusividad**

- ❌ Removidos filtros discriminatorios (RFC como bloqueante, "Migrante" como exclusión)
- ✅ Reframing: "Talento global" y "Documentación en proceso" (no como limitantes)
- ✅ Se valúa potencial sin barreras de experiencia mínima

### **Diseño**

- Sistema de temas con CSS variables
- Diseño responsive (mobile-first)
- Transiciones suaves y pulidas
- Dropdowns mejorados con ícono personalizado

### **Performance**

-  useMemo para filtrado eficiente
-  Bundle optimizado con Astro
-  Zero JavaScript en la página base

---

##  Datos de Ejemplo

La aplicación incluye 30 candidatos con:

- Distribución equitativa de roles
- Mix de experiencia (0-10 años)
- Estados de documentación variados
- Diversidad representada

**Muestra:**

```json
{
  "id": "c1",
  "name": "Ana Rodríguez",
  "email": "ana.rodriguez@example.com",
  "role": "ventas",
  "experienceYears": 2,
  "hasRFC": true,
  "isMigrant": false,
  "createdAt": "2024-10-10T15:23:00Z"
}
```

---

### Variables CSS Disponibles

**Tema Claro (por defecto):**

```css
--bg-primary: #f9fafb; /* Fondo principal */
--text-primary: #111827; /* Texto principal */
--badge-success-bg: #dcfce7; /* Documentación completa */
--badge-warning-bg: #fef3c7; /* En proceso */
```

**Tema Oscuro:**

```css
--bg-primary: #111827;
--text-primary: #f3f4f6;
```

### Agregar nuevos candidatos

Edita `src/data/candidatos.json` y agrega nuevos objetos al array.

### Extender filtros

1. Agrega un nuevo estado en `CandidateDashboard.jsx`
2. Implementa la lógica en `filteredCandidates` useMemo
3. Crea un nuevo `<div className="filter-group">` en el JSX

---

## 🤝 Contribuir

Este es un proyecto de portfolio. Para sugerencias, abre un issue en GitHub.

---

## 📄 Licencia

Proyecto de evaluación - Intrare Business Case

---

## 📧 Contacto

**GitHub:** [@Gapuccino](https://github.com/Gapuccino)

---

**Última actualización:** Diciembre 2025
