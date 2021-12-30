const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const userDB = {
  users: require('../model/users.json'),
  setUser: function (data) {
    this.users = data;
  },
};

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Username/Password Required!' });
  }
  const duplicate = userDB.users.find((person) => person.username === username);
  if (duplicate) return res.sendStatus(409);
  try {
    let hashedPass = await bcrypt.hash(password, 10);
    const newUser = {
      username: username,
      roles: { User: 2001 },
      password: hashedPass,
    };
    userDB.setUser([...userDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );
    // console.log(userDB.users);
    res.status(201).json({ success: `User ${username} Created.` });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

module.exports = { handleNewUser };
