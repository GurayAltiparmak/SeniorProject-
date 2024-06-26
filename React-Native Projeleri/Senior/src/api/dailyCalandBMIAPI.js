import { rapidAPIBMIKey } from "../config/bmiDailyCalConfig";

const baseUrl = 'https://nutrition-calculator.p.rapidapi.com';

const apiCall = async (url) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': rapidAPIBMIKey,
        'x-rapidapi-host': 'nutrition-calculator.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

export const fetchBMIFromInputs = async (sex, age, height, weight, pregnancy, activityLevel, pregnantWeeks, prePregnantWeight) => {
  const measurementUnits = 'met'; // MET measurement units
  const url = `${baseUrl}/api/nutrition-info?measurement_units=${measurementUnits}&sex=${sex}&age_value=${age}&age_type=yrs&cm=${height}&kilos=${weight}&pregnancy_lactating=${pregnancy}&pregnant_weeks=${pregnantWeeks}&pre_pregnant_kilos=${prePregnantWeight}&activity_level=${activityLevel}`;
  
  try {
    const data = await apiCall(url);
    return data;
  } catch (error) {
    console.error('Error fetching BMI data:', error.message);
    throw error;
  }
};