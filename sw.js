self.addEventListener('message', event => {
  if (event.data.type === 'NOTIFY') {
    self.registration.showNotification(event.data.message, {
      actions: [
        { action: 'skip', title: 'skip' },
        { action: 'start', title: 'start' }
      ]
    })
  }
})

const postMessage = async data => {
  const clientList = await self.clients.matchAll()
  clientList.forEach(client => {
    client.postMessage(data)
  })
}

// Reacts to user
self.addEventListener('notificationclick', event => {
  switch (event.action) {
    case 'skip':
      return postMessage('Response to skip action')
    case 'start':
      return postMessage('Response to start')
    default:
      return postMessage('Response to click')
  }
})
