import {
  calcPercentage,
  estimateDays,
  getcurrentlyInfected,
  getInfectionsByDay,
  getAvailableBeds
} from './helpers';

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;

  const days = estimateDays(periodType, timeToElapse);

  const currentlyInfected = Math.trunc(getcurrentlyInfected(reportedCases));
  const severelyInfected = Math.trunc(getcurrentlyInfected(reportedCases, true));

  const infectionsByRequestedTime = Math.trunc(getInfectionsByDay(currentlyInfected, days));
  const severeInfectionsByTime = Math.trunc(getInfectionsByDay(severelyInfected, days));

  const severeCasesByRequestedTime = Math.trunc(calcPercentage(infectionsByRequestedTime, 15));
  const severeImpactedByRequestedTime = Math.trunc(calcPercentage(severeInfectionsByTime, 15));
  const hospitalBedsByRequestedTime = Math.trunc(getAvailableBeds(totalHospitalBeds, 35)
    - severeCasesByRequestedTime);
  const severeBedsByRequestedTime = Math.trunc(getAvailableBeds(totalHospitalBeds, 35)
    - severeImpactedByRequestedTime);

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: severelyInfected,
      infectionsByRequestedTime: severeInfectionsByTime,
      severeCasesByRequestedTime: severeImpactedByRequestedTime,
      hospitalBedsByRequestedTime: severeBedsByRequestedTime
    }
  };
};

export default covid19ImpactEstimator;
