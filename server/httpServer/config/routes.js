
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.end('Hello World!');
  });
  app.post('/api/product', (req, res) => {
    console.log('form body', req.body);
    if (typeof req.body.upc === 'string') {
      process.send(req.body);
      res.statusCode = 201;
      res.end();
    } else {
      res.statusCode = 400;
      res.end();
    }
  });
};
