$('#logInModal').on('show.bs.modal', event => {
  const button = $(event.relatedTarget) // Button that triggered the modal
});


const userName = document.getElementById('signUpName');
const userPw = document.getElementById('signUpPw');

function store() {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('password', userPw.value);
}

function check() {
  const storedName = localStorage.getItem('userName');
  const storedPw = localStorage.getItem('userPw');
  const logInName = document.getElementById('logInName');
  const logInPw = document.getElementById('logInPw');
    if(logInName.value == storedName && logInPw.value == storedPw) {
      window.showAlert('You logged in');
    } else {
      window.showAlert('Sorry, there is error. Please try again later', false);
    }
}