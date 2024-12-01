const nextWeek = (d) => {
  let s = (new Date(Date.parse(d) + 7*24*60*60*1000)).toLocaleDateString(undefined);
  return s;
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
let selectId = -1;

const select = (x) => {
  selectId = x;
  refresh();
}

const refresh = () => {
  localStorage.schedule = JSON.stringify(schedule);
  let render = '';
  schedule.forEach((task,id) => {
    if (selectId === id) {
      render += `
        <div class="vertical-space"></div>
        <div class="task-container">
          <div class="task-item">${task.date} from ${task.begin} to ${task.end}</div>
          <button class="button-do" onClick="edit(${id})">Edit</button>
           <button class="button-cancel" onClick="remove(${id})">Remove</button>
        </div>
      `;
    }
    else {
      render += `
        <div class="vertical-space"></div>
        <div class="task-container" onClick="select(${id})">
          <div class="task-item">${task.title}</div>
        </div>
      `;
    }
  });
  document.getElementById('classes').innerHTML = render;
}

const remove = (id) => {
  schedule.splice(id,1);
  selectId = -1;
  refresh();
}

const edit = (id) => {
  document.getElementById('create').style = 'background:#f59dc0;display:none';
  document.getElementById('edit').style = 'background:#f59dc0;';
  document.getElementById('title-edit').value = schedule[id].title;
  document.getElementById('date-edit').value = schedule[id].date;
  document.getElementById('begin-edit').value = schedule[id].begin;
  document.getElementById('end-edit').value = schedule[id].end;
  selectId = -1;
  refresh();
}

const save = () => {
  document.getElementById('create').style = 'background:#f59dc0;';
  document.getElementById('edit').style = 'background:#f59dc0;display:none';
}

const create = () => {
  let title = document.getElementById('title').value;
  let date = document.getElementById('date').value;
  let begin = document.getElementById('begin').value;
  let end = document.getElementById('end').value;
  if (title === "") {
    alert("Title can not empty.");
    return;
  }
  if (date === "") {
    alert("Date can not empty.");
    return;
  }
  if (begin === "") {
    alert("Begin time can not empty.");
    return;
  }
  if (end === "") {
    alert("End time can not empty.");
    return;
  }
  schedule.push({
    title: title,
    date: date,
    begin: begin,
    end: end
  });
  refresh();
  alert("Class created.");
}

refresh();