const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const ip =
    req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : req.socket.remoteAddress;

  console.log("접속한 IP:", ip);

  // // logs 제외하고만 기록
if (!req.url.startsWith('/logs')) {
  const log = `${new Date().toISOString()} - ${ip}\n`;
  fs.appendFileSync('ip-log.txt', log);
}
  

  // 🔒 관리자 페이지
  if (req.url === '/logs?key=1234') {
    let data = '';
    try {
      data = fs.readFileSync('ip-log.txt', 'utf-8');
    } catch (e) {
      data = '아직 기록 없음';
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(data);
    return;
  }

  // 일반 사용자 화면
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>Welcome 😎</h1>
    <p>사이트 접속 완료</p>
  `);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("서버 실행 중");
});
