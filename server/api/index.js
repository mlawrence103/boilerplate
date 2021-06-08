const router = require('express').Router();

//put more secific routes here to be served from api directory
// NOTE: Any routes that you put here are ALREADY mounted on `/api`

//e.g. match all requests to /api/examples
router.use('/examples', require('./examples'));

// If someone makes a request that starts with `/api`,
// but you DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to your
// error-handling endware!

router.use((req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
