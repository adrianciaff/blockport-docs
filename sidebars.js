// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
 const sidebars = {
  tutorialSidebar: [
    'introduction', // Existing page
    'faq',          // Existing page
    'form',         // <-- ADD THIS LINE (using the filename 'form')
  ],
  // ... other sidebars if they exist ...
};

export default sidebars; // Or module.exports = sidebars;
