// 获取 DOM 元素
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const playPauseIcon = playPauseBtn.querySelector("i");
const musicImage = document.querySelector(".music-player img");

const music = new Audio('./audio/login.mp3');

// 获取登录按钮和表单
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");

// 登录按钮点击事件
loginBtn.addEventListener("click", function () {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        localStorage.setItem('isLoggedIn', 'true');
        onLoginSuccess(); // 登录成功后执行函数
    } else {
        alert("请输入账号和密码！");
    }
});

// 登录成功后的处理
function onLoginSuccess() {
    // 设置本地存储，表示已登录
    localStorage.setItem('isLoggedIn', 'true');
    // 跳转回主页面
    window.location.href = 'index.html'; // 假设主页面是index.html
}


window.onload = function () {
   audioPlayer.play().catch(error => {
        console.log("自动播放被阻止，显示播放按钮");
        // 显示播放按钮，允许用户手动点击播放
        const playButton = document.getElementById("play-pause-btn");
        playButton.style.display = "block";  // 显示按钮
    });
    playPauseIcon.classList.replace("bi-play-fill", "bi-pause-fill"); // 切换图标
    musicImage.style.animationPlayState = "running"; 
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
}
