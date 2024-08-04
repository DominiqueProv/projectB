import { useFiles } from "../context/FilesContext";
import { formatDateShort } from "../utils/date";

const lengthForAgeOrg = [
  { age: 0, p3: 46.1, p15: 50.4, p50: 52.5, p85: 53.6, p97: 54.7 },
  { age: 1, p3: 71.3, p15: 74.5, p50: 77.3, p85: 80.3, p97: 83.3 },
  { age: 2, p3: 81.7, p15: 84.5, p50: 88, p85: 90.2, p97: 92.4 },
  { age: 3, p3: 88.7, p15: 91.5, p50: 94, p85: 97.2, p97: 101.4 },
  { age: 4, p3: 95, p15: 98.2, p50: 100.5, p85: 105.2, p97: 108.6 },
];

const weightForAge = [
  { age: 0, p3: 2.5, p15: 3.2, p50: 3.6, p85: 4.1, p97: 4.5 },
  { age: 1, p3: 4.4, p15: 5.0, p50: 5.7, p85: 6.4, p97: 6.9 },
  { age: 2, p3: 5.2, p15: 5.9, p50: 6.6, p85: 7.4, p97: 8.0 },
  { age: 3, p3: 6.0, p15: 6.8, p50: 7.5, p85: 8.3, p97: 8.9 },
  { age: 4, p3: 6.7, p15: 7.5, p50: 8.3, p85: 9.2, p97: 9.8 },
];

export const combineData = (growthData, dob, type = "height") => {
  const lengthForAge = type === "height" ? lengthForAgeOrg : weightForAge;
  const monthlyData = [];

  lengthForAge.forEach((percentile, yearIndex) => {
    if (yearIndex > 4) return; // Skip any data beyond age 4
    for (let month = 0; month < 12; month++) {
      const ageInMonths = yearIndex * 12 + month;
      if (ageInMonths > 48) break; // Ensure we only go up to 48 months (4 years)

      const date = new Date(dob);
      date.setMonth(dob.getMonth() + ageInMonths);

      // Ensure each iteration uses a new date object
      const monthDate = new Date(date);

      // Find matching growth data
      const matchingGrowthData = growthData.find((growthItem) => {
        const growthDate = new Date(growthItem.dateCreated);
        return (
          growthDate.getFullYear() === monthDate.getFullYear() &&
          growthDate.getMonth() === monthDate.getMonth()
        );
      });

      let measurement = matchingGrowthData
        ? parseFloat(matchingGrowthData[type])
        : null;

      if (measurement === null && monthlyData.length > 0) {
        const prevMeasurement = monthlyData[monthlyData.length - 1][type];
        const nextYear = lengthForAge[yearIndex + 1];
        const nextMeasurement =
          nextYear && month === 11 ? nextYear.p50 : percentile.p50;

        if (prevMeasurement !== null && nextYear) {
          measurement = (prevMeasurement + nextMeasurement) / 2;
        }
      }

      monthlyData.push({
        age: ageInMonths / 12,
        date: monthDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        p3:
          percentile.p3 +
          (month / 12) * (lengthForAge[yearIndex + 1]?.p3 - percentile.p3 || 0),
        p15:
          percentile.p15 +
          (month / 12) *
            (lengthForAge[yearIndex + 1]?.p15 - percentile.p15 || 0),
        p50:
          percentile.p50 +
          (month / 12) *
            (lengthForAge[yearIndex + 1]?.p50 - percentile.p50 || 0),
        p85:
          percentile.p85 +
          (month / 12) *
            (lengthForAge[yearIndex + 1]?.p85 - percentile.p85 || 0),
        p97:
          percentile.p97 +
          (month / 12) *
            (lengthForAge[yearIndex + 1]?.p97 - percentile.p97 || 0),
        [type]: measurement,
      });
    }
  });

  // Filter out data beyond the latest recorded date
  const latestDate = new Date(
    Math.max(...growthData.map((item) => new Date(item.dateCreated)))
  );
  const filteredData = monthlyData.filter(
    (item) => new Date(item.date) <= latestDate
  );

  return filteredData;
};

const useGrowth = () => {
  const { filesData } = useFiles();
  const data = filesData
    ?.filter(
      (item) =>
        (item.notes && item.notes.weight) || (item.notes && item.notes.height)
    )
    .map((item) => item.notes)
    .reverse();
  const updatedData = data?.map((item) => ({
    ...item,
    dateCreated: formatDateShort(item.dateCreated),
  }));
  return updatedData;
};

export default useGrowth;
