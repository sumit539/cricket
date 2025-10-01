// Utility to reset media data for testing
import mediaService from '../services/mediaService';

export const resetMediaData = () => {
  // Clear localStorage
  localStorage.removeItem('bitstorm_media');
  
  // Force reinitialize with default media
  const defaultMedia = mediaService.getAllMedia();
  console.log('Reset media data. Default media loaded:', defaultMedia);
  
  return defaultMedia;
};

// Add to window for easy access in browser console
if (typeof window !== 'undefined') {
  (window as any).resetMediaData = resetMediaData;
}
