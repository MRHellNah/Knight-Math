const CACHE_NAME = 'mathwar-v3-ui';
const PRECACHE_URLS = [
  './','./index.html','./manifest.json',
  './icons/favicon-48.png','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png','./icons/icon-maskable-192.png','./icons/icon-maskable-512.png',
  './assets/math-quest-logo.jpg',
  './assets/characters/playerIdle.png','./assets/characters/playerAttack.png','./assets/characters/playerHurt.png','./assets/characters/playerDead.png',
  './assets/characters/enemyIdle.png','./assets/characters/enemyAttack.png','./assets/characters/enemyHurt.png','./assets/characters/enemyDead.png',
  './assets/scene/battle-bg.jpg','./assets/scene/slash.png',
  './assets/ui/main-tiles.png','./assets/ui/decorative-cracks.png','./assets/ui/buttons-sheet.png','./assets/ui/action-panel-sheet.png','./assets/ui/character-panel.png','./assets/ui/win-loose.png','./assets/ui/pixel-button.png','./assets/ui/pixel-panel-top.png',
  './audio/battle-march.mp3','./audio/attack-player.mp3','./audio/attack-enemy.mp3','./audio/hit.mp3','./audio/victory.mp3','./audio/gameover.mp3'
];
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE_URLS)).then(()=>self.skipWaiting())));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached=>cached || fetch(event.request).then(res=>{const copy=res.clone();caches.open(CACHE_NAME).then(c=>c.put(event.request,copy)).catch(()=>{});return res}).catch(()=>cached)));
});
