const INCREMENT_SERVER_TIME = 'serviceworker.INCREMENT_SERVER_TIME'
let incementTimeout = null
const worker = self
worker.addEventListener('push', function (event) {
  let data = {}

  if (event.data) {
    data = event.data ? event.data.json() : {}
  }
  const title = data.title || 'title'
  const body = data.body || 'decription'

  const options = {
    body: body,
    icon: 'https://el-css.edu.om/64x64.png',
    vibrate: [200],
    sound: 'https://el-css.com/alert.wav',
    dir: 'rtl',
    lang: 'ar'
  }
  event.waitUntil(
      worker.registration.showNotification(title, options),
  )
})

worker.addEventListener('message', function (event) {
  switch (event.data.tag) {
    case INCREMENT_SERVER_TIME:
      if (!incementTimeout) {
        incementTimeout = setInterval(function () {
          worker.clients.matchAll().then(function (clients) {
            clients.forEach(function (client) {
              client.postMessage({ tag: INCREMENT_SERVER_TIME })
            })
          })
        }, 1000)
      }
      break
    default:
      console.log('no aTopic on incoming message to ChromeWorker')
  }
})

worker.addEventListener('notificationclick', function(event) {
  event.notification.close()
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(worker.clients.matchAll({
    type: 'window'
  }).then(function(clients) {
    for (var i = 0; i < clients.length; i++) {
      var client = clients[i]
      if (client.url === '/' && 'focus' in client) {
        return client.focus()
      }
    }
    if (clients.openWindow) {
      return clients.openWindow('/')
    }
  }))
})

// self.addEventListener('fetch', function(event) {
//  console.log(event.request.url)
// })
