document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio-player");
    const playPauseBtn = document.getElementById("play-pause");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");
    const shuffleBtn = document.getElementById("shuffle");
    const repeatBtn = document.getElementById("repeat");
    const progress = document.getElementById("progress");
    const volumeControl = document.getElementById("volume");

    const tracks = ["song1.mp3", "song2.mp3", "song3.mp3"]; // Replace with actual track URLs
    let currentTrackIndex = 0;
    let isShuffling = false;
    let isRepeating = false;

    function loadTrack(index) {
        audio.src = tracks[index];
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    nextBtn.addEventListener("click", function () {
        if (isShuffling) {
            currentTrackIndex = Math.floor(Math.random() * tracks.length);
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        }
        loadTrack(currentTrackIndex);
    });

    prevBtn.addEventListener("click", function () {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
    });

    shuffleBtn.addEventListener("click", function () {
        isShuffling = !isShuffling;
        shuffleBtn.classList.toggle("active", isShuffling);
    });

    repeatBtn.addEventListener("click", function () {
        isRepeating = !isRepeating;
        repeatBtn.classList.toggle("active", isRepeating);
    });

    audio.addEventListener("ended", function () {
        if (isRepeating) {
            audio.play();
        } else {
            nextBtn.click();
        }
    });

    progress.addEventListener("input", function () {
        audio.currentTime = (audio.duration * progress.value) / 100;
    });

    audio.addEventListener("timeupdate", function () {
        progress.value = (audio.currentTime / audio.duration) * 100;
    });

    volumeControl.addEventListener("input", function () {
        audio.volume = volumeControl.value;
    });

    loadTrack(currentTrackIndex);
});
