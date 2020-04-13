import { Router } from 'express';
import Xml2js from 'xml2js';
import covid19ImpactEstimator from '../estimator';

const router = Router();

router.post('/', (request, response) => {
  const { data } = request.body;
  const results = covid19ImpactEstimator(data);

  return response.status(200).send({ status: 'success', results });
});

router.post('/json', (request, response) => {
  const { data } = request.body;
  const results = covid19ImpactEstimator(data);

  return response.status(200).send({ status: 'success', results });
});

router.post('/xml', (request, response) => {
  const { data } = request.body;
  const results = covid19ImpactEstimator(data);
  const xmlBuilder = new Xml2js.Builder();

  response.header('Content-Type', 'application/xml; charset=UTF-8');
  return response.status(200).send(xmlBuilder.buildObject(results));
});

export default router;
