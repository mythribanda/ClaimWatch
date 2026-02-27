const axios = require("axios");

const ML_API_URL = process.env.ML_API_URL || "http://localhost:8000/predict";

exports.predictFraud = async (data) => {
  try {
    const response = await axios.post(ML_API_URL, data, {
      headers: { "Content-Type": "application/json" },
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error("Error calling ML API:", error.message);
    throw new Error("Failed to get prediction from ML service");
  }
};

