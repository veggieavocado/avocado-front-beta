const axios = require('axios');
const fetch = require('fetch').fetchUrl;

const userURL = 'http://45.77.179.168:3000/api/v1/accounts/user/';
const profileURL = 'http://45.77.179.168:3000/api/v1/accounts/profile/';
const jwtURL = 'http://45.77.179.168:3000/api/v1/accounts/api-token-auth/';

const registerUser = async (username, email, password, address, phone) => {
  // 유저 생성
  console.log(address, phone);
  const userData = {
    username,
    email,
    password,
  };
  const profileData = {
    user: username,
    name: '',
    address,
    phone,
  };
  const jwtData = {
    username,
    password,
  };

  const userResponse = await axios.post(userURL, userData);
  console.log(userResponse);

  if (userResponse.status === 201) {
    const jwtToken = await axios.post(jwtURL, jwtData);
    const { token } = jwtToken.data.token;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `JWT ${token}`,
    };
    fetch(`${profileURL + username}`.concat('/'), {
      method: 'PUT',
      body: profileData,
      headers,
    })
      .then((response) => {
        console.log(response);
      });
  } else {
    console.log('유저 저장 실패');
  }
};

document.addEventListener('click', async (e) => {
  if (e.target.id === 'register-btn') {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('pw').value;
    const passwordCheck = document.getElementById('check-pw').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (password !== passwordCheck) {
      const passwordAlert = document.getElementsByClassName('password-alert')[0];
      passwordAlert.innerText = '비밀번호가 일치하지 않습니다.';
    } else {
      await registerUser(username, email, password, address, phone);
    }
    console.log(username, email, password, passwordCheck, address, phone);
  }
});
