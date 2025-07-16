import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js"

const firebaseConfig = {
    apiKey: "AIzaSyDpXjYJ0IY40xnhwdb2GUwP5aEsrFYdFOw",
    authDomain: "cappybarapro.firebaseapp.com",
    projectId: "cappybarapro",
    storageBucket: "cappybarapro.firebasestorage.app",
    messagingSenderId: "658925501828",
    appId: "1:658925501828:web:ccbdbf10368d84f8c1f1d1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
const fireStoreBD = getFirestore(firebaseApp);

// Init Form
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const source = document.getElementById('source').value;

    try {
        const docRef = await addDoc(collection(fireStoreBD, "early_adopters"), {
          email: email,
          source: source,
          timestamp: new Date() // Optional: add a timestamp
        });
        console.log("Document written with ID: ", docRef.id);
        // Clear form fields or show a success message

        alert("Message sent! Thank you.");
        contactForm.reset();
    } catch (e) {
        console.error("Error adding document: ", e);
        // Handle error, e.g., show an error message
        alert("Error sending message: " + e);
    }
});
