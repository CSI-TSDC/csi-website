# Cloudinary Setup Guide

## Step 1: Install Cloudinary Package

Run this command in your terminal:
```bash
npm install cloudinary
```

## Step 2: Create Environment Variables

Create a `.env.local` file in the root of your project with the following content:

```env
# Cloudinary Configuration
CLOUDINARY_URL=cloudinary://383763195927619:sgaWv-fG_ikUU8XKxC9HVXERJ_I@dgeeamxpx
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dgeeamxpx
NEXT_PUBLIC_CLOUDINARY_API_KEY=383763195927619
CLOUDINARY_API_SECRET=sgaWv-fG_ikUU8XKxC9HVXERJ_I
```

**Important:** Make sure `.env.local` is in your `.gitignore` file to keep your credentials secure!

## Step 3: Verify Your Cloudinary Folder Structure

Make sure your Cloudinary account has the following folder structure:

```
Gallery/
  ├── 2024-25/
  │   ├── Envision/
  │   ├── SIH/
  │   └── Tea Tech Talks/
  └── 2025-26/
      ├── Envision/
      ├── SIH/
      └── Tea Tech Talks/

Teams/
  ├── Core/
  ├── Heads/
  └── Members/
```

## Step 4: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit the gallery page and teams page to see if images load from Cloudinary.

3. Check the browser console for any errors.

## How It Works

- **Gallery Images**: The gallery page now fetches images from Cloudinary's `Gallery` folder using the API route at `/api/cloudinary/list`
- **Team Images**: Team member photos are loaded from Cloudinary's `Teams` folder
- **Fallback**: If Cloudinary fails, the system falls back to the local manifest.json file (for gallery) or local image paths (for teams)

## Troubleshooting

1. **Images not loading?**
   - Check that your `.env.local` file exists and has the correct credentials
   - Verify your Cloudinary folder structure matches the expected format
   - Check the browser console for error messages
   - Make sure the Cloudinary package is installed: `npm install cloudinary`

2. **API route errors?**
   - Verify your API secret is correct in `.env.local`
   - Check that your Cloudinary account has API access enabled
   - Look at the server console for detailed error messages

3. **Still seeing local images?**
   - Clear your browser cache
   - Restart your development server after creating `.env.local`

