import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDuqLsIXTymnqqQL7r2YbkgRsGv8dyuiKk',
  authDomain: 'polinotas-d676c.firebaseapp.com',
  databaseURL: 'https://polinotas-d676c.firebaseio.com',
  projectId: 'polinotas-d676c',
  storageBucket: '',
  messagingSenderId: '690852548999'
}

export const init = () => firebase.initializeApp(config)
