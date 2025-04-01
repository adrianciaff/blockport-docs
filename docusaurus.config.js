// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Blockport',
  tagline: 'Documentation for our Solana Validator',
  favicon: 'img/favicon.png',

  // Set the production url of your site here
  url: 'https://docs.blockport.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Blockport', // Usually your GitHub org/user name.
  projectName: 'blockport-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/', // Consider updating this later to your actual repo
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/', // Consider updating this later to your actual repo
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg', // Consider creating a social card image for blockport
      navbar: {
        title: 'My Site', // You might want to change this title
        logo: {
          alt: 'My Site Logo', // Update alt text
          src: 'img/logo.svg', // Update logo path if needed
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar', // Ensure this matches your sidebar file name if default 'docs' sidebar is used
            position: 'left',
            label: 'Docs', // Changed from 'Tutorial'
          },
          // Consider removing or updating the blog link if you don't plan to use it
          {to: '/blog', label: 'Blog', position: 'left'},
          // Update GitHub link to your project's repository
          {
            href: 'https://github.com/adrianciaff/blockport-docs', // Example: Changed to your repo based on logs
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction', // Changed label
                to: '/docs/introduction',
              },
              {
                label: 'FAQ', // Added FAQ link
                to: '/docs/faq',
              },
            ],
          },
          {
            title: 'Community', // Update community links if needed
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus', // Update or remove
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus', // Update or remove
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus', // Update or remove
              },
            ],
          },
          {
            title: 'More',
            items: [
              // Consider removing blog link if unused
              {
                label: 'Blog',
                to: '/blog',
              },
              // Update GitHub link
              {
                label: 'GitHub',
                href: 'https://github.com/adrianciaff/blockport-docs', // Example: Changed to your repo
              },
            ],
          },
        ],
        // Update copyright text
        copyright: `Copyright © ${new Date().getFullYear()} Blockport. Built with Docusaurus.`,
      },
      // *** Added colorMode configuration ***
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true, // Respects user's OS preference
      },
      // *** Prism configuration (already present, ensure it's correct) ***
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;