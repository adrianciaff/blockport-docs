import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './TeamProfileCard.module.css'; // We'll create this next
import Link from '@docusaurus/Link'; // Use Docusaurus Link if needed, or plain <a>

export default function TeamProfileCard({
  name,
  title,
  imageUrl,
  linkedinUrl,
  twitterUrl,
}) {
  const fullImageUrl = useBaseUrl(imageUrl);

  return (
    <div className={styles.profileCard}>
      <img
        src={fullImageUrl}
        alt={`Profile picture of ${name}`}
        className={styles.profileImage}
      />
      <h4 className={styles.profileName}>{name}</h4>
      <p className={styles.profileTitle}>{title}</p>
      <div className={styles.socialLinks}>
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        )}
        {twitterUrl && (
          <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
            Twitter/X
          </a>
        )}
        {/* Add other links here if needed */}
      </div>
    </div>
  );
}