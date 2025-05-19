import React, { useState } from 'react';
import RecipeModal from './RecipeModal'; 
import { fetchRecipe } from '../services/recipeService'; 

function FoodCard({ food }) {
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  if (!food) return null;

  // Add null check for nutrition
  const nutrition = food.nutrition || {};

  const handleGetRecipe = async () => {
    // First open the modal, then start loading
    setIsRecipeModalOpen(true);
    setLoading(true);
    
    try {
      // Kita tambahkan sedikit delay untuk memastikan modal terbuka dulu
      // sehingga loading indicator akan terlihat
      const recipeText = await fetchRecipe(food.name);
      setRecipe(recipeText);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setRecipe('Resep tidak tersedia saat ini.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsRecipeModalOpen(false);
    // Reset state saat modal ditutup
    setRecipe('');
  };

  // Menentukan warna badge berdasarkan jenis makanan
  const getBadgeColor = () => {
    if (food.foodType === 'light' || food.foodType === 'Makanan Ringan') {
      return 'fc-badge-light';
    } else {
      return 'fc-badge-heavy';
    }
  };

  // Menentukan text label yang ditampilkan
  const getFoodTypeLabel = () => {
    if (food.foodType === 'light' || food.foodType === 'Makanan Ringan') {
      return 'Makanan Ringan';
    } else {
      return 'Makanan Berat';
    }
  };

  return (
    <>
      <div className="fc-card fc-group">
        <div className="fc-image-container">
          <img 
            src={food.image || '/images/default-food.jpg'} 
            alt={food.name} 
            className="fc-image"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = '/images/default-food.jpg';
            }}
          />
          <div className="fc-overlay"></div>
          
          {/* Badge jenis makanan */}
          <span className={`fc-badge ${getBadgeColor()}`}>
            {getFoodTypeLabel()}
          </span>
        </div>
        <div className="fc-content">
          <h4 className="fc-name">{food.name}</h4>
          <div className="fc-nutrition">
            <div className="fc-nutrition-item">
              <span className="fc-icon">🔥</span>
              <span>{food.calories || 0} kal</span>
            </div>
            <div className="fc-nutrition-item">
              <span className="fc-icon">🥩</span>
              <span>{food.proteins || 0}g</span>
            </div>
            <div className="fc-nutrition-item">
              <span className="fc-icon">🧈</span>
              <span>{food.fat || 0}g</span>
            </div>
            <div className="fc-nutrition-item">
              <span className="fc-icon">🍚</span>
              <span>{food.carbohydrate || 0}g</span>
            </div>
          </div>
          {food.description && (
            <p className="fc-description">
              {food.description}
            </p>
          )}
          <div className="fc-portion">
            <span className="fc-portion-icon">🍽️</span>
            <span>Porsi: {food.portion || '1 porsi'}</span>
          </div>
          
          {/* Tombol Lihat Resep */}
          <button 
            onClick={handleGetRecipe}
            className="fc-recipe-button"
            disabled={loading}
          >
            {loading && !isRecipeModalOpen ? 'Memuat...' : (
              <>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="fc-recipe-icon" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="13" x2="12" y2="17" />
                  <line x1="12" y1="17" x2="16" y2="15" />
                  <line x1="12" y1="17" x2="8" y2="15" />
                </svg>
                Lihat Resep
              </>
            )}
          </button>
        </div>
      </div>

      {/* Modal Resep */}
      <RecipeModal 
        isOpen={isRecipeModalOpen}
        onClose={handleCloseModal}
        recipe={recipe}
        isLoading={loading}
      />
    </>
  );
}

export default FoodCard;