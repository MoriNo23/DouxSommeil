const play = document.getElementById("play");
const pause = document.getElementById("pause");
const stop = document.getElementById("stop");
const progressBar = document.querySelector(".progress-bar");
const starElement1 = document.querySelector('.star-container div:nth-child(1)');
const starElement6 = document.querySelector('.star-container div:nth-child(6)');
const starsLeft = document.querySelector(".star-left div");

const audio = new Audio();

let crt = 0;
const playSong = () => {
    audio.removeEventListener("timeupdate", updateProgressBar); // Eliminar el evento anterior
    audio.src = "src/music.mp3";
    audio.currentTime = crt;
    audio.play();

    // Actualizar la barra de progreso mientras se reproduce
    audio.addEventListener("timeupdate", updateProgressBar);
}

const updateProgressBar = () => {
    // Calcular el porcentaje de progreso (0 a 100)
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    if (Math.floor(progressPercent) === 12) {
        starElement1.style.animationPlayState = 'running, running';
        starElement6.style.animationPlayState = 'running, running';

        const styleElement = document.createElement('style');
        styleElement.textContent = `
.star-left div  {
    animation: star-left2 3s ease-out both !important;
}
`;

        // 3. Añadir el <style> al <head> del documento
        document.head.appendChild(styleElement);
    }
    // Aplicar el ancho a la barra de progreso
    progressBar.style.width = `${progressPercent}%`;
}

const pauseSong = () => {
    crt = audio.currentTime;
    audio.pause();
}

const stopSong = () => {
    audio.pause();
    crt = 0; // Reiniciar al inicio
    progressBar.style.width = "0%"; // Resetear la barra de progreso
}

play.addEventListener("click", playSong);
pause.addEventListener("click", pauseSong);
stop.addEventListener("click", stopSong);


