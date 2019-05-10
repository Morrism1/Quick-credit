import express from 'express';

import indexRoute from './routes/indexRoute';
import usersRoute from './routes/usersRoute';
import loanRoute from './routes/loanRoute';

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/api/v1/users', usersRoute);
app.use('/api/v1/loans', loanRoute);

app.listen(port);

export default app;
