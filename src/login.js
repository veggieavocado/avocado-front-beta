document.addEventListener('click', async (e) => {
  if (e.target.id === 'login-btn') {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pw').value;

console.log(email, password);
