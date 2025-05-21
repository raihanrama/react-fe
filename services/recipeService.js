const API_URL = 'http://127.0.0.1:5000/api';

export async function fetchRecipe(foodName) {
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
  }
  