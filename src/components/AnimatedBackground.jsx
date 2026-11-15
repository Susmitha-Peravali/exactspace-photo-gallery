import { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let animId = null;
    let width = 0;
    let height = 0;

    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleResize();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Theme-adaptive colors — detect data-theme and pick visible palettes
    const darkColors = [
      '56, 189, 248',   // Soft Cyan
      '99, 102, 241',   // Indigo
      '147, 197, 253',  // Light Sky Blue
      '255, 255, 255',  // Pure Star White
    ];
    const lightColors = [
      '2, 132, 199',    // Deep Cerulean
      '67, 56, 202',    // Rich Indigo
      '14, 116, 144',   // Teal
      '124, 58, 237',   // Vivid Violet
      '6, 182, 212',    // Bright Cyan
    ];

    const getTheme = () =>
      document.documentElement.getAttribute('data-theme') || 'dark';

    let currentTheme = getTheme();

    const buildParticles = (theme) => {
      const colors = theme === 'light' ? lightColors : darkColors;
      const count = 110;
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        radius: Math.random() * 3 + 0.8,
        speedY: Math.random() * 0.4 + 0.12,
        swaySpeed: Math.random() * 0.018 + 0.006,
        swayOffset: Math.random() * Math.PI * 2,
        swayRange: Math.random() * 1.4 + 0.3,
        depth: Math.random() * 0.7 + 0.3,
        baseAlpha: theme === 'light'
          ? Math.random() * 0.4 + 0.35   // brighter for light bg
          : Math.random() * 0.55 + 0.25,
        pulseSpeed: Math.random() * 0.028 + 0.012,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    let particles = buildParticles(currentTheme);

    // Watch for theme changes via MutationObserver on data-theme
    const themeObserver = new MutationObserver(() => {
      const newTheme = getTheme();
      if (newTheme !== currentTheme) {
        currentTheme = newTheme;
        // Smoothly transition particles to new palette
        const newColors = newTheme === 'light' ? lightColors : lightColors;
        const palette = newTheme === 'light' ? lightColors : darkColors;
        particles.forEach((p) => {
          p.color = palette[Math.floor(Math.random() * palette.length)];
          p.baseAlpha = newTheme === 'light'
            ? Math.random() * 0.4 + 0.35
            : Math.random() * 0.55 + 0.25;
        });
      }
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    let tick = 0;

    // Connection lines between nearby particles (subtle constellation effect)
    const CONNECTION_DIST = 120;

    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse parallax interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.035;
      mouse.y += (mouse.targetY - mouse.y) * 0.035;

      const isLight = currentTheme === 'light';

      // Draw faint connection lines between close particles (constellation effect)
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + mouse.x * 40 * a.depth;
        const ay = a.y + mouse.y * 40 * a.depth;

        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x + mouse.x * 40 * b.depth;
          const by = b.y + mouse.y * 40 * b.depth;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DIST) {
            const lineAlpha = (1 - dist / CONNECTION_DIST) * (isLight ? 0.12 : 0.08);
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = isLight
              ? `rgba(2, 132, 199, ${lineAlpha})`
              : `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        if (!reducedMotion) {
          p.y -= p.speedY * p.depth;
          p.x += Math.sin(tick * p.swaySpeed + p.swayOffset) * p.swayRange * 0.5;

          // Recycle particles smoothly when they float off the top
          if (p.y < -15) {
            p.y = height + 15;
            p.x = Math.random() * width;
          }
          if (p.x < -15) p.x = width + 15;
          if (p.x > width + 15) p.x = -15;
        }

        // Apply 3D perspective parallax based on particle depth
        const parallaxX = mouse.x * 40 * p.depth;
        const parallaxY = mouse.y * 40 * p.depth;
        const px = p.x + parallaxX;
        const py = p.y + parallaxY;

        // Twinkling pulse alpha
        const alpha = p.baseAlpha * (0.8 + 0.25 * Math.sin(tick * p.pulseSpeed + p.id));

        // Soft glowing particle
        ctx.beginPath();
        ctx.arc(px, py, p.radius * p.depth, 0, Math.PI * 2);

        // Soft radial glow for larger particles
        if (p.radius > 2.2) {
          const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 3);
          glowGrad.addColorStop(0, `rgba(${p.color}, ${alpha * 0.95})`);
          glowGrad.addColorStop(0.45, `rgba(${p.color}, ${alpha * 0.35})`);
          glowGrad.addColorStop(1, `rgba(${p.color}, 0)`);
          ctx.fillStyle = glowGrad;
        } else {
          ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        }

        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      themeObserver.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="animated-bg-root" aria-hidden="true">
      {/* Dynamic Ambient Full-Screen Particle Canvas */}
      <canvas ref={canvasRef} className="bg-canvas-particles" />

      {/* Atmospheric Soft Light Clouds */}
      <div className="bg-aurora bg-aurora-left" />
      <div className="bg-aurora bg-aurora-right" />
      <div className="bg-aurora bg-aurora-center" />

      {/* Soft Vignette */}
      <div className="bg-vignette" />

      {/* Analog Photography Fine-Art Grain */}
      <div className="bg-grain" />
    </div>
  );
}

export default AnimatedBackground;
