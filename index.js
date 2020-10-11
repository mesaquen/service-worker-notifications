if ('serviceWorker' in navigator) {
  if ('Notification' in window) {
    Notification.requestPermission()
  }

  window.addEventListener('load', async () => {
    const url = new URL(window.location.href)
    const swUrl = `${url.origin}/sw.js`

    await navigator.serviceWorker.register(swUrl)

    const trigger = document.querySelector('#trigger')

    //sends message to SW
    trigger.addEventListener('click', () => {
      navigator.serviceWorker.controller.postMessage({
        type: 'NOTIFY',
        message: 'Sample'
      })
    })

    // Listen to sw response to notification action
    navigator.serviceWorker.addEventListener('message', e =>
      alert(`worker message: ${e.data}`)
    )
  })
}
