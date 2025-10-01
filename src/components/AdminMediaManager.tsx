import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Edit, Image, Video, Users, Camera, Save } from 'lucide-react';
import mediaService, { type MediaItem } from '../services/mediaService';

interface AdminMediaManagerProps {
  onClose: () => void;
}

const AdminMediaManager: React.FC<AdminMediaManagerProps> = ({ onClose }) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'team' | 'gallery' | 'matches' | 'events'>('gallery');
  const [isUploading, setIsUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [newItem, setNewItem] = useState({
    alt: '',
    caption: '',
    category: 'gallery' as 'team' | 'gallery' | 'matches' | 'events',
    type: 'image' as 'image' | 'video'
  });

  useEffect(() => {
    loadMediaItems();
  }, []);

  const loadMediaItems = () => {
    setMediaItems(mediaService.getAllMedia());
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // Try GitHub upload first, fallback to local storage
      await mediaService.addMediaItem({
        src: '', // Will be set by GitHub service or fallback
        alt: newItem.alt || file.name,
        caption: newItem.caption || file.name,
        category: newItem.category,
        type: file.type.startsWith('video/') ? 'video' : 'image'
      }, file);

      loadMediaItems(); // Reload all media
      setIsUploading(false);
      setNewItem({ alt: '', caption: '', category: 'gallery', type: 'image' });
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
      alert('Upload failed. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this media item?')) {
      mediaService.deleteMediaItem(id);
      loadMediaItems();
    }
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    mediaService.updateMediaItem(editingItem.id, editingItem);
    loadMediaItems();
    setEditingItem(null);
  };

  const filteredItems = mediaItems.filter(item => item.category === selectedCategory);

  return (
    <div className="admin-media-manager">
      <div className="media-manager-header">
        <h2>Media Manager</h2>
        <button onClick={onClose} className="close-btn">
          <X size={24} />
        </button>
      </div>

      <div className="media-manager-content">
        <div className="category-tabs">
          <button 
            className={selectedCategory === 'team' ? 'active' : ''}
            onClick={() => setSelectedCategory('team')}
          >
            <Users size={16} />
            Team
          </button>
          <button 
            className={selectedCategory === 'gallery' ? 'active' : ''}
            onClick={() => setSelectedCategory('gallery')}
          >
            <Camera size={16} />
            Gallery
          </button>
          <button 
            className={selectedCategory === 'matches' ? 'active' : ''}
            onClick={() => setSelectedCategory('matches')}
          >
            <Image size={16} />
            Matches
          </button>
          <button 
            className={selectedCategory === 'events' ? 'active' : ''}
            onClick={() => setSelectedCategory('events')}
          >
            <Video size={16} />
            Events
          </button>
        </div>

        <div className="upload-section">
          <h3>Add New Media</h3>
          <div className="upload-form">
            <div className="form-group">
              <label>Category</label>
              <select 
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value as any})}
              >
                <option value="team">Team</option>
                <option value="gallery">Gallery</option>
                <option value="matches">Matches</option>
                <option value="events">Events</option>
              </select>
            </div>
            <div className="form-group">
              <label>Alt Text</label>
              <input
                type="text"
                value={newItem.alt}
                onChange={(e) => setNewItem({...newItem, alt: e.target.value})}
                placeholder="Describe the image/video"
              />
            </div>
            <div className="form-group">
              <label>Caption</label>
              <input
                type="text"
                value={newItem.caption}
                onChange={(e) => setNewItem({...newItem, caption: e.target.value})}
                placeholder="Caption for display"
              />
            </div>
            <div className="upload-area">
              <input
                type="file"
                id="media-upload"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <label htmlFor="media-upload" className="upload-btn">
                <Upload size={20} />
                {isUploading ? 'Uploading...' : 'Upload Media'}
              </label>
            </div>
          </div>
        </div>

        <div className="media-grid">
          <h3>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Media</h3>
          <div className="media-items">
            {filteredItems.map((item) => (
              <div key={item.id} className="media-item">
                <div className="media-preview">
                  {item.type === 'image' ? (
                    <img src={item.src} alt={item.alt} />
                  ) : (
                    <video src={item.src} controls />
                  )}
                </div>
                <div className="media-info">
                  <h4>{item.caption}</h4>
                  <p>{item.alt}</p>
                  <span className="media-date">
                    {new Date(item.uploadedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="media-actions">
                  <button 
                    onClick={() => handleEdit(item)}
                    className="edit-btn"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="delete-btn"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingItem && (
        <div className="edit-modal">
          <div className="edit-form">
            <h3>Edit Media Item</h3>
            <div className="form-group">
              <label>Alt Text</label>
              <input
                type="text"
                value={editingItem.alt}
                onChange={(e) => setEditingItem({...editingItem, alt: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Caption</label>
              <input
                type="text"
                value={editingItem.caption}
                onChange={(e) => setEditingItem({...editingItem, caption: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select 
                value={editingItem.category}
                onChange={(e) => setEditingItem({...editingItem, category: e.target.value as any})}
              >
                <option value="team">Team</option>
                <option value="gallery">Gallery</option>
                <option value="matches">Matches</option>
                <option value="events">Events</option>
              </select>
            </div>
            <div className="edit-actions">
              <button onClick={handleSaveEdit} className="save-btn">
                <Save size={16} />
                Save Changes
              </button>
              <button onClick={() => setEditingItem(null)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMediaManager;
