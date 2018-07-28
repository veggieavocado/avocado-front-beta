const { setCookie, getCookie } = require('./cookie.js');

console.log(document.cookie);
const token = getCookie('VA-TOKEN');
const username = getCookie('VA-USER');

console.log(token);
console.log(username);

const userAccoutSectionHTML = `
<div class="account-btn">
  ${username}
  <ul class="account-dropdown">
    <li class="list-first">내 문서관리</li>
    <li>최근작성문서 3</li>
    <li>최근작성문서 2</li>
    <li class="list-last">최근작성문서 1</li>
    <li>로그아웃</li>
  </ul>
</div>
`;

if (token) {
  const navbarLoginSection = document.getElementsByClassName('navbar-login')[0];
  navbarLoginSection.innerHTML = userAccoutSectionHTML;
}
