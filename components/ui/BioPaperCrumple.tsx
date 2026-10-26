'use client';

import React, { useEffect, useState } from 'react';
import PaperCrumple from './PaperCrumple';

export default function BioPaperCrumple() {
  const [dataUrl, setDataUrl] = useState<string>('/About/bio-paper.svg');

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const w = 960;
      const h = 600;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Solid seamless background matching site #0a0a0a - absolutely NO border or box outline
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      // Clean typography matching the editorial layout
      ctx.textAlign = 'left';
      ctx.fillStyle = '#f0f0f0';
      ctx.font = '33px "Breton", Georgia, serif, -apple-system, sans-serif';

      const lines = [
        'My name is Sarosh. Computer Science',
        'undergrad at KLE Technological',
        'University (CGPA 8.06/10), Lead of the',
        'Data Science Club (500+ members),',
        'and open-source contributor across',
        'research organizations (BrainGlobe,',
        'ML-LAM, ML4SCI).'
      ];

      let y = 70;
      const lineHeight = 62;
      for (const line of lines) {
        ctx.fillText(line, 32, y);
        y += lineHeight;
      }

      setDataUrl(canvas.toDataURL('image/png'));
    } catch {
      setDataUrl('/About/bio-paper.svg');
    }
  }, []);

  return (
    <div className="bio-paper-wrapper">
      <PaperCrumple
        src={dataUrl}
        alt="Sarosh Kumar Bio"
        width={460}
        height={288}
        sceneHeight={320}
        imageFit="contain"
        releaseBehavior="restore"
        crumpleAmount={0.85}
        crumpleDuration={0.55}
        releaseDuration={0.4}
        foldCount={6}
        foldSharpness={0.65}
        wrinkleDepth={0.7}
        creaseStrength={0.2}
        paperColor="#111114"
        roughness={0.92}
        paperTexture={0.05}
        lightIntensity={1.8}
        lightAngle={-35}
        shadow={false}
        draggable={true}
        returnToOrigin={true}
        rotation={0}
      />
    </div>
  );
}
