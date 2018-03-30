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

export {
  googleSignIn,
  googleSignOut
}
