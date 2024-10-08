let tasks = {
  todo: []
};
if (localStorage.tasks !== undefined) {
  tasks = JSON.parse(localStorage.tasks);
}

const refresh = () => {
  let render = '';
  tasks.todo.forEach(task => {
    render += `<div>${task.title}</div>`;
  });
  document.getElementById('todo').innerHTML = render;
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
  console.log(deadline);
  if (deadline === "") {
    alert("Deadline can not empty.");
    return;
  }
  tasks.todo.push({
    title: title,
    description: description,
    deadline: deadline
  });
  localStorage.tasks = JSON.stringify(tasks);
  refresh();
  alert("Task created.");
}

refresh();