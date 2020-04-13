export const calcPercentage = (number, percent) => (number * percent) / 100;

export const estimateDays = (periodType, days) => {
  if (periodType === 'months') return days * 30;
  if (periodType === 'weeks') return days * 7;
  return days;
};

export const getcurrentlyInfected = (reportedCases, isSevere = false) => {
  const factor = isSevere ? 50 : 10;
  return reportedCases * factor;
};

export const getInfectionsByDay = (infected, days) => {
  const factor = 2 ** Math.trunc((days / 3));
  return infected * factor;
};

export const getAvailableBeds = (totalBeds, availability) => {
  const beds = calcPercentage(totalBeds, availability);
  return beds;
};
