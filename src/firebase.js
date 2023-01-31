import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmH59Soau9kbpoxumPk4vYVNfiEB1Mxmg",
  authDomain: "crudreact-4b610.firebaseapp.com",
  projectId: "crudreact-4b610",
  storageBucket: "crudreact-4b610.appspot.com",
  messagingSenderId: "629290673586",
  appId: "1:629290673586:web:94f9b17c68c8b713aaf0ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);