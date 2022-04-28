let video = document.getElementById("video-pr"); //Video principal
let controles = document.getElementById("controles"); //controles video
let playPauseBtn = document.getElementById("playPauseBtn"); //botaodeplayepause
let listvideo = document.querySelectorAll(".listvideo"); //lista de videos
let videoContainer = document.getElementById("container-video"); // container do video
let progressBar = document.getElementById("progressBar"); //barra de progresso
let inputProgressBar = document.getElementById("inputProgressBar"); //barra de progresso video
let currentTime = document.getElementById("currentTime"); //tempo video
let totalTime = document.getElementById("totalTime"); //total tempo video
let volumeIcon = document.getElementById("volumeIcon"); //icone do botao de volume
let inputVolumeBar = document.getElementById("inputVolumeBar"); //barra de volume
let volumeContainer = document.getElementById("volumeContainer"); //container do volume
let counter;

video.addEventListener("timeupdate", progressBarWidth)
nextVideo = [{
    src: "../video/aot.mp4",
    img: "../Imagens/aot.jpg"
}, {
    src: "../video/jjk.mp4",
    img: "../Imagens/jjk.jpg"
}, {
    src: "../video/mob.mp4",
    img: "../Imagens/mob.png"
}, {
    src: "../video/bc.mp4",
    img: "../Imagens/bc.jpg"
}, {
    src: "../video/akame.mp4",
    img: "../Imagens/akame.jpg"
}]

for (let i = 0; i < listvideo.length; i++) {
    listvideo[i].addEventListener("click", function(e) {
        video.setAttribute("src", nextVideo[i].src)
        video.setAttribute("poster", nextVideo[i].img)
    })
}

onload = function () {
video.addEventListener("timeupdate", progressBarWidth);
inputVolumeBar.addEventListener("change", volumeBarValue);
volumeContainer.addEventListener("mouseover", showVolumeBar);
video.addEventListener("play", countTime);
video.addEventListener("click", playStop);
};

//tempo video
function calcTime(value) {
    var sec = parseInt(value);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;
    if (hours == 0) {
        return minutes + ":" + (seconds >= 10 ? seconds : "0" + seconds);
    } else {
        return hours + ":" + (minutes >= 10 ? minutes : "0" + minutes) + ":" + (seconds >= 10 ? seconds : "0" + seconds);
    }
}


function countTime() {
    totalTime.innerHTML = calcTime(video.duration);
    counter = setInterval(function () {
        currentTime.innerHTML = calcTime(video.currentTime);
    }, 1000);
}

// Volume
function showVolumeBar() {
    inputVolumeBar.style.width = "80px";
    volumeContainer.addEventListener("mouseleave", function () {
        inputVolumeBar.style.width = "0px";
        volumeContainer.style.width = "";
    });
}

// barra de progresso

function progressBarWidth() {
    time = video.currentTime * (1000 / video.duration);
    width = time / 10;
    progressBar.style.width = `${width}%`;
}

function videoTime() {
   let timeCurrent = video.duration * (inputProgressBar.value / 1000);
    video.currentTime = timeCurrent;
}

//opacidade dos comandos
function aparecer() {
   controles.style.opacity = "1"
   controles.style.transition = "0.5s"
}

 function sumir() {
    controles.style.opacity = "0"
    controles.style.transition = "0.5s"
}

// play e pause no botao, e na tela 
function playPauseTroca() {
    if (video.paused) {
        playPauseBtn.setAttribute("src", "../Imagens/pausa.png")
        video.play()
    } else {
        playPauseBtn.setAttribute("src", "../Imagens/botao-play.png")
        video.pause()
    }
}

function playPause() {
    if (video.paused) {
        video.play()
    } else
        video.pause()
}

// funções dos botões
function voltarTempo() {
    video.currentTime -= 10
}

function avanTempo() {
    video.currentTime += 10
}

function rapido() {
    video.playbackRate += 0.2
}

function lento() {
    video.playbackRate -= 0.2
}

function telaCheia() {
    video.requestFullscreen()
}

// volume 
function volumeBarValue() {
    volume = inputVolumeBar.value / 100;
    video.volume = volume;
    if (video.volume === 0) {
        volumeIcon.setAttribute("src", "../Imagens/no_volume.png")
    } else if (video.volume <= 0.3) {
        volumeIcon.setAttribute("src", "../Imagens/sound_baixo.png")

    } else if (video.volume <= 0.6) {
        volumeIcon.setAttribute("src", "../Imagens/vol_med.png")

    } else {
        volumeIcon.setAttribute("src", "../Imagens/sound.png")
    }
}
