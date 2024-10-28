const datetime = document.getElementById('datetime');
const countdownDisplay = document.getElementById('countdownDisplay');
const startButton = document.getElementById('startTimer');
let countdownInterval;

function setMinDateTime() {
    const now = new Date();
    const localISOTime = now.toISOString().slice(0, 16);
    datetime.min = localISOTime;
}
datetime.addEventListener('focus', setMinDateTime);

function startFunction() {
    const target = new Date(datetime.value);
    const now = new Date();
    
    if (target <= now) {
        alert('Please select a future date and time.');
        return;
    }

    setCookie('countdownTarget', target.toISOString(), 1);
    
    if (countdownInterval) {
       clearInterval(countdownInterval);
    }

    startCountdown(target);   
}

function startCountdown(target) {
    countdownInterval= setInterval(function() {
       const currentTime = new Date();
       let remainingTime = Math.floor((target - currentTime)/1000);
       
       if(remainingTime <= 0){
           clearInterval(countdownInterval);
           countdownDisplay.innerHTML="Time's Up!!";
           countdownDisplay.style="color:red";
        }
        else {
            const days = Math.floor(remainingTime / (3600 * 24));
            remainingTime %= (3600 * 24);
            const hours = Math.floor((remainingTime / 3600));
            remainingTime %= 3600;
            const minutes = Math.floor((remainingTime / 60));
            const seconds = Math.floor((remainingTime % 60));
            
            countdownDisplay.innerHTML = `Time Remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;
            countdownDisplay.style="color:black";
        }
    }, 1000);
}

// Cookie Management
function setCookie(name, value, expiredays){
    const d = new Date();
    d.setTime(d.getTime() + (expiredays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name){
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray= decodedCookie.split(";");
    for(let i=0; i < cookieArray.length; i++){
        let cookie= cookieArray[i];
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function initializationFromCookie() {
    const targetDateTime = getCookie('countdownTarget');
    if (targetDateTime) {
        const targetDate = new Date(targetDateTime);
        if (targetDate > new Date()) {
            datetime.value = targetDate.toISOString().slice(0, 16);
            startCountdown(targetDate);
        } else {
            countdownDisplay.innerHTML = "Time's Up!!";
        }
    }
}

startButton.addEventListener('click', startFunction);
window.onload = function () {
    initializationFromCookie();
};
