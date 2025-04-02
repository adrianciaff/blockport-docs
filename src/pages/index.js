import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import Root from '@theme/Root'; // Keep Root!

export default function MinimalLandingPage() {
  // Ensure these paths are correct in your static/img folder
  const logoLightUrl = useBaseUrl('/img/blockport_logo_black.png'); // Black logo
  const logoDarkUrl = useBaseUrl('/img/blockport_logo_white.png');  // White logo

  return (
    <Root>
      <Head>
        <title>Blockport | Coming Soon</title>
        <meta name="description" content="Blockport Validator - Landing page coming soon" />
      </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
        }}>
        {/* Container for theme logos - THIS STRUCTURE IS CRUCIAL */}
        <div className="minimal-landing-logo" style={{ marginBottom: '1rem' }}> {/* Ensure this div exists */}
          <img
            className="logo-light-mode" // Ensure this class exists
            alt="Blockport Logo"
            src={logoLightUrl}
            width="150"
          />
          <img
            className="logo-dark-mode" // Ensure this class exists
            alt="Blockport Logo"
            src={logoDarkUrl}
            width="150"
          />
        </div>
        <p style={{ fontSize: '1.1rem' }}>
          Landing page coming soon
        </p>
      </div>
    </Root>
  );
}