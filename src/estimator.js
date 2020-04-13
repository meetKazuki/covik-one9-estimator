import { estimateDays, getcurrentlyInfected, getInfectionsByDay } from './helpers';

const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    reportedCases,
    timeToElapse,
    totalHospitalBeds
  } = data;

  const currentlyInfected = getcurrentlyInfected(reportedCases);
  const severelyInfected = getcurrentlyInfected(reportedCases, true);

  const infectionsByTime = getInfectionsByDay();

  return {
    data,
    impact: '',
    severeImpact: ''
  };
};

export default covid19ImpactEstimator;
