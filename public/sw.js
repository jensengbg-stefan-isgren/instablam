const cacheStatic = "precache-static.v1";
const staticAssets = ["/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheStatic).then((cache) => {
      cache.addAll(staticAssets);
    })
  );
  console.log("installing the serviceWorker...", event);
});

self.addEventListener("activate", (event) => {
  console.log("activating the serviceWorker", event);
});

//

self.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        } else {
          return caches.match(new Request("offline.html"));
        }
      })
    );
  } else {
    return updateCache(event.request);
  }
});

self.addEventListener("push", (event) => {
  if (event.data) {
    var obj = event.data.json();

    createNotification(obj.text, obj.body);
  }
});

const createNotification = (text, body) => {
  self.registration.showNotification(text, {
    body: body,
    icon: "favicon.png",
  });
};

async function updateCache(request) {
  if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    return;
  }
  if (request.method !== "POST" && request.url.indexOf("http") === 0) {
    return fetch(request).then((response) => {
      return caches.open(cacheStatic).then((cache) => {
        return cache.put(request, response.clone()).then(() => {
          return response;
        });
      });
    });
  }
}
