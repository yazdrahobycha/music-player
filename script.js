const img = document.querySelector('img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');
const music = document.querySelector('audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const prevBtn = document.querySelector('.fa-backward');
const playBtn = document.querySelector('.fa-play');
const nextBtn = document.querySelector('.fa-forward');
let isPlaying = false;

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electrix Chill Maschine',
        artist: 'Arsenchickson',
    },
    {
        name: 'jacinto-2',
        displayName: 'What the fuck',
        artist: 'Jackinto',
    },
    {
        name: 'jacinto-3',
        displayName: 'Sex',
        artist: 'albina Sexova',
    },
    {
        name: 'metric-1',
        displayName: 'Fear Inoculum',
        artist: 'Tool',
    },
];

// Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or Pause E.L.
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update the Dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// functions for handling prev/next song functionality
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on load select first song
loadSong(songs[songIndex]);

// function to handle progress bar update
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`;

        // Updating Duration of Song
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        let placeholder;
        durationSeconds >= 10 ? (placeholder = ':') : (placeholder = ':0');
        if (durationSeconds) {
            durationEl.textContent =
                durationMinutes + placeholder + durationSeconds;
        }

        // Update Current Time of Song
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        let placeholder2;
        currentSeconds >= 10 ? (placeholder2 = ':') : (placeholder2 = ':0');
        if (currentSeconds) {
            currentTimeEl.textContent =
                currentMinutes + placeholder2 + currentSeconds;
        }
    }
}

function setProgressBar(e) {
    const clickX = e.offsetX;
    const width = this.clientWidth;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners for Prev/Next
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Event Listener for progress-bar
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong)
progressContainer.addEventListener('click', setProgressBar);
