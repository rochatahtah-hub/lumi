/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-64x64.png",
    "revision": "5eb5a8b4065cab8a37fc9dc923c3f62b"
  }, {
    "url": "pwa-512x512.png",
    "revision": "194f704bf59bb4058e9a5cf755c61dc1"
  }, {
    "url": "pwa-192x192.png",
    "revision": "9b65f4147e5a7262b40071cc7e5c86b3"
  }, {
    "url": "maskable-icon-512x512.png",
    "revision": "5785734a25b6ad2c7a6dd3e1b0cf5d7b"
  }, {
    "url": "index.html",
    "revision": "47c0602aa84639cc6e8e24281ff68db9"
  }, {
    "url": "favicon.svg",
    "revision": "07a67b6e1cb9403cd3cd62bd3ec1440f"
  }, {
    "url": "apple-touch-icon-180x180.png",
    "revision": "6dd4d31f4b7d6959cb86ad2af452f476"
  }, {
    "url": "assets/repo-D5B6shfQ.js",
    "revision": null
  }, {
    "url": "assets/poppins-latin-700-normal-Qrb0O0WB.woff2",
    "revision": null
  }, {
    "url": "assets/poppins-latin-600-normal-zEkxB9Mr.woff2",
    "revision": null
  }, {
    "url": "assets/poppins-latin-500-normal-C8OXljZJ.woff2",
    "revision": null
  }, {
    "url": "assets/poppins-latin-400-normal-cpxAROuN.woff2",
    "revision": null
  }, {
    "url": "assets/Placement-CiZpZcTD.js",
    "revision": null
  }, {
    "url": "assets/mundo-DhO7VBNY.js",
    "revision": null
  }, {
    "url": "assets/lumi-peek-wave-CHJVARl0.webp",
    "revision": null
  }, {
    "url": "assets/lumi-peek-smile-B9J28a53.webp",
    "revision": null
  }, {
    "url": "assets/lumi-peek-look-C-u6KIZb.webp",
    "revision": null
  }, {
    "url": "assets/lumi-peek-kiss-CXKrC4BZ.webp",
    "revision": null
  }, {
    "url": "assets/lumi-peek-grip-Z6MFfLhe.webp",
    "revision": null
  }, {
    "url": "assets/lumi-medium-Bd_0-K8e.webp",
    "revision": null
  }, {
    "url": "assets/lumi-hard-DwPtNouL.webp",
    "revision": null
  }, {
    "url": "assets/lumi-easy-BRgrhL1C.webp",
    "revision": null
  }, {
    "url": "assets/languages-CM0S0Dpy.js",
    "revision": null
  }, {
    "url": "assets/Languages-CHfuCzxy.js",
    "revision": null
  }, {
    "url": "assets/LanguageDashboard-DbKx20KR.js",
    "revision": null
  }, {
    "url": "assets/index-DBVACVyJ.js",
    "revision": null
  }, {
    "url": "assets/index-Cd__vpdk.css",
    "revision": null
  }, {
    "url": "assets/idiomas-login-3gD9u3LX.png",
    "revision": null
  }, {
    "url": "assets/Games-F8mNceii.js",
    "revision": null
  }, {
    "url": "assets/GamePlay-BRThuA4K.js",
    "revision": null
  }, {
    "url": "assets/europa-CZUsSQQN.js",
    "revision": null
  }, {
    "url": "assets/EnglishUnit-bKTHJ8js.js",
    "revision": null
  }, {
    "url": "assets/EnglishReview-yAWxZw9n.js",
    "revision": null
  }, {
    "url": "assets/EnglishHome-B3kXHAax.js",
    "revision": null
  }, {
    "url": "assets/course-BrW58s4F.js",
    "revision": null
  }, {
    "url": "assets/Conversation-B2vTbITS.js",
    "revision": null
  }, {
    "url": "assets/brasil-YmAp0ufu.js",
    "revision": null
  }, {
    "url": "assets/america-sul-DR380lv9.js",
    "revision": null
  }, {
    "url": "assets/Admin-nvf14QQS.js",
    "revision": null
  }, {
    "url": "apple-touch-icon-180x180.png",
    "revision": "6dd4d31f4b7d6959cb86ad2af452f476"
  }, {
    "url": "favicon.svg",
    "revision": "07a67b6e1cb9403cd3cd62bd3ec1440f"
  }, {
    "url": "maskable-icon-512x512.png",
    "revision": "5785734a25b6ad2c7a6dd3e1b0cf5d7b"
  }, {
    "url": "pwa-192x192.png",
    "revision": "9b65f4147e5a7262b40071cc7e5c86b3"
  }, {
    "url": "pwa-512x512.png",
    "revision": "194f704bf59bb4058e9a5cf755c61dc1"
  }, {
    "url": "pwa-64x64.png",
    "revision": "5eb5a8b4065cab8a37fc9dc923c3f62b"
  }, {
    "url": "manifest.webmanifest",
    "revision": "3e111a4a541588f279c37594a762cabf"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("/index.html")));

}));
