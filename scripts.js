// Displaying the notification

function displayNotification () {
    if (Notification.permission === "granted") {
        var notification = new Notification("Hello!", {
            body: "Rest your eyes!",
            icon: "./fox-eyes.png"
        });

        // TODO: add sound
        // Play sound
        var audio = new Audio("./ring-sound.mp3");
        audio.play();
        timerRunning = false;
        alert("Rest your eyes!");
    }
}

// Timer function 

function startTimer (duration, display) {
    var worker = new Worker("./timer-worker.js");

    worker.onmessage = function (event) {
        var timer = event.data;
        var minutes = parseInt(timer / 60, 10);
        var seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (timer <= 0) {
            worker.terminate();
            displayNotification();
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
    if(timerRunning){
        alert("Timer is already running!")
        console.log('hey')
    }
    // Check if the browser supports notifications
    else if ("Notification" in window) {
        console.log('hey1')
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


