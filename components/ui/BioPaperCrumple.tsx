'use client';

import React, { useEffect, useRef, useState } from 'react';
import PaperCrumple from './PaperCrumple';

export default function BioPaperCrumple() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('/About/bio-paper.svg');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

        // Clean dark tactile paper background (seamless with site palette, solid for 3D paper folds)
        // ABSOLUTELY NO UGLY BORDER, NO STROKE, NO TACKY OUTLINES
        ctx.fillStyle = '#141418';
        if (typeof ctx.roundRect === 'function') {
          ctx.beginPath();
          ctx.roundRect(0, 0, w, h, 16);
          ctx.fill();
        } else {
          ctx.fillRect(0, 0, w, h);
        }

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

        let y = 48;
        const lineHeight = 66;
        for (const line of lines) {
          ctx.fillText(line, 44, y);
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
    <div className="bio-paper-wrapper" style={{ position: 'relative', width: '100%', minHeight: '268px' }}>
      {/* Anchor element reserving exact space in document layout */}
      <div
        ref={anchorRef}
        className="bio-paper-anchor"
        style={{ width: '100%', minHeight: '268px', pointerEvents: 'none' }}
      />

      {/* Fullscreen unconstrained PaperCrumple movable anywhere across the entire window */}
      {mounted && (
        <PaperCrumple
          src={dataUrl}
          alt="Sarosh Kumar Bio"
          width={460}
          height={268}
          fullscreen={true}
          anchorRef={anchorRef}
          imageFit="contain"
          releaseBehavior="restore"
          crumpleAmount={0.88}
          crumpleDuration={0.5}
          releaseDuration={0.42}
          foldCount={7}
          foldSharpness={0.7}
          wrinkleDepth={0.8}
          creaseStrength={0.2}
          paperColor="#1a1a20"
          roughness={0.9}
          paperTexture={0.06}
          lightIntensity={1.8}
          lightAngle={-35}
          shadow={true}
          shadowOpacity={0.16}
          draggable={true}
          returnToOrigin={false}
        />
      )}
    </div>
  );
}
