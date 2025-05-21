const API_URL = 'http://127.0.0.1:5000/api';

export const getRecommendationByNutrition = async (nutritionData) => {
  try {
    const response = await fetch(`${API_URL}/recommend/nutrition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nutritionData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching nutrition recommendations:', error);
    throw error;
  }
};

export const getRecommendationByBMI = async (bmiData) => {
  try {
    const response = await fetch(`${API_URL}/recommend/bmi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bmiData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching BMI recommendations:', error);
    throw error;
  }
};

export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error('Error checking API health:', error);
    throw error;
  }
};

export const getAllFoods = async () => {
  try {
    const response = await fetch(`${API_URL}/foods`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching all foods:', error);
    throw error;
  }
};

export const fetchChatReply = async (question, history) => {
  try {
    const response = await fetch(`${API_URL}/chat_reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history }),
    });

    const data = await response.json();
    return data.answer || 'Maaf, tidak ada jawaban dari AI.';
  } catch (error) {
    console.error('Error fetching chat reply:', error);
    throw error;
  }
};


export const fetchRecipe = async (foodName) => {
  try {
    const response = await fetch(`${API_URL}/get_recipe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food_name: foodName }),
    });

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return 'Gagal mendapatkan resep.';
  }
};

export const fetchDescription = async (foodName) => {
  try {
    const response = await fetch(`${API_URL}/get_description`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food_name: foodName }),
    });

    const data = await response.json();
    return data.description;
  } catch (error) {
    console.error('Error fetching description:', error);
    return 'Gagal mendapatkan deskripsi makanan.';
  }
};

