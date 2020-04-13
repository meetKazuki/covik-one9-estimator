import express from 'express';
import morgan from 'morgan';
import routes from './routes';

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api/v1/on-covid-19', routes);

app.get('/', (_, response) => {
  response.status(200).json({
    status: 'success',
    message: 'welcome to "COVIK-One9 Estimator"'
  });
});

app.all('*', (_, response) => {
  response.status(404).json({
    status: 'error',
    error: 'resource not found'
  });
});

export default app;
