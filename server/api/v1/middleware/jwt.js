import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (newUser, res, status, next) => {
  const payLoad = {
    id: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    status: newUser.status,
    isAdmin: newUser.isAdmin,
  };
  jwt.sign(payLoad, process.env.APP_TOKEN || 'jhgsfcvgbhbjvc', (err, token) => {
    if (err) {
      res.status(422).json({
        status: 422,
        error: 'An error occurred while verifying your details.',
      });
    }
    res.status(status).json({
      status,
      data: {
        token,
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        address: newUser.address,
        status: newUser.status,
        isAdmin: newUser.isAdmin,
        registered: newUser.registered,
      },
    });
    next();
  });
};

const validateToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    return jwt.verify(req.token, process.env.APP_TOKEN || 'jhgsfcvgbhbjvc', (err, authData) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          error: 'Invalid token, You need to login or signup',
        });
      }
      req.authData = authData;
      return next();
    });
  }
  return res.status(401).json({
    status: 401,
    error: 'Auth failed',
  });
};

export default {
  createToken,
  validateToken,
};
