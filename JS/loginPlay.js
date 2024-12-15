// 获取 DOM 元素
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseIcon = playPauseBtn.querySelector("i");
const musicImage = document.querySelector(".music-player img");

// 播放/暂停功能
playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play(); // 播放音乐
        playPauseIcon.classList.replace("bi-play-fill", "bi-pause-fill"); // 切换图标
        musicImage.style.animationPlayState = "running"; // 开始旋转
    } else {
        audioPlayer.pause(); // 暂停音乐
        playPauseIcon.classList.replace("bi-pause-fill", "bi-play-fill"); // 切换图标
        musicImage.style.animationPlayState = "paused"; // 暂停旋转
    }
});


