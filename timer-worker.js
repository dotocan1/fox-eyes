var timer;

function startTimer(duration) {
  timer = duration;

  var interval = setInterval(function () {
    timer--;

    if (timer <= 0) {
      clearInterval(interval);
    }

    self.postMessage(timer);
  }, 1000);
}

self.onmessage = function (event) {
  var duration = event.data;
  startTimer(duration);
};
