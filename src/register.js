const axios = require('axios');
const { setCookie, getCookie } = require('./cookie.js');

const userURL = 'http://45.77.179.168:3000/api/v1/accounts/user/';
const profileURL = 'http://45.77.179.168:3000/api/v1/accounts/profile/';
const jwtURL = 'http://45.77.179.168:3000/api/v1/accounts/api-token-auth/';

// register.html의 폼에서 입력받은 값을 API POST용청을 보내어 회원가입시켜준다
const registerUser = async (username, email, password, address, phone) => {
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

  if (userResponse.status === 201) {
    const jwtToken = await axios.post(jwtURL, jwtData); // API 서버에 요청을 다시 보내기 위해 JWT 토큰 발급
    const token = jwtToken.data.token;
    // 위에서 받은 토큰을 브라우저 쿠키에 저장한다
    document.cookie = setCookie('VA-TOKEN', token);
    // 쿠키를 가져와서 토큰을 사용한다
    const vaToken = getCookie('VA-TOKEN');
    const headerData = {
      Authorization: `JWT ${vaToken}`,
    };
    await axios.put(`${profileURL + username}`.concat('/'), profileData, { headers: headerData });
  } else {
    const registerAlert = document.getElementsByClassName('password-alert')[0];
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
      // 회원가입이 되었다면 로그인창으로 보낸다
      window.location.href = '/login';
    }
    console.log(username, email, password, passwordCheck, address, phone);
  }
});
