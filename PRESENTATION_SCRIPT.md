# 📊 Script de Presentación - 10 Minutos

## ⏱️ Timeline (10 minutos)

| Tiempo     | Sección                    | Duración |
| ---------- | -------------------------- | -------- |
| 0:00-0:30  | Intro & Contexto           | 30 seg   |
| 0:30-2:00  | Demo (Live)                | 1.5 min  |
| 2:00-4:00  | Componentes & Arquitectura | 2 min    |
| 4:00-6:30  | Cómo lo construiste        | 2.5 min  |
| 6:30-9:00  | Por qué elegiste esto      | 2.5 min  |
| 9:00-10:00 | Mejoras & Q&A              | 1 min    |

---

## 1️⃣ INTRO & CONTEXTO (0:00-0:30)

### Script:

> "Hola, soy [Tu nombre]. Hoy les presento el **Portal de Candidatos** para Intrare, una solución web para visualizar y filtrar candidatos de manera inclusiva y accesible.
>
> El objetivo era cumplir el business case de crear una UI funcional para filtrado de candidatos, pero decidimos ir más allá: **eliminamos sesgos discriminatorios y agregamos features de accesibilidad**."

### Visual:

- Muestra el logo/nombre del proyecto en pantalla
- Deja visible la URL del GitHub: https://github.com/Gapuccino/usiness-case-intrare

---

## 2️⃣ DEMO EN VIVO (0:30-2:00)

### Preparación:

1. Abre http://localhost:3000 (o la URL deployed)
2. Ten el navegador maximizado
3. Prepara 3 acciones claras para demostrar

### Demo Script:

**Paso 1 (20 seg) - Listado básico:**

> "Aquí tenemos el listado de 30 candidatos. Cada uno muestra: nombre, email, rol, años de experiencia, y el estado de documentación. Noten que no hay filtros discriminatorios—cualquiera puede aplicar sin barreras."

**Acción:** Scroll por la tabla, señala los campos principales

---

**Paso 2 (20 seg) - Filtros en acción:**

> "Ahora vemos los filtros. Puedo buscar por rol, ordenar por experiencia de mayor a menor, filtrar por estado de documentación, y ordenar cronológicamente."

**Acciones:**

1. Dropdown "Rol" → Selecciona "Ventas"
2. Dropdown "Experiencia" → "Mayor a menor"
3. Muestra cómo la tabla se actualiza al instante

---

**Paso 3 (25 seg) - Tema oscuro:**

> "Y aquí está el modo oscuro. Noten las transiciones suaves—es importante que la UI sea cómoda para los ojos del reclutador, especialmente si trabaja horas largas."

**Acciones:**

1. Haz click en botón "🌙 Oscuro"
2. Espera la transición (0.3s)
3. Vuelve a "☀️ Claro"

---

**Paso 4 (15 seg) - Estado lista vacía:**

> "Si aplico filtros imposibles, el sistema maneja correctamente el estado vacío."

**Acciones:**

1. Rol: "Operaciones"
2. Documentación: "Documentación completa"
3. Experiencia: "Mayor a menor"
4. Muestra el mensaje "No se encontraron perfiles..."

---

## 3️⃣ COMPONENTES & ARQUITECTURA (2:00-4:00)

### Script:

> "La solución está construida con **Astro + React**. ¿Por qué esta combinación?

### Diagrama (describe mientras lo dibuja/muestra):

```
┌─────────────────────────────────────┐
│        index.astro                   │
│   (Layout raíz - página)             │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│   CandidateDashboard.jsx             │
│   (Componente React interactivo)     │
├─────────────────────────────────────┤
│ • useState para filtros              │
│ • useMemo para cálculos eficientes  │
│ • Manejo de Loading/Error/Empty     │
└──────────────┬──────────────────────┘
               │
        ┌──────┴──────┐
        ▼             ▼
   theme.css    CandidateDashboard.css
   (Temas)      (Componentes)
        ▼             ▼
  CSS Variables   Estilos moderno
```

### Explicación:

> **Astro:**
>
> - Genera HTML estático (fast)
> - Cero JavaScript por defecto
> - Integración perfecta con React

> **React (componente principal):**
>
> - Manejo de estado con hooks
> - Filtrado eficiente con useMemo
> - Interactividad sin salir de React

> **CSS Variables:**
>
> - Sistema de temas dinámico
> - Una sola fuente de verdad para colores
> - Cambio de tema sin reload

### Flujo de datos:

```javascript
candidatos.json
    ↓
[useState] candidatos
    ↓
[useMemo] filteredCandidates (aplicar filtros + sorting)
    ↓
[render] <table> con datos filtrados
```

### Archivos clave:

```
src/
├── components/
│   ├── CandidateDashboard.jsx     (199 líneas - lógica + UI)
│   └── CandidateDashboard.css     (351 líneas - estilos)
├── data/
│   └── candidatos.json            (30 registros)
├── pages/
│   └── index.astro                (página)
└── styles/
    ├── theme.css                  (variables + temas)
    └── global.css                 (reset)
```

---

## 4️⃣ CÓMO LO CONSTRUISTE (4:00-6:30)

### Script - Fase 1: Análisis

> "Primero, analicé el business case. Necesitaba:
>
> 1. Mostrar 30 candidatos ✓
> 2. Filtrar por rol, documentación, experiencia ✓
> 3. Manejar loading, error, lista vacía ✓

> Pero mientras lo hacía, me di cuenta de algo: **los filtros originales tenían sesgos discriminatorios**."

### Muestra la sección de Inclusividad en README:

```markdown
❌ Removidos:

- RFC como bloqueante (discrimina migrantes)
- "Migrante" como filtro exclusión
- Experiencia mínima (excluye talento emergente)

✅ Añadidos:

- "Talento global" como información
- Estado de documentación sin castigos
- Valoración de potencial
```

> "Entonces, reimplantee los filtros de forma inclusiva."

### Script - Fase 2: Arquitectura

> "Elegí Astro porque necesitaba performance, y React para la interactividad del dashboard. Creé un componente monolítico (CandidateDashboard.jsx) que maneja:

> - Estado: filtros, tema oscuro, estados de UI
> - Lógica: useMemo para optimizar filtrado
> - Rendering: tabla + formularios + estados"

**Código de ejemplo:**

```javascript
// Filtrado eficiente con useMemo
const filteredCandidates = useMemo(() => {
  return candidates
    .filter((c) => {
      if (roleFilter && c.role !== roleFilter) return false;
      if (documentationFilter === "complete" && !c.hasRFC) return false;
      return true;
    })
    .sort((a, b) => {
      // Lógica de ordenamiento
    });
}, [candidates, roleFilter, documentationFilter, experienceSort]);
```

### Script - Fase 3: Estilos & Tema

> "Para los estilos, NO quería usar Tailwind inline porque hace difícil el cambio de tema. Así que creé un **sistema de CSS variables**."

**Mostrar theme.css:**

```css
:root {
  --bg-primary: #f9fafb;
  --text-primary: #111827;
  --badge-success-bg: #dcfce7;
}

[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #f3f4f6;
}
```

> "Así, cambiar de tema es solo actualizar el atributo data-theme del HTML."

### Script - Fase 4: Estados de UI

> "Implementé los 3 estados requeridos:

```javascript
// LOADING
if (loading) return <div>⏳ Preparando...</div>;

// ERROR
if (error) return <div>❌ Error + botón Reintentar</div>;

// EMPTY
if (filteredCandidates.length === 0) return <div>📋 Sin resultados</div>;
```

---

## 5️⃣ POR QUÉ ELEGISTE ESTO (6:30-9:00)

### Decisión 1: Astro + React

> **Pregunta:** ¿Por qué no solo React? ¿O solo HTML?

> **Respuesta:**
>
> - **React solo:** Envía mucho JavaScript al navegador
> - **HTML solo:** Sin interactividad en filtros
> - **Astro + React:** Lo mejor de ambos mundos
>   - Astro sirve HTML estático rápido
>   - React se "hidrata" solo en el componente interactivo
>   - Resultado: UX rápida + código mantenible"

### Decisión 2: CSS Variables vs. Tailwind

> **Problema:** Tailwind inline hace difícil cambiar temas
>
> **Solución:** CSS Variables
>
> **Beneficios:**
>
> - Una sola fuente de verdad
> - Cambio de tema sin recalcular estilos
> - Fácil mantenimiento
> - Escalable para agregar más temas (alto contraste, etc.)"

### Decisión 3: Remover filtros discriminatorios

> **Pregunta:** ¿Por qué cambiar el business case?

> **Respuesta:** Porque los filtros originales tenían sesgos:
>
> - RFC como bloqueante → discrimina migrantes en trámites legales
> - "Migrante" como checkbox → othering (tratarlos como "otros")
> - Experiencia mínima → excluye talento emergente

> **Mi enfoque:** Cumplir el BC pero hacerlo **inclusivo**. Los datos igual están ahí si necesitan, pero no como barreras."

### Decisión 4: useMemo para filtrado

> "En lugar de filtrar en cada render, usé useMemo. Así:
>
> - Las dependencias están claras
> - No se recalcula innecesariamente
> - Performance es predecible
> - Código es más legible"

### Decisión 5: Tema claro con fondo gris

> "Muchos portales usan fondo blanco puro. Pero eso causa fatiga ocular. Cambié a #f9fafb (gris muy claro) porque:
>
> - Menos fatiga
> - Mejor separación entre secciones
> - Sigue siendo 'minimalista'
> - GitHub, Figma, Slack lo hacen igual"

---

## 6️⃣ MEJORAS & Q&A (9:00-10:00)

### Mejoras implementadas:

> "Más allá del BC, agregué:

> **Accesibilidad:**
>
> - ARIA labels en inputs
> - Contraste WCAG AA
> - Navegación por teclado
> - Lenguaje español (lang="es")

> **UX:**
>
> - Transiciones suaves (0.3s)
> - Dropdowns mejorados con ícono personalizado
> - Estados de error con botón "Reintentar"
> - Responsive design

> **Código:**
>
> - TypeScript config
> - CSS modular
> - Componentes reutilizables
> - Documentación (README + TESTING_GUIDE)"

### Q&A Esperadas (y respuestas):

**P: ¿Por qué 800ms de delay en loading?**

> "Para simular una carga real (fetch a backend). Si fuera instantáneo, no veríamos el estado de loading en producción."

**P: ¿Cómo escalarías esto?**

> "Agregaría:
>
> - Backend API (Node.js + Express)
> - Base de datos (PostgreSQL)
> - Autenticación
> - Paginación (ahora hay 30, pero podrían ser 10,000)
> - Búsqueda de texto libre
> - Exportar a CSV/PDF"

**P: ¿Por qué removiste los filtros RFC y Migrante?**

> "Porque eran discriminatorios. Los datos siguen en JSON, pero no los enforzo como barreras. La diversidad es un valor, no un filtro."

**P: ¿Responsive en móvil?**

> "Sí, los dropdowns y tabla se adaptan. Puedo mostrar si quieren."

---

## 🎬 Cierre

> "En resumen:
>
> - ✅ Cumple 100% del business case
> - ✅ Código limpio y escalable
> - ✅ Inclusivo y accesible
> - ✅ Performance optimizado
> - ✅ Listo para producción

> El código está en GitHub: https://github.com/Gapuccino/usiness-case-intrare
>
> README tiene toda la documentación.
>
> ¿Preguntas?"

---

## 📱 DEMO SCRIPT EXPANDIDO (si piden más)

### Para mostrar LOADING:

```
- Abre DevTools (F12)
- Ve a Network tab
- Recarga la página
- Verás "Preparando..." durante 800ms
```

### Para mostrar ERROR:

```
- Abre CandidateDashboard.jsx en editor
- Comenta la línea: setCandidates(candidatesData);
- Guarda, recarga
- Verá ❌ Error con botón Reintentar
```

### Para mostrar LISTA VACÍA:

```
- Aplicar filtros sin coincidencias
- Muestra el estado vacío
```

---

## 🎯 Tips para la Presentación

1. **Habla con confianza** - Conoces el código
2. **Mira a los evaluadores** - No solo a la pantalla
3. **Usa gestos** - Señala elementos clave
4. **Pausa para respirar** - No des todo de corrida
5. **Ten respuestas cortas listas** - Para Q&A
6. **Prepara demos** - Practica 2-3 veces antes

---

## ⏰ Timeline Alternativo (si preguntan mucho)

Si los evaluadores preguntan mucho:

- Sacrifica un poco de "Por qué" para expandir "Cómo"
- O expande Q&A
- Evita entrar en detalles de CSS (a menos que pregunten)

---

## 📎 Archivos de referencia

- **README.md** - Documentación completa
- **TESTING_GUIDE.md** - Cómo probar estados
- **GitHub Repo** - Código fuente

---

**¡Mucho éxito en la presentación! 🚀**
