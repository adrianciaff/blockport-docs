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
    { type: 'doc', id: 'introduction', label: 'Introduction' },
    {
      type: 'category',
      label: 'Staking',
      collapsible: true,
      collapsed: false, // Or true if you want it collapsed by default
      items: [
        { type: 'doc', id: 'overview', label: 'Overview' },
        { type: 'doc', id: 'hardware', label: 'Hardware' },
        { type: 'doc', id: 'team',     label: 'Team' },
        { type: 'doc', id: 'security', label: 'Security' }
      ],
    },
    {
      type: 'category',
      label: 'Support',
      collapsible: true,
      collapsed: false, // Or true if you want it collapsed by default
      items: [
        { type: 'doc', id: 'wholesale-investors', label: 'Wholesale Investors' },
        { type: 'doc', id: 'faq',      label: 'FAQ' },
        { type: 'doc', id: 'contact',  label: 'Contact' }

      ],
    },
                                                                // If file is form.mdx, use id: 'form', label: 'Contact Form'
  ],
  // ... other sidebars if they exist ...
};

export default sidebars; // Or module.exports = sidebars;
