import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Edit, Image, Video, Users, Camera, Plus, Save } from 'lucide-react';

interface MediaItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'team' | 'gallery' | 'matches' | 'events';
  type: 'image' | 'video';
  uploadedAt: string;
}

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
    const stored = localStorage.getItem('bitstorm_media');
    if (stored) {
      setMediaItems(JSON.parse(stored));
    } else {
      // Initialize with existing gallery images
      const initialItems: MediaItem[] = [
        {
          id: '1',
          src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.34.jpeg',
          alt: 'BITStorm team member 1',
          caption: 'BITStorm Team Member',
          category: 'team',
          type: 'image',
          uploadedAt: new Date().toISOString()
        },
        {
          id: '2',
          src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.35.jpeg',
          alt: 'BITStorm team member 2',
          caption: 'BITStorm Team Member',
          category: 'team',
          type: 'image',
          uploadedAt: new Date().toISOString()
        },
        {
          id: '3',
          src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.36.jpeg',
          alt: 'BITStorm team member 3',
          caption: 'BITStorm Team Member',
          category: 'team',
          type: 'image',
          uploadedAt: new Date().toISOString()
        },
        {
          id: '4',
          src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.37.jpeg',
          alt: 'BITStorm team member 4',
          caption: 'BITStorm Team Member',
          category: 'team',
          type: 'image',
          uploadedAt: new Date().toISOString()
        },
        {
          id: '5',
          src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.37 (1).jpeg',
          alt: 'BITStorm team in action',
          caption: 'BITStorm Team Action Shot',
          category: 'gallery',
          type: 'image',
          uploadedAt: new Date().toISOString()
        }
      ];
      setMediaItems(initialItems);
      localStorage.setItem('bitstorm_media', JSON.stringify(initialItems));
    }
  };

  const saveMediaItems = (items: MediaItem[]) => {
    setMediaItems(items);
    localStorage.setItem('bitstorm_media', JSON.stringify(items));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate file upload (in real app, upload to server)
    const reader = new FileReader();
    reader.onload = (e) => {
      const newItem: MediaItem = {
        id: Date.now().toString(),
        src: e.target?.result as string,
        alt: newItem.alt || file.name,
        caption: newItem.caption || file.name,
        category: newItem.category,
        type: file.type.startsWith('video/') ? 'video' : 'image',
        uploadedAt: new Date().toISOString()
      };

      const updatedItems = [...mediaItems, newItem];
      saveMediaItems(updatedItems);
      setIsUploading(false);
      setNewItem({ alt: '', caption: '', category: 'gallery', type: 'image' });
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this media item?')) {
      const updatedItems = mediaItems.filter(item => item.id !== id);
      saveMediaItems(updatedItems);
    }
  };

  const handleEdit = (item: MediaItem) => {
    setEditingItem(item);
  };

  const handleSaveEdit = () => {
    if (!editingItem) return;
    
    const updatedItems = mediaItems.map(item => 
      item.id === editingItem.id ? editingItem : item
    );
    saveMediaItems(updatedItems);
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
