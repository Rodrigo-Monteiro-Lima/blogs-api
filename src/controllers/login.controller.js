const { loginService } = require('../services');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.login(email, password);
    if (user.message) return next(user);
    const { token } = user;
    return res.status(200).json({ token });    
  } catch (error) {
    return next(error); 
  }
};

module.exports = {
  login,
};