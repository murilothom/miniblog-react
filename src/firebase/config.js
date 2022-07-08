import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  /* firebase config db */
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };