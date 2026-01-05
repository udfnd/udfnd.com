import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { generateSlug, generateExcerpt } from '@/lib/utils/slug';
import type { PostCreateInput, Post, PostListItem } from '@/types/post';

// GET /api/posts - 글 목록 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true';

    let query = supabaseAdmin
      .from('posts')
      .select('id, slug, title, excerpt, category, tags, created_at, view_count')
      .order('created_at', { ascending: false });

    // 기본적으로 발행된 글만 조회
    if (!includeUnpublished) {
      query = query.eq('is_published', true);
    }

    // 카테고리 필터
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    return NextResponse.json({ posts: data as PostListItem[] });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/posts - 글 작성
export async function POST(request: NextRequest) {
  try {
    // 비밀번호 검증
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.BLOG_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: PostCreateInput = await request.json();

    // 필수 필드 검증
    if (!body.title || !body.content || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, category' },
        { status: 400 }
      );
    }

    // 슬러그 생성
    const slug = generateSlug(body.title);

    // 요약 생성 (제공되지 않은 경우)
    const excerpt = body.excerpt || generateExcerpt(body.content);

    const postData = {
      slug,
      title: body.title,
      content: body.content,
      excerpt,
      category: body.category,
      tags: body.tags || [],
      is_published: body.is_published ?? false,
    };

    const { data, error } = await supabaseAdmin
      .from('posts')
      .insert(postData)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ post: data as Post }, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
