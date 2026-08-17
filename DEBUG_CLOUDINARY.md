# Debugging Cloudinary Integration

## Step 1: Verify Package Installation

Run this command:
```bash
npm install cloudinary
```

If you get permission errors, try:
```bash
sudo npm install cloudinary
```

## Step 2: Verify Environment Variables

Create `.env.local` in the root directory with:
```env
CLOUDINARY_URL=cloudinary://383763195927619:sgaWv-fG_ikUU8XKxC9HVXERJ_I@dgeeamxpx
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dgeeamxpx
NEXT_PUBLIC_CLOUDINARY_API_KEY=383763195927619
CLOUDINARY_API_SECRET=sgaWv-fG_ikUU8XKxC9HVXERJ_I
```

**Important:** After creating `.env.local`, restart your dev server!

## Step 3: Test the API Route

1. Start your dev server: `npm run dev`
2. Open browser console
3. Visit: `http://localhost:3000/api/cloudinary/list?folder=Gallery`
4. Check the response - you should see JSON with resources

## Step 4: Check Browser Console

Open your browser's developer console and look for:
- `[Cloudinary] Fetching images from folder: Gallery`
- `[Cloudinary API] Found resources: X`
- Any error messages

## Step 5: Verify Cloudinary Folder Structure

Your Cloudinary account should have:
- `Gallery/2024-25/Envision/...`
- `Gallery/2025-26/SIH/...`
- `Teams/Core/...`
- `Teams/Heads/...`
- `Teams/Members/...`

## Common Issues:

1. **"Cannot find module 'cloudinary'"**
   - Solution: Run `npm install cloudinary`

2. **"API key invalid" or authentication errors**
   - Solution: Check your `.env.local` file exists and has correct values
   - Restart your dev server after creating `.env.local`

3. **"No resources found"**
   - Check your Cloudinary folder structure matches expected format
   - Verify images are actually uploaded to Cloudinary
   - Check the folder names match exactly (case-sensitive)

4. **Images still loading from local**
   - Clear browser cache
   - Check browser console for errors
   - Verify the API route is working: `/api/cloudinary/list?folder=Gallery`

## Testing the API Route Directly

You can test the API route in your browser:
```
http://localhost:3000/api/cloudinary/list?folder=Gallery
```

You should see JSON response with `success: true` and a `resources` array.

