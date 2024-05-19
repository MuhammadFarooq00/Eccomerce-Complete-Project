import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAqTwWe45rARyIkUGe0wVSg0BokCboMz-o",
  authDomain: "my-eccommerce.firebaseapp.com",
  projectId: "my-eccommerce",
  storageBucket: "my-eccommerce.appspot.com",
  messagingSenderId: "630622960812",
  appId: "1:630622960812:web:f44901d5f9f90184157309",
  measurementId: "G-42YQ4XSS4D"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);