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
let selectId = -1;

const select = (x) => {
  selectId = x;
  document.getElementById('create').style = 'background:#f59dc0;';
  document.getElementById('edit').style = 'background:#f59dc0;display:none';
  refresh();
}

const refresh = () => {
  localStorage.exam = JSON.stringify(exam);
  let render = '';
  exam.forEach((task,id) => {
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
  document.getElementById('exams').innerHTML = render;
}

const remove = (id) => {
  exam.splice(id,1);
  selectId = -1;
  document.getElementById('create').style = 'background:#f59dc0;';
  document.getElementById('edit').style = 'background:#f59dc0;display:none';
  refresh();
}

const edit = (id) => {
  document.getElementById('create').style = 'background:#f59dc0;display:none';
  document.getElementById('edit').style = 'background:#f59dc0;';
  document.getElementById('title-edit').value = exam[id].title;
  document.getElementById('date-edit').value = exam[id].date;
  document.getElementById('begin-edit').value = exam[id].begin;
  document.getElementById('end-edit').value = exam[id].end;
  refresh();
}

const save = () => {
  exam[selectId].title = document.getElementById('title-edit').value;
  exam[selectId].date = document.getElementById('date-edit').value;
  exam[selectId].begin =  document.getElementById('begin-edit').value;
  exam[selectId].end = document.getElementById('end-edit').value;
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
  exam.push({
    title: title,
    date: date,
    begin: begin,
    end: end
  });
  refresh();
  alert("Exam created.");
}

refresh();