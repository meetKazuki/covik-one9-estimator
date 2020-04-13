import {
  estimateDays,
  getcurrentlyInfected,
  getInfectionsByDay
} from './helpers';

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse
  } = data;

  const days = estimateDays(periodType, timeToElapse);

  const currentlyInfected = getcurrentlyInfected(reportedCases);
  const severelyInfected = getcurrentlyInfected(reportedCases, true);

  const infectionsByRequestedTime = getInfectionsByDay(currentlyInfected, days);
  const severeInfectionsByTime = getInfectionsByDay(severelyInfected, days);

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: severelyInfected,
      infectionsByRequestedTime: severeInfectionsByTime
    }
  };
};

export default covid19ImpactEstimator;
