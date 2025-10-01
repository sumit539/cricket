import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import mediaService, { type MediaItem } from '../services/mediaService';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<MediaItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    loadGalleryImages();
    
    // Listen for storage changes to refresh when media is updated
    const handleStorageChange = () => {
      loadGalleryImages();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    window.addEventListener('mediaUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('mediaUpdated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Reset current index when category changes
    setCurrentIndex(0);
  }, [activeCategory]);

  const loadGalleryImages = () => {
    const allMedia = mediaService.getAllMedia();
    
    // Get all images for gallery display
    const galleryMedia = allMedia.filter(item => 
      item.category === 'gallery' || 
      item.category === 'matches' || 
      item.category === 'events'
    );
    
    setGalleryImages(galleryMedia);
  };

  const openModal = (image: MediaItem, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeModal();
  };

  const categories = ["all", "gallery", "matches", "events"];

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="gallery">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Gallery</h2>
          <p className="section-subtitle">
            Capturing our journey, victories, and memorable moments
          </p>
        </div>

        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="gallery-container">
          {/* Navigation arrows for horizontal scrolling - only show if there are multiple images */}
          {filteredImages.length > 1 && (
            <>
              <button 
                className="gallery-nav gallery-nav-left" 
                onClick={() => {
                  const galleryGrid = document.querySelector('.gallery-grid');
                  if (galleryGrid) {
                    galleryGrid.scrollBy({ left: -440, behavior: 'smooth' });
                  }
                }}
                title="Scroll left"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="gallery-nav gallery-nav-right" 
                onClick={() => {
                  const galleryGrid = document.querySelector('.gallery-grid');
                  if (galleryGrid) {
                    galleryGrid.scrollBy({ left: 440, behavior: 'smooth' });
                  }
                }}
                title="Scroll right"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="gallery-grid">
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="gallery-item"
                  onClick={() => openModal(image, index)}
                >
                  <img src={image.src} alt={image.alt} />
                  <div className="gallery-overlay">
                    <Camera className="gallery-icon" />
                    <p className="gallery-caption">{image.caption}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="gallery-empty">
                <Camera size={48} />
                <h3>No images found</h3>
                <p>Upload some images through the admin panel to see them here.</p>
              </div>
            )}
          </div>
        </div>

        {selectedImage && (
          <div className="gallery-modal" onKeyDown={handleKeyDown} tabIndex={0}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
              
              {/* Large Navigation Arrows */}
              <button className="large-nav-btn prev-btn" onClick={prevImage}>
                <ChevronLeft size={48} />
              </button>
              <button className="large-nav-btn next-btn" onClick={nextImage}>
                <ChevronRight size={48} />
              </button>
              
              <button className="modal-nav modal-prev" onClick={prevImage}>
                <ChevronLeft size={24} />
              </button>
              <button className="modal-nav modal-next" onClick={nextImage}>
                <ChevronRight size={24} />
              </button>
              <img src={selectedImage.src} alt={selectedImage.alt} />
              <div className="modal-caption">
                <h3>{selectedImage.caption}</h3>
                <p>{selectedImage.alt}</p>
                <div className="image-counter">
                  {currentIndex + 1} / {filteredImages.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
