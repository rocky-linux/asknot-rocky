import { describe, it, expect } from 'vitest';
import { questionTree } from '../questions';

describe('Question Tree', () => {
  it('has a root node with correct structure', () => {
    expect(questionTree).toHaveProperty('id', 'root');
    expect(questionTree).toHaveProperty('options');
    expect(Array.isArray(questionTree.options)).toBe(true);
  });

  it('contains all main categories', () => {
    const categories = questionTree.options.map(option => option.id);
    expect(categories).toEqual([
      'design',
      'web',
      'infrastructure',
      'documentation',
      'community',
      'testing',
      'release'
    ]);
  });

  it('has valid links for leaf nodes', () => {
    const validateLinks = (options: any[]) => {
      options.forEach(option => {
        if (option.link) {
          expect(option.link).toMatch(/^https?:\/\//); // Should be a valid URL
        }
        if (option.options) {
          validateLinks(option.options);
        }
      });
    };

    validateLinks(questionTree.options);
  });

  it('has correct structure for design category', () => {
    const design = questionTree.options.find(option => option.id === 'design');
    expect(design).toBeDefined();
    expect(design?.options).toHaveLength(3);
    expect(design?.options.map(o => o.id)).toEqual(['website', 'graphics', 'ux']);
  });

  it('has correct structure for web category', () => {
    const web = questionTree.options.find(option => option.id === 'web');
    expect(web).toBeDefined();
    expect(web?.options).toHaveLength(1);
    expect(web?.options[0].id).toBe('development');
  });

  it('has correct structure for infrastructure category', () => {
    const infra = questionTree.options.find(option => option.id === 'infrastructure');
    expect(infra).toBeDefined();
    expect(infra?.options).toHaveLength(2);
    expect(infra?.options.map(o => o.id)).toEqual(['system', 'infra-automation']);
  });

  it('has no duplicate IDs across the tree', () => {
    const ids = new Set<string>();
    const checkForDuplicates = (options: any[]) => {
      options.forEach(option => {
        expect(ids.has(option.id)).toBe(false);
        ids.add(option.id);
        if (option.options) {
          checkForDuplicates(option.options);
        }
      });
    };

    checkForDuplicates([questionTree]);
  });

  it('has consistent link structure for each category', () => {
    questionTree.options.forEach(category => {
      expect(category.link).toBeNull();
      category.options.forEach((subOption: any) => {
        expect(subOption.link).toBeDefined();
        expect(typeof subOption.link).toBe('string');
      });
    });
  });
}); 