document.getElementById('name').value = localStorage.name;
document.getElementById('grade').value = localStorage.grade;

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