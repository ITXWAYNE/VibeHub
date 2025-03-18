// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxGqBcYD5DIe7F8Y7mtBMxDMoVxg85Y9c",
  authDomain: "vibehub-91fa4.firebaseapp.com",
  projectId: "vibehub-91fa4",
  storageBucket: "vibehub-91fa4.appspot.com",
  messagingSenderId: "269945995228",
  appId: "1:269945995228:web:d164cf018968fa7f8ed919",
  measurementId: "G-429HPSQMH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Function to handle Google Sign-In
async function googleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if user already exists in Firestore
    const userDoc = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDoc);
    
    if (!userSnap.exists()) {
      // Save user data if it's a new user
      await setDoc(userDoc, {
        name: user.displayName,
        email: user.email,
        profilePic: user.photoURL,
        role: "user", // Default role
      });
    }
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in:", error);
  }
}

// Function to log out user
function logout() {
  signOut(auth).then(() => {
    console.log("User logged out.");
  }).catch((error) => {
    console.error("Logout Error:", error);
  });
}

// Track authentication state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
  } else {
    console.log("User is logged out.");
  }
});

export { auth, googleLogin, logout, db };
