import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';
import convert from 'heic-convert';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];
const HEIC_TYPES = ['image/heic', 'image/heif'];
const BUCKET_NAME = 'blog-images';

function sanitizeFilename(filename: string): string {
  // Remove extension, sanitize, then add back
  const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
  const name = filename.replace(/\.[^/.]+$/, '');
  const sanitized = name
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 50);
  return `${sanitized}.${ext}`;
}

function getDatePath(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}/${month}`;
}

export async function POST(request: NextRequest) {
  try {
    // Auth check
    const password = request.headers.get('x-admin-password');
    if (password !== process.env.BLOG_ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse FormData
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, GIF, WebP' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 10MB allowed' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const uuid = uuidv4().slice(0, 8);
    const sanitizedName = sanitizeFilename(file.name);
    const datePath = getDatePath();
    let filePath = `${datePath}/${uuid}-${sanitizedName}`;

    // Convert File to ArrayBuffer then to Buffer
    const arrayBuffer = await file.arrayBuffer();
    let buffer: Buffer = Buffer.from(arrayBuffer);
    let contentType = file.type;

    // Convert HEIC/HEIF to WebP
    if (HEIC_TYPES.includes(file.type)) {
      const jpegBuffer = await convert({ buffer: arrayBuffer, format: 'JPEG', quality: 1 });
      buffer = await sharp(Buffer.from(jpegBuffer)).webp({ quality: 90 }).toBuffer();
      contentType = 'image/webp';
      filePath = filePath.replace(/\.hei[cf]$/i, '.webp');
    }

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType,
        cacheControl: '31536000', // 1 year cache
        upsert: false,
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return NextResponse.json({ url: urlData.publicUrl });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
