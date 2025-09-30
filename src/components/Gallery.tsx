import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: "/images/gallery/WhatsApp Image 2025-10-01 at 01.31.34.jpeg",
      alt: "BITStorm team member 1",
      caption: "BITStorm Team Member",
      category: "team"
    },
    {
      id: 2,
      src: "/images/gallery/WhatsApp Image 2025-10-01 at 01.31.35.jpeg",
      alt: "BITStorm team member 2",
      caption: "BITStorm Team Member",
      category: "team"
    },
    {
      id: 3,
      src: "/images/gallery/WhatsApp Image 2025-10-01 at 01.31.36.jpeg",
      alt: "BITStorm team member 3",
      caption: "BITStorm Team Member",
      category: "team"
    },
    {
      id: 4,
      src: "/images/gallery/WhatsApp Image 2025-10-01 at 01.31.37.jpeg",
      alt: "BITStorm team member 4",
      caption: "BITStorm Team Member",
      category: "team"
    },
    {
      id: 5,
      src: "/images/gallery/WhatsApp Image 2025-10-01 at 01.31.37 (1).jpeg",
      alt: "BITStorm team in action",
      caption: "BITStorm Team Action Shot",
      category: "matches"
    }
  ];

  const openModal = (image: GalleryImage, index: number) => {
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
          <div className="gallery-modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
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
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
