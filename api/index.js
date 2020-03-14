const express = require('express');
const { schoolRouter } = require('./schools');
const { studentRouter } = require('./students');

const apiRouter = express.Router();

apiRouter.use('/schools', schoolRouter);
apiRouter.use('/students', studentRouter);

module.exports = { apiRouter };
