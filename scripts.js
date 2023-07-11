// Displaying the notification

function displayNotification () {
    if (Notification.permission === "granted") {
        var notification = new Notification("Hello!", {
            body: "Rest your eyes!",
        });

        // TODO: add sound
        // Play sound
        // var audio = new Audio("path_to_sound_file.mp3");
        // audio.play();
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
            display.textContent = "Timer finished!";
        }
    };

    worker.postMessage(duration);
}



// Display the timer in the DOM
var display = document.getElementById("timer");


//
let button = document.querySelector(".button");
// Set the timer duration to 20 minutes (in seconds)
var twentyMinutes = 20 * 60;

button.addEventListener('click', () => {
    // Check if the browser supports notifications
    if ("Notification" in window) {
        // Request permission to display notifications
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                // Schedule the first notification
                // displayNotification();

                // Schedule subsequent notifications every 20 minutes
                setTimeout(displayNotification, 20 * 60 * 1000);
                startTimer(twentyMinutes, display);
            }
        });
    }
})


// Countdown code


