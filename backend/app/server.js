const app = require('express')();
const server = require('http').createServer(app);
const { handleError } = require('./helpers/error');

require('./routes/index')(app);

app.use((err, req, res, next) => {
  handleError(err, res);
});

server.listen(80, () => {
  console.log('Server listening on localhost: 80');
});