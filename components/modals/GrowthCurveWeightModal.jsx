import { useState, useEffect, useMemo } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { TbScaleOutline } from "react-icons/tb";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useGrowth from "../../data/useGrowth";
import { combineData } from "../../data/useGrowth";
import { useBabies } from "../../context/BabiesContext";

const GrowthCurveWeightModal = () => {
  const [showModal, setShowModal] = useState(false);
  const growthData = useGrowth();
  const { babyData } = useBabies();
  const dob = useMemo(
    () => new Date(babyData?.date?.seconds * 1000),
    [babyData?.date?.seconds]
  );

  const combinedData = combineData(growthData, dob, "weight");

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

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-purple-50 aspect-square border-2 flex items-center justify-center border-purple-400 h-[50px] w-[50px] z-30 group p-3 rounded-xl outline-none focus:outline-none"
        type="button"
      >
        <TbScaleOutline size={35} className="text-purple-400 _scale-rotate" />
      </button>

      <Modal>
        {showModal && (
          <>
            <div
              onClick={handleCloseModal}
              className="inset-0 fixed bg-black bg-opacity-30 z-20 backdrop-blur-sm"
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90vw] h-[90vh] sm:w-[80vw]">
              <div className="flex w-full h-full rounded-lg p-3 relative flex-col bg-white">
                <div className="flex justify-between mb-4">
                  <ModalTitle title="Child Growth Percentiles: Weight Curve" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={handleCloseModal}
                  />
                </div>
                <div className="overflow-x-auto h-full w-full">
                  <ResponsiveContainer
                    width="200%"
                    height="100%"
                    className="ml-5"
                  >
                    <LineChart data={combinedData} className="-ml-5">
                      <XAxis
                        dataKey="age"
                        label={{
                          value: "Age (years)",
                          position: "insideBottomRight",
                        }}
                        domain={[0, 4]}
                        interval={11}
                      />
                      <YAxis
                        domain={[2, 25]}
                        label={{
                          value: "Weight (kg)",
                          angle: -90,
                          position: "insideLeft",
                        }}
                      />
                      <CartesianGrid strokeDasharray="2 6" />
                      <Legend
                        align="left"
                        iconSize={15}
                        wrapperStyle={{
                          marginLeft: "60px",
                          backgroundColor: "#f9fafb",
                          borderRadius: "4px",
                          padding: "8px",
                          color: "#4b5563",
                          width: "auto",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#3730a3"
                        name="Recorded"
                        strokeWidth={2}
                        animationDuration={5000}
                      />
                      <Line
                        type="monotone"
                        dataKey="p3"
                        stroke="#86efac"
                        name="P3"
                      />
                      <Line
                        type="monotone"
                        dataKey="p15"
                        stroke="#5eead4"
                        name="P15"
                      />
                      <Line
                        type="monotone"
                        dataKey="p50"
                        stroke="#67e8f9"
                        name="P50"
                      />
                      <Line
                        type="monotone"
                        dataKey="p85"
                        stroke="#7dd3fc"
                        name="P85"
                      />
                      <Line
                        type="monotone"
                        dataKey="p97"
                        stroke="#c4b5fd"
                        name="P97"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default GrowthCurveWeightModal;
