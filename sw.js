const CACHE_NAME = 'zenith-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/site.webmanifest', 
  '/notes.png',
  '/web-app-manifest-512x512.png', // Add your new icons here
  'https://unpkg.com/vue@3/dist/vue.global.js',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono&display=swap'
];

// 1. Install & Cache
self.addEventListener('install', (event) => {
  self.skipWaiting(); // FORCE ACTIVATION
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 2. Activate & Claim
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim()); // Take control of page immediately
});

// 3. Network-First with Offline Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
        return caches.match(event.request);
    })
  );
});

