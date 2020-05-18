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
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  var timeFormat = pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
  if (pad(hrs) != '00') {
    timeFormat = pad(hrs) + timeFormat;
  }

  return timeFormat;
}

function timeToMsFormat(s) {
  var time = s.split(':').reverse();

  result = 0;
  multiplier = [1000, 60000, 3600000];
  for (i = 0; i < time.length; i++) {
    result += parseFloat(time[i]) * multiplier[i];
  }

  return result;
}

function setCurrentTime(id) {
  var currentTimeMs = Math.round(audio.currentTime * 1000);
  if (id == 'endTime') {
    formattedStartTime = '00:00.00';
    if (document.getElementById('startTime').value != '') {
        formattedStartTime = document.getElementById('startTime').value;
    }

    msStartTime = timeToMsFormat(formattedStartTime);
    msEndTime = Math.max(msStartTime, currentTimeMs);
    formattedEndTime = msToTimeFormat(msEndTime);

    document.getElementById(id).value = formattedEndTime;
  } else if (id == 'startTime') {
    msEndTime = duration;
    if (document.getElementById('endTime').value != '') {
      formattedEndTime = document.getElementById('endTime').value;
      msEndTime = timeToMsFormat(formattedEndTime);
    }

    msStartTime = Math.min(msEndTime, currentTimeMs);
    console.log(msEndTime, currentTimeMs);
    formattedStartTime = msToTimeFormat(msStartTime);

    document.getElementById(id).value = formattedStartTime;
  }
}

function loopWithinTimeRange() {
  startTime = document.getElementById('startTime').value;
  endTime = document.getElementById('endTime').value;
  if (startTime == '' || endTime == '') {
    startTime = 0;
    formattedStartTime = msToTimeFormat(startTime);
    endTime = duration;
    formattedEndTime = msToTimeFormat(endTime);
    document.getElementById('startTime').value = formattedStartTime;
    document.getElementById('endTime').value = formattedEndTime;
    alert('*Start time* and *end time* are not set');
    return;
  }

  startTime = timeToMsFormat(startTime)
  endTime = timeToMsFormat(endTime)
  audio.currentTime = startTime / 1000;
  audio.play();
}

function addTime(id) {
  msTime = timeToMsFormat(document.getElementById(id).value);
  addedTime = +msTime + 100;
  newMsTime = Math.min(duration, addedTime);
  formattedTime = msToTimeFormat(newMsTime);
  document.getElementById(id).value = formattedTime;
}

function substractTime(id) {
  msTime = timeToMsFormat(document.getElementById(id).value);
  substractedTime = +msTime - 100;
  newMsTime = Math.max(0, substractedTime);
  formattedTime = msToTimeFormat(newMsTime);
  document.getElementById(id).value = formattedTime;
}

function resetTime(id) {
  if (id == 'startTime') {
    formattedStartTime = msToTimeFormat('0');
    document.getElementById(id).value = formattedStartTime;
  } else if (id == 'endTime') {
    formattedEndTime = msToTimeFormat(duration);
    document.getElementById(id).value = formattedEndTime;
  }
}
