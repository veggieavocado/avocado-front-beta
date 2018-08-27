const express = require('express'); // express앱 임포트하기
const axios = require('axios');

const redis = require('redis');
const asyncRedis = require('async-redis');

const initialRedisClient = redis.createClient(6379, '45.76.213.33');
const RedisClient = asyncRedis.decorate(initialRedisClient);
RedisClient.auth('molecularredispassword');

// 서버 포트 & 호스트 정의내려주기
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express(); // 앱 시작
app.set('views', `${__dirname}/templates`); // HTML 파일 연결
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(`${__dirname}/assets`));
app.use('/static', express.static(`${__dirname}/assets`)); // CSS 파일 연결

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

// 홈 페이지: https://www.veggieavocado.com/
app.get('/', (req, res, next) => {
  res.render('production/index.html');
});

// 로그인 페이지: https://www.veggieavocado.com/login/
app.get('/login', (req, res) => {
  res.render('production/login.html');
});

// 회원가입 페이지: https://www.veggieavocado.com/register/
app.get('/register', (req, res) => {
  res.render('production/register.html');
});

// ppt선택 페이지: https://www.veggieavocado.com/pptselect
app.get('/pptselect', (req, res) => {
  res.render('production/pptselect.html');
});

// 템플릿뷰 페이지:  https://www.veggieavocado.com/template
app.get('/template', (req, res) => {
  res.render('production/templateview.html');
});

// 소개 페이지: https://www.veggieavocado.com/about
app.get('/about', (req, res) => {
  res.render('production/about.html');
});

// 문의 페이지: https://www.veggieavocado.com/customer
app.get('/customer', (req, res) => {
  res.render('production/customer.html');
});

// 원티드 컨텐츠 페이지: https://www.veggieavocado.com/contents/wanted
app.get('/wanted_legacy', (req, res) => {
  res.render('production/wanted.html');
});

// warning 페이지: https://www.veggieavocado.com/warning
app.get('/warning', (req, res) => {
  res.render('production/warning.html');
});

// contents 페이지: https://www.veggieavocado.com/contents
app.get('/contents', (req, res) => {
  res.render('production/contents.html');
});

// data(원티드) 페이지: https://www.veggieavocado.com/data
app.get('/wanted', (req, res) => {
  res.render('production/data.html');
});

// tech 페이지: https://www.veggieavocado.com/tech
app.get('/tech', (req, res) => {
  res.render('production/tech.html');
});

// skill 페이지: https://www.veggieavocado.com/skill
app.get('/skill/:skillname', (req, res) => {
  const skillname = req.params.skillname;
  res.render('production/skill.html', { skill: skillname });
});

// 레디스 캐시 연결 API
app.get('/cache', async (req, res) => {
  await RedisClient.set('TEST_VA', 'test');
  const response = await RedisClient.get('TEST_VA');
  res.send(response);
});
