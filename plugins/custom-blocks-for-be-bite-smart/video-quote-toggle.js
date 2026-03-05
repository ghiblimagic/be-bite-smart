document.addEventListener("DOMContentLoaded", function () {
  const videoBlocks = document.querySelectorAll(".video-quote-block");

  videoBlocks.forEach((block) => {
    const thumbnail = block.querySelector(".video-thumbnail");
    const videoPlayer = block.querySelector(".video-player");
    const playButton = block.querySelector(".play-button");
    const watchButton = block.querySelector(".video-quote-watch-button");
    const vimeoId = block.dataset.vimeoId;

    // Load video function
    function loadVideo() {
      if (!vimeoId) {
        console.error("No Vimeo ID found");
        return;
      }

      const iframe = document.createElement("iframe");
      iframe.src = `https://player.vimeo.com/video/${vimeoId}?autoplay=1`;
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;

      videoPlayer.innerHTML = "";
      videoPlayer.appendChild(iframe);
      thumbnail.classList.add("hidden");
      isPlaying = true;
    }

    // Play button click
    if (playButton) {
      playButton.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        loadVideo();
      });
    }

    // Watch button click
    if (watchButton) {
      watchButton.addEventListener("click", function (e) {
        e.preventDefault();
        loadVideo();
      });
    }

    // Click anywhere on thumbnail to play
    if (thumbnail) {
      thumbnail.addEventListener("click", function (e) {
        e.preventDefault();
        loadVideo();
      });
    }
  });
});
