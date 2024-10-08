const validateEmail = (email) => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  
  const hashCode = (s) => {
    return s+s+s;
  }
  
  const signup = () => {
    let email = document.getElementById('email').value;
    if (!validateEmail(email)) {
      alert("Invalid email.");
      return;
    }
    
    let name = document.getElementById('name').value;
    if (name === "") {
      alert("Full name can't be empty.");
      return;
    }
    
    let pass = document.getElementById('password').value;
    if (pass === "") {
      alert("Password can't be empty.");
      return;
    }
    
    let pass2 = document.getElementById('repassword').value;
    if (pass !== pass2) {
      alert("Password doesn't match.");
      return;
    }
    
    localStorage.email = email;
    localStorage.name = name;
    localStorage.password = hashCode(pass);
    alert("Register success.");
    window.location.href = "/login";
  }