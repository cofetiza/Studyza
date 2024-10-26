let schedule = [];
if (localStorage.schedule !== undefined) {
  schedule = JSON.parse(localStorage.schedule);
  schedule.forEach((task,id) => {
    // console.log(Date.parse(task.date));
    // console.log(task.date+" "+task.begin+" +0000");
    // console.log(Date.parse(task.date+" "+task.begin+" +0000"));
    // console.log(Date.parse(task.date+" "+task.end+" +0000"));
    // while (Date.parse(task.date+" "+task.end+" +0000") < Date.now()) {
    //   task.date = new Date(Date.parse(task.date) + 604800000);
    // }
  });
  console.log(Date.now());
}
let selectId = -1;

const select = (x) => {
  selectId = x;
  document.getElementById('create').style = 'background:#f59dc0;';
  document.getElementById('edit').style = 'background:#f59dc0;display:none';
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
  document.getElementById('create').style = 'background:#f59dc0;';
  document.getElementById('edit').style = 'background:#f59dc0;display:none';
  refresh();
}

const edit = (id) => {
  document.getElementById('create').style = 'background:#f59dc0;display:none';
  document.getElementById('edit').style = 'background:#f59dc0;';
  document.getElementById('title-edit').value = schedule[id].title;
  document.getElementById('date-edit').value = schedule[id].date;
  document.getElementById('begin-edit').value = schedule[id].begin;
  document.getElementById('end-edit').value = schedule[id].end;
  refresh();
}

const save = () => {
  schedule[selectId].title = document.getElementById('title-edit').value;
  schedule[selectId].date = document.getElementById('date-edit').value;
  schedule[selectId].begin =  document.getElementById('begin-edit').value;
  schedule[selectId].end = document.getElementById('end-edit').value;
  document.getElementById('create').style = 'background:#f59dc0;';
  document.getElementById('edit').style = 'background:#f59dc0;display:none';
  refresh();
}

const create = () => {
  let title = document.getElementById('title').value;
  let date = document.getElementById('date').value;
  let begin = document.getElementById('begin').value;
  let end = document.getElementById('end').value;
  if (title === "") {
    alert("Subject can not empty.");
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