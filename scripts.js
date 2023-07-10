function displayNotification () {
    if (Notification.permission === "granted") {
        var notification = new Notification("Hello!", {
            body: "Rest your eyes!",
        });

        // Play sound
        var audio = new Audio("path_to_sound_file.mp3");
        audio.play();
    }
}
let button = document.querySelector(".button");

button.addEventListener('click', () => {
    // Check if the browser supports notifications
    if ("Notification" in window) {
        // Request permission to display notifications
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                // Schedule the first notification
                // displayNotification();

                // Schedule subsequent notifications every 20 minutes
                setInterval(displayNotification, 20 * 60 * 1000);
            }
        });
    }
})