const CACHE_NAME = 'mynumber-navi-v4';

const ASSETS = [
  './index.html',
  './manifest.json',
  './icon.png',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // ネットワーク優先、失敗したらキャッシュを返す
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
