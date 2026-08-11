import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATJ0TSk03IwQHWpHIo29Fk9wnsPJaz16o",
    authDomain: "servidom-827e5.firebaseapp.com",
    projectId: "servidom-827e5",
    storageBucket: "servidom-827e5.firebasestorage.app",
    messagingSenderId: "205118017856",
    appId: "1:205118017856:web:c22b4915e9e881e2876aa5",
    measurementId: "G-71V9041EKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
