const CACHE = 'v2'; // Changé en v2
const assets = ['./', './index.html', './manifest.json', './icon.png'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(assets)));
    self.skipWaiting();
});

self.addEventListener('fetch', e => {
    // Priorité au réseau pour voir les changements de signature
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
