const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
} = require('../../controllers/thoughtController');

// /api/tags
router.route('/').get(getAllThoughts).post(createThought);

// /api/tags/:tagId
router.route('/:tagId').get(getSingleThought);

module.exports = router;