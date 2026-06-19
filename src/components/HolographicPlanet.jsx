import { useEffect, useRef } from 'react';

const HolographicPlanet = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Dimensions
    const size = 380;
    canvas.width = size;
    canvas.height = size;

    // Projection constants
    const fov = 350;
    const center = size / 2;

    // 3D rotation angles
    let angleX = 0.3;
    let angleY = 0;
    let angleZ = 0.1;

    // Sphere grid properties
    const numLatitudes = 8;
    const numLongitudes = 12;
    const radius = 100;

    // Satellites & particles orbiting the planet
    const satellites = Array.from({ length: 25 }).map(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.3; // concentrated near equator
      const dist = radius * (1.3 + Math.random() * 0.4);
      const speed = 0.008 + Math.random() * 0.015;
      return { theta, phi, dist, speed, size: Math.random() * 1.5 + 0.5 };
    });

    // Handle mouse movement for tilting
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - center;
      const y = e.clientY - rect.top - center;
      
      // Target tilt proportional to cursor position
      mouseRef.current.targetX = (y / center) * 0.4;
      mouseRef.current.targetY = (x / center) * 0.4;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0.2;
      mouseRef.current.targetY = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // 3D Projection Helper
    const project = (x, y, z) => {
      // Perspective scale factor
      const scale = fov / (fov + z);
      return {
        x: center + x * scale,
        y: center + y * scale,
        scale
      };
    };

    // 3D Rotations
    const rotateX = (x, y, z, theta) => {
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      return [x, y * cos - z * sin, y * sin + z * cos];
    };

    const rotateY = (x, y, z, theta) => {
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      return [x * cos + z * sin, y, -x * sin + z * cos];
    };

    const rotateZ = (x, y, z, theta) => {
      const cos = Math.cos(theta);
      const sin = Math.sin(theta);
      return [x * cos - y * sin, x * sin + y * cos, z];
    };

    // Draw frame
    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Smoothly interpolate current tilt to target tilt
      angleX += (mouseRef.current.targetX - angleX) * 0.05;
      angleY += (mouseRef.current.targetY - angleY) * 0.05;

      // Base planetary rotation (Y-axis constant spin)
      const currentAngleY = angleY + (Date.now() * 0.0004);

      // Draw outer atmospheric halo glow
      const haloGradient = ctx.createRadialGradient(center, center, radius * 0.8, center, center, radius * 1.3);
      haloGradient.addColorStop(0, 'rgba(0, 229, 255, 0.02)');
      haloGradient.addColorStop(0.5, 'rgba(0, 229, 255, 0.08)');
      haloGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = haloGradient;
      ctx.beginPath();
      ctx.arc(center, center, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Gather points to draw wireframe
      // Draw Latitude circles (horizontal rings)
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.07)';
      ctx.lineWidth = 1;

      for (let i = 1; i < numLatitudes; i++) {
        const phi = (i / numLatitudes) * Math.PI - Math.PI / 2;
        const rLat = radius * Math.cos(phi);
        const yLat = radius * Math.sin(phi);

        ctx.beginPath();
        let firstPoint = true;

        for (let j = 0; j <= 40; j++) {
          const theta = (j / 40) * Math.PI * 2;
          const xVal = rLat * Math.cos(theta);
          const zVal = rLat * Math.sin(theta);

          // Apply rotations
          let [rx, ry, rz] = rotateY(xVal, yLat, zVal, currentAngleY);
          [rx, ry, rz] = rotateX(rx, ry, rz, angleX);
          [rx, ry, rz] = rotateZ(rx, ry, rz, angleZ);

          // Only draw points facing forward for 3D sorting or draw them faint
          const proj = project(rx, ry, rz);
          
          if (rz > -20) { // front half (fade back half)
            ctx.strokeStyle = `rgba(0, 229, 255, ${rz > 0 ? 0.18 : 0.05})`;
            if (firstPoint) {
              ctx.moveTo(proj.x, proj.y);
              firstPoint = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw Longitude lines (vertical semi-ellipses)
      for (let i = 0; i < numLongitudes; i++) {
        const theta = (i / numLongitudes) * Math.PI * 2;
        
        ctx.beginPath();
        let firstPoint = true;

        for (let j = 0; j <= 40; j++) {
          const phi = (j / 40) * Math.PI - Math.PI / 2;
          const xVal = radius * Math.cos(phi) * Math.cos(theta);
          const zVal = radius * Math.cos(phi) * Math.sin(theta);
          const yVal = radius * Math.sin(phi);

          // Apply rotations
          let [rx, ry, rz] = rotateY(xVal, yVal, zVal, currentAngleY);
          [rx, ry, rz] = rotateX(rx, ry, rz, angleX);
          [rx, ry, rz] = rotateZ(rx, ry, rz, angleZ);

          const proj = project(rx, ry, rz);
          
          if (rz > -20) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${rz > 0 ? 0.18 : 0.05})`;
            if (firstPoint) {
              ctx.moveTo(proj.x, proj.y);
              firstPoint = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw equatorial orbit dashboard rings (vector spacecraft HUD circles)
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
      ctx.lineWidth = 1;
      
      // Large orbital disk / ring
      ctx.beginPath();
      for (let j = 0; j <= 60; j++) {
        const tRing = (j / 60) * Math.PI * 2;
        const rRing = radius * 1.5;
        const xRing = rRing * Math.cos(tRing);
        const zRing = rRing * Math.sin(tRing);
        
        let [rx, ry, rz] = rotateY(xRing, 0, zRing, currentAngleY * 0.5);
        [rx, ry, rz] = rotateX(rx, ry, rz, angleX);
        [rx, ry, rz] = rotateZ(rx, ry, rz, angleZ);

        const proj = project(rx, ry, rz);
        if (firstPoint) {
          ctx.moveTo(proj.x, proj.y);
        } else {
          ctx.lineTo(proj.x, proj.y);
        }
      }
      ctx.stroke();

      // Render Satellites and Orbital dust cloud
      satellites.forEach((sat) => {
        // Orbital motion logic
        sat.theta += sat.speed;

        const xVal = sat.dist * Math.cos(sat.theta) * Math.cos(sat.phi);
        const zVal = sat.dist * Math.sin(sat.theta) * Math.cos(sat.phi);
        const yVal = sat.dist * Math.sin(sat.phi);

        // Rotate
        let [rx, ry, rz] = rotateY(xVal, yVal, zVal, currentAngleY * 0.8);
        [rx, ry, rz] = rotateX(rx, ry, rz, angleX);
        [rx, ry, rz] = rotateZ(rx, ry, rz, angleZ);

        const proj = project(rx, ry, rz);

        // Sort render opacity based on distance (Z depth)
        const alpha = Math.max(0.05, Math.min(0.9, (rz + radius * 1.7) / (radius * 3)));
        
        ctx.fillStyle = `rgba(0, 229, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, sat.size * proj.scale, 0, Math.PI * 2);
        ctx.fill();

        // Glow tail on key satellites
        if (sat.size > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#00ffd2';
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, sat.size * proj.scale * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Orbit tracker vector details
      ctx.font = '7px monospace';
      ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.fillText('HLG_PRJ_V4.0', center - radius, center + radius * 1.5);
      ctx.fillText('COORDS: Stanton Prep // FL', center - radius, center + radius * 1.6);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[380px] h-[380px] select-none pointer-events-auto">
      {/* Canvas planet */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Target scope brackets overlay */}
      <div className="absolute inset-0 border border-accent-blue/5 rounded-full pointer-events-none" />
      <div className="absolute top-2 left-2 bottom-2 right-2 border border-accent-blue/10 rounded-full animate-[spin_40s_linear_infinite] border-dashed pointer-events-none" />
      <div className="absolute top-8 left-8 bottom-8 right-8 border border-accent-teal/5 rounded-full pointer-events-none" />
    </div>
  );
};

export default HolographicPlanet;
