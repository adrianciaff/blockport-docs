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
  favicon: 'img/favicon.ico',
  url: 'https://docs.blockport.xyz',
  baseUrl: '/',
  organizationName: 'Blockport',
  projectName: 'blockport-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',



  // Stylesheets
  stylesheets: [
    'https://use.typekit.net/esv0mpp.css',
  ],

  // i18n config
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({ // Preset options
        docs: {
          sidebarPath: './sidebars.js', // Assuming this path is correct
          // Remove editUrl if you don't want "Edit this page" links
          // editUrl:
          //  'https://github.com/adrianciaff/blockport-docs/tree/main/', // Example pointing to your repo
        },
        blog: false, // Blog disabled
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docs-v1.png', // Updated image path assuming png
      navbar: {
        title: 'Blockport',
        logo: {
          alt: 'Blockport Logo',
          src: 'img/blockport_logo_black.png',
          srcDark: 'img/blockport_logo_white.png',
          href: 'https://www.blockport.xyz/',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar', // Make sure this matches the ID in sidebars.js
            position: 'right',
            label: 'Docs',
          },
      // Inside themeConfig.navbar.items array
// Replace the simple text item above with this object:
          {
            href: 'https://t.me/+GoiXjMRh1042MTQ1', // Your Telegram link
            position: 'right',
            className: 'header-icon-link header-telegram-link', // Use specific classes for styling
            // label: '', // <-- REMOVED THIS LINE
            'aria-label': 'Telegram Group', // Accessibility label
          } // <-- Ensure comma is correct relative to other items
        ],
      },
      footer: {
       // style: 'dark', // Removed this as requested earlier
        links: [
          // "Docs" column
          {
            title: 'Docs',
            items: [
              { label: 'Introduction', to: '/docs/introduction' },
              { label: 'FAQ', to: '/docs/faq' },
              { label: 'Overview', to: '/docs/overview' }, // Example adding links
              { label: 'Hardware', to: '/docs/hardware' },
              { label: 'Contact', to: '/docs/contact' },
            ],
          },
          // "Community" column
          {
            title: 'Community',
            items: [
              {
                label: 'Telegram',
                href: 'https://t.me/+GoiXjMRh1042MTQ1',
              },
              {
                label: 'X',
                href: 'https://x.com/blockportxyz',
              },
            ],
          },
          // *** REMOVED the "More" column entirely as its only item (Blog) was invalid ***
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Blockport.`, // Updated copyright text slightly
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;