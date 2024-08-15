import React, { useState, useEffect } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import ImageUploader from "./ImageUploader";

async function loadModel() {
  await tf.setBackend("webgl"); // or 'cpu', 'wasm' as a fallback
  await tf.ready(); // Ensure the backend is ready
  const model = await cocoSsd.load();
  return model;
}

const ClothesDetection = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const initializeModel = async () => {
      const loadedModel = await loadModel();
      setModel(loadedModel);
    };
    initializeModel();
  }, []);

  const handleImageUpload = async (imageData) => {
    setImageSrc(imageData);

    if (model) {
      const img = new Image();
      img.src = imageData;
      img.onload = async () => {
        const predictions = await model.detect(img);
        setPredictions(predictions);
      };
    }
  };

  return (
    <div>
      <ImageUploader onImageUpload={handleImageUpload} />
      {imageSrc && (
        <div>
          <img src={imageSrc} alt="Uploaded" className="mt-4" />
          {predictions.length > 0 && (
            <ul className="mt-4">
              {predictions.map((prediction, index) => (
                <li key={index}>
                  {prediction.class} - {Math.round(prediction.score * 100)}%
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ClothesDetection;
