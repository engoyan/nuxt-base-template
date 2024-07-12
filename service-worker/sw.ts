import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { clientsClaim } from "workbox-core";

// Handle images:
const imageRoute = new Route(
  ({ request }) => {
    return request.destination === "image";
  },
  new StaleWhileRevalidate({
    cacheName: "images",
  })
);

// Handle scripts:
const scriptsRoute = new Route(
  ({ request }) => {
    return request.destination === "script";
  },
  new CacheFirst({
    cacheName: "scripts",
  })
);

// Handle styles:
const stylesRoute = new Route(
  ({ request }) => {
    return request.destination === "style";
  },
  new CacheFirst({
    cacheName: "styles",
  })
);

// handle documents
const documentRoute = new Route(
  ({ request }) => {
    return request.destination === "document";
  },
  new CacheFirst({
    cacheName: "documents",
  })
);

// Register routes
if (!import.meta.env.SW) {
  registerRoute(imageRoute);
  registerRoute(scriptsRoute);
  registerRoute(stylesRoute);
  registerRoute(documentRoute);
}

declare const self: ServiceWorkerGlobalScope;
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

// Auto Update Behavior
self.skipWaiting();
clientsClaim();
