// Files to cache
const cacheName = 'readySetMatch-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/images/icon.svg',
  '/assets/index.css',
  '/assets/index.js'
];

self.addEventListener("install", (event) => {
  let cacheUrls = async () => {
     const cache = await caches.open(cacheName);
     return cache.addAll(urlsToCache);
  };
  event.waitUntil(cacheUrls());
});

// Use the Stale while revalidate approach to serving requests in the service worker
// https://web.dev/learn/pwa/serving#stale_while_revalidate
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
        const networkFetch = fetch(event.request).then(response => {
          // update the cache with a clone of the network response
          const responseClone = response.clone()
          caches.open(url.searchParams.get('name')).then(cache => {
            cache.put(event.request, responseClone)
          })
          return response
        }).catch(function (reason) {
          console.error('ServiceWorker fetch failed: ', reason)
        })
        // prioritize cached response over network
        return cachedResponse || networkFetch
      }
    )
  )
})
