let tasks = {
  todo: [],
  ongoing: [],
  done: []
};
if (localStorage.tasks !== undefined) {
  tasks = JSON.parse(localStorage.tasks);
}
let selectId = ["none"];

const select = (x,y) => {
  selectId = [x,y];
  refresh();
}

const refresh = () => {
  localStorage.tasks = JSON.stringify(tasks);
  let render = '';
  tasks.todo.forEach((task,id) => {
    if (selectId[0] === 'todo' && selectId[1] === id) {
      render += `
        <div class="vertical-space"></div>
        <div class="task-container">
          <div class="task-item">${task.description}</div>
          <button class="button-do"onClick="move('todo',${id},'ongoing')">Do now</button>
           <button class="button-cancel"onClick="move('todo',${id},'none')">Cancel task</button>
        </div>
      `;
    }
    else {
      render += `
        <div class="vertical-space"></div>
        <div class="task-container" onClick="select('todo',${id})">
          <div class="task-item">${task.title}</div>
        </div>
      `;
    }
  });
  document.getElementById('todo').innerHTML = render;
  render = '';
  tasks.ongoing.forEach((task,id) => {
    if (selectId[0] === 'ongoing' && selectId[1] === id) {
      render += `
        <div class="vertical-space"></div>
        <div class="task-container">
          <div class="task-item">${task.description}</div>
          <button onClick="move('ongoing',${id},'todo')">Cancel task</button>
          <button onClick="move('ongoing',${id},'done')">Finish</button>
        </div>
      `;
    }
    else {
      render += `
        <div class="vertical-space"></div>
        <div class="task-container" onClick="select('ongoing',${id})">
          <div class="task-item">${task.title}</div>
        </div>
      `;
    }
  });
  document.getElementById('ongoing').innerHTML = render;
  render = '';
  tasks.done.forEach((task,id) => {
    if (selectId[0] === 'done' && selectId[1] === id) {
      render += `
        <div class="vertical-space"></div>
        <div class="task-container">
          <div class="task-item">${task.description}</div>
          <button onClick="move('done',${id},'ongoing')">Continue</button>
          <button onClick="move('done',${id},'none')">Remove</button>
        </div>
      `;
    }
    else {
      render += `
        <div class="vertical-space"></div>
        <div class="task-container" onClick="select('done',${id})">
          <div class="task-item">${task.title}</div>
        </div>
      `;
    }
  });
  document.getElementById('done').innerHTML = render;
}

const move = (a,id,b) => {
  if (b !== 'none') {
    tasks[b].push(tasks[a][id]);
  }
  tasks[a].splice(id,1);
  selectId = ['none'];
  refresh();
}

const create = () => {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  let deadline = document.getElementById('deadline').value;
  if (title === "") {
    alert("Title can not empty.");
    return;
  }
  if (description === "") {
    alert("Description can not empty.");
    return;
  }
  if (deadline === "") {
    alert("Deadline can not empty.");
    return;
  }
  tasks.todo.push({
    title: title,
    description: description,
    deadline: deadline
  });
  refresh();
  alert("Task created.");
}

refresh();