const data = {
  employees: require('../model/employees.json'),
  setEmployee: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => res.json(data.employees);

const createNewEmployee = (req, res) => {
  const employee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!employee.firstname || !employee.lastname) {
    return res.status(400).json({ msg: 'firstname/lastname is required!' });
  }
  data.setEmployee([...data.employees, employee]);
  res.status(201).json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ msg: `Employee with ID:${req.body.id} not Found!` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const filteredArr = data.employees.filter(
    (emps) => emps.id !== parseInt(req.body.id)
  );
  const unsortedArr = [...filteredArr, employee];
  data.setEmployee(
    unsortedArr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ msg: `Employee with ID:${req.body.id} not Found!` });
  }
  const filteredArr = data.employees.filter(
    (emps) => emps.id !== parseInt(req.body.id)
  );
  data.setEmployee([...filteredArr]);
  res.status(201).json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ msg: `Employee with ID:${req.params.id} not Found!` });
  }
  res.status(201).json(employee);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
