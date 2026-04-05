'use client';

import { useState, useRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import { ResizableImageExtension } from './extensions/ResizableImageExtension';
import { StarRatingExtension } from './extensions/StarRatingExtension';
import { css } from '@emotion/css';
import { colors, typography, spacing, radius, transition } from '@/styles/tokens';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic', 'image/heif'];

const editorWrapperStyles = css`
  border: 1px solid ${colors.border};
  border-radius: ${radius.md};
  background: ${colors.surface};
  overflow: hidden;
`;

const toolbarStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing[1]};
  padding: ${spacing[2]} ${spacing[3]};
  border-bottom: 1px solid ${colors.border};
  background: ${colors.surface2};
`;

const toolbarButtonStyles = css`
  padding: ${spacing[1]} ${spacing[2]};
  font-size: ${typography.small.size};
  color: ${colors.muted};
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: all ${transition.fast};

  &:hover {
    background: ${colors.surface};
    color: ${colors.text};
  }

  &.is-active {
    background: ${colors.accent.solid};
    color: ${colors.bg};
    border-color: ${colors.accent.solid};
  }
`;

const dividerStyles = css`
  width: 1px;
  height: 24px;
  background: ${colors.border};
  margin: 0 ${spacing[1]};
`;

const editorContentStyles = css`
  .tiptap {
    padding: ${spacing[4]};
    min-height: 400px;
    outline: none;
    color: ${colors.text};
    font-size: ${typography.body.size};
    line-height: ${typography.body.lineHeight};

    > * + * {
      margin-top: ${spacing[3]};
    }

    h2 {
      font-size: ${typography.h2.size};
      font-weight: ${typography.h2.weight};
      line-height: ${typography.h2.lineHeight};
      margin-top: ${spacing[6]};
      margin-bottom: ${spacing[3]};
    }

    h3 {
      font-size: ${typography.h3.size};
      font-weight: ${typography.h3.weight};
      line-height: ${typography.h3.lineHeight};
      margin-top: ${spacing[5]};
      margin-bottom: ${spacing[2]};
    }

    p {
      margin-bottom: ${spacing[3]};
    }

    ul,
    ol {
      padding-left: ${spacing[5]};
    }

    ul li {
      list-style-type: disc;
    }

    ol li {
      list-style-type: decimal;
    }

    li {
      margin-bottom: ${spacing[1]};
    }

    blockquote {
      border-left: 3px solid ${colors.accent.solid};
      padding-left: ${spacing[4]};
      margin-left: 0;
      color: ${colors.muted};
      font-style: italic;
    }

    code {
      font-family: ${typography.fontFamily.mono};
      font-size: 0.9em;
      background: ${colors.surface2};
      padding: 0.15em 0.3em;
      border-radius: ${radius.sm};
    }

    pre {
      background: ${colors.surface2};
      border: 1px solid ${colors.border};
      border-radius: ${radius.md};
      padding: ${spacing[4]};
      overflow-x: auto;

      code {
        background: none;
        padding: 0;
      }
    }

    a {
      color: ${colors.accent.solid};
      text-decoration: underline;
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: ${radius.md};
      margin: ${spacing[4]} 0;
      display: block;
    }

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      color: ${colors.faint};
      float: left;
      height: 0;
      pointer-events: none;
    }
  }
`;

const uploadErrorStyles = css`
  padding: ${spacing[2]} ${spacing[3]};
  margin: ${spacing[2]} ${spacing[3]};
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  border-radius: ${radius.sm};
  font-size: ${typography.small.size};
  color: #ef4444;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 0;
    font-size: ${typography.small.size};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const uploadingButtonStyles = css`
  opacity: 0.5;
  cursor: not-allowed !important;
`;

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = '내용을 입력하세요...',
}: TiptapEditorProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    // Client-side validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadError('지원하지 않는 파일 형식입니다. (JPEG, PNG, GIF, WebP만 가능)');
      return null;
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('파일 크기가 너무 큽니다. (최대 10MB)');
      return null;
    }

    const password = sessionStorage.getItem('blog_admin_password') || '';
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'x-admin-password': password },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '업로드에 실패했습니다.');
      }

      const { url } = await response.json();
      return url;
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : '업로드에 실패했습니다.');
      return null;
    }
  }, []);

  const handleFileUpload = useCallback(async (file: File, editorInstance: typeof editor) => {
    if (!editorInstance) return;

    setUploadError(null);

    const url = await uploadImage(file);
    if (url) {
      editorInstance.chain().focus().setImage({ src: url }).run();
    }
  }, [uploadImage]);

  const handleMultipleFileUpload = useCallback(async (files: File[], editorInstance: typeof editor) => {
    if (!editorInstance || files.length === 0) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const imageFiles = files.filter(f => f.type.startsWith('image/'));
      const urls: string[] = [];

      for (const file of imageFiles) {
        const url = await uploadImage(file);
        if (url) urls.push(url);
      }

      if (urls.length > 0) {
        const chain = editorInstance.chain().focus();
        for (const url of urls) {
          chain.setImage({ src: url }).createParagraphNear();
        }
        chain.run();
      }
    } finally {
      setIsUploading(false);
    }
  }, [uploadImage]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Underline,
      ResizableImageExtension.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          loading: 'lazy',
        },
      }),
      StarRatingExtension,
    ],
    content,
    immediatelyRender: false, // SSR hydration mismatch 방지
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
      handleDrop: (_view, event, _slice, moved) => {
        if (moved) return false;

        const files = event.dataTransfer?.files;
        if (!files || files.length === 0) return false;

        const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
        if (imageFiles.length > 0) {
          event.preventDefault();
          handleMultipleFileUpload(imageFiles, editor);
          return true;
        }
        return false;
      },
      handlePaste: (view, event, _slice) => {
        const items = event.clipboardData?.items;
        if (!items) return false;

        for (const item of Array.from(items)) {
          if (item.type.startsWith('image/')) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) {
              handleFileUpload(file, editor);
            }
            return true;
          }
        }
        return false;
      },
    },
  });

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL을 입력하세요:', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editor) return;

    await handleMultipleFileUpload(Array.from(files), editor);
    e.target.value = '';
  };

  return (
    <div className={editorWrapperStyles}>
      <div className={toolbarStyles}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('bold') ? 'is-active' : ''}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('italic') ? 'is-active' : ''}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('underline') ? 'is-active' : ''}`}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('strike') ? 'is-active' : ''}`}
          title="Strikethrough"
        >
          <s>S</s>
        </button>

        <div className={dividerStyles} />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${toolbarButtonStyles} ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${toolbarButtonStyles} ${editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}`}
          title="Heading 3"
        >
          H3
        </button>

        <div className={dividerStyles} />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('bulletList') ? 'is-active' : ''}`}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('orderedList') ? 'is-active' : ''}`}
          title="Ordered List"
        >
          1. List
        </button>

        <div className={dividerStyles} />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('blockquote') ? 'is-active' : ''}`}
          title="Blockquote"
        >
          &ldquo; Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('code') ? 'is-active' : ''}`}
          title="Inline Code"
        >
          {'</>'}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${toolbarButtonStyles} ${editor.isActive('codeBlock') ? 'is-active' : ''}`}
          title="Code Block"
        >
          Code
        </button>

        <div className={dividerStyles} />

        <button
          type="button"
          onClick={setLink}
          className={`${toolbarButtonStyles} ${editor.isActive('link') ? 'is-active' : ''}`}
          title="Link"
        >
          Link
        </button>

        <div className={dividerStyles} />

        <button
          type="button"
          onClick={handleImageButtonClick}
          className={`${toolbarButtonStyles} ${isUploading ? uploadingButtonStyles : ''}`}
          title="Insert Image"
          disabled={isUploading}
        >
          {isUploading ? '...' : 'IMG'}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().insertContent('<div data-type="star-rating" data-score="0"></div>').run()}
          className={toolbarButtonStyles}
          title="Insert Star Rating"
        >
          ★
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp,image/heic,image/heif,.heic,.heif"
          multiple
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {uploadError && (
        <div className={uploadErrorStyles}>
          <span>{uploadError}</span>
          <button type="button" onClick={() => setUploadError(null)}>닫기</button>
        </div>
      )}

      <div className={editorContentStyles}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
