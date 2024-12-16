const music = new Audio('./audio/1.mp3');
// 这是外链的 JavaScript 文件
// console.log("外链 JavaScript 成功运行！");

//创建数组

const songs = [
    {
        id: '1',
        songName:`Lemon <br>
        <div class="subtitle">米津玄師</div>`,
        poster:"./image/1.png"
    },
    {
        id: '2',
        songName:`雅俗共赏 <br>
        <div class="subtitle"> 许嵩</div>`,
        poster:"./image/2.png"
    },
    {
        id: '3',
        songName:`天外来物 <br>
        <div class="subtitle">薛之谦</div>`,
        poster:"./image/3.png"
    },
    {
        id: '4',
        songName:`轻舟 <br>
        <div class="subtitle">张杰</div>`,
        poster:"./image/4.png"
    },
    {
        id: '5',
        songName:`闪电 <br>
        <div class="subtitle">汪苏泷</div>`,
        poster:"./image/5.png"
    },
    {
        id: '6',
        songName:`少年与海 <br>
        <div class="subtitle">邓紫棋</div>`,
        poster:"./image/6.png"
    },
    {
        id: '7',
        songName:`喂 <br>
        <div class="subtitle">单依纯</div>`,
        poster:"./image/7.png"
    },
    {
        id: '8',
        songName:`安河桥 <br>
        <div class="subtitle">宋东野</div>`,
        poster:"./image/8.png"
    },
    {
        id: '9',
        songName:`奢香夫人 <br>
        <div class="subtitle">凤凰传奇</div>`,
        poster:"./image/9.png"
    },
    {
        id: '10',
        songName:`若月亮没来 <br>
        <div class="subtitle">王宇宙Leto</div>`,
        poster:"./image/10.png"
    },
    {
        id: '11',
        songName:`小美满 <br>
        <div class="subtitle">周深</div>`,
        poster:"./image/11.png"
    },
    {
        id: '12',
        songName:`向云端 <br>
        <div class="subtitle">小霞/海洋Bo</div>`,
        poster:"./image/12.png"
    },
    {
        id: '13',
        songName:`乌梅子酱 <br>
        <div class="subtitle">李荣浩</div>`,
        poster:"./image/13.png"
    },
    {
        id: '14',
        songName:`小城夏天 <br>
        <div class="subtitle">LBi利比</div>`,
        poster:"./image/14.png"
    },
    {
        id: '15',
        songName:`Fool For You <br>
        <div class="subtitle">KASTRA</div>`,
        poster:"./image/15.png"
    },
    {
        id: '16',
        songName:`Take Me Hand <br>
        <div class="subtitle">DAISHI DANCE</div>`,
        poster:"./image/16.png"
    },
    {
        id: '17',
        songName:`如约而至 <br>
        <div class="subtitle">许嵩</div>`,
        poster:"./image/17.png"
    },
    {
        id: '18',
        songName:`Peter Pan Was Right <br>
        <div class="subtitle">Anson Seabra</div>`,
        poster:"./image/18.png"
    },
    {
        id: '19',
        songName:`LADY <br>
        <div class="subtitle">米津玄師</div>`,
        poster:"./image/19.png"
    },
    
]

// 改变图片顺序内容
Array.from(document.getElementsByClassName('songItem')).forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].poster 
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName 
});



let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',() => {
    if (music.paused||music.currentTime<=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');//播放器动画条启动
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');//播放器动画条关闭
    }
})


//列表播放准备
const makeAllplays = () => {
    Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
        element.classList.add('bi-play-circle-fill');//更改图标
        element.classList.remove('bi-pause-circle-fill');
    })
}

// 正在播放背景
const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
        element.style.background = "rgb(105,105,170,0)"; // 清除高亮
    });
};


let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playlistPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id; // 获取点击的歌曲 ID
        makeAllplays(); // 重置所有播放图标
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');

        music.src = `./audio/${index}.mp3`; // 更新音频源
        poster_master_play.src = `./image/${index}.png`; // 更新封面图片
        music.play(); // 播放音乐

        let song_title = songs.filter((ele) => {
            return ele.id == index;
        });
        song_title.forEach(ele => {
            let { songName } = ele;
            title.innerHTML = songName; // 更新底部播放器标题
        });

        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2'); // 播放器动画条启动

        music.addEventListener('ended', () => {
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2'); // 播放器动画条关闭
        });

        makeAllBackgrounds(); // 重置背景
        Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105,105,170,0.1)"; // 设置当前播放的背景
    });
});

//变更底部时间
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur / 60);
    let sec = Math.floor(music_dur % 60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;
    
    let min1 = Math.floor(music_curr / 60);
    let sec1 = Math.floor(music_curr % 60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    //进度条实时更新
    let progressbar = parseInt((music.currentTime / music.duration) * 100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width=`${seekbar}%`
    dot.style.left=`${seekbar}%`
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration / 100;
})

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if (vol.value==0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value>0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value>50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a / 100;
})

// 上一首下一首按键

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index<1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `./audio/${index}.mp3`; // 更新音频源
    poster_master_play.src = `./image/${index}.png`; // 更新封面图片
    music.play(); // 播放音乐

    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });
    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName; // 更新底部播放器标题
    });

    makeAllplays();

    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2'); // 播放器动画条启动

    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105,105,170,0.1)"; // 设置当前播放的背景
})

next.addEventListener('click', () => {
    index -= 0;
    index += 1;
    if (index>Array.from(document.getElementsByClassName('songItem')).length ) {
        index = 1;
    }
    music.src = `./audio/${index}.mp3`; // 更新音频源
    poster_master_play.src = `./image/${index}.png`; // 更新封面图片
    music.play(); // 播放音乐

    let song_title = songs.filter((ele) => {
        return ele.id == index;
    });
    song_title.forEach(ele => {
        let { songName } = ele;
        title.innerHTML = songName; // 更新底部播放器标题
    });

    makeAllplays();

    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2'); // 播放器动画条启动

    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index - 1}`].style.background = "rgb(105,105,170,0.1)"; // 设置当前播放的背景
})

//左右滚动
let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
})

let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', () => {
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', () => {
    item.scrollLeft += 330;
})

