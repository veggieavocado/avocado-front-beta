const axios = require('axios');
const { setCookie } = require('./cookie.js');

const jwtURL = 'http://45.77.179.168:3000/api/v1/accounts/api-token-auth/';

const loginUser = async () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('pw').value;
  // JWT data makes
  const jwtData = {
    username,
    password,
  };
  const jwtToken = await axios.post(jwtURL, jwtData)
    .catch(() => {
      const loginAlert = document.getElementById('login-alert');
      loginAlert.innerText = '아이디/비밀번호를 다시 확인해주세요.';
    }); // API 서버에 요청을 다시 보내기 위해 JWT 토큰 발급
    // 만약 에러가 리턴되면 에러 메세지를 모여준다
  if (jwtToken.status === 200) {
    const token = jwtToken.data.token;
    document.cookie = setCookie('VA-TOKEN', token);
    window.location.href = '/pptselect';
  }
};

document.addEventListener('click', async (e) => {
  if (e.target.id === 'login-btn') {
    await loginUser();
  }
});

const pwInput = document.getElementById('pw');

pwInput.addEventListener('keyup', async (e) => {
  e.preventDefault();
  if (e.keyCode === 13) {
    await loginUser();
  }
});
