// CommonJS => require
// ESModules => import/export

import http from 'node:http';

// Criar um usuário (name, email, senha)

const server = http.createServer((request, response) => {
  return response.end('Hello World')
})

server.listen(3333)
// localhost:3333