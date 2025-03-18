// Firebase Authentication & Firestore Setup
const auth = firebase.auth();
const db = firebase.firestore();

document.addEventListener("DOMContentLoaded", function () {
    checkAuthStatus();
    loadPlaylists();
});

// ✅ Check if the user is logged in
function checkAuthStatus() {
    auth.onAuthStateChanged(user => {
        if (!user) {
            alert("You must be logged in to access playlists!");
            window.location.href = "login.html"; // Redirect to login
        }
    });
}

// ✅ Function to create a new playlist
function createPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (!playlistName) return;

    const user = auth.currentUser;
    if (!user) {
        alert("Please log in to create a playlist.");
        return;
    }

    db.collection("playlists").add({
        name: playlistName,
        userId: user.uid,
        songs: []
    }).then(() => {
        alert("Playlist created successfully!");
        loadPlaylists();
    }).catch(error => console.error("Error creating playlist:", error));
}

// ✅ Load user playlists from Firebase
function loadPlaylists() {
    const user = auth.currentUser;
    if (!user) return;

    db.collection("playlists").where("userId", "==", user.uid).get()
        .then(snapshot => {
            const playlistContainer = document.getElementById("playlistContainer");
            playlistContainer.innerHTML = "";

            snapshot.forEach(doc => {
                const playlist = doc.data();
                const playlistElement = document.createElement("div");
                playlistElement.classList.add("playlist-item");
                playlistElement.innerHTML = `
                    <h3>${playlist.name}</h3>
                    <button onclick="deletePlaylist('${doc.id}')">Delete</button>
                    <button onclick="viewPlaylist('${doc.id}')">View</button>
                `;
                playlistContainer.appendChild(playlistElement);
            });
        })
        .catch(error => console.error("Error loading playlists:", error));
}

// ✅ Function to delete a playlist
function deletePlaylist(playlistId) {
    if (!confirm("Are you sure you want to delete this playlist?")) return;

    db.collection("playlists").doc(playlistId).delete()
        .then(() => {
            alert("Playlist deleted!");
            loadPlaylists();
        })
        .catch(error => console.error("Error deleting playlist:", error));
}

// ✅ Function to view and manage a playlist
function viewPlaylist(playlistId) {
    window.location.href = `playlist.html?id=${playlistId}`;
}

// ✅ Function to add a song to a playlist
function addSongToPlaylist(songId, playlistId) {
    db.collection("playlists").doc(playlistId).update({
        songs: firebase.firestore.FieldValue.arrayUnion(songId)
    }).then(() => {
        alert("Song added to playlist!");
    }).catch(error => console.error("Error adding song:", error));
}

// ✅ Function to remove a song from a playlist
function removeSongFromPlaylist(songId, playlistId) {
    db.collection("playlists").doc(playlistId).update({
        songs: firebase.firestore.FieldValue.arrayRemove(songId)
    }).then(() => {
        alert("Song removed from playlist!");
    }).catch(error => console.error("Error removing song:", error));
}

