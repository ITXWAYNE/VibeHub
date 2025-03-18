const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const shuffleBtn = document.getElementById('shuffle');
const repeatBtn = document.getElementById('repeat');
const progressBar = document.getElementById('progress');
const volumeControl = document.getElementById('volume');

// Playlist array
const playlist = ['song1.mp3', 'song2.mp3', 'song3.mp3'];
let currentTrack = 0;
let isShuffling = false;
let isRepeating = false;

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

// Seek functionality
progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Volume control
volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value;
});

// Previous track functionality
prevBtn.addEventListener('click', () => {
    currentTrack = (currentTrack === 0) ? playlist.length - 1 : currentTrack - 1;
    loadTrack(currentTrack);
});

// Next track functionality
nextBtn.addEventListener('click', () => {
    if (isShuffling) {
        currentTrack = Math.floor(Math.random() * playlist.length);
    } else {
        currentTrack = (currentTrack + 1) % playlist.length;
    }
    loadTrack(currentTrack);
});

// Shuffle functionality
shuffleBtn.addEventListener('click', () => {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active', isShuffling);
});

// Repeat functionality
repeatBtn.addEventListener('click', () => {
    isRepeating = !isRepeating;
    repeatBtn.classList.toggle('active', isRepeating);
});

// Load and play track
function loadTrack(index) {
    audioPlayer.src = playlist[index];
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Auto-play next song or repeat
audioPlayer.addEventListener('ended', () => {
    if (isRepeating) {
        loadTrack(currentTrack);
    } else {
        nextBtn.click();
    }
});