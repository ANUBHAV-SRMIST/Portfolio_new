const CACHE_NAME = "anubhav-portfolio-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js"
];

// ── INSTALL: cache core files, activate immediately (don't wait for old tabs to close) ──
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// ── ACTIVATE: delete any old, outdated caches ──
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: network-first — always try to get the latest version, fall back to cache if offline ──
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});