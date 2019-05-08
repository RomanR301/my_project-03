
// i know it's a bad practice to collect data via localStorage
// it's only for imitation, how it should look like in UI

const userName = document.getElementById('signUpName');
const userPw = document.getElementById('signUpPw');
const userEmail = document.getElementById('signUpEmail');


function store() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('pw', userPw.value); 
  localStorage.setItem('email', userEmail.value); 
  if (userName.value.length > 3 && userPw.value.length > 3) {
    window.showAlert('Try to log in.');
    $("#signUpModal").modal("hide");
  } else {
    window.showAlert('Try again.', false);
  }
}

function check() {
  const storedName = localStorage.getItem('name');
  const storedPw = localStorage.getItem('pw');
  const logInName = document.getElementById('logInName');
  const logInPw = document.getElementById('logInPw');
  if  (logInName.value == storedName && logInPw.value == storedPw) {
    window.showAlert('You are loged in.');
    $("#logInModal").modal("hide");
  } else {
    window.showAlert('Try again.', false);
  }
}