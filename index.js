if ('serviceWorker' in navigator) {
  if ('Notification' in window) {
    Notification.requestPermission()
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .catch(e => console.error(e))

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
