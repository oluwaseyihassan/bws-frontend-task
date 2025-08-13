import api from "./api";

export const getPredictions = async (date: string, filterByPercentage: number = 40) => {
  const response = await api.get(`/prediction/${date}?include=predictions.type;participants&filters=predictionTypes:237&filterByPercentage=${filterByPercentage}`);
  if (response.status < 200 || response.status >= 300) {
    throw new Error('Failed to fetch predictions');
  }
  console.log('Predictions fetched successfully:', response.data);
  return response.data;
};
