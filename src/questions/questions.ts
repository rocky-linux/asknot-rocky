/**
 * Question Tree Configuration
 *
 * This file defines the structure of the interactive question tree used to guide
 * users through different contribution paths in Rocky Linux. Each node in the tree
 * represents either a category or a specific contribution opportunity.
 *
 * Tree Structure:
 * - Root node contains main categories (design, web, infrastructure, etc.)
 * - Each category has child nodes representing specific opportunities
 * - Leaf nodes contain links to relevant resources or teams
 */

export const questionTree = {
  id: 'root',
  options: [
    {
      id: 'design',
      link: null,
      options: [
        {
          id: 'website',
          link: 'https://chat.rockylinux.org/rocky-linux/channels/web',
        },
        {
          id: 'graphics',
          link: 'https://chat.rockylinux.org/rocky-linux/channels/design',
        },
        {
          id: 'ux',
          link: 'https://chat.rockylinux.org/rocky-linux/channels/design',
        },
      ],
    },
    {
      id: 'web',
      link: null,
      options: [
        {
          id: 'development',
          link: 'https://chat.rockylinux.org/rocky-linux/channels/web',
        },
      ],
    },
    {
      id: 'infrastructure',
      link: null,
      options: [
        {
          id: 'system',
          link: 'https://infra.rocky.page/',
        },
        {
          id: 'infra-automation',
          link: 'https://infra.rocky.page/',
        },
      ],
    },
    {
      id: 'documentation',
      link: null,
      options: [
        {
          id: 'technical',
          link: 'https://github.com/rocky-linux/documentation/blob/main/README.md',
        },
        {
          id: 'translation',
          link: 'https://github.com/rocky-linux/documentation/blob/main/README.md#translation',
        },
      ],
    },
    {
      id: 'community',
      link: null,
      options: [
        {
          id: 'advocacy',
          link: 'https://wiki.rockylinux.org/team/community/',
        },
        {
          id: 'support',
          link: 'https://wiki.rockylinux.org/team/community/',
        },
        {
          id: 'events',
          link: 'https://wiki.rockylinux.org/team/community/',
        },
      ],
    },
    {
      id: 'testing',
      link: null,
      options: [
        {
          id: 'bugs',
          link: 'https://testing.rocky.page/',
        },
        {
          id: 'test-automation',
          link: 'https://testing.rocky.page/',
        },
      ],
    },
    {
      id: 'release',
      link: null,
      options: [
        {
          id: 'rpm',
          link: 'https://sig-core.rocky.page/',
        },
        {
          id: 'modules',
          link: 'https://sig-core.rocky.page/',
        },
      ],
    },
  ],
};
