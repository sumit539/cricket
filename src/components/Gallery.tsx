import React, { useState, useEffect } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import mediaService, { type MediaItem } from '../services/mediaService';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<MediaItem[]>([]);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = () => {
    const galleryMedia = mediaService.getMediaByCategory('gallery');
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
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeModal();
  };

  const categories = ["all", "matches", "training", "events"];
  const [activeCategory, setActiveCategory] = useState("all");

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

        <div className="gallery-grid">
          {filteredImages.map((image, index) => (
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
          ))}
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
                  {currentIndex + 1} / {galleryImages.length}
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
