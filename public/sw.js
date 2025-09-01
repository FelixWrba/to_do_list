// GENERATED AT BUILD
const BUILD_ID = '__BUILD_ID__';
const CACHE_NAME = `app-${BUILD_ID}`;
const ASSETS = __ASSET_LIST__;
const SPA_FALLBACK = '/index.html';

const isSameOrigin = (url) => new URL(url).origin === self.location.origin;
const isNavigation = (req) => req.mode === 'navigate' || (req.headers && req.headers.get('accept') || '').includes('text/html');

// CACHE ALL ASSETS
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);

    // make sure SPA is offline available
    if (!ASSETS.includes(SPA_FALLBACK)) {
      await cache.add(SPA_FALLBACK);
    }
    self.skipWaiting();
  })());
});

// REMOVE OLD CACHE(S)
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map((n) => (n.startsWith('app-') && n !== CACHE_NAME) ? caches.delete(n) : null));
    await self.clients.claim();
  })());
});

// HANDLE FETCHING:
// - Same-origin GETs: cache-only (no network) to minimize Netlify bandwidth.
// - Navigations: return cached SPA shell.
// - Cross-origin (e.g., Supabase): pass through to network.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // only handle get requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // do not intercept supabase requests
  if (!isSameOrigin(url)) return;

  // serve SPA navigation from cache
  if (isNavigation(request)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(SPA_FALLBACK);
      return cached || new Response('Offline', { status: 503, statusText: 'Offline' });
    })());
    return;
  }

  // return static assets from cache
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;

    // throw error if not cached
    return new Response('', { status: 404, statusText: 'Not cached' });
  })());
});
