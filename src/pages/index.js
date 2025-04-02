import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head'; // For title/metadata
import Root from '@theme/Root'; // *** IMPORT Root PROVIDER ***
import ThemedImage from '@theme/ThemedImage'; // For theme-aware images

export default function MinimalLandingPage() {
  const logoLight = useBaseUrl('/img/blockport_logo_black.png');
  const logoDark = useBaseUrl('/img/blockport_logo_white.png');

  return (
    // *** WRAP everything in <Root> ***
    <Root>
      <Head>
        <title>Blockport | Coming Soon</title>
        <meta name="description" content="Blockport Validator - Landing page coming soon" />
        {/* Prevent indexing this placeholder page if desired */}
        {/* <meta name="robots" content="noindex, nofollow" /> */}
      </Head>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          // Background color comes from CSS variables set by Root/theme
        }}>
        <ThemedImage
          alt="Blockport Logo"
          sources={{
            light: logoLight,
            dark: logoDark,
          }}
          width="150"
        />
        <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
          Landing page coming soon
        </p>
      </div>
    </Root> // *** END <Root> WRAPPER ***
  );
}