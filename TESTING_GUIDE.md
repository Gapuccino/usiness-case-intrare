# Guía de Prueba - Estados de UI

Este documento explica cómo probar los 3 estados principales del dashboard:

## 1. ⏳ Estado LOADING

**¿Qué es?** Se muestra mientras se cargan los datos (800ms de delay intencional para simulación).

**Cómo probarlo:**

- Abre la página normalmente
- Verás: "⏳ Preparando el talento adecuado..." durante 800ms
- Luego desaparece y muestra los datos

**Código relevante:** `CandidateDashboard.jsx` línea 29-30

```javascript
const timer = setTimeout(() => {
  // Carga datos después de 800ms
}, 800);
```

---

## 2. 📋 Estado LISTA VACÍA

**¿Qué es?** Se muestra cuando no hay candidatos que coincidan con los filtros aplicados.

**Cómo probarlo - Opción 1 (Filtros):**

1. Abre la página
2. Selecciona en dropdown "Rol solicitado" → "Ventas"
3. Selecciona en dropdown "Documentación" → "Documentación completa"
4. Selecciona en dropdown "Experiencia" → "Mayor a menor"
5. Si no hay coincidencias exactas, verás: "No se encontraron perfiles con estos criterios."

**Cómo probarlo - Opción 2 (Combinación imposible):**

1. Rol: "Operaciones"
2. Documentación: "En proceso"
3. Experiencia: "Mayor a menor" (si aún hay resultados, cambia filtros)
4. Si combinas filtros que no tienen candidatos, verás el estado vacío

**Código relevante:** `CandidateDashboard.jsx` línea 150-153

```javascript
{filteredCandidates.length === 0 ? (
  <div className="empty-state">
    <p>No se encontraron perfiles con estos criterios.</p>
  </div>
```

---

## 3. ❌ Estado ERROR

**¿Qué es?** Se muestra si ocurre un error al cargar los datos.

**Cómo probarlo - Opción 1 (Simulado):**

1. Edita `CandidateDashboard.jsx` línea 27:

```javascript
// CAMBIAR ESTO:
try {
  setCandidates(candidatesData);
  setLoading(false);

// POR ESTO:
try {
  throw new Error("Error simulado para testing");
  // setCandidates(candidatesData);
  // setLoading(false);
```

2. Guarda y recarga la página
3. Verás: "❌ Algo salió mal" con opción "Reintentar"
4. Luego deshaz el cambio

**Cómo probarlo - Opción 2 (Archivo JSON dañado):**

1. Abre `src/data/candidatos.json`
2. Borra el último `]` para romper el JSON
3. Guarda y recarga la página
4. Verás el error
5. Deshaz el cambio

**Cómo probarlo - Opción 3 (Más realista - Backend fallo):**

1. Reemplaza la línea de import en `CandidateDashboard.jsx`:

```javascript
// DE:
import candidatesData from "../data/candidatos.json";

// A:
const candidatesData = null; // Simula que no se cargó

// O fuerza un error:
import candidatesData from "../data/candidatos-inexistente.json";
```

2. Recarga la página → verás el error

**Código relevante:** `CandidateDashboard.jsx` línea 28

```javascript
catch (e) {
  setError("Ocurrió un error al cargar la información.");
  setLoading(false);
}
```

---

## Resumen de Estados

| Estado      | Icon | Mensaje                             | Trigger                     |
| ----------- | ---- | ----------------------------------- | --------------------------- |
| **Loading** | ⏳   | "Preparando el talento adecuado..." | Al cargar la página (800ms) |
| **Empty**   | 📋   | "No se encontraron perfiles..."     | Filtros sin resultados      |
| **Error**   | ❌   | "Algo salió mal" + Reintentar       | Fallo en carga de datos     |

---

## Para la Presentación

**Script de demostración:**

1. **Mostrar LOADING:**

   - Recarga la página
   - Captura pantalla del loading
   - "Ven aquí hay un delay de 800ms para simular carga real"

2. **Mostrar LISTA VACÍA:**

   - Aplica filtros que den sin resultados
   - Muestra el estado vacío
   - "Si no hay coincidencias, se muestra un mensaje claro"

3. **Mostrar ERROR:**
   - Explica que se puede provocar un error siguiendo los pasos de Opción 1
   - Mención que el botón "Reintentar" recarga la página
   - "Importante: Siempre tenemos un estado de error para situaciones imprevistas"

---

## Archivos Relevantes

- `src/components/CandidateDashboard.jsx` - Lógica de estados
- `src/components/CandidateDashboard.css` - Estilos para estados (.empty-state, .error-state)
- `src/data/candidatos.json` - Datos que se cargan
