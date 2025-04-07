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
    { type: 'doc', id: 'introduction', label: 'Introduction' }, // Object format
    { type: 'doc', id: 'overview',     label: 'Overview'     }, // Object format
    { type: 'doc', id: 'hardware',     label: 'Hardware'     }, // Object format
    { type: 'doc', id: 'team',         label: 'Team'         }, // Object format (use correct id/label)
    { type: 'doc', id: 'faq',          label: 'FAQ'          }, // Object format
    { type: 'doc', id: 'contact',      label: 'Contact'      },
 
                                                                // If file is form.mdx, use id: 'form', label: 'Contact Form'
  ],
  // ... other sidebars if they exist ...
};

export default sidebars; // Or module.exports = sidebars;
