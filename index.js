const express = require('express'); // express앱 임포트하기

// 서버 포트 & 호스트 정의내려주기
const PORT = 8080;
const HOST = '0.0.0.0';

const app = express(); // 앱 시작

// URL 정의는 여기서 부터

// 홈: https://www.veggieavocado.com/
app.get('/', (req, res) => {
  res.send('제대로 작동합니다!')
});

app.listen(PORT, HOST);
console.log(`서버가 http://${HOST}:${PORT} 에서 작동하고 있습니다.`);
