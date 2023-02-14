import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

// Query Parameters: URL Stateful => filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// https://localhost:3333/users?userId=1&name=Diego

// GET https://localhost:3333/users/1
// DELETE https://localhost:3333/users/1

// POST https://localhost:3333/users

// Edição e remoção
const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);

    request.params = { ...routeParams.groups }; // remove object null que vem bugado

    return route.handler(request, response);
  }

  return response.writeHead(404).end();
});

server.listen(3333);
