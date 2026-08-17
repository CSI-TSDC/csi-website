import { v2 as cloudinary } from 'cloudinary';

// Extract API secret from CLOUDINARY_URL if available
function getApiSecret() {
  if (process.env.CLOUDINARY_API_SECRET) {
    return process.env.CLOUDINARY_API_SECRET;
  }
  if (process.env.CLOUDINARY_URL) {
    // Format: cloudinary://api_key:api_secret@cloud_name
    const match = process.env.CLOUDINARY_URL.match(/cloudinary:\/\/[^:]+:([^@]+)@/);
    if (match) {
      return match[1];
    }
  }
  return 'sgaWv-fG_ikUU8XKxC9HVXERJ_I';
}

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dgeeamxpx',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '383763195927619',
  api_secret: getApiSecret(),
});

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || '';
    
    console.log('[Cloudinary API] Fetching folder:', folder);
    console.log('[Cloudinary API] Config:', {
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key ? '***set***' : 'missing',
      api_secret: cloudinary.config().api_secret ? '***set***' : 'missing'
    });
    
    // Use Admin API to get resources with full folder paths
    // This gives us better folder information than the search API
    let resources = [];
    
    if (folder) {
      // Get all resources in the folder recursively
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder,
        max_results: 500,
        context: true
      });
      resources = result.resources || [];
    } else {
      // Get all resources - use search API for better results when no folder specified
      try {
        const searchResult = await cloudinary.search
          .expression('*')
          .max_results(500)
          .execute();
        resources = searchResult.resources || [];
        
        // If search API doesn't return enough, also try Admin API
        if (resources.length === 0) {
          const result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 500,
            context: true
          });
          resources = result.resources || [];
        }
      } catch (error) {
        console.warn('[Cloudinary API] Search API failed, trying Admin API:', error);
        // Fallback to Admin API
        const result = await cloudinary.api.resources({
          type: 'upload',
          max_results: 500,
          context: true
        });
        resources = result.resources || [];
      }
    }
    
    const result = { resources, total_count: resources.length };
    
    console.log('[Cloudinary API] Found resources:', result.resources?.length || 0);
    if (result.resources && result.resources.length > 0) {
      console.log('[Cloudinary API] Sample resource:', {
        public_id: result.resources[0].public_id,
        folder: result.resources[0].folder,
        format: result.resources[0].format,
        secure_url: result.resources[0].secure_url,
        full_object: JSON.stringify(result.resources[0], null, 2).substring(0, 500)
      });
    }
    
    return Response.json({
      success: true,
      resources: result.resources || [],
      total: result.total_count || 0
    });
  } catch (error) {
    console.error('[Cloudinary API] Error:', error);
    console.error('[Cloudinary API] Error details:', {
      message: error.message,
      name: error.name,
      cloud_name: cloudinary.config().cloud_name,
      api_key: cloudinary.config().api_key ? '***set***' : 'missing',
      api_secret: cloudinary.config().api_secret ? '***set***' : 'missing'
    });
    return Response.json(
      { 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

