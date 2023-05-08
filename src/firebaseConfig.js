import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyChwUrpPhR9m4MnbUc458HE5KHTLm0Unvg",
  authDomain: "bykkc-1ff58.firebaseapp.com",
  databaseURL: "https://bykkc-1ff58-default-rtdb.firebaseio.com",
  projectId: "bykkc-1ff58",
  storageBucket: "bykkc-1ff58.appspot.com",
  messagingSenderId: "259149176739",
  appId: "1:259149176739:web:9400d5b3304cb91ab58416"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

