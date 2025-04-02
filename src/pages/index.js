import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head'; // Import Head for title/metadata
import ThemedImage from '@theme/ThemedImage'; // Import for theme-aware images

// Optional: Import your custom styles if needed beyond global custom.css
// import styles from './index.module.css';

export default function MinimalLandingPage() {
  // Assume your logo filenames (adjust if different)
  const logoLight = useBaseUrl('/img/blockport_logo_black.png'); // Black logo for light background
  const logoDark = useBaseUrl('/img/blockport_logo_white.png');  // White logo for dark background

  return (
    <>
      <Head>
        {/* Set Title and Meta Description for this specific page */}
        <title>Blockport | Coming Soon</title>
        <meta name="description" content="Blockport Validator - Landing page coming soon" />
      </Head>
      {/* Add a CSS class to html/body maybe for specific styling */}
      {/* Or rely on inline styles / global css */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Center vertically
          alignItems: 'center',    // Center horizontally
          minHeight: '100vh',     // Take full viewport height
          textAlign: 'center',
          // Background color will be inherited from theme via html[data-theme] CSS
        }}>
        <ThemedImage
          alt="Blockport Logo"
          sources={{
            light: logoLight,
            dark: logoDark,
          }}
          width="150" // Adjust size as needed
          // height="auto" // Usually set width or height, not both
        />
        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
          Landing page coming soon
        </p>
      </div>
    </>
  );
}