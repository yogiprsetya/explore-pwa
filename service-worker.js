const CACHE_NAME = "explore-pwa.v2";

var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/css/style.css",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/img/logo-icon.png",
  "/img/logo-dark.png",
  "/img/bg/particle.svg",
  "/img/bg/box-particles.svg",
  "/img/bg/box-particles-2.svg",
  "/img/bg/header-page.svg",
  "/img/content/about.png",
  "/img/content/app-illustration.png",
  "/img/content/company.jpg",
  "https://fonts.googleapis.com/css2?family=Rubik:wght@400;500&display=swap",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName: CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
				return response;
			}

			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});