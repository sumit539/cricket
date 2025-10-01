// GitHub API service for media management
interface GitHubFile {
  path: string;
  content: string;
  message: string;
  sha?: string;
}

interface GitHubResponse {
  content: {
    download_url: string;
    path: string;
    sha: string;
  };
}

class GitHubService {
  private readonly REPO_OWNER = 'sumit539'; // Your GitHub username
  private readonly REPO_NAME = 'cricket'; // Your repository name
  private readonly BASE_URL = 'https://api.github.com';

  // You'll need to set these as environment variables
  private readonly GITHUB_TOKEN = (import.meta as any).env?.VITE_GITHUB_TOKEN || '';

  async uploadFile(file: File, category: string, description: string): Promise<string> {
    if (!this.GITHUB_TOKEN) {
      throw new Error('GitHub token not configured');
    }

    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${category}_${timestamp}.${fileExtension}`;
    const filePath = `public/images/${category}/${fileName}`;

    // Convert file to base64
    const base64Content = await this.fileToBase64(file);

    const fileData: GitHubFile = {
      path: filePath,
      content: base64Content,
      message: `Add ${category} media: ${description}`
    };

    try {
      const response = await fetch(
        `${this.BASE_URL}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${this.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fileData),
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const result: GitHubResponse = await response.json();
      return result.content.download_url;
    } catch (error) {
      console.error('GitHub upload error:', error);
      throw error;
    }
  }

  async updateMediaList(mediaItems: any[]): Promise<void> {
    if (!this.GITHUB_TOKEN) {
      throw new Error('GitHub token not configured');
    }

    const filePath = 'src/data/media.json';
    const content = JSON.stringify(mediaItems, null, 2);
    const base64Content = btoa(unescape(encodeURIComponent(content)));

    // First, get the current file to get its SHA
    let sha: string | undefined;
    try {
      const existingFile = await fetch(
        `${this.BASE_URL}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents/${filePath}`,
        {
          headers: {
            'Authorization': `token ${this.GITHUB_TOKEN}`,
          },
        }
      );
      
      if (existingFile.ok) {
        const fileData = await existingFile.json();
        sha = fileData.sha;
      }
    } catch (error) {
      console.log('File does not exist, will create new one');
    }

    const fileData: GitHubFile = {
      path: filePath,
      content: base64Content,
      message: 'Update media list',
      ...(sha && { sha })
    };

    try {
      const response = await fetch(
        `${this.BASE_URL}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents/${filePath}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${this.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fileData),
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('GitHub update error:', error);
      throw error;
    }
  }

  async getMediaList(): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/contents/src/data/media.json`
      );

      if (response.ok) {
        const fileData = await response.json();
        const content = atob(fileData.content);
        return JSON.parse(content);
      }
    } catch (error) {
      console.log('Media list not found, using default');
    }

    return [];
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix to get just the base64 content
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  }

  // Check if GitHub integration is available
  isAvailable(): boolean {
    return !!this.GITHUB_TOKEN;
  }
}

const githubService = new GitHubService();
export default githubService;
