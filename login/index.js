const hashCode = (s) => {
  return s+s+s;
}

const login = () => {
  let email = document.getElementById('email').value;
  if (localStorage.email !== email) {
    alert("Email not found.");
    return;
  }
  
  let pass = document.getElementById('password').value;
  if (localStorage.password !== hashCode(pass)) {
    alert("Wrong password.");
    return;
  }
  
  window.location.href = '/home';
}