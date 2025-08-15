import api from "./api";

export const getPredictions = async (date: string, filterByPercentage: number = 50) => {
  const response = await api.get(`/prediction/${date}?include=predictions.type;participants;league.country&filters=predictionTypes:237&filterByPercentage=${filterByPercentage}`);
  if (response.status < 200 || response.status >= 300) {
    throw new Error('Failed to fetch predictions');
  }
  console.log('Predictions fetched successfully:', response.data);
  return response.data;
};

export const getFixturesByName = async (name: string) => {
  const response = await api.get(`/prediction/name/${name}?include=predictions.type;participants;league.country&filters=todayDate;predictionTypes:237`);
  console.log(response.data)
  if (response.status < 200 || response.status >= 300) {
    throw new Error('Failed to fetch fixtures');
  }
  console.log('Fixtures fetched successfully:', response.data);
  return response.data;
}
