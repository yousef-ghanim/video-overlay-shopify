// Get the video ID passed to the data-video attribute
const bgVideoID = document
  .querySelector(".js-background-video")
  .getAttribute("data-video");

// Set the player options
const playerOptions = {
  // Autoplay + mute has to be activated (value = 1) if you want to autoplay it everywhere
  // Chrome/Safari/Mobile
  autoplay: 1,
  mute: 1,
  autohide: 1,
  modestbranding: 1,
  rel: 0,
  showinfo: 0,
  controls: 0,
  disablekb: 1,
  enablejsapi: 1,
  iv_load_policy: 3,
  // For looping video you have to have loop to 1
  // And playlist value equal to your currently playing video
  loop: 1,
  playlist: bgVideoID,
};

// Get the video overlay, to mask it when the video is loaded
const videoOverlay = document.querySelector(".js-video-overlay");

// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
let ytPlayer;
function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player("yt-player", {
    width: "1280",
    height: "720",
    videoId: bgVideoID,
    playerVars: playerOptions,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();

  // Get the duration of the currently playing video
  const videoDuration = event.target.getDuration();

  // When the video is playing, compare the total duration
  // To the current passed time if it's below 2 and above 0,
  // Return to the first frame (0) of the video
  // This is needed to avoid the buffering at the end of the video
  // Which displays a black screen + the YouTube loader
  setInterval(function () {
    const videoCurrentTime = event.target.getCurrentTime();
    const timeDifference = videoDuration - videoCurrentTime;

    if (2 > timeDifference > 0) {
      event.target.seekTo(0);
    }
  }, 1000);
}

// When the player is ready and when the video starts playing
// The state changes to PLAYING and we can remove our overlay
// This is needed to mask the preloading
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    videoOverlay.classList.add("video-overlay-fadeOut");
  }
}

console.log(videoOverlay, "here");
