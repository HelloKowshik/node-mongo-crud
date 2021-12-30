const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Username/Password Required!' });
  }
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const role = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: foundUser.username,
          roles: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '50s' }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);

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
