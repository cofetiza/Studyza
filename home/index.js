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

const refresh = () => {
  let render = '<div class="card-title"><b>Classes</b></div>';
  schedule.forEach((task,id) => {
    render += `
      <div class="vertical-space"></div>
      <div class="task-container" onClick="select(${id})">
        <div class="task-item">${task.title}</div>
      </div>
    `;
  });
  document.getElementById('classes').innerHTML = render;
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
  document.getElementById('exams').innerHTML = render;
}

refresh();