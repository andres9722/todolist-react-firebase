import firebase from 'firebase'

const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider()

  firebase.auth().signInWithPopup(provider)
    .then(result => console.log(`${result.user.email} ha iniciado sesión con Google`))
    .catch(err => console.log(`Error: ${err.code}: ${err.message}`))
}

const googleSignOut = () => {
  firebase.auth().signOut()
    .then(() => console.log(`Te has desconectado correctamente de Google`))
    .catch(() => console.log('Error al desconectarse de Google'))
}

const pwa = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(registration => {
          console.log(registration)
          console.log('Service worker registrado con exito', registration.scope)
        })
        .catch(err => console.log('Registro de service Worker fallido', err))
    })
  }

  if (window.Notification && Notification.permission !== 'denied') {
    window.Notification.requestPermission(status => {
      console.log(status)
      let n = new Notification('Bienvenidos', {
        body: ':)',
        icon: './icon_192x192.png'
      })
    })
  }

  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    let func = function registerGBSync () {
      navigator.serviceWorker.ready
      .then(registration => {
        return registration.sync.register('github')
          .then(() => console.log('Sincronizacion de fondo registrada'))
          .catch(err => console.log('Fallo la sincronizacion de fondo', err))
      })
    }
    func()
  }
}

const isOnLine = () => {
  const header = document.querySelector('.todo__title')
  const metaTagTheme = document.querySelector('meta[name=theme-color]')

  function networkStatus (e) {
    if (navigator.onLine) {
      metaTagTheme.setAttribute('content', '#F7DF1E')
      header.classList.remove('u-offline')
      alert('Conexión Recuperada')
    } else {
      metaTagTheme.setAttribute('content', '#666')
      header.classList.add('u-offline')
      alert('Conexión Perdida')
    }
  }

  window.addEventListener('online', networkStatus)
  window.addEventListener('offline', networkStatus)
}

export {
  googleSignIn,
  googleSignOut,
  pwa,
  isOnLine
}
