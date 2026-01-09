import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { generateExcerpt } from '@/lib/utils/slug';
import { extractThumbnailFromContent } from '@/lib/utils/extractThumbnail';
import type { PostUpdateInput, Post } from '@/types/post';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/posts/[id] - 글 상세 조회 (slug 또는 id로 조회)
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const incrementView = searchParams.get('incrementView') === 'true';

    // id가 UUID 형식인지 확인
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    let query = supabaseAdmin.from('posts').select('*');

    if (isUUID) {
      query = query.eq('id', id);
    } else {
      // slug로 조회
      query = query.eq('slug', id);
    }

    const { data, error } = await query.single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // 조회수 증가 (production 환경에서만)
    if (incrementView && process.env.NODE_ENV === 'production') {
      await supabaseAdmin
        .from('posts')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);
    }

    return NextResponse.json({ post: data as Post });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/posts/[id] - 글 수정
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // 비밀번호 검증
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.BLOG_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body: PostUpdateInput = await request.json();

    // 업데이트할 데이터 준비
    const updateData: Record<string, unknown> = {};

    if (body.title !== undefined) updateData.title = body.title;
    if (body.content !== undefined) {
      updateData.content = body.content;
      // 내용이 변경되면 요약도 업데이트
      if (!body.excerpt) {
        updateData.excerpt = generateExcerpt(body.content);
      }
      // 썸네일 재추출
      updateData.thumbnail_url = extractThumbnailFromContent(body.content);
    }
    if (body.excerpt !== undefined) updateData.excerpt = body.excerpt;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.is_published !== undefined) updateData.is_published = body.is_published;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update post' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ post: data as Post });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/posts/[id] - 글 삭제
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // 비밀번호 검증
    const authHeader = request.headers.get('x-admin-password');
    if (authHeader !== process.env.BLOG_ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
