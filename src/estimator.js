import {
  calcPercentage,
  estimateDays,
  getcurrentlyInfected,
  getInfectionsByDay,
  getAvailableBeds,
  getDollarsInFlight
} from './helpers';

const covid19ImpactEstimator = (data) => {
  const {
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds,
    region
  } = data;

  const days = estimateDays(periodType, timeToElapse);

  const currentlyInfected = Math.trunc(getcurrentlyInfected(reportedCases));
  const severelyInfected = Math.trunc(getcurrentlyInfected(reportedCases, true));

  const infectionsByRequestedTime = Math
    .trunc(getInfectionsByDay(currentlyInfected, days));
  const severeInfectionsByTime = Math
    .trunc(getInfectionsByDay(severelyInfected, days));

  const severeCasesByRequestedTime = Math
    .trunc(calcPercentage(infectionsByRequestedTime, 15));
  const severeImpactedByRequestedTime = Math
    .trunc(calcPercentage(severeInfectionsByTime, 15));
  const hospitalBedsByRequestedTime = Math
    .trunc(getAvailableBeds(totalHospitalBeds, 35) - severeCasesByRequestedTime);
  const severeBedsByRequestedTime = Math
    .trunc(getAvailableBeds(totalHospitalBeds, 35) - severeImpactedByRequestedTime);

  const casesForICUByRequestedTime = Math
    .trunc(calcPercentage(infectionsByRequestedTime, 5));
  const severeICUByRequestedTime = Math
    .trunc(calcPercentage(severeInfectionsByTime, 5));

  const casesForVentilatorsByRequestedTime = Math
    .trunc(calcPercentage(infectionsByRequestedTime, 2));
  const severeForVentilatorsByRequestedTime = Math
    .trunc(calcPercentage(severeInfectionsByTime, 2));

  const dollarsInFight = Math
    .trunc(getDollarsInFlight(infectionsByRequestedTime, days, region));
  const severeDollarsFlight = Math
    .trunc(getDollarsInFlight(severeInfectionsByTime, days, region));

  return {
    data,
    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFight
    },
    severeImpact: {
      currentlyInfected: severelyInfected,
      infectionsByRequestedTime: severeInfectionsByTime,
      severeCasesByRequestedTime: severeImpactedByRequestedTime,
      hospitalBedsByRequestedTime: severeBedsByRequestedTime,
      casesForICUByRequestedTime: severeICUByRequestedTime,
      casesForVentilatorsByRequestedTime: severeForVentilatorsByRequestedTime,
      dollarsInFight: severeDollarsFlight
    }
  };
};

export default covid19ImpactEstimator;
