

// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {

    apiKey: "AIzaSyD9xGtjutq5jqbNJaCbLUmiv-FS0l2lJ8c",

    authDomain: "translator-35a8b.firebaseapp.com",

    databaseURL: "https://translator-35a8b-default-rtdb.asia-southeast1.firebasedatabase.app",

    projectId: "translator-35a8b",

    storageBucket: "translator-35a8b.appspot.com",

    messagingSenderId: "662457562337",

    appId: "1:662457562337:web:6b56e2969fc2122f47b3a0"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const dbRef = ref(database);

function LogIn(addCredit) {
    signInWithEmailAndPassword(auth, document.getElementById("email").value, document.getElementById("password").value).then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        const uid = user.uid;
        const dbUserRef = ref(database, 'users/' + uid);
        get(child(dbUserRef, 'credit')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                set (dbUserRef, {
                    credit: parseFloat(snapshot.val()) + parseFloat(addCredit)
                })
                    .then(() => {
                        document.getElementById("loginDisplay").hidden = true;
                        document.getElementById("completed").hidden = false;
                    });
            }
            else {
                console.log(0);
            }
        });
    })
    .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
            errorMessage = "Invalid email or password";
        }
        else if (errorCode === "auth/wrong-password") {
            errorMessage = "Invalid email or password";
        }
        else if (errorCode === "auth/missing-password") {
            errorMessage = "Please enter your password";
        }
        document.getElementById("errorText").innerHTML = errorMessage;
        console.log(errorCode);
        console.log(errorMessage);
    })
}

window.Login = LogIn;
