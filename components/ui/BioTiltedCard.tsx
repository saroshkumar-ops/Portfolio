'use client';

import React from 'react';
import TiltedCard, { TiltedCardLayer } from './TiltedCard';
import './BioTiltedCard.css';

export default function BioTiltedCard() {
  const frontContent = (
    <TiltedCardLayer depth={22} className="bio-tilted-card-front">
      <div className="bio-card-meta">
        <span className="bio-card-meta-left">
          <span className="bio-card-dot" />
          Sarosh Kumar // Perspective
        </span>
        <span className="bio-card-flip-hint">Flip ⟲</span>
      </div>

      <div className="bio-card-body">
        <p className="bio-card-text">
          My name is Sarosh. Computer Science undergrad at KLE Technological University (CGPA 8.06/10), Lead of the
          Data Science Club (500+ members), and open-source contributor across research organizations (BrainGlobe,
          ML-LAM, ML4SCI).
        </p>
      </div>

      <div className="bio-card-footer">
        <div className="bio-card-tags">
          <span className="bio-card-tag">AI Systems</span>
          <span className="bio-card-tag">Research</span>
          <span className="bio-card-tag">Open Source</span>
        </div>
        <span className="bio-card-version">V3.0</span>
      </div>
    </TiltedCardLayer>
  );

  const backContent = (
    <TiltedCardLayer depth={22} className="bio-tilted-card-back">
      <div className="bio-card-meta">
        <span className="bio-card-meta-left">
          <span className="bio-card-dot" />
          Credentials &amp; Impact
        </span>
        <span className="bio-card-flip-hint">Back ⟲</span>
      </div>

      <div className="bio-card-back-list">
        <div className="bio-card-back-item">
          <span className="bio-card-back-label">Academics</span>
          <span className="bio-card-back-value">KLE Technological University</span>
          <span className="bio-card-back-sub">B.Tech Computer Science • CGPA 8.06 / 10</span>
        </div>

        <div className="bio-card-back-item">
          <span className="bio-card-back-label">Leadership</span>
          <span className="bio-card-back-value">Lead, Data Science Club</span>
          <span className="bio-card-back-sub">Directing technical initiatives for 500+ members</span>
        </div>

        <div className="bio-card-back-item">
          <span className="bio-card-back-label">Open Source &amp; Research</span>
          <span className="bio-card-back-value">BrainGlobe • ML-LAM • ML4SCI</span>
          <span className="bio-card-back-sub">Neuroscience vision pipelines &amp; weather AI models</span>
        </div>
      </div>

      <div className="bio-card-footer">
        <span className="bio-card-flip-note">Click anywhere to flip back</span>
        <span className="bio-card-version">India</span>
      </div>
    </TiltedCardLayer>
  );

  return (
    <div className="bio-tilted-card-wrapper">
      <TiltedCard
        containerWidth="100%"
        containerHeight="280px"
        imageWidth="100%"
        imageHeight="280px"
        rotateAmplitude={12}
        scaleOnHover={1.03}
        smoothness={0.65}
        glare={0.35}
        glareColor="#ffffff"
        shadow={0.4}
        radius={18}
        perspective={900}
        parallax={0.8}
        captionText="Click to flip"
        showTooltip={true}
        flipOnClick={true}
        backContent={backContent}
        className="bio-tilted-card-instance"
      >
        {frontContent}
      </TiltedCard>
    </div>
  );
}
