const cacheName = 'cache-v1'
const resourceToPrecache = [
	'/',
	'/index.html',
	'/css/style.css',
	'/js/index.js',
	'/img/icon-128x128.png',
	'/img/icon-256x256.png',
	'/img/icon-512x512.png',
]

self.addEventListener('install', (event) => {
	console.log('Service worker install event!')
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll(resourceToPrecache)
		})
	)
})

self.addEventListener('fetch', (event) => {
	event.respondwith(caches.match(event.request)).then((cachedResponse) => {
		return cachedResponse || fetch(event.request)
	})
})
