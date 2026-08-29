import React, { useEffect, useRef } from 'react';

/**
 * ParticleCanvas: Gentle drifting feathers, soft petals, and stardust
 * Responds to subtle mouse movements and scroll velocity.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse influence
    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Particle objects: feathers, petals, glowing spores
    const particleCount = window.innerWidth < 768 ? 16 : 28;
    const particles = [];

    const colors = [
      'rgba(221, 165, 165, 0.45)', // Blush Pink
      'rgba(242, 200, 188, 0.5)',  // Soft Peach
      'rgba(155, 157, 135, 0.35)', // Sage Mist
      'rgba(214, 185, 155, 0.35)', // Warm Sand
      'rgba(255, 255, 255, 0.6)',  // Soft Cream White
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 12 + 6,
        type: Math.random() > 0.6 ? 'feather' : Math.random() > 0.3 ? 'petal' : 'spore',
        speedX: (Math.random() - 0.5) * 0.4 + 0.15,
        speedY: Math.random() * 0.5 + 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const drawFeather = (ctx, p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation + Math.sin(p.swing) * 0.3);
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1;

      // Draw feather spine & plume
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.quadraticCurveTo(p.size * 0.5, -p.size * 0.2, 0, p.size);
      ctx.quadraticCurveTo(-p.size * 0.5, -p.size * 0.2, 0, -p.size);
      ctx.fill();

      // Feather central shaft
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 1.1);
      ctx.lineTo(0, p.size * 1.1);
      ctx.stroke();

      ctx.restore();
    };

    const drawPetal = (ctx, p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation + Math.cos(p.swing) * 0.4);
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.8, p.size * 0.8, p.size * 0.8, 0, p.size * 0.9);
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.8, -p.size * 0.6, -p.size * 0.8, 0, 0);
      ctx.fill();

      ctx.restore();
    };

    const drawSpore = (ctx, p) => {
      ctx.save();
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      for (let p of particles) {
        p.swing += p.swingSpeed;
        p.rotation += p.rotationSpeed;
        p.x += p.speedX + Math.sin(p.swing) * 0.35;
        p.y += p.speedY;

        // Subtle mouse push
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Wrap around borders
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'feather') {
          drawFeather(ctx, p);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p);
        } else {
          drawSpore(ctx, p);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
