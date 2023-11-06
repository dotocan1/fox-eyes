// Displaying the notification

function displayNotification () {
    return new Promise((resolve, reject) => {
        {
            if (Notification.permission === "granted") {
                var notification1 = new Notification("Break time!", {
                    body: "Rest your eyes!",
                    icon: "./exclamation-mark.png"
                });

                // TODO: add sound
                // Play sound
                var audio = new Audio("./ring-sound.mp3");
                audio.play();
                timerRunning = false;
                resolve();
            }
        }
    })
}

function displayBlinkNotification () {
    if (Notification.permission === "granted") {
        var notification2 = new Notification("Start blinking!", {
            body: "Blink!",
            icon: "./fox-eyes.png"
        });
    }
}

function getRandomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Timer function 

function startTimer (duration, display) {
    var worker = new Worker("./timer-worker.js");

    worker.onmessage = async function (event) {
        var timer = event.data;
        console.log(timer)
        if (timer % 300 == 0) {
            console.log("Half a minute has passed!");
            displayBlinkNotification();
        }

        var minutes = parseInt(timer / 60, 10);
        var seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (timer <= 0) {
            await displayNotification();
            setTimeout(function () {
                alert("Rest your eyes!");
            }, 5000); // Delay the alert by 1 second (adjust as needed)
            worker.terminate();
            display.textContent = "Rest your eyes then start the timer again!";
        }

    };

    worker.postMessage(duration);
}



// Display the timer in the DOM
var display = document.getElementById("timer");
let timerRunning = false;

// Declare timer interval
twentyMinutes = 20 * 60;
//
let button = document.querySelector(".button");
button.addEventListener('click', () => {
    // if the timer is already runnign
    if (timerRunning) {
        alert("Timer is already running!")
        console.log('hey')
    }
    // Check if the browser supports notifications
    else if ("Notification" in window) {
        // console.log('hey1')
        // Request permission to display notifications
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                // Schedule the first notification
                // displayNotification();

                timerRunning = true;
                // Schedule subsequent notifications every 20 minutes
                startTimer(twentyMinutes, display);
            }
        });
    }
})


// Countdown code


