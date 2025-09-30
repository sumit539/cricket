interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin';
}

class AuthService {
  private readonly ADMIN_USERNAME = 'bitstorm_admin';
  private readonly ADMIN_PASSWORD = 'BITStorm2025!';
  private readonly STORAGE_KEY = 'bitstorm_admin_auth';

  login(username: string, password: string): boolean {
    if (username === this.ADMIN_USERNAME && password === this.ADMIN_PASSWORD) {
      const adminUser: AdminUser = {
        id: 'admin_1',
        username: this.ADMIN_USERNAME,
        email: 'admin@bitstormcricket.com',
        role: 'admin'
      };
      
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(adminUser));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    const authData = localStorage.getItem(this.STORAGE_KEY);
    if (!authData) return false;
    
    try {
      const user: AdminUser = JSON.parse(authData);
      return user.role === 'admin';
    } catch {
      return false;
    }
  }

  getCurrentUser(): AdminUser | null {
    if (!this.isAuthenticated()) return null;
    
    const authData = localStorage.getItem(this.STORAGE_KEY);
    if (!authData) return null;
    
    try {
      return JSON.parse(authData);
    } catch {
      return null;
    }
  }

  // For demo purposes - in production, use proper authentication
  getAdminCredentials(): { username: string; password: string } {
    return {
      username: this.ADMIN_USERNAME,
      password: this.ADMIN_PASSWORD
    };
  }
}

const authService = new AuthService();
export default authService;
