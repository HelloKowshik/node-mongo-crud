const jwt = require('jsonwebtoken');

const userDB = {
  users: require('../model/users.json'),
  setUser: function (data) {
    this.users = data;
  },
};

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const checkUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!checkUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || checkUser.username !== decoded.username)
      return res.sendStatus(403);
    const role = Object.values(checkUser.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decoded.username,
          roles: role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '50s' }
    );
    res.json({ accessToken });
  });
};

module.exports = handleRefreshToken;
