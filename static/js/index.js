var audio;
var duration;
var startTime, endTime;

function extractAudioInfo() {
  audio = document.getElementById('track');
  audio.addEventListener('loadedmetadata', function() {
    duration = Math.round(audio.duration * 1000);
    startTime = 0;
    endTime = duration - 100;
  });

  audio.addEventListener(
    'timeupdate',
    function() {
      var currentTimeMs = audio.currentTime * 1000;
      if (currentTimeMs >= endTime) {
        audio.currentTime = startTime / 1000;
      }
    },
    false,
  );
}

function setCurrentTime(id) {
  var currentTimeMs = Math.round(audio.currentTime * 1000);
  if (id == 'endTime') {
    document.getElementById(id).value = Math.max(
      document.getElementById('startTime').value,
      currentTimeMs,
    );
  } else if (id == 'startTime') {
    document.getElementById(id).value = Math.min(
      document.getElementById('endTime').value == ''
        ? duration
        : document.getElementById('endTime').value,
      currentTimeMs,
    );
  }
}

function loopWithinTimeRange() {
  startTime = document.getElementById('startTime').value;
  endTime = document.getElementById('endTime').value;
  if (startTime == '' || endTime == '') {
    startTime = 0;
    endTime = duration;
    alert('*Start time* and *end time* are not set');
    return;
  } else if (+startTime > +endTime) {
    alert('*Start time* should be lower than *end time*');
    document.getElementById('startTime').value = 0;
    document.getElementById('endTime').value = duration;
    return;
  }
  audio.currentTime = startTime / 1000;
  audio.play();
}

function addTime(id) {
  addedTime = +document.getElementById(id).value + 100;
  document.getElementById(id).value = Math.min(duration, addedTime);
}

function substractTime(id) {
  substractedTime = +document.getElementById(id).value - 100;
  document.getElementById(id).value = Math.max(0, substractedTime);
}

function resetTime(id) {
  if (id == 'startTime') {
    document.getElementById(id).value = 0;
  } else if (id == 'endTime') {
    document.getElementById(id).value = duration;
  }
}
