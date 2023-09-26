// JavaScript
const videoIds = [
    "sQRH28gawn0",
    "Oy-SQky-9vI",
    "Oe4KiTgtZQQ",
    "XJWqHmY-g9U",
    "M1F5_UzwiY4",
    "6FW4DPIOdiQ",
    "Hdc_vGZICVE",
    // Add more video IDs as needed
];

const videoFrame = document.getElementById("video-frame");
const playButton = document.getElementById("play-button");

let currentIndex = 0;

function playNextVideo() {
    currentIndex = (currentIndex + 1) % videoIds.length;
    const videoUrl = `https://www.youtube.com/embed/${videoIds[currentIndex]}`;
    videoFrame.src = videoUrl;
}

// Event listener for the "Play Random Video" button
playButton.addEventListener("click", playNextVideo);

// Event listener for when the video ends
function onPlayerStateChange(event) {
    if (event.data === 0) { // Video has ended
        playNextVideo();
    }
}

// Initialize the YouTube player with the first video
const player = new YT.Player(videoFrame, {
    events: {
        'onStateChange': onPlayerStateChange
    }
});

// Load the YouTube iframe API asynchronously
function onYouTubeIframeAPIReady() {
    // This function will be called once the YouTube iframe API is ready
    // You can initialize the player here, but make sure it's after the DOM is ready
    player.cueVideoById(videoIds[currentIndex]);
}

// Initial load: Play the first video when the page loads
playNextVideo();
