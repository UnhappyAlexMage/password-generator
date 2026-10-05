const CACHE_NAME = 'passgenerator-v1';
const ASSETS = [
    './',
    './index.html',
    './global.css',
    './index.js',

    './core/constants/constants.js',

    './core/generators/GeneratorLettersLowercase.js',
    './core/generators/GeneratorLettersUppercase.js',
    './core/generators/GeneratorNumbers.js',
    './core/generators/GeneratorSymbols.js',

    './core/handleGenerateClick.js',
    './core/passwordService.js',
    './core/BaseGenerator.js',
    './core/FactoryGenerator.js',

    './images/password-192.png',
    './images/password-512.png',
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
