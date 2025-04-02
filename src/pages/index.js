import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import Root from '@theme/Root'; // *** USE Root AGAIN ***

export default function MinimalLandingPage() {
  // Ensure these paths are correct in your static/img folder
  const logoLightUrl = useBaseUrl('/img/blockport_logo_black.png'); // Black logo
  const logoDarkUrl = useBaseUrl('/img/blockport_logo_white.png');  // White logo

  return (
    // *** WRAP in <Root> ***
    <Root>
      <Head>
        <title>Blockport | Coming Soon</title>
        <meta name="description" content="Blockport Validator - Landing page coming soon" />
        {/* Prevent indexing this placeholder page if desired */}
        {/* <meta name="robots" content="noindex, nofollow" /> */}
      </Head>
      {/* Use the centering div */}
      <div
        className="minimal-landing-page-content" // Keep class for potential styling
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh', // Use full viewport height
          textAlign: 'center',
          // Background comes from theme via Root/CSS
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
    </Root> // *** END <Root> WRAPPER ***
  );
}