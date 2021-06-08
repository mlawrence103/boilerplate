const router = require('express').Router();
//require relevant database info here
Example = require('../db/example');

//get request to /api/examples
router.get('/', (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

//get request to specific id
router.get('/:id', async (req, res, next) => {
  try {
    const example = await Example.findByPk(req.params.id);
    res.json(example);
  } catch (error) {
    next(error);
  }
});

//post request to create new example from form info
router.post('/', async (req, res, next) => {
  try {
    const newExample = await Example.create(req.body);
    res.status(201).json(newExample);
  } catch (error) {
    next(error);
  }
});

//put update request with form info
router.put('/:id', async (req, res, next) => {
  try {
    const example = Example.findByPk(req.params.id);
    await example.update(req.body);
    res.json(example);
  } catch (error) {
    next(error);
  }
});

//delete request
router.delete('/:id', async (req, res, next) => {
  try {
    const example = await Example.findByPk(req.params.id);
    await example.destroy();
    res.json(example);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
