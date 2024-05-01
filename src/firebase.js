import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBejU1TQUMnBPrD6M2g1DArRExOWI0tLg4",
  authDomain: "fir-app-9a768.firebaseapp.com",
  projectId: "fir-app-9a768",
  storageBucket: "fir-app-9a768.appspot.com",
  messagingSenderId: "296425501874",
  appId: "1:296425501874:web:095f377ffed5b3e01305ab",
  measurementId: "G-LZC1DGM5X5"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);