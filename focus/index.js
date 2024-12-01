let focus = [];
if (localStorage.focus !== undefined) {
  focus = JSON.parse(localStorage.focus);
}

const record = () => {
  let ren = `<table><tr><th>Date</th><th>Begin</th><th>End</th><th>Duration</th></tr>`;
  focus.forEach(r => {
    ren += `<tr><td>${convertDate(r.begin)}</td><td>${convert(r.begin)}</td><td>${convert(r.end)}</td><td>${display(r.duration)}</td></tr>`;
  });
  ren += `</table>`;
  document.getElementById('records').innerHTML = ren;
}

let status = 'stop'; // stop, pause, play
let begin = 0;
let start = 0;
let pause = 0;
let timeout;

const digit = (x) => {
  if (x < 10) {
    return `0${x}`;
  }
  return x;
}

const convertDate = (t) => {
  let s = new Date(t);
  return s.toLocaleDateString("en-GB");
}

const convert = (t) => {
  let s = new Date(t);
  return s.toTimeString().substring(0,8);
}

const display = (t) => {
  let j = digit(Math.floor(t/3600000));
  let m = digit(Math.floor(t/60000 % 60));
  let d = digit(Math.floor(t/1000 % 60));
  return `${j}:${m}:${d}`;
}

const refresh = async () => {
  if (status === 'play') {
    let t = Date.now() - start;
    document.getElementById('timer').innerHTML = `${display(t)}`;
    timeout = setTimeout(refresh, 1000 - t % 1000);
  }
}

const play = () => {
  if (status === 'stop') {
    status = 'play';
    document.getElementById('play').innerHTML = 'Pause';
    document.getElementById('stop').style = '';
    begin = start = Date.now();
    refresh();
  }
  else if (status === 'pause') {
    status = 'play';
    document.getElementById('play').innerHTML = 'Pause';
    start = Date.now() - pause;
    refresh();
  }
  else if (status === 'play') {
    status = 'pause';
    document.getElementById('play').innerHTML = 'Continue';
    pause = Date.now() - start;
  }
}

const stop = () => {
  status = 'stop';
  document.getElementById('play').innerHTML = 'Start';
  document.getElementById('stop').style = 'display:none';
  focus.push({
    'begin': begin,
    'end': Date.now(),
    'duration': Date.now() - start
  });
  localStorage.focus = JSON.stringify(focus);
  record();
}

record();