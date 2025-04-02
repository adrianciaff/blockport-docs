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
  url: 'https://docs.blockport.xyz',
  baseUrl: '/',
  organizationName: 'Blockport',
  projectName: 'blockport-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // *** ADD THIS ARRAY (or add the URL to the existing array) ***
  stylesheets: [
    'https://use.typekit.net/esv0mpp.css',
  ],

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
          sidebarPath: './sidebars.js'
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
      
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
      image: 'img/docs-v1.jpg', // Consider creating a social card image for blockport
      navbar: {
        title: 'Blockport', // You might want to change this title
        logo: {
          alt: 'Blockport Logo', // Or more descriptive alt text
          src: 'img/blockport_logo_black.png', // <-- Black logo for light mode
          srcDark: 'img/blockport_logo_white.png', // <-- White logo for dark mode
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar', // Ensure this matches your sidebar file name if default 'docs' sidebar is used
            position: 'left',
            label: 'Docs', // Changed from 'Tutorial'
          },


        ],
      },
      footer: {
       //style: 'dark',
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
             // {
             //   label: 'Stack Overflow',
             //   href: 'https://stackoverflow.com/questions/tagged/docusaurus', // Update or remove
             // },
              {
                label: 'Telegram',
                href: 'https://t.me/+GoiXjMRh1042MTQ1', // Update or remove
              },
              {
                label: 'X',
                href: 'https://x.com/blockportxyz', // Update or remove
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
              // {
              //  label: 'GitHub',
              //  href: 'https://github.com/adrianciaff/blockport-docs', // Example: Changed to your repo
              //},
            ],
          },
        ],
        // Update copyright text
        copyright: `Copyright © ${new Date().getFullYear()} Blockport.`,
      },
      // *** Added colorMode configuration ***
      colorMode: {
        defaultMode: 'dark',
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