import { useEffect, useRef } from 'react';

const Starfield = ({ warpActive = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Resize canvas to fill window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star data structure
    const starCount = 180;
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.5,
      // Slow background drift speeds
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      fadeSpeed: (Math.random() - 0.5) * 0.005,
      // Warp positioning (polar coordinates centered on screen)
      warpRadius: Math.random() * Math.max(canvas.width, canvas.height),
      warpAngle: Math.random() * Math.PI * 2,
      warpSpeed: Math.random() * 5 + 5
    }));

    // Shooting stars
    let shootingStar = null;
    const spawnShootingStar = () => {
      if (warpActive) return; // no shooting stars during warp
      
      shootingStar = {
        x: Math.random() * canvas.width * 0.6,
        y: 0,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 15 + 12,
        angle: Math.PI / 4, // 45 deg diagonal flight
        opacity: 0.8
      };
    };

    // Frame rendering
    const render = () => {
      // Clear canvas with a very slight opacity during warp to leave light trails
      if (warpActive) {
        ctx.fillStyle = 'rgba(2, 5, 12, 0.15)'; // trails
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw cosmic ambient gradient
        ctx.fillStyle = '#02050c';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw active space warp or ambient stars
      if (warpActive) {
        // Center coordinates
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        stars.forEach((star) => {
          // Accelerate warp radius outwards
          star.warpRadius += star.warpSpeed;
          star.warpSpeed += 0.8; // accelerate

          // Project polar coordinate
          const x1 = cx + Math.cos(star.warpAngle) * (star.warpRadius - star.warpSpeed);
          const y1 = cy + Math.sin(star.warpAngle) * (star.warpRadius - star.warpSpeed);
          const x2 = cx + Math.cos(star.warpAngle) * star.warpRadius;
          const y2 = cy + Math.sin(star.warpAngle) * star.warpRadius;

          // Draw star light ray/trail
          const alpha = Math.min(1, star.warpRadius / 500);
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.lineWidth = star.size * 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // Reset star if it goes off-screen
          if (star.warpRadius > Math.max(canvas.width, canvas.height)) {
            star.warpRadius = Math.random() * 50;
            star.warpAngle = Math.random() * Math.PI * 2;
            star.warpSpeed = Math.random() * 5 + 5;
          }
        });

      } else {
        // Draw normal drifting stars
        stars.forEach((star) => {
          // Normal drift movement
          star.x += star.vx;
          star.y += star.vy;

          // Twinkle logic
          star.alpha += star.fadeSpeed;
          if (star.alpha > 0.8 || star.alpha < 0.1) {
            star.fadeSpeed = -star.fadeSpeed;
          }

          // Screen bounds wrap
          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;

          // Draw star dot
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.1, star.alpha)})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Subtly draw glowing cyan core on larger stars
          if (star.size > 1.2) {
            ctx.fillStyle = `rgba(0, 229, 255, ${star.alpha * 0.4})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
            ctx.fill();
          }
        });

        // Draw faint constellation lines between neighboring stars
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.025)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const s1 = stars[i];
            const s2 = stars[j];
            const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
            
            // Draw connection line if stars are close
            if (dist < 80) {
              ctx.beginPath();
              ctx.moveTo(s1.x, s1.y);
              ctx.lineTo(s2.x, s2.y);
              ctx.stroke();
            }
          }
        }

        // Handle Shooting Star Logic
        if (shootingStar) {
          shootingStar.x += shootingStar.speed;
          shootingStar.y += shootingStar.speed; // fly diagonally down-right
          shootingStar.opacity -= 0.015;

          if (shootingStar.opacity <= 0 || shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
            shootingStar = null;
          } else {
            // Draw shooting star vector line
            const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
            const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;
            
            const gradient = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
            gradient.addColorStop(0, 'rgba(0, 229, 255, 0)');
            gradient.addColorStop(1, `rgba(0, 229, 255, ${shootingStar.opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(tailX, tailY);
            ctx.lineTo(shootingStar.x, shootingStar.y);
            ctx.stroke();
          }
        } else {
          // 1.5% chance to trigger a shooting star every frame
          if (Math.random() < 0.0015) {
            spawnShootingStar();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [warpActive]);

  return <canvas ref={canvasRef} className="stars-container" />;
};

export default Starfield;
