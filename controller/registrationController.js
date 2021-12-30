const bcrypt = require('bcrypt');
const User = require('../model/User');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: 'Username/Password Required!' });
  }
  const duplicate = await User.findOne({ username: username }).exec();
  if (duplicate) return res.sendStatus(409);

  try {
    let hashedPass = await bcrypt.hash(password, 10);
    const result = await User.create({
      username: username,
      password: hashedPass,
    });
    console.log(result);
    res.status(201).json({ success: `User ${username} Created.` });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
};

module.exports = { handleNewUser };
