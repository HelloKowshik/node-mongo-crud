const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userDB = {
  users: require('../model/users.json'),
  setUser: function (data) {
    this.users = data;
  },
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Username/Password Required!' });
  }
  const checkUser = userDB.users.find((person) => person.username === username);
  if (!checkUser) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(password, checkUser.password);
  if (match) {
    const role = Object.values(checkUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: checkUser.username,
          roles: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '50s' }
    );
    const refreshToken = jwt.sign(
      { username: checkUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const otherUsers = userDB.users.filter(
      (person) => person.username !== checkUser.username
    );
    const currentUser = { ...checkUser, refreshToken };
    userDB.setUser([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(userDB.users)
    );
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    return res.sendStatus(401);
  }
};

module.exports = { handleLogin };
