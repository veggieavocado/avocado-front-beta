const express = require('express'); // express앱 임포트하기

// 서버 포트 & 호스트 정의내려주기
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express(); // 앱 시작
app.set('views', `${__dirname}/templates`); // HTML 파일 연결
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(`${__dirname}/assets`)); // CSS 파일 연결

// 앱을 포트와 호스트와 연결하여 작동 시작하기
app.listen(PORT, HOST);
console.log(`서버가 http://${HOST}:${PORT} 에서 작동하고 있습니다.`);

// //////////////////////////
// // URL 정의는 여기서 부터 ////
// /////////////////////////

// 여기부터는 프론트엔드 개발자의 창의력을 보여주세요~! //

// app.get함수에 들어가는 것은 첫 번째 인자: URL 정의입니다
// 두 번째 인자는 디폴트로 (req, res)라고 두고 텍스트를 보여주고 싶으면, res.send를
// html을 보내고 싶으면, res.render함수를 사용합니다.

// 테스트 페이지: https://www.veggieavocado.com/
app.get('/', (req, res) => {
  res.send('제대로 작동합니다!');
});

// 홈 페이지: https://www.veggieavocado.com/home/
app.get('/home', (req, res) => {
  res.render('home.html');
});

// 로그인 페이지: https://www.veggieavocado.com/login/
app.get('/login', (req, res) => {
  res.render('login.html');
});

// 회원가입 페이지: https://www.veggieavocado.com/register/
app.get('/register', (req, res) => {
  res.render('register.html');
});

// 템플릿뷰 페이지:  https://www.veggieavocado.com/template
app.get('/template', (req, res) => {
  res.render('templateview.html');
});

// 템플릿뷰 페이지:  https://www.veggieavocado.com/maketemplate
// 템플릿에 데이터 보여주기 테스트용
app.get('/maketemplate', (req, res) => {
  res.render('maketemplate.html');
});

// ppt선택 페이지: https://www.veggieavocado.com/pptselect/
app.get('/pptselect', (req, res) => {
  res.render('pptselect.html');
});

//이메일선택 페이지: https://www.veggieavocado.com/emailselect/
app.get('/emailselect', (req, res) => {
  res.render('emailselect.html')
});

// ppt선택 페이지: https://www.veggieavocado.com/pptselect/
app.get('/mydoc', (req, res) => {
  res.render('mydoc.html');
});

//소개 페이지: https://www.veggieavocado.com/introduction/
app.get('/introduction', (req, res) => {
  res.render('introduction.html')
});

//문의 페이지: https://www.veggieavocado.com/customer/
app.get('/customer', (req, res) => {
  res.render('customer.html')
});

//유저가 템플릿 관리하는 페이지: https://www.veggieavocado.com/mydoc/
app.get('/mydoc', (req, res) => {
  res.render('mydoc.html')
});
