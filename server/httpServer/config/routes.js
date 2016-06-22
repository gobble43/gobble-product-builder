
module.exports = (app) => {
  app.get('/', (req, res) => {
    res.end('hello');
  });
  app.post('/api/product', (req, res) => {
    console.log('form body', req.body);
    process.send(req.body);
    res.end();
  });
};
