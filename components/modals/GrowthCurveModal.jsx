import { useState } from "react";
import ModalTitle from "../text/ModalTitle";
import CloseButton from "../buttons/CloseButton";
import Modal from "./Portal";
import { MdAutoGraph } from "react-icons/md";
import {
  LineChart,
  Line,
  AreaChart,
  Tooltip,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { data } from "../../data/growth";

const GrowthCurveModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {!showModal && (
        <button
          onClick={() => {
            setShowModal(true);
            if (typeof window != "undefined" && window.document) {
              document.body.style.overflow = "hidden";
            }
          }}
          className="bg-white z-30
  p-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none"
          type="button"
        >
          <MdAutoGraph size={35} className="text-blue-300" />
        </button>
      )}

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
                  <ModalTitle title="Growth curve" />
                  <CloseButton
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </div>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
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
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="uv"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="pv"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorPv)"
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

export default GrowthCurveModal;
