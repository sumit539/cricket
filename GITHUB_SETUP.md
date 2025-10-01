# GitHub Integration Setup Guide

This guide explains how to set up GitHub integration for the admin media management system.

## 🚀 Benefits of GitHub Integration

- ✅ **Persistent Storage**: Media files stored directly in your GitHub repository
- ✅ **Version Control**: Full history of all media changes
- ✅ **Backup**: Automatic backup with GitHub
- ✅ **Collaboration**: Multiple admins can manage media
- ✅ **CDN**: GitHub serves files with global CDN

## 📋 Setup Steps

### 1. Create GitHub Personal Access Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Cricket Club Media Manager"
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `public_repo` (Access public repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### 2. Configure Environment Variables

#### For Development:
Create a `.env.local` file in your project root:

```bash
VITE_GITHUB_TOKEN=your_github_token_here
```

#### For Production (Netlify):
1. Go to your Netlify dashboard
2. Navigate to Site settings → Environment variables
3. Add new variable:
   - **Key**: `VITE_GITHUB_TOKEN`
   - **Value**: Your GitHub token

### 3. Repository Structure

The system will automatically create this structure in your repo:

```
cricket/
├── public/
│   └── images/
│       ├── team/
│       ├── gallery/
│       ├── matches/
│       └── events/
└── src/
    └── data/
        └── media.json
```

### 4. File Organization

- **Images/Videos**: Stored in `public/images/{category}/`
- **Metadata**: Stored in `src/data/media.json`
- **Naming**: Files are renamed with timestamp to avoid conflicts

## 🔧 How It Works

### Upload Process:
1. Admin uploads file through media manager
2. File is converted to base64
3. File is uploaded to GitHub via API
4. Media metadata is updated in `media.json`
5. Website immediately reflects changes

### Fallback System:
- If GitHub upload fails → Falls back to localStorage
- If GitHub token missing → Uses localStorage only
- Seamless experience regardless of setup

## 🛠️ Advanced Configuration

### Custom Repository:
Edit `src/services/githubService.ts`:
```typescript
private readonly REPO_OWNER = 'your-username';
private readonly REPO_NAME = 'your-repo-name';
```

### Custom File Paths:
Modify the file path structure in the `uploadFile` method.

## 🔒 Security Notes

- **Token Security**: Never commit your token to the repository
- **Token Permissions**: Only grant necessary permissions
- **Token Rotation**: Regularly rotate your tokens
- **Repository Access**: Ensure only trusted users have repo access

## 🐛 Troubleshooting

### Common Issues:

1. **"GitHub token not configured"**
   - Check environment variable is set correctly
   - Ensure token has proper permissions

2. **"GitHub API error: 401"**
   - Token is invalid or expired
   - Generate a new token

3. **"GitHub API error: 403"**
   - Token doesn't have repository access
   - Check repository permissions

4. **Upload fails silently**
   - Check browser console for errors
   - Verify network connection
   - Check file size limits

### Debug Mode:
Add this to your browser console to see detailed logs:
```javascript
localStorage.setItem('debug_github', 'true');
```

## 📊 Benefits Over LocalStorage

| Feature | LocalStorage | GitHub Integration |
|---------|-------------|-------------------|
| Persistence | ❌ Browser only | ✅ Permanent |
| Backup | ❌ None | ✅ Automatic |
| Version Control | ❌ None | ✅ Full history |
| Multi-device | ❌ No | ✅ Yes |
| Collaboration | ❌ No | ✅ Yes |
| CDN | ❌ No | ✅ GitHub CDN |

## 🚀 Next Steps

1. Set up your GitHub token
2. Configure environment variables
3. Test the upload functionality
4. Deploy to production
5. Enjoy persistent media management!

---

**Need Help?** Check the browser console for detailed error messages or contact support.
