const express = require('express');
const path = require('path');
const { apiRouter } = require('./api/index');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api', apiRouter);

app.get('/', (req, res, next) => {
  try {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
  } catch (error) {
    next(error);
  }
});


app.use((req, res, next) => {
  next({
    status: 404,
    message: `Page not found for ${req.method} ${req.url}`
  })
});

app.use((error, req, res, next) => {
  console.log(error);
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message || JSON.stringify(err)
  });
});

app.listen(PORT, () => console.log('Listening on PORT ', PORT));
