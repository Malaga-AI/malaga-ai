# plan.md — Integrar Eventbrite en React para `events` y `featuredEvent`

## Objetivo

Adaptar la web para que las secciones actuales de React `events` y `featuredEvent` dejen de depender de datos estáticos/mock y lean eventos reales desde Eventbrite, manteniendo el diseño actual, evitando exponer tokens en el frontend y dejando una arquitectura limpia para futuras mejoras.

La integración debe obtener eventos de Eventbrite, normalizarlos a un modelo interno estable y alimentar los componentes existentes sin acoplar la UI directamente al formato bruto de Eventbrite.

---

## Contexto técnico importante

Eventbrite usa una API REST con base URL:

```txt
https://www.eventbriteapi.com/v3
```

Las peticiones deben autenticarse con OAuth/Bearer token. El token **nunca debe aparecer en código cliente React**, variables públicas tipo `VITE_`, ni en el bundle final.

Para una web propia que muestra eventos de una organización/cuenta concreta, el flujo recomendado es:

```txt
React UI -> endpoint interno/backend/serverless -> Eventbrite API -> normalización -> React UI
```

No usar directamente desde React:

```txt
React UI -> Eventbrite API con token público
```

---

## Resultado esperado

Al terminar, la web debe tener:

1. Una capa de acceso a Eventbrite segura.
2. Un modelo interno `EventItem` común para toda la UI.
3. La sección `events` renderizando listado de eventos desde Eventbrite.
4. La sección `featuredEvent` renderizando automáticamente un evento destacado.
5. Estados de carga, error y vacío.
6. Fallback seguro si Eventbrite falla.
7. Tests básicos de normalización, API interna y renderizado.
8. Documentación de variables de entorno.

---

## Variables de entorno necesarias

Crear o revisar `.env.example`:

```env
# Token privado de Eventbrite. No debe exponerse al cliente.
EVENTBRITE_PRIVATE_TOKEN=

# ID de la organización de Eventbrite.
EVENTBRITE_ORGANIZATION_ID=

# Opcional: organizador concreto si se quieren filtrar eventos por organizer.
EVENTBRITE_ORGANIZER_ID=

# Opcional: caché en segundos para evitar llamar a Eventbrite en cada request.
EVENTBRITE_CACHE_SECONDS=300
```

Si el proyecto usa Vite, Next.js, Remix o Astro, confirmar qué variables se exponen al cliente. Las variables de Eventbrite deben ser privadas y no tener prefijos públicos como `VITE_`, `NEXT_PUBLIC_`, etc.

---

## Endpoints de Eventbrite a usar

### Listar eventos de una organización

Usar endpoint de organización:

```http
GET https://www.eventbriteapi.com/v3/organizations/{organization_id}/events/
Authorization: Bearer {EVENTBRITE_PRIVATE_TOKEN}
```

Parámetros sugeridos:

```txt
status=live
order_by=start_asc
expand=venue,organizer,ticket_availability,logo
```

Endpoint completo orientativo:

```txt
/organizations/{organization_id}/events/?status=live&order_by=start_asc&expand=venue,organizer,ticket_availability,logo
```

Notas:

- No usar una API pública de búsqueda general de eventos como dependencia principal.
- Priorizar eventos propios de la organización.
- Si se necesita filtrar por organizador, añadir `organizer_filter={EVENTBRITE_ORGANIZER_ID}` si el endpoint lo soporta en la cuenta/proyecto.
- Verificar con el API Explorer de Eventbrite el payload real de la cuenta antes de cerrar la integración.

---

## Arquitectura recomendada

### Opción A — Si el proyecto usa Next.js

Crear:

```txt
src/app/api/eventbrite/events/route.ts
```

o, si usa Pages Router:

```txt
src/pages/api/eventbrite/events.ts
```

### Opción B — Si el proyecto usa Vite + React puro en Vercel

Crear una función serverless:

```txt
api/eventbrite/events.ts
```

La UI React llamará a:

```txt
/api/eventbrite/events
```

### Opción C — Si ya existe backend propio

Crear endpoint:

```txt
GET /api/events
```

Internamente este endpoint llamará a Eventbrite.

---

## Estructura de archivos propuesta

Adaptar los nombres a la estructura real del proyecto:

```txt
src/
  features/
    events/
      components/
        EventsSection.tsx
        FeaturedEvent.tsx
        EventCard.tsx
        EventCardSkeleton.tsx
      hooks/
        useEvents.ts
      services/
        eventbriteClient.server.ts
        eventbriteMapper.ts
      types/
        event.types.ts
      data/
        fallbackEvents.ts
      __tests__/
        eventbriteMapper.test.ts
        EventsSection.test.tsx
        FeaturedEvent.test.tsx

api/
  eventbrite/
    events.ts
```

Si ya existen carpetas/componentes llamados `events` y `featuredEvent`, no crear duplicados. Refactorizar los actuales respetando su ubicación.

---

## Modelo interno de evento

Crear un tipo interno independiente de Eventbrite:

```ts
export type EventItem = {
  id: string;
  title: string;
  description: string;
  summary?: string;
  url: string;
  imageUrl?: string;
  startsAt: string;
  endsAt?: string;
  timezone?: string;
  venueName?: string;
  venueAddress?: string;
  organizerName?: string;
  isOnline?: boolean;
  isFree?: boolean;
  currency?: string;
  minPrice?: number;
  maxPrice?: number;
  status: 'live' | 'draft' | 'started' | 'ended' | 'completed' | 'canceled' | 'unknown';
};
```

La UI solo debe consumir `EventItem[]`, nunca objetos crudos de Eventbrite.

---

## Normalizador Eventbrite -> EventItem

Crear `eventbriteMapper.ts`:

```ts
export function mapEventbriteEventToEventItem(raw: any): EventItem {
  return {
    id: String(raw.id),
    title: raw.name?.text ?? 'Evento sin título',
    description: raw.description?.text ?? '',
    summary: raw.summary ?? raw.description?.text?.slice(0, 180),
    url: raw.url,
    imageUrl: raw.logo?.original?.url ?? raw.logo?.url,
    startsAt: raw.start?.utc ?? raw.start?.local,
    endsAt: raw.end?.utc ?? raw.end?.local,
    timezone: raw.start?.timezone,
    venueName: raw.venue?.name,
    venueAddress: raw.venue?.address?.localized_address_display,
    organizerName: raw.organizer?.name,
    isOnline: raw.online_event,
    isFree: raw.is_free,
    currency: raw.currency,
    minPrice: undefined,
    maxPrice: undefined,
    status: raw.status ?? 'unknown',
  };
}
```

Después, ajustar los campos según el payload real de Eventbrite que devuelva la cuenta.

---

## Endpoint interno `/api/eventbrite/events`

Debe hacer lo siguiente:

1. Leer `EVENTBRITE_PRIVATE_TOKEN` y `EVENTBRITE_ORGANIZATION_ID` desde variables privadas.
2. Validar que existen.
3. Llamar a Eventbrite con `Authorization: Bearer ...`.
4. Aplicar timeout.
5. Manejar errores HTTP.
6. Normalizar eventos con `mapEventbriteEventToEventItem`.
7. Filtrar eventos sin fecha o sin URL.
8. Ordenar por fecha ascendente.
9. Devolver JSON estable:

```ts
{
  events: EventItem[];
  source: 'eventbrite';
  fetchedAt: string;
}
```

Ejemplo de lógica:

```ts
const url = new URL(
  `https://www.eventbriteapi.com/v3/organizations/${organizationId}/events/`
);

url.searchParams.set('status', 'live');
url.searchParams.set('order_by', 'start_asc');
url.searchParams.set('expand', 'venue,organizer,ticket_availability,logo');

const response = await fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  },
  next: { revalidate: cacheSeconds },
});
```

Si no se usa Next.js, sustituir `next: { revalidate }` por la estrategia de caché disponible en el stack.

---

## Hook React `useEvents`

Crear o adaptar:

```ts
export function useEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await fetch('/api/eventbrite/events');
      if (!response.ok) throw new Error('No se pudieron cargar los eventos');
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}
```

Si el proyecto no usa TanStack Query, implementar con `useEffect`, `useState` y `AbortController`.

---

## Adaptación de sección `events`

Objetivo: mantener el diseño actual, pero cambiar la fuente de datos.

Pasos:

1. Localizar el componente actual de listado de eventos.
2. Identificar si usa arrays estáticos como `events`, `mockEvents`, `upcomingEvents`, etc.
3. Sustituir esa entrada por `useEvents()`.
4. Renderizar estados:
   - loading: skeleton cards.
   - error: mensaje amable + botón reintentar.
   - empty: bloque “Próximamente anunciaremos nuevos eventos”.
   - success: grid/list actual.
5. Mantener los mismos componentes visuales si ya existen.
6. Asegurar que el botón principal abre `event.url` en nueva pestaña.

Ejemplo de comportamiento:

```tsx
const { data, isLoading, isError, refetch } = useEvents();
const events = data?.events ?? [];
```

La sección no debe saber nada de Eventbrite. Solo sabe que recibe `EventItem[]`.

---

## Adaptación de `featuredEvent`

Objetivo: destacar automáticamente el evento más relevante.

Regla inicial recomendada:

1. Elegir el próximo evento futuro más cercano.
2. Si hay una propiedad manual futura, permitir override con `featured: true` en capa interna más adelante.
3. Si no hay eventos, mostrar fallback elegante o esconder la sección.

Crear helper:

```ts
export function getFeaturedEvent(events: EventItem[]): EventItem | null {
  const now = Date.now();

  return events
    .filter((event) => new Date(event.startsAt).getTime() >= now)
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    )[0] ?? null;
}
```

El componente `FeaturedEvent` debe recibir:

```ts
type FeaturedEventProps = {
  event: EventItem | null;
  isLoading?: boolean;
};
```

Evitar que `FeaturedEvent` haga fetch por su cuenta si `events` ya ha cargado en la página. Mejor compartir datos desde el padre o usar la misma query cache.

---

## Estados visuales obligatorios

### Loading

Mostrar skeleton adaptado al diseño actual:

```txt
- skeleton para imagen
- skeleton para título
- skeleton para fecha
- skeleton para CTA
```

### Error

Mensaje:

```txt
No hemos podido cargar los eventos ahora mismo.
```

CTA:

```txt
Reintentar
```

### Empty

Mensaje:

```txt
Próximamente anunciaremos nuevos eventos.
```

Opcional:

```txt
Síguenos en Eventbrite para recibir novedades.
```

### Success

Renderizar eventos ordenados por fecha ascendente.

---

## Formato de fechas

Crear helper:

```ts
export function formatEventDate(isoDate: string, locale = 'es-ES') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
}
```

Asegurar que:

- La fecha se ve bien en móvil.
- Se muestra hora local correctamente.
- Si Eventbrite trae timezone, se respeta cuando sea posible.

---

## Seguridad

Checklist obligatorio:

- [ ] El token de Eventbrite no aparece en frontend.
- [ ] No existe `EVENTBRITE_PRIVATE_TOKEN` con prefijo público.
- [ ] El endpoint interno no devuelve headers ni datos sensibles.
- [ ] Añadir `.env` a `.gitignore` si no está.
- [ ] Añadir `.env.example` sin valores reales.
- [ ] Revisar que el token no aparece en commits.
- [ ] Si se ha expuesto el token por error, rotarlo en Eventbrite.

---

## Caché y rendimiento

Implementar caché para evitar llamar a Eventbrite en cada render.

Estrategias aceptadas:

### Next.js

```ts
fetch(url, {
  next: { revalidate: 300 },
});
```

### Vercel serverless sin Next

Usar headers:

```http
Cache-Control: s-maxage=300, stale-while-revalidate=600
```

### Backend propio

Usar caché en memoria, Redis o caché HTTP.

Recomendación inicial:

```txt
EVENTBRITE_CACHE_SECONDS=300
```

---

## Paginación

Eventbrite puede devolver paginación. La primera versión puede traer la primera página si hay pocos eventos.

Implementar de forma robusta:

1. Leer `pagination` del response.
2. Si `has_more_items` es true, decidir si:
   - cargar páginas hasta un máximo seguro, por ejemplo 3 páginas;
   - o aceptar `limit=20` si solo se muestran próximos eventos.
3. Evitar bucles infinitos.
4. Documentar el límite elegido.

Primera versión recomendada:

```txt
Cargar hasta 20 eventos live ordenados por fecha ascendente.
```

---

## Fallback local

Crear `fallbackEvents.ts` con 1-3 eventos estáticos opcionales o array vacío.

Uso recomendado:

- En desarrollo: permite trabajar sin token.
- En producción: solo usar si se quiere mantener contenido visible cuando Eventbrite falla.

No mezclar fallback silenciosamente si puede confundir al usuario. Si se usa fallback, añadir `source: 'fallback'` en la respuesta interna.

---

## Tests mínimos

### Tests de mapper

Crear casos para:

- Evento con logo.
- Evento sin logo.
- Evento online.
- Evento presencial con venue.
- Evento sin descripción.
- Evento con campos nulos.

### Tests de helper `getFeaturedEvent`

Casos:

- Devuelve el evento futuro más cercano.
- Ignora eventos pasados.
- Devuelve `null` si no hay eventos.

### Tests de UI

Casos:

- `EventsSection` muestra skeleton.
- `EventsSection` muestra empty state.
- `EventsSection` muestra tarjetas.
- `FeaturedEvent` muestra CTA con URL de Eventbrite.

---

## QA manual

Antes de finalizar, comprobar:

- [ ] La web carga sin errores en local.
- [ ] La sección `events` muestra eventos reales.
- [ ] `featuredEvent` destaca el próximo evento.
- [ ] Los CTAs abren la URL correcta de Eventbrite.
- [ ] El diseño no se rompe en móvil.
- [ ] El diseño no se rompe en tablet.
- [ ] El diseño no se rompe en desktop.
- [ ] Si Eventbrite falla, la web no crashea.
- [ ] No hay token en DevTools/network/client bundle.
- [ ] Build de producción correcto.

Comandos orientativos:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Si el proyecto no tiene alguno de estos scripts, revisar `package.json` y usar los equivalentes.

---

## Prompt para Codex

```txt
Quiero que integres Eventbrite en esta web React para que las secciones actuales `events` y `featuredEvent` lean datos reales desde Eventbrite.

Requisitos:

1. Inspecciona primero la estructura del proyecto y localiza los componentes actuales relacionados con `events`, `featuredEvent`, `EventCard`, datos mock o arrays estáticos de eventos.
2. No rompas el diseño actual. Mantén estilos, animaciones, responsive y estructura visual existente siempre que sea posible.
3. Crea una capa segura de backend/serverless para llamar a Eventbrite. El token nunca debe exponerse en React ni en variables públicas.
4. Usa variables privadas:
   - EVENTBRITE_PRIVATE_TOKEN
   - EVENTBRITE_ORGANIZATION_ID
   - EVENTBRITE_ORGANIZER_ID opcional
   - EVENTBRITE_CACHE_SECONDS opcional
5. Implementa un endpoint interno `/api/eventbrite/events` o el equivalente correcto según el framework detectado.
6. Llama a Eventbrite usando:
   GET https://www.eventbriteapi.com/v3/organizations/{organization_id}/events/
   con Authorization Bearer token.
7. Usa parámetros iniciales:
   - status=live
   - order_by=start_asc
   - expand=venue,organizer,ticket_availability,logo
8. Crea un modelo interno `EventItem` y un mapper `mapEventbriteEventToEventItem` para que la UI no dependa del payload bruto de Eventbrite.
9. Adapta `events` para mostrar listado real con estados loading, error, empty y success.
10. Adapta `featuredEvent` para mostrar automáticamente el próximo evento futuro más cercano.
11. Añade helpers para formatear fecha en español.
12. Añade caché de 5 minutos o la estrategia equivalente del framework.
13. Añade tests de mapper, helper de featured event y renderizado básico.
14. Actualiza `.env.example` y documentación mínima.
15. Ejecuta lint, typecheck, tests y build. Corrige cualquier error hasta que todo pase.
16. Comprueba manualmente que en móvil, tablet y desktop las secciones siguen viéndose correctamente.

No finalices hasta que la integración sea segura, compile correctamente y no haya datos mock sustituyendo a Eventbrite salvo fallback explícito documentado.
```

---

## Criterios de aceptación

La tarea estará completada cuando:

- [ ] `events` ya no depende de mock principal.
- [ ] `featuredEvent` se alimenta de eventos reales.
- [ ] Existe endpoint interno seguro.
- [ ] Existe mapper Eventbrite -> `EventItem`.
- [ ] El token no se expone en cliente.
- [ ] Hay estados loading/error/empty.
- [ ] Hay caché.
- [ ] Hay tests mínimos.
- [ ] La web compila.
- [ ] El diseño sigue responsive.
- [ ] `.env.example` está actualizado.

---

## Posibles mejoras posteriores

1. Webhooks de Eventbrite para refrescar caché cuando cambie un evento.
2. Campo manual para forzar evento destacado.
3. Filtros por tipo de evento, ciudad o modalidad online/presencial.
4. Sincronización periódica a Supabase para histórico y más control editorial.
5. Panel interno para ocultar eventos concretos aunque estén publicados en Eventbrite.
6. Analytics de clicks en CTA hacia Eventbrite.
7. Página detalle propia `/events/:slug` manteniendo CTA final a Eventbrite.
