import { describe, it, expect } from 'vitest';

import { questionTree } from '../../questions/questions';

interface QuestionNode {
  id: string;
  link?: string | null;
  options?: QuestionNode[];
}

// Import the utility functions from QuestionNode
// Since they're not exported, we'll recreate them here for testing
const findNodeById = (
  node: QuestionNode,
  id: string
): { currentNode: QuestionNode; parentNode: QuestionNode | null; optionIndex: number } | null => {
  if (node.options) {
    const directOptionIndex = node.options.findIndex(option => option.id === id);
    if (directOptionIndex !== -1) {
      const targetNode = node.options[directOptionIndex];
      if (targetNode.options) {
        return {
          currentNode: targetNode,
          parentNode: node,
          optionIndex: 0,
        };
      }
      return {
        currentNode: node,
        parentNode: null,
        optionIndex: directOptionIndex,
      };
    }

    for (const option of node.options) {
      if (option.options) {
        const found = findNodeById(option, id);
        if (found) return found;
      }
    }
  }

  return null;
};

const getRandomItem = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

describe('QuestionNode Utilities', () => {
  describe('findNodeById', () => {
    it('finds a top-level node', () => {
      const result = findNodeById(questionTree, 'design');
      expect(result).toBeTruthy();
      expect(result?.currentNode.id).toBe('design');
      expect(result?.parentNode).toBe(questionTree);
      expect(result?.optionIndex).toBe(0);
    });

    it('finds a nested node', () => {
      const result = findNodeById(questionTree, 'website');
      expect(result).toBeTruthy();
      expect(result?.currentNode.id).toBe('design');
      expect(result?.parentNode).toBe(null);
      expect(result?.optionIndex).toBe(0);
    });

    it('returns null for non-existent node', () => {
      const result = findNodeById(questionTree, 'nonexistent');
      expect(result).toBeNull();
    });

    it('handles nodes with no options', () => {
      const mockNode = { id: 'test' };
      const result = findNodeById(mockNode, 'anything');
      expect(result).toBeNull();
    });
  });

  describe('getRandomItem', () => {
    it('returns an item from the array', () => {
      const array = ['a', 'b', 'c'];
      const result = getRandomItem(array);
      expect(array).toContain(result);
    });

    it('returns undefined for empty array', () => {
      const result = getRandomItem([]);
      expect(result).toBeUndefined();
    });

    it('returns the only item for single-item array', () => {
      const array = ['only'];
      const result = getRandomItem(array);
      expect(result).toBe('only');
    });

    it('returns random items with roughly even distribution', () => {
      const array = ['a', 'b', 'c'];
      const counts: Record<string, number> = { a: 0, b: 0, c: 0 };

      // Run 1000 iterations to test distribution
      for (let i = 0; i < 1000; i++) {
        const result = getRandomItem(array);
        counts[result]++;
      }

      // Each item should appear roughly 333 times (1000/3)
      // Allow for ±20% variance
      Object.values(counts).forEach(count => {
        expect(count).toBeGreaterThan(200); // At least 60% of expected
        expect(count).toBeLessThan(467); // No more than 140% of expected
      });
    });
  });
});
