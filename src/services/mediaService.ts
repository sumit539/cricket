export interface MediaItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'team' | 'gallery' | 'matches' | 'events';
  type: 'image' | 'video';
  uploadedAt: string;
}

class MediaService {
  private readonly STORAGE_KEY = 'bitstorm_media';

  // Initialize with default media if none exists
  private initializeDefaultMedia(): MediaItem[] {
    const defaultMedia: MediaItem[] = [
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
    
    this.saveMediaItems(defaultMedia);
    return defaultMedia;
  }

  // Get all media items
  getAllMedia(): MediaItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) {
      return this.initializeDefaultMedia();
    }
    
    try {
      return JSON.parse(stored);
    } catch {
      return this.initializeDefaultMedia();
    }
  }

  // Get media by category
  getMediaByCategory(category: MediaItem['category']): MediaItem[] {
    return this.getAllMedia().filter(item => item.category === category);
  }

  // Get media by type
  getMediaByType(type: MediaItem['type']): MediaItem[] {
    return this.getAllMedia().filter(item => item.type === type);
  }

  // Add new media item
  addMediaItem(item: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem {
    const newItem: MediaItem = {
      ...item,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString()
    };
    
    const allMedia = this.getAllMedia();
    const updatedMedia = [...allMedia, newItem];
    this.saveMediaItems(updatedMedia);
    
    return newItem;
  }

  // Update existing media item
  updateMediaItem(id: string, updates: Partial<MediaItem>): MediaItem | null {
    const allMedia = this.getAllMedia();
    const itemIndex = allMedia.findIndex(item => item.id === id);
    
    if (itemIndex === -1) return null;
    
    const updatedItem = { ...allMedia[itemIndex], ...updates };
    allMedia[itemIndex] = updatedItem;
    this.saveMediaItems(allMedia);
    
    return updatedItem;
  }

  // Delete media item
  deleteMediaItem(id: string): boolean {
    const allMedia = this.getAllMedia();
    const filteredMedia = allMedia.filter(item => item.id !== id);
    
    if (filteredMedia.length === allMedia.length) return false;
    
    this.saveMediaItems(filteredMedia);
    return true;
  }

  // Save media items to localStorage
  private saveMediaItems(items: MediaItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  // Get recent media (last 10 items)
  getRecentMedia(limit: number = 10): MediaItem[] {
    const allMedia = this.getAllMedia();
    return allMedia
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
      .slice(0, limit);
  }

  // Search media by caption or alt text
  searchMedia(query: string): MediaItem[] {
    const allMedia = this.getAllMedia();
    const lowercaseQuery = query.toLowerCase();
    
    return allMedia.filter(item => 
      item.caption.toLowerCase().includes(lowercaseQuery) ||
      item.alt.toLowerCase().includes(lowercaseQuery)
    );
  }
}

const mediaService = new MediaService();
export default mediaService;
