
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCV9oJgYm5OIRmVdPgQrN8VffjeVMPENZY",
    authDomain: "laundry-application-3287f.firebaseapp.com",
    projectId: "laundry-application-3287f",
    storageBucket: "laundry-application-3287f.appspot.com",
    messagingSenderId: "578829046046",
    appId: "1:578829046046:web:3561ce985eb61efc20790f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = getFirestore();

export { auth, db };

