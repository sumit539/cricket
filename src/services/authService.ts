interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'admin';
}

class AuthService {
  private readonly ADMIN_USERNAME = 'a7f8b2c4-d9e1-4f6a-8b3c-5e7f9a2b4c6d';
  private readonly ADMIN_PASSWORD = 'x9y8z7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4';
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
