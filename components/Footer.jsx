import React, { useState, useEffect } from 'react';

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [formProgress, setFormProgress] = useState(0);

  useEffect(() => {
    // Menghitung progress pengisian form
    const { name, email, message } = formData;
    const fields = [name, email, message];
    const filledFields = fields.filter(field => field.trim() !== '').length;
    const newProgress = Math.floor((filledFields / fields.length) * 100);
    setFormProgress(newProgress);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Menampilkan animasi loading
    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.classList.add('loading');
    
    setTimeout(() => {
      // Membuat URL mailto dengan format pesan yang ditentukan
      const mailtoSubject = encodeURIComponent("Question from Nutrition Website");
      const mailtoBody = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage: ${formData.message}`
      );
      
      window.location.href = `mailto:muhammadraihan291003@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      
      // Menampilkan pesan sukses
      setIsSubmitted(true);
      submitBtn.classList.remove('loading');
      
      // Reset form setelah 3 detik
      setTimeout(() => {
        closePopup();
      }, 3000);
    }, 1000);
  };

  const openPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden'; // Mencegah scrolling pada background
  };

  const closePopup = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setShowPopup(false);
      setAnimateOut(false);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
      document.body.style.overflow = 'auto'; // Mengaktifkan kembali scrolling
    }, 300);
  };

  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Nutrition Recommendation</h3>
          <p>Membantu Anda menemukan asupan nutrisi terbaik untuk kesehatan optimal.</p>
        </div>
        
        <div className="footer-section">
          <h3>Kontak</h3>
          <button onClick={openPopup} className="contact-btn">
            <span className="btn-text">Hubungi Kami</span>
            <span className="btn-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1 7L12 13L23 7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </button>
        </div>
        
        <div className="footer-section">
          <h3>Ikuti Kami</h3>
          <div className="social-icons">
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
              </svg>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter/X">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="mailto:muhammadraihan291003@gmail.com" className="social-icon" aria-label="Email">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} Nutrition Recommendation System. All rights reserved.</p>
      </div>

      {/* Contact Form Popup */}
      {showPopup && (
        <div className={`popup-overlay ${animateOut ? 'fade-out' : 'fade-in'}`}>
          <div className={`popup-content ${animateOut ? 'slide-down' : 'slide-up'}`}>
            <button className="popup-close" onClick={closePopup} aria-label="Close">
              <span className="close-icon"></span>
            </button>
            
            <div className="popup-header">
              <div className="popup-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4caf50" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 5H3C1.89543 5 1 5.89543 1 7V17C1 18.1046 1.89543 19 3 19H21C22.1046 19 23 18.1046 23 17V7C23 5.89543 22.1046 5 21 5Z" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M1 7L12 13L23 7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Hubungi Kami</h3>
              <p className="popup-subtitle">Kami akan segera merespons pertanyaan Anda</p>
            </div>
            
            {!isSubmitted ? (
              <>
                <div className="form-progress-container">
                  <div className="form-progress-bar" style={{ width: `${formProgress}%` }}></div>
                </div>
                
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className={`form-group ${activeField === 'name' ? 'active' : ''}`}>
                    <label className="form-label">Nama</label>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Masukkan nama Anda" 
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      required 
                    />
                    <span className="form-focus-effect"></span>
                  </div>
                  <div className={`form-group ${activeField === 'email' ? 'active' : ''}`}>
                    <label className="form-label">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Masukkan email Anda" 
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      required 
                    />
                    <span className="form-focus-effect"></span>
                  </div>
                  <div className={`form-group ${activeField === 'message' ? 'active' : ''}`}>
                    <label className="form-label">Pesan</label>
                    <textarea 
                      name="message" 
                      placeholder="Tulis pertanyaan Anda di sini" 
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus('message')}
                      onBlur={handleBlur}
                      required
                    ></textarea>
                    <span className="form-focus-effect"></span>
                  </div>
                  <button type="submit" className="submit-btn">
                    <span className="btn-text">Kirim Pertanyaan</span>
                    <span className="loading-spinner"></span>
                  </button>
                </form>
              </>
            ) : (
              <div className="success-container">
                <div className="success-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" />
  <path d="M8 12l2 2 6-6" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                </div>
                <h3 className="success-title">Pesan Terkirim!</h3>
                <p className="success-message">Terima kasih atas pertanyaan Anda. Kami akan segera menghubungi Anda.</p>
              </div>
            )}
            
            <div className="popup-footer">
              <p>Atau kirim email langsung ke: <a href="mailto:muhammadraihan291003@gmail.com">muhammadraihan291003@gmail.com</a></p>
            </div>
          </div>
        </div>
      )}
      
    </footer>
  );
}

export default Footer;