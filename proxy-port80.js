// Reverse proxy local sur le port 80 pour FixMyDrone.fr
// Permet d'acceder a http://fixmydrone.fr directement sans specifier de port (le port 80 est le port par defaut des navigateurs)
const http = require('http');

const TARGET_PORT = 3001;

const server = http.createServer((clientReq, clientRes) => {
  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: clientReq.url,
    method: clientReq.method,
    headers: {
      ...clientReq.headers,
      host: clientReq.headers.host || 'fixmydrone.fr',
      'x-forwarded-host': clientReq.headers.host || 'fixmydrone.fr',
      'x-forwarded-proto': 'http',
    },
  };

  const proxy = http.request(options, (targetRes) => {
    clientRes.writeHead(targetRes.statusCode, targetRes.headers);
    targetRes.pipe(clientRes, { end: true });
  });

  proxy.on('error', (err) => {
    clientRes.writeHead(502, { 'Content-Type': 'text/html; charset=utf-8' });
    clientRes.end(`
      <html>
        <body style="font-family: sans-serif; background: #000; color: #fff; text-align: center; padding-top: 100px;">
          <h1 style="color: #f97316;">FixMyDrone.fr</h1>
          <p>Le serveur Next.js demarre sur le port ${TARGET_PORT}...</p>
          <p style="color: #71717a; font-size: 12px;">Erreur de connexion temporaire au backend: ${err.message}</p>
        </body>
      </html>
    `);
  });

  clientReq.pipe(proxy, { end: true });
});

server.listen(80, () => {
  console.log('>>> [FixMyDrone] Proxy port 80 actif ! Accessible sur http://fixmydrone.fr et http://localhost');
});
