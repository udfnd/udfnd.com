export type PostCategory = 'Tech' | 'Music' | 'Life' | 'Etc';

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  category: PostCategory;
  tags: string[];
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostCreateInput {
  title: string;
  content: string;
  excerpt?: string;
  category: PostCategory;
  tags?: string[];
  is_published?: boolean;
}

export interface PostUpdateInput {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: PostCategory;
  tags?: string[];
  is_published?: boolean;
}

export interface PostListItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  thumbnail_url: string | null;
  category: PostCategory;
  tags: string[];
  is_published: boolean;
  created_at: string;
  view_count: number;
}
