# 🎯 Cheat Sheet - Presentación Rápida

## Antes de empezar

- [ ] Prueba que http://localhost:4322 funciona
- [ ] Abre DevTools (F12) por si necesitas mostrar Network
- [ ] Ten el código abierto en el editor (VSCode)
- [ ] Pantalla en 100% zoom
- [ ] Tema claro (mejor para proyector)

---

## Frases Clave (copia-pega mental)

### Intro

> "Portal de candidatos inclusivo con filtrado, tema oscuro y accesibilidad mejorada"

### Business Case

> "Cumple 100% del BC pero sin sesgos discriminatorios"

### Stack

> "Astro + React: HTML estático rápido + componente interactivo"

### Tema

> "CSS Variables para cambio dinámico sin JavaScript"

### Inclusividad

> "Removimos RFC como bloqueante y 'Migrante' como exclusión"

---

## Demo Checklist (30 segundos cada)

### ✅ Mostrar Filtros (20 seg)

1. Rol dropdown → "Ventas"
2. Experiencia dropdown → "Mayor a menor"
3. Señalar cómo la tabla cambia al instante

### ✅ Mostrar Tema Oscuro (15 seg)

1. Click en "🌙 Oscuro"
2. Notar transición suave
3. Click en "☀️ Claro"

### ✅ Mostrar Lista Vacía (15 seg)

1. Aplicar filtros sin coincidencias
2. Mostrar: "No se encontraron perfiles..."

---

## Respuestas Rápidas (Q&A)

| Pregunta          | Respuesta                                                   |
| ----------------- | ----------------------------------------------------------- |
| ¿Qué es Astro?    | Framework para HTML rápido + componentes React interactivos |
| ¿Por qué useMemo? | Evita recalcular filtros innecesariamente                   |
| ¿Responsive?      | Sí, optimizado para móvil                                   |
| ¿Backend?         | Frontend puro (datos en JSON). Backend es lo próximo        |
| ¿RFC?             | Removido como filtro porque discrimina migrantes            |
| ¿Tema oscuro?     | Importante para reducir fatiga ocular                       |
| ¿Más candidatos?  | Agregar paginación si llegamos a 10k+ registros             |

---

## Archivos a Mencionar

- `src/components/CandidateDashboard.jsx` - 199 líneas (lógica + UI)
- `src/styles/theme.css` - Sistema de temas con CSS Variables
- `src/data/candidatos.json` - 30 registros de ejemplo

---

## Códigos útiles (si los piden)

### useMemo en acción

```javascript
const filteredCandidates = useMemo(() => {
  return candidates
    .filter((c) => {
      if (roleFilter && c.role !== roleFilter) return false;
      if (documentationFilter === "complete" && !c.hasRFC) return false;
      return true;
    })
    .sort(/* ... */);
}, [candidates, roleFilter, documentationFilter, experienceSort]);
```

### CSS Variable para tema

```css
:root {
  --bg-primary: #f9fafb;
  --text-primary: #111827;
}

[data-theme="dark"] {
  --bg-primary: #111827;
  --text-primary: #f3f4f6;
}
```

---

## Timing Crítico

- **0:30** - Terminar intro, empezar demo
- **2:00** - Cambiar a "Componentes"
- **4:00** - Cambiar a "Cómo lo construiste"
- **6:30** - Cambiar a "Por qué elegiste"
- **9:00** - Q&A y cierre

**Si ves que vas adelantado:** Expande Q&A
**Si ves que vas atrasado:** Resume "Por qué elegiste"

---

## Gestos / Señalamientos

- Señalar la tabla cuando expliques datos
- Arrastrar el scroll para mostrar más candidatos
- Hacer click en filtros mientras hablas
- Pausar durante transiciones (tema oscuro)

---

## Frases de Puente (para conectar secciones)

> "Ahora que vieron la demo, les cuento cómo está construido..."

> "El stack es importante porque permite..."

> "La decisión de remover esos filtros viene de una observación..."

> "Todo esto es escalable porque..."

---

## Si algo falla

- **Página no carga:** Reinicia `npm run dev`
- **Filtros no funcionan:** Recarga la página (F5)
- **Tema no cambia:** Recarga (F5)
- **Se te olvida algo:** "Excelente pregunta, déjame revisarlo después"

---

## Cierre (IMPORTANTE)

> "Código en GitHub: github.com/Gapuccino/usiness-case-intrare
>
> README con toda la doc.
>
> ¿Preguntas?"

**Siempre termina con una invitación a preguntar.**

---

## Backup (si piden demos adicionales)

### Mostrar LOADING

- F5 (reload)
- Verás ⏳ durante 800ms

### Mostrar ERROR

- DevTools (F12) → Console → Simula error
- O edita CandidateDashboard.jsx en vivo (si el código está abierto)

---

**Buena suerte! 🚀 Tienes esto.**
