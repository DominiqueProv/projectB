import { useFiles } from "../context/FilesContext";
import { formatDateShort } from "../utils/date";

const lengthForAge = [
  { age: 0, p3: 46.1, p15: 50.4, p50: 52.5, p85: 53.6, p97: 54.7 },
  { age: 1, p3: 71.3, p15: 74.5, p50: 77.3, p85: 80.3, p97: 83.3 },
  { age: 2, p3: 81.7, p15: 84.5, p50: 88, p85: 90.2, p97: 92.4 },
  { age: 3, p3: 88.7, p15: 91.5, p50: 94, p85: 97.2, p97: 101.4 },
  { age: 4, p3: 95, p15: 98.2, p50: 100.5, p85: 105.2, p97: 108.6 },
];

export const combineData = (growthData, dob) => {
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

      let height = matchingGrowthData
        ? parseFloat(matchingGrowthData.height)
        : null;

      if (height === null && monthlyData.length > 0) {
        const prevHeight = monthlyData[monthlyData.length - 1].height;
        const nextYear = lengthForAge[yearIndex + 1];
        const nextHeight =
          nextYear && month === 11 ? nextYear.p50 : percentile.p50;

        if (prevHeight !== null && nextYear) {
          height = (prevHeight + nextHeight) / 2;
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
        height,
      });
    }
  });

  return monthlyData;
};

const useGrowth = () => {
  const { filesData } = useFiles();
  const data = filesData
    ?.filter(
      (item) =>
        (item.notes && item.notes.weigth) || (item.notes && item.notes.height)
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
