const router = require('express').Router();
const path = require('path');
const verifyRoles = require('../../middlewire/verifyRoles');
const ROLES_LIST = require('../../config/role_list');
const data = {};
data.employees = require('../../model/employees.json');
const {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../../controller/employeeController');

router
  .route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

router.get('/:id', getEmployee);

module.exports = router;
