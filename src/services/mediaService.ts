export interface MediaItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: 'team' | 'gallery' | 'matches' | 'events';
  type: 'image' | 'video';
  uploadedAt: string;
  githubPath?: string; // Path in GitHub repo
}

class MediaService {
  private readonly STORAGE_KEY = 'bitstorm_media';
  private useGitHub: boolean = false;

  // Initialize with default media if none exists
  private initializeDefaultMedia(): MediaItem[] {
    const defaultMedia: MediaItem[] = [
      // No team photos in media service - team photos are separate
      // Gallery photos - celebration, group photos, events
      {
        id: '5',
        src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.34.jpeg',
        alt: 'BITStorm team celebration',
        caption: 'Team Victory Celebration',
        category: 'gallery',
        type: 'image',
        uploadedAt: new Date().toISOString()
      },
      {
        id: '6',
        src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.35.jpeg',
        alt: 'BITStorm group photo',
        caption: 'Team Group Photo',
        category: 'gallery',
        type: 'image',
        uploadedAt: new Date().toISOString()
      },
      {
        id: '7',
        src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.36.jpeg',
        alt: 'BITStorm celebration moment',
        caption: 'Celebration Moment',
        category: 'gallery',
        type: 'image',
        uploadedAt: new Date().toISOString()
      },
      {
        id: '8',
        src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.37.jpeg',
        alt: 'BITStorm match celebration',
        caption: 'Match Victory Celebration',
        category: 'matches',
        type: 'image',
        uploadedAt: new Date().toISOString()
      },
      {
        id: '9',
        src: '/images/gallery/WhatsApp Image 2025-10-01 at 01.31.37 (1).jpeg',
        alt: 'BITStorm man of the match',
        caption: 'Man of the Match Award',
        category: 'events',
        type: 'image',
        uploadedAt: new Date().toISOString()
      }
    ];
    
    this.saveMediaItems(defaultMedia);
    return defaultMedia;
  }

  // Initialize GitHub integration
  async initializeGitHub(): Promise<void> {
    try {
      const { default: githubService } = await import('./githubService');
      this.useGitHub = githubService.isAvailable();
      
      if (this.useGitHub) {
        // Try to load from GitHub first
        const githubMedia = await githubService.getMediaList();
        if (githubMedia.length > 0) {
          this.saveMediaItems(githubMedia);
        }
      }
    } catch (error) {
      console.log('GitHub integration not available, using localStorage');
      this.useGitHub = false;
    }
  }

  // Get all media items
  getAllMedia(): MediaItem[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    
    if (!stored) {
      return this.initializeDefaultMedia();
    }
    
    try {
      return JSON.parse(stored);
    } catch (error) {
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
  async addMediaItem(item: Omit<MediaItem, 'id' | 'uploadedAt'>, file?: File): Promise<MediaItem> {
    const newItem: MediaItem = {
      ...item,
      id: Date.now().toString(),
      uploadedAt: new Date().toISOString()
    };

    // If GitHub is available and file is provided, upload to GitHub
    if (this.useGitHub && file) {
      try {
        const { default: githubService } = await import('./githubService');
        const githubUrl = await githubService.uploadFile(file, item.category, item.caption);
        newItem.src = githubUrl;
        newItem.githubPath = `public/images/${item.category}/${file.name}`;
        
        // Update media list in GitHub
        const allMedia = this.getAllMedia();
        const updatedMedia = [...allMedia, newItem];
        await githubService.updateMediaList(updatedMedia);
      } catch (error) {
        console.error('GitHub upload failed, falling back to localStorage:', error);
        // Fall back to localStorage
        this.saveMediaItems([...this.getAllMedia(), newItem]);
      }
    } else {
      // Use localStorage
      const allMedia = this.getAllMedia();
      const updatedMedia = [...allMedia, newItem];
      this.saveMediaItems(updatedMedia);
    }
    
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
    // Dispatch custom event to notify components of media updates
    window.dispatchEvent(new CustomEvent('mediaUpdated'));
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
