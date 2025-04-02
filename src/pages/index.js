import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import Root from '@theme/Root'; // Keep Root!

export default function MinimalLandingPage() {
  // Point to just one logo version for this test
  const logoUrl = useBaseUrl('/img/blockport_logo_black.png'); // Use black logo

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
        {/* *** Use a simple img tag instead of ThemedImage *** */}
        <img
          alt="Blockport Logo"
          src={logoUrl}
          width="150"
          style={{ marginBottom: '1rem' }} // Add some space below logo
        />
        <p style={{ fontSize: '1.1rem' }}>
          Landing page coming soon
        </p>
      </div>
    </Root>
  );
}