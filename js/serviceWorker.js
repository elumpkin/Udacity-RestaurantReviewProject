// this is the service worker file

// using an event listener to listen for an installation event to cache a list of 
// file names for alter use
self.addEventListener('install', (e) => {
    const files = [
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
    ];

    //adding files to the cache after the installation event is completed
    e.waitUntil(
        // open all cache objects matching cache names in files list
        caches.open('cache1').then((cache) => {
            return cache.addAll(files);
        })
    );

});

// using a match method to see if there is a response, if the response doesn't exist
// in the cache, continue to fetch
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            caches.open('cache1').then((cache) => {
                cache.put(e.request, response.clone());
            })

        return response;   
        })
    )
})