//Get our elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progressBar = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');
const player_button = document.querySelector('.player__button');
const volumeSlider = document.querySelector('input[name="volume"]');
const speedSlider = document.querySelector('input[name="playbackRate"]');
const skipbuttons = document.querySelectorAll('.player__button');
const fullscreenButton = document.getElementById('fullscreen__button');
const fullscreenIcon = fullscreenButton.querySelector('i');


let click = false;
//Build our functions
function tooglePlay(){
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    updateButton();
    /*if(video.paused){
        video.play();
    } else {
        video.pause();
    }*/
}
function updateButton(){
    const icon = video.paused ? '⏸︎' : '►';
    player_button.textContent = icon;
}

function skip(){
    video.currentTime = video.currentTime + 25;
}

function rewind(){
    video.currentTime = video.currentTime - 10;
}

function updateVolume(){
    video.volume = volumeSlider.value;
}

function updateSpeed(){
    video.playbackRate = speedSlider.value;
}

function updateProgress(){
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${progress}%`;
}

function scrub(e){
    if(click || e.type == 'click'){
        video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
    }
}

function toggleToFullscreen(){
    if(fullscreenIcon.classList.contains('fa-expand')){
        video.requestFullscreen().catch(err => {
            console.error(`Error al intentar entrar en pantalla completa: ${err.message}`);
          });
        fullscreenIcon.classList.remove('fas', 'fa-expand');
        fullscreenIcon.classList.add('fas', 'fa-compress');
        video.requestFullscreen();
    } else{
        document.exitFullscreen().catch(err => {
            console.error(`Error al salir de pantalla completa: ${err.message}`);
          });
        fullscreenIcon.classList.add('fas', 'fa-expand');
        fullscreenIcon.classList.remove('fas', 'fa-compress');
    }
}


//Hook up event listeners

player_button.addEventListener('click', tooglePlay);
video.addEventListener('click', tooglePlay);
video.addEventListener('timeupdate', updateProgress);
skipbuttons[2].addEventListener('click', skip);
skipbuttons[1].addEventListener('click', rewind);
volumeSlider.addEventListener('input', updateVolume);
speedSlider.addEventListener('input', updateSpeed);
progress.addEventListener('mousedown', () => click = true);
progress.addEventListener('mouseup', () => click = false);
progress.addEventListener('mousemove', scrub);
progress.addEventListener('click', scrub);

fullscreenButton.addEventListener('click', toggleToFullscreen);

