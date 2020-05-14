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

function msToTimeFormat(s) {

    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s- secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    var timeFormat = pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
    if (pad(hrs) != '00') {
        timeFormat = pad(hrs) + timeFormat
    }

    return timeFormat;
}

function TimeToMsFormat(s) {
    console.log(s);
    var time = s.split(':').reverse();

    result = 0;
    multiplier = [1000, 60000, 3600000];
    for(i=0; i<time.length; i++) {
        result += parseFloat(time[i]) * multiplier[i];
    }

    console.log(result);
}

function setCurrentTime(id) {
  var currentTimeMs = Math.round(audio.currentTime * 1000);
  timeFormat = msToTimeFormat(currentTimeMs);
  console.log(TimeToMsFormat(timeFormat));
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
