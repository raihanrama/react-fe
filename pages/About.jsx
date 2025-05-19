import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Activity, Command, Database, ChevronRight, Heart } from 'lucide-react';
import '../about.css'; 

function About() {
  const [isVisible, setIsVisible] = useState({
    header: false,
    section1: false,
    section2: false,
    section3: false,
    stats: false
  });
  
  const statsRef = useRef(null);
  
  const useCounter = (end, startCounting, duration = 2000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!startCounting) return;
      
      let startTime;
      let requestId;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(percentage * end));
        
        if (progress < duration) {
          requestId = requestAnimationFrame(animate);
        }
      };
      
      requestId = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(requestId);
    }, [end, duration, startCounting]);
    
    return count;
  };
  
  // Animasi Jumlah Pengguna
  const userCount = useCounter(100, isVisible.stats);
  const recipeCount = useCounter(1300, isVisible.stats);
  const satisfactionRate = useCounter(94, isVisible.stats);
  
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id || '';
          if (id === 'stats-section') {
            setIsVisible(prev => ({ ...prev, stats: true }));
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Entrance animations
  useEffect(() => {
    const timers = [
      setTimeout(() => setIsVisible(prev => ({ ...prev, header: true })), 300),
      setTimeout(() => setIsVisible(prev => ({ ...prev, section1: true })), 600),
      setTimeout(() => setIsVisible(prev => ({ ...prev, section2: true })), 900),
      setTimeout(() => setIsVisible(prev => ({ ...prev, section3: true })), 1200)
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Fungsi untuk navigasi ke halaman rekomendasi
  const navigateToRecommendation = () => {
    window.location.href = '/Recommendation';
  };

  return (
    <div className="about-page">
      {/* Abstract shapes */}
      <div className="abstract-shapes">
        <div className="abstract-shape shape1"></div>
        <div className="abstract-shape shape2"></div>
        <div className="abstract-shape shape3"></div>
      </div>
      
      {/* Main content */}
      <div className="container">
        {/* Header */}
        <div className={`header ${isVisible.header ? 'visible' : 'hidden'}`}>
          <div className="header-content">
            {/* Logo/Icon */}
            <div className="logo-container">
              <Sparkles className="logo-icon" />
              <div className="logo-overlay"></div>
            </div>
            
            {/* Title with modern typography */}
            <h1 className="main-title">
              Sistem Rekomendasi Nutrisi
            </h1>
            
            {/* Subtitle with gradient underline */}
            <div className="subtitle-container">
              <p className="subtitle">
                Solusi pintar untuk kebutuhan nutrisi yang dirancang khusus untuk membantu Anda hidup lebih sehat
              </p>
              <div className="subtitle-underline"></div>
            </div>
          </div>
        </div>

        {/* Section 1: What is Nutrition Recommendation System */}
        <div className={`section ${isVisible.section1 ? 'visible' : 'hidden'}`}>
          <div className="card">
            <div className="card-content">
              {/* Icon */}
              <div className="icon-container">
                <div className="feature-icon">
                  <Command className="icon" />
                </div>
              </div>
              
              {/* Content */}
              <div className="content">
                <h2 className="section-title">
                  Apa itu Sistem Rekomendasi Nutrisi?
                </h2>
                <p className="section-text">
                  Sistem Rekomendasi Nutrisi adalah <span className="highlight">aplikasi berbasis AI</span> yang menggunakan algoritma machine learning
                  untuk memberikan rekomendasi makanan yang sesuai dengan kebutuhan nutrisi pengguna. 
                  Dengan mengintegrasikan <span className="highlight">data nutrisi komprehensif</span> dan preferensi individu,
                  sistem ini secara cerdas menyarankan pilihan makanan yang optimal untuk mencapai tujuan kesehatan Anda.
                </p>
                
                {/* Keunggulan card */}
                <div className="feature-box">
                  <h3 className="feature-title">
                    <div className="feature-icon-small">
                      <Heart className="icon-small" />
                    </div>
                    Keunggulan Utama
                  </h3>
                  <div className="feature-grid">
                    <div className="feature-item">
                      <div className="feature-number">01.</div>
                      <div className="feature-desc">Personalisasi berdasarkan profil individual</div>
                    </div>
                    <div className="feature-item">
                      <div className="feature-number">02.</div>
                      <div className="feature-desc">Algoritma K-Nearest Neighbors untuk rekomendasi yang akurat</div>
                    </div>
                    <div className="feature-item">
                      <div className="feature-number">03.</div>
                      <div className="feature-desc">Analisis nutrisi berbasis data ilmiah</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: How it Works */}
        <div className={`section ${isVisible.section2 ? 'visible' : 'hidden'}`}>
          <div className="card">
            <div className="card-content">
              {/* Icon */}
              <div className="icon-container">
                <div className="feature-icon">
                  <Activity className="icon" />
                </div>
              </div>
              
              {/* Content */}
              <div className="content">
                <h2 className="section-title">
                  Cara Kerja
                </h2>
                <p className="section-text">
                  Sistem kami beroperasi dengan mengintegrasikan <span className="highlight">algoritma pintar</span> dan <span className="highlight">data komprehensif</span> untuk memberikan pengalaman yang personal:
                </p>
                
                {/* Steps */}
                <div className="steps-container">
                  {/* Step 1 */}
                  <div className="step">
                    <div className="step-content">
                      <div className="step-number">1</div>
                      <div>
                        <h3 className="step-title">Rekomendasi Berdasarkan BMI</h3>
                        <p className="step-text">
                          Melalui <span className="font-medium">perhitungan Body Mass Index (BMI)</span> berdasarkan berat dan tinggi badan Anda, sistem akan:
                        </p>
                        <div className="step-grid">
                          <div className="step-item">
                            <div className="step-bullet">
                              <ChevronRight className="bullet-icon" />
                            </div>
                            <div className="step-desc">Menentukan kategori BMI Anda</div>
                          </div>
                          <div className="step-item">
                            <div className="step-bullet">
                              <ChevronRight className="bullet-icon" />
                            </div>
                            <div className="step-desc">Menyesuaikan kebutuhan kalori harian</div>
                          </div>
                          <div className="step-item">
                            <div className="step-bullet">
                              <ChevronRight className="bullet-icon" />
                            </div>
                            <div className="step-desc">Merekomendasikan pola makan optimal</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="step">
                    <div className="step-content">
                      <div className="step-number">2</div>
                      <div>
                        <h3 className="step-title">Rekomendasi Berdasarkan Nutrisi</h3>
                        <p className="step-text">
                          Dengan <span className="font-medium">input kebutuhan nutrisi spesifik</span> dari Anda, sistem akan:
                        </p>
                        <div className="step-grid">
                          <div className="step-item">
                            <div className="step-bullet">
                              <ChevronRight className="bullet-icon" />
                            </div>
                            <div className="step-desc">Menganalisis database makanan</div>
                          </div>
                          <div className="step-item">
                            <div className="step-bullet">
                              <ChevronRight className="bullet-icon" />
                            </div>
                            <div className="step-desc">Mencocokkan target nutrisi</div>
                          </div>
                          <div className="step-item">
                            <div className="step-bullet">
                              <ChevronRight className="bullet-icon" />
                            </div>
                            <div className="step-desc">Menyusun menu seimbang</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div id="stats-section" ref={statsRef} className={`section ${isVisible.stats ? 'visible' : 'hidden'}`}>
          <div className="stats-card">
            {/* Decorative circles */}
            <div className="stats-circle circle1"></div>
            <div className="stats-circle circle2"></div>
            
            <h2 className="stats-title">Sistem Rekomendasi Kami dalam Angka</h2>
            
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-content">
                  <div className="stat-number">{userCount.toLocaleString()}+</div>
                  <div className="stat-label">Pengguna Aktif</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-content">
                  <div className="stat-number">{recipeCount.toLocaleString()}+</div>
                  <div className="stat-label">Resep Makanan</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-content">
                  <div className="stat-number">{satisfactionRate}%</div>
                  <div className="stat-label">Tingkat Akurasi Model</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Technology */}
        <div className={`section ${isVisible.section3 ? 'visible' : 'hidden'}`}>
          <div className="card">
            <div className="card-content">
              {/* Icon */}
              <div className="icon-container">
                <div className="feature-icon">
                  <Database className="icon" />
                </div>
              </div>
              
              {/* Content */}
              <div className="content">
                <h2 className="section-title">
                  Teknologi yang Digunakan
                </h2>
                
                <div className="tech-grid">
                  {/* Machine Learning */}
                  <div className="tech-item">
                    <div className="tech-content">
                      <div className="tech-icon">
                        <span className="emoji">🤖</span>
                      </div>
                      <h3 className="tech-title">Machine Learning</h3>
                      <p className="tech-desc">Algoritma KNN untuk rekomendasi dipersonalisasi</p>
                    </div>
                  </div>
                  
                  {/* Flask API */}
                  <div className="tech-item">
                    <div className="tech-content">
                      <div className="tech-icon">
                        <span className="emoji">⚡</span>
                      </div>
                      <h3 className="tech-title">Flask API</h3>
                      <p className="tech-desc">Backend responsif untuk pemrosesan data efisien</p>
                    </div>
                  </div>
                  
                  {/* React.js */}
                  <div className="tech-item">
                    <div className="tech-content">
                      <div className="tech-icon">
                        <span className="emoji">⚛️</span>
                      </div>
                      <h3 className="tech-title">React.js</h3>
                      <p className="tech-desc">Frontend interaktif untuk pengalaman optimal</p>
                    </div>
                  </div>
                  
                  {/* Database */}
                  <div className="tech-item">
                    <div className="tech-content">
                      <div className="tech-icon">
                        <span className="emoji">🗄️</span>
                      </div>
                      <h3 className="tech-title">Database</h3>
                      <p className="tech-desc">Penyimpanan terstruktur untuk data makanan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="cta-container">
          <div className="cta-card">
            {/* Decorative elements */}
            <div className="cta-circle circle1"></div>
            <div className="cta-circle circle2"></div>
            
            <div className="cta-content">
              <h2 className="cta-title">Mulai Perjalanan Nutrisi Anda</h2>
              <p className="cta-text">Dapatkan rekomendasi makanan yang dipersonalisasi sesuai dengan profil dan tujuan kesehatan Anda.</p>
              <button 
                className="cta-button"
                onClick={navigateToRecommendation}
              >
                Mulai Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;