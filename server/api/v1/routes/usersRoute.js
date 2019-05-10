import express from 'express';

import userController from '../controllers/userController';
import userValidator from '../middleware/userValidator';
import jwt from '../middleware/jwt';

const usersRouter = express.Router();

usersRouter.post('/auth/signup', userValidator.valiidateSignUp, userController.userSignUp);
usersRouter.post('/auth/login', userValidator.valiidateLogin, userController.userLogin);
usersRouter.patch('/:userEmail/verify', jwt.validateToken, userValidator.validateVerificationStatus, userController.adminVerifyAccount);

export default usersRouter;
