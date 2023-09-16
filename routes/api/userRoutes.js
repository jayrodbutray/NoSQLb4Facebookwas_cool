const router = require('express').Router();

const {
  getSingleUser,
  getAllUsers,
  createUser,
} = require('../../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

module.exports = router;
