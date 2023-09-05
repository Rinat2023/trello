// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBEDcFbevcNDxMwdENW3SsPDuU15y0BQ7Q',
  authDomain: 'newfocusapp-ab7fe.firebaseapp.com',
  projectId: 'newfocusapp-ab7fe',
  storageBucket: 'newfocusapp-ab7fe.appspot.com',
  messagingSenderId: '608350555806',
  appId: '1:608350555806:web:25ac6d1c9384977eb6358f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
