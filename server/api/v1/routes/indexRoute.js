import express from 'express';
import indexController from '../controllers/indexController';

const indexRouter = express.Router();

indexRouter.get('/api/v1', indexController.getIndex);

export default indexRouter;
