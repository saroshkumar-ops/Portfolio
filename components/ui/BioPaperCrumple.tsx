'use client';

import React, { useEffect, useState } from 'react';
import PaperCrumple from './PaperCrumple';

export default function BioPaperCrumple() {
  const [dataUrl, setDataUrl] = useState<string>('/About/bio-paper.svg');

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const w = 960;
      const h = 760;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const drawRoundRect = (
        c: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        radius: number
      ) => {
        if (typeof c.roundRect === 'function') {
          c.roundRect(x, y, width, height, radius);
        } else {
          c.rect(x, y, width, height);
        }
      };

      // Draw background paper
      ctx.fillStyle = '#0f0f13';
      ctx.beginPath();
      drawRoundRect(ctx, 16, 16, w - 32, h - 32, 16);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Top subtle meta
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(56, 56, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.font = '600 13px "JetBrains Mono", monospace, sans-serif';
      ctx.fillText('SAROSH KUMAR // PERSPECTIVE', 72, 60);

      ctx.textAlign = 'right';
      ctx.fillText('V3.0 • HOLD TO CRUMPLE', w - 56, 60);

      // Divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.beginPath();
      ctx.moveTo(56, 88);
      ctx.lineTo(w - 56, 88);
      ctx.stroke();

      // Main 7-line Bio text matching exact screenshot breaks
      ctx.textAlign = 'left';
      ctx.font = '28px "Breton", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#f0f0f0';

      const lines = [
        'My name is Sarosh. Computer Science',
        'undergrad at KLE Technological',
        'University (CGPA 8.06/10), Lead of the',
        'Data Science Club (500+ members),',
        'and open-source contributor across',
        'research organizations (BrainGlobe,',
        'ML-LAM, ML4SCI).'
      ];

      let y = 170;
      const lineHeight = 54;
      for (const line of lines) {
        ctx.fillText(line, 56, y);
        y += lineHeight;
      }

      // Bottom Divider
      ctx.beginPath();
      ctx.moveTo(56, 600);
      ctx.lineTo(w - 56, 600);
      ctx.stroke();

      // Bottom CTA / SKILLS pill
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      drawRoundRect(ctx, 56, 640, 160, 48, 24);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 15px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SKILLS  🡲', 136, 670);

      ctx.textAlign = 'right';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.font = '12px "JetBrains Mono", monospace, sans-serif';
      ctx.fillText('CLICK & DRAG TO CRUMPLE • ESC TO RESET', w - 56, 670);

      setDataUrl(canvas.toDataURL('image/png'));
    } catch {
      // Fallback to SVG
      setDataUrl('/About/bio-paper.svg');
    }
  }, []);

  return (
    <div className="bio-paper-wrapper">
      <PaperCrumple
        src={dataUrl}
        alt="Sarosh Kumar Bio Note"
        width={440}
        height={348}
        sceneHeight={440}
        imageFit="contain"
        releaseBehavior="restore"
        crumpleAmount={0.85}
        crumpleDuration={0.55}
        releaseDuration={0.4}
        foldCount={6}
        foldSharpness={0.65}
        wrinkleDepth={0.7}
        creaseStrength={0.2}
        paperColor="#1a1a20"
        roughness={0.88}
        paperTexture={0.08}
        lightIntensity={2.0}
        lightAngle={-35}
        shadow={true}
        shadowOpacity={0.14}
        draggable={true}
        returnToOrigin={true}
        rotation={-1}
      />
    </div>
  );
}
