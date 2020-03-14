const express = require('express');
const {
  createStudents,
  readStudents,
  updateStudents,
  deleteStudents
} = require('../datalayer/index');

const studentRouter = express.Router();

studentRouter.post('/', async (req, res, next) => {
  const { name, school } = req.body;
  try {
    const data = await createStudents(name, school);
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});


studentRouter.get('/', async (req, res, next) => {
  try {
    const data = await readStudents();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});


studentRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { name, school } = req.body;
  try {
    const data = await updateStudents(name, school, id);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
});


studentRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteStudents(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});


module.exports = { studentRouter };

