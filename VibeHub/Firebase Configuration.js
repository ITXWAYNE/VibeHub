// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign Up with Email & Password
document.getElementById("signup-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert("Account created successfully!");
        window.location.href = "dashboard.html"; // Redirect to homepage after signup
    })
    .catch((error) => {
        alert(error.message);
    });
});

// Login with Email & Password
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        alert("Logged in successfully!");
        window.location.href = "home.html"; // Redirect to homepage after login
    })
    .catch((error) => {
        alert(error.message);
    });
});

// Login with Google
document.getElementById("google-login").addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    auth.signInWithPopup(provider)
    .then((result) => {
        alert("Logged in with Google!");
        window.location.href = "dashboard.html"; // Redirect to homepage
    })
    .catch((error) => {
        alert(error.message);
    });
});

// Logout Function
document.getElementById("logout").addEventListener("click", () => {
    auth.signOut().then(() => {
        alert("Logged out!");
        window.location.href = "home.html"; // Redirect to login page
    });
});

// Check Authentication State
auth.onAuthStateChanged((user) => {
    if (user) {
        document.getElementById("user-email").innerText = user.email;
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("dashboard-section").style.display = "block";
    } else {
        document.getElementById("auth-section").style.display = "block";
        document.getElementById("dashboard-section").style.display = "none";
    }
});
