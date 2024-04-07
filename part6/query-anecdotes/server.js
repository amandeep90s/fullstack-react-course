import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const validator = (request, response, next) => {
  const { content } = request.body;

  if (request.method === 'POST' && (!content || content.length < 3)) {
    return response.status(400).json({
      error: 'Too short anecdote, muest have length 5 or more',
    });
  } else {
    next();
  }
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(validator);
server.use(router);

server.listen(3001, () => console.log('Json server is running'));
