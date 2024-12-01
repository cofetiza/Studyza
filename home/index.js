const nextWeek = (d) => {
  let s = (new Date(Date.parse(d) + 7*24*60*60*1000)).toLocaleDateString(undefined);
  return s;
}

let focus = [];
if (localStorage.focus !== undefined) {
  focus = JSON.parse(localStorage.focus);
}
let tasks = {
  todo: [],
  ongoing: [],
  done: []
};
if (localStorage.tasks !== undefined) {
  tasks = JSON.parse(localStorage.tasks);
}
let schedule = [];
if (localStorage.schedule !== undefined) {
  schedule = JSON.parse(localStorage.schedule);
  for (let i = 0; i < schedule.length; i++) {
    while (Date.parse(schedule[i].date+" "+schedule[i].end) < Date.now()) {
      schedule[i].date = nextWeek(schedule[i].date);
    }
  }
}
let exam = [];
if (localStorage.exam !== undefined) {
  exam = JSON.parse(localStorage.exam);
  for (let i = 0; i < exam.length; i++) {
    if (Date.parse(exam[i].date+" "+exam[i].end) < Date.now()) {
      exam.splice(i,1);
      i--;
    }
  }
}

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

const refresh = () => {
  // Focus
  let render = '<div class="card-title"><b>Study Records</b></div>';
  render += '<div class="vertical-space"></div>';
  render += `<table><tr><th>Date</th><th>Duration</th></tr>`;
  focus.forEach(r => {
    render += `<tr><td>${convertDate(r.begin)}</td><td>${display(r.duration)}</td></tr>`;
  });
  render += `</table>`;
  render += '<div class="vertical-space"></div>';
  document.getElementById('records').innerHTML = render;
  // Classes
  render = '<div class="card-title"><b>Classes</b></div>';
  schedule.forEach((task,id) => {
    render += `
      <div class="vertical-space"></div>
      <div class="task-container">
        <div class="task-item">${task.title}</div>
      </div>
    `;
  });
  render += '<div class="vertical-space"></div>';
  document.getElementById('class').innerHTML = render;
  // Tasks
  render = '<div class="card-title"><b>To Do List</b></div>';
  tasks.todo.forEach((task,id) => {
    render += `
      <div class="vertical-space"></div>
      <div class="task-container">
        <div class="task-item">${task.title}</div>
      </div>
    `;
  });
  render += `
    <div class="vertical-space"></div>
    <div class="card-title"><b>On going</b></div>`;
  tasks.ongoing.forEach((task,id) => {
    render += `
      <div class="vertical-space"></div>
      <div class="task-container">
        <div class="task-item">${task.title}</div>
      </div>
    `;
  });
  render += `
    <div class="vertical-space"></div>
    <div class="card-title"><b>Done. Yay!</b></div>`;
  tasks.done.forEach((task,id) => {
    render += `
      <div class="vertical-space"></div>
      <div class="task-container">
        <div class="task-item">${task.title}</div>
      </div>
    `;
  });
  render += '<div class="vertical-space"></div>';
  document.getElementById('ongoing').innerHTML = render;
  // Exam
  render = '<div class="card-title"><b>Upcoming Exam</b></div>';
  exam.forEach((task,id) => {
    render += `
      <div class="vertical-space"></div>
      <div class="task-container" onClick="select(${id})">
        <div class="task-item">${task.title}</div>
      </div>
    `;
  });
  render += '<div class="vertical-space"></div>';
  document.getElementById('exams').innerHTML = render;
}

refresh();