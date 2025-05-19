import React, { useState } from 'react';
import { getRecommendationByNutrition, getRecommendationByBMI } from '../services/api';
import RecommendationResult from '../components/RecommendationResult';
import '../recommendation.css'; 

// Komponen Modal
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

// Komponen Emoji Interaktif dengan Tombol
const MethodCard = ({ type, onClick, isActive }) => {
  const methods = {
    nutrition: {
      emoji: "🥗",
      title: "Rekomendasi Berdasarkan Nutrisi",
      description: "Dapatkan rekomendasi makanan berdasarkan kebutuhan nutrisi harian Anda. Masukkan jumlah kalori, protein, lemak, dan karbohidrat yang Anda butuhkan untuk mendapatkan saran makanan yang sesuai dengan target nutrisi Anda.",
      buttonText: "Dapatkan Rekomendasi"
    },
    bmi: {
      emoji: "⚖️",
      title: "Rekomendasi Berdasarkan BMI",
      description: "Dapatkan rekomendasi makanan berdasarkan nilai BMI (Body Mass Index) Anda. Masukkan berat dan tinggi badan Anda untuk mendapatkan saran makanan yang sesuai dengan kondisi berat badan dan kebutuhan tubuh Anda.",
      buttonText: "Dapatkan Rekomendasi"
    }
  };
  
  return (
    <div className={`method-card ${isActive ? 'active' : ''}`}>
      <div className="method-icon">{methods[type].emoji}</div>
      <div className="method-content">
        <h3 className="method-title">{methods[type].title}</h3>
        <p className="method-description">{methods[type].description}</p>
        <button 
          className="method-button" 
          onClick={onClick}
        >
          {methods[type].buttonText}
        </button>
      </div>
    </div>
  );
};

function Recommendation() {
  const [recommendationType, setRecommendationType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nutritionFormData, setNutritionFormData] = useState({
    calories: '',
    proteins: '',
    fat: '',
    carbohydrate: '',
    meal_time: ''
  });
  const [bmiFormData, setBmiFormData] = useState({
    weight: '',
    height: '',
    meal_time: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleTypeSelection = (type) => {
    setRecommendationType(type);
    setIsModalOpen(true);
    setResult(null);
    setError(null);
    setFormSubmitted(false);
  };

  const closeModal = () => {
    if (!formSubmitted) {
      setRecommendationType('');
    }
    setIsModalOpen(false);
  };

  const handleNutritionInputChange = (e) => {
    const { name, value } = e.target;
    setNutritionFormData({
      ...nutritionFormData,
      [name]: name === 'meal_time' ? value : parseFloat(value) || ''
    });
  };

  const handleBmiInputChange = (e) => {
    const { name, value } = e.target;
    setBmiFormData({
      ...bmiFormData,
      [name]: name === 'meal_time' ? value : parseFloat(value) || ''
    });
  };

  const handleNutritionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await getRecommendationByNutrition({
        ...nutritionFormData,
        calories: parseFloat(nutritionFormData.calories),
        proteins: parseFloat(nutritionFormData.proteins),
        fat: parseFloat(nutritionFormData.fat),
        carbohydrate: parseFloat(nutritionFormData.carbohydrate)
      });
      if (response.status === 'success') {
        setResult(response);
        setFormSubmitted(true);
        setIsModalOpen(false);
      } else {
        setError(response.message || 'Terjadi kesalahan saat mendapatkan rekomendasi');
      }
    } catch (error) {
      setError('Gagal terhubung ke server');
      console.error('Error getting nutrition recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBmiSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await getRecommendationByBMI({
        ...bmiFormData,
        weight: parseFloat(bmiFormData.weight),
        height: parseFloat(bmiFormData.height)
      });
      if (response.status === 'success') {
        setResult(response);
        setFormSubmitted(true);
        setIsModalOpen(false);
      } else {
        setError(response.message || 'Terjadi kesalahan saat mendapatkan rekomendasi');
      }
    } catch (error) {
      setError('Gagal terhubung ke server');
      console.error('Error getting BMI recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRecommendationType('');
    setNutritionFormData({
      calories: '',
      proteins: '',
      fat: '',
      carbohydrate: '',
      meal_time: ''
    });
    setBmiFormData({
      weight: '',
      height: '',
      meal_time: ''
    });
    setResult(null);
    setError(null);
    setFormSubmitted(false);
  };

  return (
    <div className="recommendation-page">
      <div className="recommendation-header">
        <h1>Rekomendasi Makanan <span className="food-emoji">🍽️</span></h1>
      </div>

      {formSubmitted && recommendationType && (
        <div className="selected-method">
          <p>Anda memilih rekomendasi: 
            <span className="method-badge">
              {recommendationType === 'nutrition' ? '🥗 Berdasarkan Nutrisi' : '⚖️ Berdasarkan BMI'}
            </span>
            <button className="reset-button" onClick={resetForm}>
              <span className="reset-icon">🔄</span> Ubah Pilihan
            </button>
          </p>
        </div>
      )}

      {!formSubmitted && (
        <div className="recommendation-selection-container">
          <div className="recommendation-info">
            <h2>Pilih Metode Rekomendasi</h2>
            <p>
              Sistem ini membantu Anda mendapatkan rekomendasi makanan yang sesuai dengan kebutuhan gizi atau indeks massa tubuh Anda. 
              Pilih salah satu metode di samping untuk mendapatkan rekomendasi yang dipersonalisasi.
            </p>
            <p>
              Setiap rekomendasi disusun berdasarkan database makanan lokal Indonesia dengan mempertimbangkan komposisi nutrisi 
              dan keseimbangan gizi yang diperlukan untuk menjaga kesehatan optimal.
            </p>
            <p>
              Kami menyediakan dua metode rekomendasi yang dapat disesuaikan dengan kebutuhan Anda:
            </p>
            <ul className="method-info-list">
              <li>
                <strong>Metode Nutrisi</strong>
              </li>
              <li>
                <strong>Metode BMI</strong>
              </li>
            </ul>
          </div>
          
          <div className="method-cards">
            <MethodCard 
              type="nutrition" 
              onClick={() => handleTypeSelection('nutrition')} 
              isActive={recommendationType === 'nutrition'}
            />
            <MethodCard 
              type="bmi" 
              onClick={() => handleTypeSelection('bmi')} 
              isActive={recommendationType === 'bmi'}
            />
          </div>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen && recommendationType === 'nutrition'} 
        onClose={closeModal}
        title="Rekomendasi Berdasarkan Nutrisi 🥗"
      >
        <form onSubmit={handleNutritionSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="calories">Kalori (kal) <span className="emoji-icon">🔥</span></label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={nutritionFormData.calories}
              onChange={handleNutritionInputChange}
              required
              min="0"
              placeholder="Masukkan jumlah kalori"
            />
          </div>
          <div className="form-group">
            <label htmlFor="proteins">Protein (g) <span className="emoji-icon">🥩</span></label>
            <input
              type="number"
              id="proteins"
              name="proteins"
              value={nutritionFormData.proteins}
              onChange={handleNutritionInputChange}
              required
              min="0"
              placeholder="Masukkan jumlah protein"
            />
          </div>
          <div className="form-group">
            <label htmlFor="fat">Lemak (g) <span className="emoji-icon">🧈</span></label>
            <input
              type="number"
              id="fat"
              name="fat"
              value={nutritionFormData.fat}
              onChange={handleNutritionInputChange}
              required
              min="0"
              placeholder="Masukkan jumlah lemak"
            />
          </div>
          <div className="form-group">
            <label htmlFor="carbohydrate">Karbohidrat (g) <span className="emoji-icon">🍚</span></label>
            <input
              type="number"
              id="carbohydrate"
              name="carbohydrate"
              value={nutritionFormData.carbohydrate}
              onChange={handleNutritionInputChange}
              required
              min="0"
              placeholder="Masukkan jumlah karbohidrat"
            />
          </div>
          <div className="form-group">
            <label htmlFor="meal_time">Waktu Makan <span className="emoji-icon">🕒</span></label>
            <select
              id="meal_time"
              name="meal_time"
              value={nutritionFormData.meal_time}
              onChange={handleNutritionInputChange}
              required
            >
              <option value="">Pilih Waktu Makan</option>
              <option value="Pagi">Pagi</option>
              <option value="Siang">Siang</option>
              <option value="Malam">Malam</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={closeModal}>
              Batal
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Memproses...' : 'Dapatkan Rekomendasi'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isModalOpen && recommendationType === 'bmi'} 
        onClose={closeModal}
        title="Rekomendasi Berdasarkan BMI ⚖️"
      >
        <form onSubmit={handleBmiSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="weight">Berat Badan (kg) <span className="emoji-icon">⚖️</span></label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={bmiFormData.weight}
              onChange={handleBmiInputChange}
              required
              min="0"
              step="0.1"
              placeholder="Masukkan berat badan Anda"
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Tinggi Badan (cm) <span className="emoji-icon">📏</span></label>
            <input
              type="number"
              id="height"
              name="height"
              value={bmiFormData.height}
              onChange={handleBmiInputChange}
              required
              min="0"
              step="0.1"
              placeholder="Masukkan tinggi badan Anda"
            />
          </div>
          <div className="form-group">
            <label htmlFor="meal_time">Waktu Makan <span className="emoji-icon">🕒</span></label>
            <select
              id="meal_time"
              name="meal_time"
              value={bmiFormData.meal_time}
              onChange={handleBmiInputChange}
              required
            >
              <option value="">Pilih Waktu Makan</option>
              <option value="Pagi">Pagi</option>
              <option value="Siang">Siang</option>
              <option value="Malam">Malam</option>
            </select>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={closeModal}>
              Batal
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Memproses...' : 'Dapatkan Rekomendasi'}
            </button>
          </div>
        </form>
      </Modal>

      {error && (
        <div className="error-message">
          <span className="error-icon">❌</span> {error}
        </div>
      )}

      {result && (
        <div className="result-container">
          <div className="result-header">
            <h2>Hasil Rekomendasi <span className="result-emoji">✨</span></h2>
          </div>
          <RecommendationResult result={result} />
        </div>
      )}
    </div>
  );
}

export default Recommendation;