import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout'; // *** IMPORT Layout ***
import ThemedImage from '@theme/ThemedImage';

export default function MinimalLandingPage() {
  const logoLightUrl = useBaseUrl('/img/blockport_logo_black.png');
  const logoDarkUrl = useBaseUrl('/img/blockport_logo_white.png');

  return (
    // *** USE Layout Wrapper ***
    <Layout
      title="Blockport | Coming Soon" // Set browser tab title
      description="Blockport Solana Validator - Landing page coming soon"> {/* Set meta description */}

      {/* Add a unique class name to this div */}
      <div
        className="minimal-landing-page-content" // *** ADDED CLASSNAME ***
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - var(--ifm-navbar-height) - var(--ifm-footer-height))', // Adjust height calculation
          textAlign: 'center',
          padding: '2rem 0' // Add some padding top/bottom
        }}>
        {/* Container for theme logos */}
        <div className="minimal-landing-logo" style={{ marginBottom: '1rem' }}>
           {/* Render both logos for CSS switching */}
           <img
             className="logo-light-mode"
             alt="Blockport Logo"
             src={logoLightUrl}
             width="150"
           />
           <img
             className="logo-dark-mode"
             alt="Blockport Logo"
             src={logoDarkUrl}
             width="150"
           />
        </div>
        <p style={{ fontSize: '1.1rem' }}>
          Landing page coming soon
        </p>
      </div>
    </Layout> // *** END Layout WRAPPER ***
  );
}