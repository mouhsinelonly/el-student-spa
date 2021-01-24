/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env browser */
'use strict'

if ('serviceWorker' in navigator) {
  // Your service-worker.js *must* be located at the top-level directory relative to your site.
  // It won't be able to control pages unless it's located at the same level or higher than them.
  // *Don't* register service worker file in, e.g., a scripts/ sub-directory!
  // See https://github.com/slightlyoff/ServiceWorker/issues/468
  navigator.serviceWorker.register('/service-worker.js').then(function (reg) {
    // updatefound is fired if service-worker.js changes.
    reg.onupdatefound = function () {
      // The updatefound event implies that reg.installing is set see
      // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html
      // #service-worker-container-updatefound-event
      var installingWorker = reg.installing

      installingWorker.onstatechange = function () {
        switch (installingWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and the fresh content will
              // have been added to the cache.
              // It's the perfect time to display a "New content is available please refresh."
              // message in the page's interface.
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a "Content is cached for offline use." message.
            }
            break

          case 'redundant':
            break
        }
      }
    }
  }).catch(function (e) {
  })
}

(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

ga('create', 'UA-67686346-2', 'auto')
ga('send', 'pageview')

 // (function(h,o,t,j,a,r){
 //        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
 //        h._hjSettings={hjid:926711,hjsv:6};
 //        a=o.getElementsByTagName('head')[0];
 //        r=o.createElement('script');r.async=1;
 //        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
 //        a.appendChild(r);
 //    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

// !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
// n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
// n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
// t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
// document,'script','https://connect.facebook.net/en_US/fbevents.js');
// fbq('init', '1945738485694539'); // Insert your pixel ID here.
// fbq('track', 'PageView');
    // (function(h,o,t,j,a,r){
    //     h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    //     h._hjSettings={hjid:657554,hjsv:6};
    //     a=o.getElementsByTagName('head')[0];
    //     r=o.createElement('script');r.async=1;
    //     r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    //     a.appendChild(r);
    // })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
