// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcV3UPbVB75X-UU0FbuswNoerajuLqZRw",
  authDomain: "what-a-shop-com.firebaseapp.com",
  projectId: "what-a-shop-com",
  storageBucket: "what-a-shop-com.appspot.com",
  messagingSenderId: "865792750593",
  appId: "1:865792750593:web:2e8118a686e4dcf671bc00"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 export default auth;