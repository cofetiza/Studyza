let tasks = {
  todo: [],
  ongoing: [],
  done: []
};
if (localStorage.tasks !== undefined) {
  tasks = JSON.parse(localStorage.tasks);
}

const refresh = () => {
  let render = '<div class="card-title"><b>To Do List</b></div>';
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
}

refresh();