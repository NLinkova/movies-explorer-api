const router = require('express').Router();
const {
  userUpdateValidator,
} = require('../middlewares/userValidator');
const {
  updateUser,
  getCurrentUser,
} = require('../controllers/userController');

router.get('/me', getCurrentUser);
router.patch('/me', userUpdateValidator, updateUser);

module.exports = router;
