// Bump this when cached assets change shape; index.html itself is network-first
// so normal app updates arrive without a bump.
const CACHE_NAME = 'lift-v2';
const appFiles = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];
// Must match the URLs in index.html exactly
const externalFiles = [
  'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;600&family=Space+Grotesk:wght@400;500;600&display=swap',
  'https://cdn.jsdelivr.net/npm/chart.js@4'
];

// Install service worker and cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => Promise.all([
      cache.addAll(appFiles),
      // A CDN hiccup shouldn't block install; these are also cached on first use
      ...externalFiles.map((url) => cache.add(url).catch(() => {}))
    ]))
  );
  self.skipWaiting();
});

function isCacheable(response) {
  // 'cors' covers Google Fonts and jsdelivr, so fonts and Chart.js work offline
  return response && response.status === 200 &&
    (response.type === 'basic' || response.type === 'cors');
}

function putInCache(request, response) {
  if (isCacheable(response)) {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // Pages: network first so updates show up, cache when offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => putInCache(request, response))
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Everything else: serve from cache, refresh in the background
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => putInCache(request, response))
        .catch(() => cached);
      return cached || network;
    })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    ))
  );
  self.clients.claim();
});
