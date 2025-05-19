import React, { useEffect } from 'react';
import FoodCard from './FoodCard';

function RecommendationResult({ result }) {
  useEffect(() => {
    console.log('Full Result Object:', result);
    if (result?.request_data) {
      console.log('Request Data:', result.request_data);
      console.log('Meal Time Selected:', 
        result.request_data?.meal_time || 
        result.request_data?.mealTime || 
        'Tidak Terdeteksi'
      );
    }
  }, [result]);

  if (!result) return null;

  // Meal time mapping dengan tambahan debugging
  const mealTimeMap = {
    "Pagi": { icon: "🌅", description: "Sarapan", type: "Makanan Ringan" },
    "Siang": { icon: "☀️", description: "Makan Siang", type: "Makanan Berat" },
    "Malam": { icon: "🌙", description: "Makan Malam", type: "Makanan Berat" }
  };

  // Perbaikan pemilihan waktu makan dengan path yang lebih robust
  const selectedMealTime = 
    (result.request_data?.meal_time) || 
    (result.request_data?.mealTime) || 
    (result.meal_time) || 
    (result.mealTime) || 
    "Siang";

  const mealTimeInfo = mealTimeMap[selectedMealTime] || mealTimeMap["Siang"];

  return (
    <div className="recommendation-result">
      {result.bmi && (
        <div className="bmi-result-container">
          <div className="result-panel bmi-panel">
            <div className="panel-header">
              <h3><span className="panel-icon">📊</span> Hasil BMI</h3>
            </div>
            <div className="bmi-metrics">
              <div className="bmi-metric-item">
                <div className="metric-value">{result.bmi}</div>
                <div className="metric-label">BMI</div>
              </div>
              <div className="bmi-metric-item">
                <div className="metric-value">{result.bmi_category}</div>
                <div className="metric-label">Kategori</div>
              </div>
            </div>
          </div>

          <div className="result-panel nutrition-panel">
            <div className="panel-header">
              <h3><span className="panel-icon">🍽️</span> Kebutuhan Nutrisi Harian</h3>
            </div>
            <div className="nutrition-grid">
              <div className="nutrition-item">
                <span className="nutrition-icon">🔥</span>
                <div className="nutrition-details">
                  <div className="nutrition-value">{result.nutrition_needs.calories}</div>
                  <div className="nutrition-label">Kalori (kal)</div>
                </div>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-icon">🥩</span>
                <div className="nutrition-details">
                  <div className="nutrition-value">{result.nutrition_needs.proteins}</div>
                  <div className="nutrition-label">Protein (g)</div>
                </div>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-icon">🧈</span>
                <div className="nutrition-details">
                  <div className="nutrition-value">{result.nutrition_needs.fat}</div>
                  <div className="nutrition-label">Lemak (g)</div>
                </div>
              </div>
              <div className="nutrition-item">
                <span className="nutrition-icon">🍚</span>
                <div className="nutrition-details">
                  <div className="nutrition-value">{result.nutrition_needs.carbohydrate}</div>
                  <div className="nutrition-label">Karbohidrat (g)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meal Time Information Section */}
      <div className="result-panel meal-time-panel">
        <div className="panel-header">
          <h3>
            <span className="panel-icon">{mealTimeInfo.icon}</span> 
            Waktu Makan: {selectedMealTime}
          </h3>
        </div>
        <div className="meal-time-details">
          <div className="meal-time-item">
            <div className="meal-time-label">Waktu</div>
            <div className="meal-time-value">{mealTimeInfo.description}</div>
          </div>
          <div className="meal-time-item">
            <div className="meal-time-label">Jenis Makanan</div>
            <div className="meal-time-value">{mealTimeInfo.type}</div>
          </div>
        </div>
      </div>

      <div className="result-panel food-recommendations-panel">
        <div className="panel-header">
          <h3>
            <span className="panel-icon">🍲</span> Rekomendasi Makanan
            <span className="food-count">
              {result.recommendations ? result.recommendations.length : 0} makanan
            </span>
          </h3>
        </div>
        <div className="food-description">
          <p>Berikut adalah pilihan makanan yang sesuai dengan kebutuhan nutrisi Anda:</p>
        </div>
        
        {/* Styled container for the food cards */}
        <div className="foods-grid">
          {result.recommendations && result.recommendations.map((food, index) => {
            // Add foodType to each food object based on selected meal time
            const foodWithType = {
              ...food,
              foodType: mealTimeInfo.type
            };
            return <FoodCard key={`food-${index}`} food={foodWithType} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default RecommendationResult;