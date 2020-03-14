const express = require('express');
const {
  createSchools,
  readSchools,
  updateSchools,
  deleteSchools
} = require('../datalayer/index');

const schoolRouter = express.Router();

schoolRouter.post('/', async (req, res, next) => {
  const { name } = req.body;
  try {
    const data = await createSchools(name);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});


schoolRouter.get('/', async (req, res, next) => {
  try {
    const data = await readSchools();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});


schoolRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const data = await updateSchools(name, id);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
})


schoolRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteSchools(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = { schoolRouter };
