'use client';

import React, { useEffect, useState } from 'react';
import PaperCrumple from './PaperCrumple';

export default function BioPaperCrumple() {
  const [dataUrl, setDataUrl] = useState<string>('/About/bio-paper.svg');

  useEffect(() => {
    let active = true;

    const renderTextToCanvas = () => {
      try {
        const canvas = document.createElement('canvas');
        // High resolution 2x canvas for crisp typography
        const w = 1100;
        const h = 640;
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // 100% TRANSPARENT background - absolutely NO fill, NO box, NO border
        ctx.clearRect(0, 0, w, h);

        // Clean editorial typography matching site styles exactly
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#f0f0f0';
        ctx.font = '400 37px "Breton", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

        const lines = [
          'My name is Sarosh. Computer Science',
          'undergrad at KLE Technological',
          'University (CGPA 8.06/10), Lead of the',
          'Data Science Club (500+ members),',
          'and open-source contributor across',
          'research organizations (BrainGlobe,',
          'ML-LAM, ML4SCI).'
        ];

        let y = 16;
        const lineHeight = 64;
        for (const line of lines) {
          ctx.fillText(line, 8, y);
          y += lineHeight;
        }

        if (active) {
          setDataUrl(canvas.toDataURL('image/png'));
        }
      } catch {
        if (active) {
          setDataUrl('/About/bio-paper.svg');
        }
      }
    };

    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        if (active) renderTextToCanvas();
      });
    } else {
      renderTextToCanvas();
    }

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="bio-paper-wrapper">
      <PaperCrumple
        src={dataUrl}
        alt="Sarosh Kumar Bio"
        width={460}
        height={268}
        sceneHeight={300}
        imageFit="contain"
        releaseBehavior="restore"
        crumpleAmount={0.85}
        crumpleDuration={0.55}
        releaseDuration={0.4}
        foldCount={6}
        foldSharpness={0.65}
        wrinkleDepth={0.7}
        creaseStrength={0.2}
        paperColor="#222226"
        roughness={0.92}
        paperTexture={0.04}
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
