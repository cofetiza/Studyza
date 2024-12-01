document.getElementById('name').value = localStorage.name;
document.getElementById('grade').value = localStorage.grade;

let focus = [];
if (localStorage.focus !== undefined) {
  focus = JSON.parse(localStorage.focus);
}
let schedule = [];
if (localStorage.schedule !== undefined) {
  schedule = JSON.parse(localStorage.schedule);
}
let tasks = {
  todo: [],
  ongoing: [],
  done: []
};
if (localStorage.tasks !== undefined) {
  tasks = JSON.parse(localStorage.tasks);
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

const durations = () => {
  let t = 0;
  focus.forEach(r => {
    t += r.duration;
  });
  let j = digit(Math.floor(t/3600000));
  let m = digit(Math.floor(t/60000 % 60));
  let d = digit(Math.floor(t/1000 % 60));
  return `${j}:${m}:${d}`;
}

let ren = `
  <div class="card-title"><b>Statistics</b></div>
  <div class="vertical-space"></div>
  <div class="input-label"><b>Study hours:</b> ${durations()}</div>
  <div class="vertical-space"></div>
  <div class="input-label"><b>Class intensity:</b> `;

if (schedule.length === 0) {
  ren += `no class.`;
}
else if (schedule.length === 1) {
  ren += `1 class/week.`;
}
else {
  ren += `${schedule.length} classes/week.`;
}

ren += `</div>
  <div class="vertical-space"></div>
  <div class="input-label">
  <b>Task count:</b>
  <ul>
    <li>${tasks.todo.length} to do,</li>
    <li>${tasks.ongoing.length} ongoing,</li>
    <li>${tasks.done.length} done.</li>
  </ul>
  </div>
  <div class="input-label"><b>Exam count:</b> `;

if (exam.length === 0) {
  ren += `no upcoming exam.`;
}
else if (exam.length === 1) {
  ren += `1 upcoming exam.`;
}
else {
  ren += `${exam.length} upcoming exams.`;
}
  
ren += `</div>
  <div class="vertical-space"></div>`;

document.getElementById('stat').innerHTML = ren;
  
const save = () => {
  let name = document.getElementById('name').value;
  let grade = document.getElementById('grade').value;
  if (name === "") {
    alert("Full name can not empty");
    return;
  }
  if (Math.floor(grade) != Math.ceil(grade)) {
    alert("Grade must be integer.");
    return;
  }
  if (grade < 7) {
    alert("Grade can not less than 7.");
    return;
  }
  if (grade > 12) {
    alert("Grade can not more than 12.");
    return;
  }
  localStorage.name = name;
  localStorage.grade = grade;
  alert("Profile updated.");
}