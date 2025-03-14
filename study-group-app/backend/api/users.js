const router = require('express').Router();
const usesController = require('../controllers/usersController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
  .get(usesController.getUsers)
  .put(usesController.updateUser)
  .delete( usesController.deleteUser);
  
router.route('/:username')
  .get(usesController.getUserByUsername);

module.exports = router;