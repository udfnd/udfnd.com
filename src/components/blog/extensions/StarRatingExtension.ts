import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { StarRatingComponent } from '../StarRatingComponent';

export const StarRatingExtension = Node.create({
  name: 'starRating',
  group: 'inline',
  inline: true,
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      score: {
        default: 0,
        parseHTML: (element) => parseFloat(element.getAttribute('data-score') || '0'),
        renderHTML: (attributes) => ({ 'data-score': attributes.score }),
      },
    };
  },

  parseHTML() {
    return [
      { tag: 'span[data-type="star-rating"]' },
      { tag: 'div[data-type="star-rating"]' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ 'data-type': 'star-rating' }, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(StarRatingComponent);
  },
});

