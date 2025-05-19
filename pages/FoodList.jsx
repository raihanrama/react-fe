import React, { useState, useEffect } from 'react';
import { getAllFoods, fetchDescription } from '../services/api';
import '../FoodList.css';

const CalorieIcon = () => <span className="food-list-nutrition-icon">🔥</span>;
const ProteinIcon = () => <span className="food-list-nutrition-icon">🥩</span>;
const CarbsIcon = () => <span className="food-list-nutrition-icon">🍚</span>;
const FatIcon = () => <span className="food-list-nutrition-icon">🧈</span>;
const PortionIcon = () => <span className="food-list-portion-icon">🍽️</span>;
const InfoIcon = () => <span className="food-list-info-icon">ℹ️</span>;
const DescriptionIcon = () => <span className="food-list-description-icon">📝</span>;

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [foodTypeFilter, setFoodTypeFilter] = useState('all');
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [activeFilterBadge, setActiveFilterBadge] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25);
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedFood, setSelectedFood] = useState(null);
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descriptionLoading, setDescriptionLoading] = useState(false);

  const CALORIE_THRESHOLD = 300;

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await getAllFoods();

        if (response.status === 'success') {
          const processedFoods = response.foods.map((food) => ({
            ...food,
            foodType: food.calories > CALORIE_THRESHOLD ? 'heavy' : 'light',
          }));

          setFoods(processedFoods);
          setFilteredFoods(processedFoods);
        } else {
          setError(response.message || 'Gagal memuat data makanan');
        }
      } catch (err) {
        setError('Gagal memuat data makanan');
        console.error('Error fetching foods:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  useEffect(() => {
    let result = foods;

    if (foodTypeFilter !== 'all') {
      result = result.filter((food) => food.foodType === foodTypeFilter);
      setActiveFilterBadge(
        foodTypeFilter === 'heavy' ? 'Makanan Berat' : 'Makanan Ringan'
      );
    } else {
      setActiveFilterBadge(null);
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((food) => food.name.toLowerCase().includes(searchLower));
    }

    setFilteredFoods(result);
    setCurrentPage(1);
  }, [foodTypeFilter, searchTerm, foods]);

  const handleFilterChange = (e) => {
    setFoodTypeFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilter = () => {
    setFoodTypeFilter('all');
  };

  const openModal = async (food) => {
    setSelectedFood(food);
    setDescription('');
    setIsModalOpen(true);
    setDescriptionLoading(true);

    try {
      const desc = await fetchDescription(food.name);
      setDescription(desc);
    } catch (err) {
      setDescription('Gagal memuat deskripsi.');
    } finally {
      setDescriptionLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
    setDescription('');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getPageRange = () => {
    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  if (loading) {
    return (
      <div className="food-list-loading-container">
        <div className="food-list-loading-spinner"></div>
        <p>Memuat daftar makanan...</p>
      </div>
    );
  }

  if (error) {
    return <div className="food-list-error-message">{error}</div>;
  }

  return (
    <div className="food-list-page">
      <div className="food-list-header">
        <div className="food-list-header-top">
          <h1 className="food-list-title">Daftar Makanan</h1>
          <div className="food-list-stats">
            <span className="food-list-count">{filteredFoods.length} makanan ditemukan</span>
          </div>
        </div>
      </div>

      <div className="food-list-controls">
        <div className="food-list-search">
          <input
            type="text"
            placeholder="Cari makanan..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="food-list-search-input"
          />
        </div>

        <div className="food-list-filter">
          <label htmlFor="foodTypeFilter">Filter:</label>
          <select
            id="foodTypeFilter"
            value={foodTypeFilter}
            onChange={handleFilterChange}
            className="food-list-filter-select"
          >
            <option value="all">Semua Makanan</option>
            <option value="heavy">Makanan Berat</option>
            <option value="light">Makanan Ringan</option>
          </select>

          {activeFilterBadge && (
            <div className="food-list-active-filter">
              {activeFilterBadge}
              <button className="food-list-clear-filter" onClick={clearFilter}>
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="food-list-grid">
        {currentItems.length > 0 ? (
          currentItems.map((food, index) => (
            <div
              key={index}
              className="food-list-card"
              onClick={() => openModal(food)}
              style={{ cursor: 'pointer' }}
            >
              <div className="food-list-image-container">
                <img
                  src={
                    food.image ||
                    `https://via.placeholder.com/300x200?text=${encodeURIComponent(food.name)}`
                  }
                  alt={food.name}
                  className="food-list-image"
                />
                <span className={`food-list-type-badge food-list-type-${food.foodType}`}>
                  {food.foodType === 'heavy' ? 'Makanan Berat' : 'Makanan Ringan'}
                </span>
              </div>
              <div className="food-list-content">
                <h2 className="food-list-name">{food.name}</h2>
                <div className="food-list-nutrition">
                  <div className="food-list-nutrition-item"><CalorieIcon /> {food.calories} kal</div>
                  <div className="food-list-nutrition-item"><ProteinIcon /> {food.proteins} g</div>
                  <div className="food-list-nutrition-item"><CarbsIcon /> {food.carbohydrate} g</div>
                  <div className="food-list-nutrition-item"><FatIcon /> {food.fat} g</div>
                </div>
              </div>
              <div className="food-list-portion-info">
                <PortionIcon /> <span>Porsi: 1 porsi</span>
              </div>
            </div>
          ))
        ) : (
          <div className="food-list-empty-message">
            <div className="food-list-empty-icon">🍽️</div>
            <p>Tidak ada makanan yang sesuai dengan filter yang dipilih.</p>
            <button
              className="food-list-reset-button"
              onClick={() => {
                setFoodTypeFilter('all');
                setSearchTerm('');
              }}
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {filteredFoods.length > itemsPerPage && (
        <div className="food-list-pagination">
          <button onClick={() => paginate(1)} disabled={currentPage === 1}>&laquo;</button>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
          {getPageRange().map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? 'active' : ''}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(filteredFoods.length / itemsPerPage)}
          >&gt;</button>
          <button
            onClick={() => paginate(Math.ceil(filteredFoods.length / itemsPerPage))}
            disabled={currentPage === Math.ceil(filteredFoods.length / itemsPerPage)}
          >&raquo;</button>
          <div className="food-list-pagination-info">
            Halaman {currentPage} dari {Math.ceil(filteredFoods.length / itemsPerPage)}
          </div>
        </div>
      )}

      {/* MODAL INFORMASI MAKANAN */}
      {isModalOpen && selectedFood && (
        <div className="food-list-modal-overlay" onClick={closeModal}>
          <div className="food-list-modal" onClick={(e) => e.stopPropagation()}>
            <button className="food-list-modal-close" onClick={closeModal}>&times;</button>
            
            <div className="food-list-modal-header">
              <div className="food-list-modal-image-container">
                <img
                  src={
                    selectedFood.image ||
                    `https://via.placeholder.com/800x400?text=${encodeURIComponent(selectedFood.name)}`
                  }
                  alt={selectedFood.name}
                  className="food-list-modal-image"
                />
                <span className={`food-list-modal-image-badge food-list-modal-type-${selectedFood.foodType}`}>
                  {selectedFood.foodType === 'heavy' ? 'Makanan Berat' : 'Makanan Ringan'}
                </span>
              </div>
              
              <h2 className="food-list-modal-title">{selectedFood.name}</h2>
            </div>
            
            <div className="food-list-modal-content">
              <div className="food-list-modal-description-section">
                <div className="food-list-modal-section-header">
                  <DescriptionIcon />
                  <h3>Deskripsi Makanan</h3>
                </div>
                <div className="food-list-modal-section-content">
                  {descriptionLoading ? (
                    <div className="food-list-modal-loading">
                      <div className="food-list-modal-loading-spinner"></div>
                      <p>Memuat deskripsi...</p>
                    </div>
                  ) : (
                    <p className="food-list-modal-description-text">{description}</p>
                  )}
                </div>
              </div>
              
              <div className="food-list-modal-nutrition-section">
                <div className="food-list-modal-section-header">
                  <InfoIcon />
                  <h3>Informasi Gizi</h3>
                </div>
                <div className="food-list-modal-section-content">
                  <div className="food-list-modal-food-type">
                    <div className={`food-list-modal-food-type-indicator food-list-modal-type-${selectedFood.foodType}`}>
                      {selectedFood.foodType === 'heavy' ? 'Makanan Berat' : 'Makanan Ringan'}
                    </div>
                  </div>
                  
                  <div className="food-list-modal-nutrition-grid">
                    <div className="food-list-modal-nutrition-item">
                      <CalorieIcon />
                      <div className="food-list-modal-nutrition-details">
                        <span className="food-list-modal-nutrition-label">Kalori</span>
                        <span className="food-list-modal-nutrition-value">{selectedFood.calories}</span>
                        <span className="food-list-modal-nutrition-unit">kal</span>
                      </div>
                    </div>
                    
                    <div className="food-list-modal-nutrition-item">
                      <ProteinIcon />
                      <div className="food-list-modal-nutrition-details">
                        <span className="food-list-modal-nutrition-label">Protein</span>
                        <span className="food-list-modal-nutrition-value">{selectedFood.proteins}</span>
                        <span className="food-list-modal-nutrition-unit">g</span>
                      </div>
                    </div>
                    
                    <div className="food-list-modal-nutrition-item">
                      <CarbsIcon />
                      <div className="food-list-modal-nutrition-details">
                        <span className="food-list-modal-nutrition-label">Karbohidrat</span>
                        <span className="food-list-modal-nutrition-value">{selectedFood.carbohydrate}</span>
                        <span className="food-list-modal-nutrition-unit">g</span>
                      </div>
                    </div>
                    
                    <div className="food-list-modal-nutrition-item">
                      <FatIcon />
                      <div className="food-list-modal-nutrition-details">
                        <span className="food-list-modal-nutrition-label">Lemak</span>
                        <span className="food-list-modal-nutrition-value">{selectedFood.fat}</span>
                        <span className="food-list-modal-nutrition-unit">g</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="food-list-modal-portion">
                    <PortionIcon />
                    <span>Porsi Standard: 1 porsi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodList;