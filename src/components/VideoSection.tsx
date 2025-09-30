import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, X } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  category: string;
}

const VideoSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const videos: Video[] = [
    {
      id: 1,
      title: "Championship Final Highlights",
      description: "Watch the thrilling moments from our championship victory",
      thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: "3:45",
      category: "highlights"
    },
    {
      id: 2,
      title: "Training Session - Batting Practice",
      description: "Behind the scenes of our intensive batting practice",
      thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      duration: "5:20",
      category: "training"
    },
    {
      id: 3,
      title: "Team Building Activities",
      description: "Fun moments from our team building workshop",
      thumbnail: "https://images.unsplash.com/photo-1594736797933-d0c29d1a8a0c?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4",
      duration: "4:15",
      category: "events"
    },
    {
      id: 4,
      title: "Bowling Masterclass",
      description: "Learn the art of fast bowling with our experts",
      thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_10mb.mp4",
      duration: "6:30",
      category: "training"
    },
    {
      id: 5,
      title: "Match Day Atmosphere",
      description: "Experience the energy and excitement of match day",
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      duration: "2:50",
      category: "highlights"
    },
    {
      id: 6,
      title: "Club Social Event",
      description: "Celebrating our achievements together",
      thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=225&fit=crop",
      videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
      duration: "3:25",
      category: "events"
    }
  ];

  const openVideo = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const categories = ["all", "highlights", "training", "events"];
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredVideos = activeCategory === "all" 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  return (
    <section id="videos" className="video-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Videos</h2>
          <p className="section-subtitle">
            Watch our best moments, training sessions, and behind-the-scenes content
          </p>
        </div>

        <div className="video-filters">
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

        <div className="video-grid">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-card" onClick={() => openVideo(video)}>
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="video-overlay">
                  <Play className="play-icon" />
                  <span className="video-duration">{video.duration}</span>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">{video.description}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedVideo && (
          <div className="video-modal" onClick={closeVideo}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeVideo}>
                <X size={24} />
              </button>
              <div className="video-player">
                <div className="video-container">
                  <video
                    src={selectedVideo.videoUrl}
                    poster={selectedVideo.thumbnail}
                    controls
                    autoPlay={isPlaying}
                    muted={isMuted}
                    className="video-element"
                  />
                </div>
                <div className="video-controls">
                  <button 
                    className="control-btn"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button 
                    className="control-btn"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <button className="control-btn">
                    <Maximize size={20} />
                  </button>
                  <button className="control-btn">
                    <RotateCcw size={20} />
                  </button>
                </div>
                <div className="video-details">
                  <h3>{selectedVideo.title}</h3>
                  <p>{selectedVideo.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoSection;
