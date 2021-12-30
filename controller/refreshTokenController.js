const jwt = require('jsonwebtoken');
const User = require('../model/User');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  const findUser = await User.findOne({ refreshToken }).exec();
  if (!findUser) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || findUser.username !== decoded.username)
      return res.sendStatus(403);
    const role = Object.values(findUser.roles);
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
