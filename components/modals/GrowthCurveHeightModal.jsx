import { useState, useEffect } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { VscSymbolRuler } from "react-icons/vsc";
import {
  AreaChart,
  Tooltip,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import Growth from "../../data/growth";

const GrowthCurveHeightModal = () => {
  const [showModal, setShowModal] = useState(false);
  const data = Growth();

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setShowModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
          }
        }}
        className="bg-white z-30 group
  p-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none"
        type="button"
      >
        <VscSymbolRuler size={35} className="text-teal-300 _scale-rotate" />
      </button>

      <Modal>
        {showModal && (
          <>
            <div
              onClick={() => {
                setShowModal(false);
                document.body.style.overflow = "unset";
              }}
              className={`inset-0 fixed bg-black bg-opacity-30 z-20 backdrop-blur-sm ${
                showModal ? "block" : "hidden"
              }`}
            ></div>
            <div className="fixed z-40 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
              <div className="flex w-[90vw] h-[90vh] sm:w-[80vw] rounded-lg p-3 relative flex-col bg-white overflow-auto pb-[85px]">
                <div className="flex justify-between mb-4">
                  <ModalTitle title="Growth Height curve (cm)" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} className="-ml-5">
                    <defs>
                      <linearGradient
                        id="colorheight"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="dateCreated" />
                    <YAxis type="number" domain={[0, 150]} />
                    <CartesianGrid strokeDasharray="3 6" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="height"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorheight)"
                    />
                  </AreaChart>
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
