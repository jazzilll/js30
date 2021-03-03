let countdown;
const timeLeft = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function addTimer(e) {
    console.dir(e.target.dataset.time);
    const seconds = e.target.dataset.time;
    timer(seconds);
}

function timer(seconds) {
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;

    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    timeLeft.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const adjustedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`
    endTime.textContent = `Be back at ${adjustedHour}:${adjustedMinutes}`

}
buttons.forEach(button => {
    button.addEventListener('click', addTimer);
});

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const minutes = parseInt(e.target.minutes.value);
    timer(minutes * 60);
});