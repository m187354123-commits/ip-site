const http = require('http');

const server = http.createServer((req, res) => {
  const ip =
    req.headers['x-forwarded-for']
      ? req.headers['x-forwarded-for'].split(',')[0].trim()
      : req.socket.remoteAddress;

  console.log("접속한 IP:", ip);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>Welcome 😎</h1>
    <p>접속 기록 중...</p>
    <p>IP: ${ip}</p>
  `);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("서버 실행 중");
});
