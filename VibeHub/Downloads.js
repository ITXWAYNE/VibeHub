document.addEventListener("DOMContentLoaded", () => {
    const downloadList = document.getElementById("download-list");

    // Fetch and display downloaded songs
    const downloads = JSON.parse(localStorage.getItem("downloads")) || [];
    if (downloads.length > 0) {
        downloadList.innerHTML = downloads.map(song => `
            <div class="song-item">
                <p>${song.title} - ${song.artist}</p>
                <a href="${song.url}" download>Download Again</a>
            </div>
        `).join("");
    } else {
        downloadList.innerHTML = "<p>No downloads yet.</p>";
    }
});
