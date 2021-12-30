const router = require('express').Router();
const usersController = require('../../controller/usersController');
const ROLES_LIST = require('../../config/role_list');
const verifyRoles = require('../../middlewire/verifyRoles');

router
  .route('/')
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

router
  .route('/:id')
  .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);

module.exports = router;
