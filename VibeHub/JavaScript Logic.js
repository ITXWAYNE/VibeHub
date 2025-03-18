document.addEventListener("DOMContentLoaded", function() {
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser && window.location.pathname !== "/login.html") {
        window.location.href = "login.html";  // Redirect if not logged in
    }

    if (storedUser && storedUser.email === "admin@vibehub.com") {
        storedUser.role = "admin";
        localStorage.setItem("user", JSON.stringify(storedUser));
    }
});

// Simulated OAuth Login (Replace with Firebase Auth)
document.getElementById("google-login")?.addEventListener("click", function() {
    let user = { name: "Google User", email: "googleuser@example.com", role: "user" };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "profile.html";
});

document.getElementById("facebook-login")?.addEventListener("click", function() {
    let user = { name: "Facebook User", email: "fbuser@example.com", role: "user" };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "profile.html";
});

document.getElementById("email-login")?.addEventListener("click", function() {
    let user = { name: "Email User", email: "emailuser@example.com", role: "user" };
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "profile.html";
});

// Profile Save
document.getElementById("profile-form")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let profileData = {
        username: document.getElementById("username").value,
        bio: document.getElementById("bio").value,
        profilePic: document.getElementById("profile-pic").files[0]?.name || "",
    };
    localStorage.setItem("profile", JSON.stringify(profileData));
    alert("Profile saved!");
});
