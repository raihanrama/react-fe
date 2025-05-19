import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { checkApiHealth, getAllFoods } from '../services/api';
import { FaHeartbeat, FaListAlt, FaUtensils, FaAppleAlt, FaCarrot, FaLeaf, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../home.css';

function Home() {
  const [apiStatus, setApiStatus] = useState({ status: 'loading' });
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [activeFeature, setActiveFeature] = useState(0);
  const foodCarouselRef = useRef(null);
  const testimonialCarouselRef = useRef(null);
  
  // Jumlah maksimum sampel makanan yang akan ditampilkan
  const MAX_FOOD_SAMPLES = 12;

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const result = await checkApiHealth();
        setApiStatus(result);
      } catch (error) {
        setApiStatus({ status: 'error', message: 'Failed to connect to API' });
      }
    };

    checkStatus();
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await getAllFoods();
        
        if (response.status === 'success') {
          // Ambil hanya sampel makanan saja
          const sampleFoods = response.foods.slice(0, MAX_FOOD_SAMPLES);
          setFoods(sampleFoods);
        } else {
          console.error('Failed to fetch foods:', response.message);
        }
      } catch (error) {
        console.error('Error fetching foods:', error);
      } finally {
        setLoadingFoods(false);
      }
    };

    fetchFoods();
  }, []);

  // Auto-rotate featured items
  useEffect(() => {
    const featureCount = 3;
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % featureCount);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Feature data
  const features = [
    {
      icon: <FaHeartbeat />,
      title: "Rekomendasi Berdasarkan BMI",
      description: "Dapatkan rekomendasi makanan yang khusus disesuaikan dengan indeks massa tubuh (BMI) Anda untuk mendukung gaya hidup sehat.",
      color: "#4CAF50"
    },
    {
      icon: <FaUtensils />,
      title: "Rekomendasi Berdasarkan Nutrisi",
      description: "Temukan makanan yang sesuai dengan kebutuhan nutrisi spesifik Anda untuk mencapai tujuan kesehatan dan kebugaran.",
      color: "#FF9800"
    },
    {
      icon: <FaListAlt />,
      title: "Daftar Makanan Komprehensif",
      description: "Jelajahi koleksi lengkap makanan bergizi dalam database kami dengan informasi nutrisi yang lengkap dan terperinci.",
      color: "#2196F3"
    }
  ];

  // Testimonial data yang diperluas
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Atlet Profesional",
      content: "Sistem rekomendasi nutrisi ini benar-benar mengubah cara saya menyusun menu harian. Sekarang saya bisa mendapatkan nutrisi optimal untuk performa saya."
    },
    {
      name: "Siti Nurhaliza",
      role: "Diet Enthusiast",
      content: "Aplikasi ini sangat membantu saya dalam merencanakan diet sehat. Rekomendasi berdasarkan BMI sangat akurat dan mudah diikuti."
    },
    {
      name: "Dr. Ahmad Fajar",
      role: "Ahli Gizi",
      content: "Sebagai ahli gizi, saya merekomendasikan sistem ini kepada klien saya. Database makanan yang lengkap dengan nilai nutrisi yang akurat."
    },
    {
      name: "Nadia Putri",
      role: "Fitness Trainer",
      content: "Platform ini adalah alat yang sempurna untuk klien saya. Informasi nutrisi detail dan rekomendasi yang disesuaikan membantu mencapai tujuan kebugaran mereka."
    },
    {
      name: "Reza Wijaya",
      role: "Health Blogger",
      content: "Saya telah mencoba berbagai aplikasi nutrisi, tapi ini yang paling komprehensif. Rekomendasi yang diberikan sangat relevan dan berbasis ilmiah."
    },
    {
      name: "Dewi Permata",
      role: "Ibu Rumah Tangga",
      content: "Platform ini membantu saya menyusun menu sehat untuk keluarga. Anak-anak jadi lebih sehat dan bersemangat dengan makanan bergizi yang saya siapkan."
    }
  ];

  // Fungsi untuk melihat slide makanan sebelumnya
  const scrollFoodPrev = () => {
    if (foodCarouselRef.current) {
      foodCarouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Fungsi untuk melihat slide makanan berikutnya
  const scrollFoodNext = () => {
    if (foodCarouselRef.current) {
      foodCarouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Fungsi untuk melihat slide testimonial sebelumnya
  const scrollTestimonialPrev = () => {
    if (testimonialCarouselRef.current) {
      testimonialCarouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  // Fungsi untuk melihat slide testimonial berikutnya
  const scrollTestimonialNext = () => {
    if (testimonialCarouselRef.current) {
      testimonialCarouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="modern-home">
      {/* Hero Section with Glass Morphism */}
      <section className="hero-glass">
        <div className="hero-glass-content">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="gradient-text"
          >
            Gizi Cerdas untuk Hidup Berkualitas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Temukan rekomendasi nutrisi personal untuk mendukung pola hidup sehat berdasarkan kebutuhan tubuh Anda
          </motion.p>
          <motion.div 
            className="cta-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link to="/recommendation" className="primary-cta">
              <FaHeartbeat className="cta-icon" />
              Dapatkan Rekomendasi
            </Link>
            <Link to="/food-list" className="secondary-cta">
              <FaListAlt className="cta-icon" />
              Daftar Makanan
            </Link>
          </motion.div>
        </div>
        <motion.div 
          className="hero-decoration"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="blob-1"></div>
          <div className="blob-2"></div>
          <div className="blob-3"></div>
          <div className="food-decoration food-1"><FaAppleAlt /></div>
          <div className="food-decoration food-2"><FaCarrot /></div>
          <div className="food-decoration food-3"><FaLeaf /></div>
        </motion.div>
      </section>

      {/* Featured Foods Section with Carousel */}
      <section className="featured-foods">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="section-title-container">
            <h2>Makanan Pilihan</h2>
            <div className="title-underline"></div>
          </div>
          <p>Temukan pilihan makanan bergizi untuk kebutuhan Anda</p>
        </motion.div>

        {loadingFoods ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Memuat data makanan...</p>
          </div>
        ) : (
          <div className="carousel-container">
            <button className="carousel-btn carousel-btn-prev" onClick={scrollFoodPrev}>
              <FaChevronLeft />
            </button>
            
            <div className="carousel-wrapper">
              <div className="carousel" ref={foodCarouselRef}>
                {foods.map((food, index) => (
                  <motion.div 
                    className="food-card-modern carousel-item"
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <div className="food-image">
                      <img 
                        src={food.image || `https://via.placeholder.com/300x300?text=${encodeURIComponent(food.name)}`}
                        alt={food.name} 
                      />
                      <div className="food-overlay">
                        <FaUtensils />
                      </div>
                    </div>
                    <div className="food-details">
                      <h3>{food.name}</h3>
                      <div className="food-nutrients">
                        <span>Kalori: {food.calories || 'N/A'}</span>
                        <span>Protein: {food.protein || 'N/A'}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <button className="carousel-btn carousel-btn-next" onClick={scrollFoodNext}>
              <FaChevronRight />
            </button>
          </div>
        )}
        
        <div className="view-all-container">
          <Link to="/food-list" className="view-all-button">
            Lihat Semua Makanan
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="features-interactive">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="section-title-container">
            <h2>Fitur Utama</h2>
            <div className="title-underline"></div>
          </div>
          <p>Beragam fitur untuk mendukung kebutuhan nutrisi Anda</p>
        </motion.div>

        <div className="features-container">
          <div className="features-tabs">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className={`feature-tab ${activeFeature === index ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
                whileHover={{ x: 5 }}
                style={{
                  borderColor: activeFeature === index ? feature.color : 'transparent'
                }}
              >
                <div className="feature-tab-icon" style={{ backgroundColor: feature.color }}>
                  {feature.icon}
                </div>
                <div className="feature-tab-text">
                  <h3>{feature.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="feature-content"
            key={activeFeature}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ borderColor: features[activeFeature].color }}
          >
            <div className="feature-content-icon" style={{ color: features[activeFeature].color }}>
              {features[activeFeature].icon}
            </div>
            <h3>{features[activeFeature].title}</h3>
            <p>{features[activeFeature].description}</p>
            <Link 
              to={activeFeature === 0 ? "/recommendation" : activeFeature === 1 ? "/recommendation" : "/food-list"} 
              className="feature-action-button"
              style={{ backgroundColor: features[activeFeature].color }}
            >
              Coba Sekarang
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section with Carousel */}
      <section className="testimonials">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="section-title-container">
            <h2>Testimoni Pengguna</h2>
            <div className="title-underline"></div>
          </div>
          <p>Lihat apa yang dikatakan pengguna kami tentang layanan kami</p>
        </motion.div>

        <div className="carousel-container testimonial-carousel-container">
          <button className="carousel-btn carousel-btn-prev" onClick={scrollTestimonialPrev}>
            <FaChevronLeft />
          </button>
          
          <div className="carousel-wrapper">
            <div className="carousel testimonial-carousel" ref={testimonialCarouselRef}>
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  className="testimonial-card carousel-item"
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
                >
                  <div className="quote-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <p className="testimonial-content">{testimonial.content}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <button className="carousel-btn carousel-btn-next" onClick={scrollTestimonialNext}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="cta-section">
        <div className="cta-blob-1"></div>
        <div className="cta-blob-2"></div>
        
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Mulai Perjalanan Nutrisi Anda</h2>
          <p>Dapatkan rekomendasi nutrisi yang disesuaikan dengan kebutuhan tubuh Anda sekarang</p>
          <Link to="/recommendation" className="cta-action-button">
            Mulai Sekarang
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </motion.div>
      </section>

      {/* API Status */}
      <div className="api-status-modern">
        <div className="api-status-container">
          <h3>Status API:</h3>
          {apiStatus.status === 'loading' ? (
            <div className="status-loading">
              <div className="loading-spinner"></div>
              <p>Memeriksa koneksi API...</p>
            </div>
          ) : apiStatus.status === 'ok' ? (
            <p className="status-ok">API terhubung dan berfungsi dengan baik</p>
          ) : (
            <p className="status-error">
              {apiStatus.message || 'API tidak terhubung'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;