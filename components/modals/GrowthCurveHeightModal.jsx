import { useState, useEffect } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { VscSymbolRuler } from "react-icons/vsc";
import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Growth from "../../data/growth";
import { useBabies } from "../../context/BabiesContext";

const lengthForAge = [
  { age: 0, p3: 46.1, p15: 50.4, p50: 52.5, p85: 53.6, p97: 54.7 },
  { age: 1, p3: 71.3, p15: 74.5, p50: 77.3, p85: 80.3, p97: 83.3 },
  { age: 2, p3: 81.7, p15: 84.5, p50: 88, p85: 90.2, p97: 92.4 },
  { age: 3, p3: 88.7, p15: 91.5, p50: 94, p85: 97.2, p97: 101.4 },
  { age: 4, p3: 95, p15: 98.2, p50: 100.5, p85: 105.2, p97: 108.6 },
];

const combineData = (growthData, lengthForAge, dob) => {
  // Combine growth data with percentile data
  const combined = lengthForAge.map((percentile) => {
    const matchingGrowthData = growthData.find((growthItem) => {
      const ageInYears = Math.floor(
        (new Date(growthItem.dateCreated).getTime() - dob.getTime()) /
          (1000 * 60 * 60 * 24 * 365.25)
      );
      return ageInYears === percentile.age;
    });

    return {
      age: percentile.age,
      p3: percentile.p3,
      p15: percentile.p15,
      p50: percentile.p50,
      p85: percentile.p85,
      p97: percentile.p97,
      height: matchingGrowthData ? parseFloat(matchingGrowthData.height) : null,
    };
  });

  // Add any additional growth data not covered in lengthForAge
  growthData.forEach((growthItem) => {
    const ageInYears = Math.floor(
      (new Date(growthItem.dateCreated).getTime() - dob.getTime()) /
        (1000 * 60 * 60 * 24 * 365.25)
    );

    const existing = combined.find((item) => item.age === ageInYears);
    if (!existing) {
      combined.push({
        age: ageInYears,
        height: parseFloat(growthItem.height),
      });
    }
  });

  // Sort combined data by age
  combined.sort((a, b) => a.age - b.age);

  // Interpolate missing heights only if there is a value set for the subsequent year
  for (let i = 0; i < combined.length; i++) {
    if (combined[i].height === null) {
      const prevHeight = i > 0 ? combined[i - 1].height : null;
      const nextHeight =
        i < combined.length - 1 ? combined[i + 1].height : null;
      if (prevHeight !== null && nextHeight !== null) {
        combined[i].height = (prevHeight + nextHeight) / 2;
      } else if (
        prevHeight !== null &&
        nextHeight === null &&
        i < combined.length - 1 &&
        combined[i + 1].height !== null
      ) {
        combined[i].height = prevHeight;
      } else {
        combined[i].height = null;
      }
    }
  }

  return combined;
};

const GrowthCurveHeightModal = () => {
  const [showModal, setShowModal] = useState(false);
  const growthData = Growth();
  const { babyData } = useBabies();
  const dob = new Date(babyData?.date?.seconds * 1000);

  useEffect(() => {
    const closeOnEscapeKey = (e) => {
      if (e.keyCode === 27) setShowModal(false);
    };
    window.addEventListener("keydown", closeOnEscapeKey);
    return () => window.removeEventListener("keydown", closeOnEscapeKey);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
    if (typeof window !== "undefined" && window.document) {
      document.body.style.overflow = "hidden";
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.style.overflow = "unset";
  };

  const combinedData = combineData(growthData, lengthForAge, dob);

  console.log("Combined Data:", combinedData); // Debugging line

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-white z-30 group p-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none"
        type="button"
      >
        <VscSymbolRuler size={35} className="text-teal-300 _scale-rotate" />
      </button>

      <Modal>
        {showModal && (
          <>
            <div
              onClick={handleCloseModal}
              className="inset-0 fixed bg-black bg-opacity-30 z-20 backdrop-blur-sm"
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <div className="flex w-[90vw] h-[90vh] sm:w-[80vw] rounded-lg p-3 relative flex-col bg-white overflow-auto pb-[85px]">
                <div className="flex justify-between mb-4">
                  <ModalTitle title="Growth Height Curve (cm)" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={handleCloseModal}
                  />
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={combinedData} className="-ml-5">
                    <XAxis
                      dataKey="age"
                      label={{
                        value: "Age (years)",
                        position: "insideBottomRight",
                        offset: -5,
                      }}
                      domain={[0, 4]}
                      interval={1}
                    />
                    <YAxis
                      domain={[45, 120]}
                      label={{
                        value: "Height (cm)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <CartesianGrid strokeDasharray="3 6" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="height"
                      stroke="#8884d8"
                      name="Recorded Height"
                    />
                    <Line
                      type="monotone"
                      dataKey="p3"
                      stroke="#ff7300"
                      strokeDasharray="3 3"
                      name="3rd Percentile"
                    />
                    <Line
                      type="monotone"
                      dataKey="p15"
                      stroke="#387908"
                      strokeDasharray="3 3"
                      name="15th Percentile"
                    />
                    <Line
                      type="monotone"
                      dataKey="p50"
                      stroke="#8884d8"
                      strokeDasharray="3 3"
                      name="50th Percentile"
                    />
                    <Line
                      type="monotone"
                      dataKey="p85"
                      stroke="#82ca9d"
                      strokeDasharray="3 3"
                      name="85th Percentile"
                    />
                    <Line
                      type="monotone"
                      dataKey="p97"
                      stroke="#ffc658"
                      strokeDasharray="3 3"
                      name="97th Percentile"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default GrowthCurveHeightModal;
