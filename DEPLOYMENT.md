# Frontend Deployment Guide - Vercel

## 📦 What's Included for Deployment

✅ **vercel.json** - Vercel platform configuration
✅ **src/config/environment.js** - Environment management
✅ **Updated Apollo Client** - Dynamic API URL
✅ **.env.example** - Sample environment variables
✅ **.env.local** - Local development config
✅ **.gitignore** - Excludes sensitive files

## 🚀 Deployment Steps

### 1. Push to GitHub

```bash
cd frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/tms-frontend.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com/
2. New Project
3. Import Git Repository: `tms-frontend`
4. Configure:
   - **Framework**: Create React App (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 3. Set Environment Variable

**Critical**: Add this environment variable:

```env
REACT_APP_API_URL=https://your-backend.onrender.com/graphql
```

**Replace** `your-backend.onrender.com` with your actual Render backend URL

### 4. Deploy & Test

- Click "Deploy"
- Wait 2-3 minutes for deployment
- Test at: `https://tms-frontend.vercel.app`

## 🔧 Configuration Details

### Environment Variable Explained

| Variable | Purpose | Example Value |
|----------|---------|---------------|
| `REACT_APP_API_URL` | Backend GraphQL endpoint | `https://my-backend.onrender.com/graphql` |

**Important**: 
- Must start with `REACT_APP_` (Create React App requirement)
- Must end with `/graphql`
- Use `https://` for production (not `http://`)

### How Environment Config Works

1. **environment.js** reads `process.env.REACT_APP_API_URL`
2. Falls back to `http://localhost:8080/graphql` if not set
3. **Apollo Client** uses this URL for all GraphQL requests

### Build Process

1. npm installs dependencies
2. React scripts build optimized production bundle
3. Output to `build/` directory
4. Vercel serves static files with CDN

### Routing Configuration

**vercel.json** includes:
- SPA routing (all routes → index.html)
- Cache headers for static assets
- Optimized for Create React App

## 🧪 Testing Deployed Frontend

### 1. Access Your App

Open: `https://tms-frontend.vercel.app`

### 2. Test Login

```
Username: admin
Password: admin123
```

### 3. Verify Features

- ✅ Login works without CORS errors
- ✅ Shipments load in Grid view
- ✅ Can toggle to Tile view
- ✅ Can create new shipment
- ✅ Can edit shipment
- ✅ Can flag/unflag shipment
- ✅ Can delete shipment (admin only)

### 4. Check Browser Console

- ❌ No CORS errors
- ❌ No network errors
- ❌ No 404 errors
- ✅ GraphQL requests succeed

## 🐛 Troubleshooting

### CORS Errors

**Symptoms**: 
```
Access to fetch at 'https://backend.onrender.com/graphql' 
from origin 'https://frontend.vercel.app' has been blocked
```

**Solutions**:
1. Go to Render backend dashboard
2. Environment variables
3. Update `CORS_ALLOWED_ORIGINS` to include your Vercel URL:
   ```
   https://tms-frontend.vercel.app,http://localhost:3000
   ```
4. Wait for backend to redeploy (~2-3 minutes)
5. Hard refresh browser (Ctrl+Shift+R)

### Network Error / Can't Connect to Backend

**Symptoms**: "Network error" or "Failed to fetch"

**Check**:
1. Vercel environment variable `REACT_APP_API_URL` is correct
2. Backend URL ends with `/graphql`
3. Backend is actually running (test GraphiQL)
4. Using `https://` not `http://` for production

**Fix**:
1. Vercel Dashboard → Project → Settings → Environment Variables
2. Edit `REACT_APP_API_URL`
3. Redeploy frontend

### Build Fails

**Common causes**:
- Missing dependencies in package.json
- Syntax errors in code
- Environment variable not set

**Check Vercel logs**:
1. Vercel Dashboard → Deployments
2. Click failed deployment
3. View build logs
4. Fix errors and push update

### App Shows Blank Page

**Causes**:
1. JavaScript error on load
2. Routing issue
3. Missing environment variable

**Debug**:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Review `vercel.json` routing config

### Preview Deployments Don't Work

**Issue**: Git branches show "Preview" but don't work

**Solution**:
- Preview deployments also need `REACT_APP_API_URL`
- Either set it in Vercel for all environments
- Or backend CORS must allow `*.vercel.app` pattern

## 📊 Monitoring

### View Deployment Logs

Vercel Dashboard → Project → Deployments → Click deployment → View Logs

### Analytics (Free Tier)

Vercel provides:
- Page views
- Visitor analytics
- Performance metrics
- Error tracking

### Performance

Free tier includes:
- Global CDN
- Automatic HTTPS
- Edge caching
- 100GB bandwidth/month

## 🔄 Updates & Redeployment

### Auto-Deploy on Git Push

```bash
# Make changes
git add .
git commit -m "Update description"
git push origin main
# Vercel auto-deploys (takes 1-2 minutes)
```

### Manual Redeploy

Vercel Dashboard → Deployments → Latest → Three dots → Redeploy

### Preview Deployments

Every git branch gets a preview URL:
- Push to branch: `git push origin feature-branch`
- Vercel creates: `https://tms-frontend-git-feature-branch.vercel.app`

### Rollback

Vercel Dashboard → Deployments → Pick previous → Promote to Production

## 🎨 Custom Domain (Optional)

### Add Your Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add domain (e.g., `tms.yourdomain.com`)
3. Update DNS records as shown
4. Automatic SSL certificate provisioned

### Update Backend CORS

After adding custom domain:
1. Update Render `CORS_ALLOWED_ORIGINS`
2. Add: `https://tms.yourdomain.com`

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit to GitHub
2. **API URL**: Always use `https://` in production
3. **Secrets**: Use Vercel environment variables
4. **CORS**: Backend must allow your Vercel domain
5. **Content Security**: Vercel provides automatic HTTPS

## 📈 Performance Optimization

Already included:
- ✅ Code splitting (Create React App default)
- ✅ Production build minification
- ✅ Static asset caching (vercel.json)
- ✅ CDN distribution globally

Additional tips:
- Use Vercel Analytics for insights
- Monitor Core Web Vitals
- Optimize images before upload
- Consider lazy loading for heavy components

## 🆙 Upgrading Beyond Free Tier

Vercel Pro ($20/month) includes:
- Team collaboration
- Password protection
- More analytics
- Priority support
- Higher bandwidth limits

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] `REACT_APP_API_URL` environment variable set
- [ ] Deployment successful (green checkmark)
- [ ] App accessible at Vercel URL
- [ ] Can login without CORS errors
- [ ] Shipments load correctly
- [ ] All CRUD operations work
- [ ] Backend CORS updated with frontend URL

## 🔗 Important URLs

After deployment, you'll have:

1. **Production**: `https://tms-frontend.vercel.app`
2. **GraphQL Backend**: `https://your-backend.onrender.com/graphql`
3. **Vercel Dashboard**: https://vercel.com/dashboard
4. **GitHub Repo**: `https://github.com/YOUR_USERNAME/tms-frontend`

## 🎯 Success Criteria

Your frontend is deployed correctly if:
1. ✅ Vercel URL opens and shows login page
2. ✅ Can login with admin/admin123
3. ✅ Shipments load in both Grid and Tile view
4. ✅ Can create/edit/delete shipments
5. ✅ No CORS errors in browser console
6. ✅ All navigation works correctly
7. ✅ Responsive on mobile devices

## 💡 Pro Tips

1. **Use Preview Deployments**: Test features before merging to main
2. **Environment Variables**: Set for Production, Preview, and Development separately
3. **Custom Domain**: Makes app look professional
4. **Analytics**: Enable Vercel Analytics for user insights
5. **Performance**: Check Vercel's performance insights

## 🚨 Common Mistakes to Avoid

1. ❌ Forgetting `/graphql` at end of API URL
2. ❌ Using `http://` instead of `https://` for production
3. ❌ Not updating backend CORS after deployment
4. ❌ Committing `.env` file to GitHub
5. ❌ Not testing after environment variable changes

---

**Deployment Time**: ~2-3 minutes
**Your Frontend URL**: `https://tms-frontend.vercel.app`
**Free Tier**: Perfect for demos and testing
