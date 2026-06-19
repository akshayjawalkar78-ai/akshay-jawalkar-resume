import { useEffect, useRef, useState } from 'react';

// Coordinates representation: lat (-90 to 90), lon (-180 to 180)
const markers = [
  { label: 'Brooks Rehab / MOSH', location: 'Jacksonville, FL', lat: 30.33, lon: -81.65, color: '#00ffd2' },
  { label: 'Equity Econ Research / MIT Mentorship', location: 'Boston, MA', lat: 42.36, lon: -71.06, color: '#00e5ff' },
  { label: 'ThinkFinance / USA Econ Olympiad', location: 'Global / Remote', lat: 38.90, lon: -77.03, color: '#bd00ff' },
  { label: 'ActiveRecallCoach / Vercel', location: 'Cloud Node', lat: 37.77, lon: -122.41, color: '#00ffd2' }
];

const InteractiveGlobe = () => {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    angleX: 0.4,
    angleY: 0,
    isDragging: false,
    startX: 0,
    startY: 0,
    startAngleX: 0,
    startAngleY: 0,
    hoveredMarker: null
  });
  
  const [hoveredInfo, setHoveredInfo] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Dimensions
    const size = 300;
    canvas.width = size;
    canvas.height = size;

    const radius = 90;
    const center = size / 2;
    const fov = 300;

    // Convert Lat/Lon to 3D Cartesian coordinates (X, Y, Z)
    const latLonToCartesian = (lat, lon) => {
      const radLat = (lat * Math.PI) / 180;
      // offset by 90 deg so lon=0 faces forward
      const radLon = ((lon + 90) * Math.PI) / 180;

      const x = radius * Math.cos(radLat) * Math.cos(radLon);
      const z = radius * Math.cos(radLat) * Math.sin(radLon);
      const y = -radius * Math.sin(radLat); // negative because canvas y goes down

      return [x, y, z];
    };

    // Precalculate marker positions
    const marker3DPoints = markers.map((m) => {
      const [x, y, z] = latLonToCartesian(m.lat, m.lon);
      return { ...m, x, y, z };
    });

    // 3D rotations
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

    // Project Cartesian coordinate to Canvas viewport
    const project = (x, y, z) => {
      const scale = fov / (fov + z);
      return {
        x: center + x * scale,
        y: center + y * scale,
        scale
      };
    };

    // Interaction mouse drag listeners
    const handleMouseDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.startX = e.clientX;
      stateRef.current.startY = e.clientY;
      stateRef.current.startAngleX = stateRef.current.angleX;
      stateRef.current.startAngleY = stateRef.current.angleY;
    };

    const handleMouseMove = (e) => {
      const state = stateRef.current;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (state.isDragging) {
        const dx = e.clientX - state.startX;
        const dy = e.clientY - state.startY;

        // update globe rotation angles based on drag distance
        state.angleY = state.startAngleY + dx * 0.01;
        state.angleX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, state.startAngleX + dy * 0.01));
      } else {
        // Hover detection on markers
        let found = null;
        for (let i = 0; i < marker3DPoints.length; i++) {
          const pt = marker3DPoints[i];
          // Rotate point to current angle
          let [rx, ry, rz] = rotateY(pt.x, pt.y, pt.z, state.angleY);
          [rx, ry, rz] = rotateX(rx, ry, rz, state.angleX);
          
          if (rz > -10) { // point is on the front side of globe
            const proj = project(rx, ry, rz);
            const dist = Math.hypot(mx - proj.x, my - proj.y);
            if (dist < 10) {
              found = pt;
              break;
            }
          }
        }
        state.hoveredMarker = found;
        setHoveredInfo(found);
      }
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Draw Globe Animation Loop
    const draw = () => {
      const state = stateRef.current;
      
      // Auto-spin if not dragging or hovering
      if (!state.isDragging && !state.hoveredMarker) {
        state.angleY += 0.003;
      }

      ctx.clearRect(0, 0, size, size);

      // Draw faint glowing center core
      ctx.fillStyle = 'rgba(0, 229, 255, 0.015)';
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.fill();

      // Render wireframe Latitude bands
      ctx.lineWidth = 1;
      const latBands = 6;
      for (let i = 1; i < latBands; i++) {
        const theta = (i / latBands) * Math.PI - Math.PI / 2;
        const latRadius = radius * Math.cos(theta);
        const latY = radius * Math.sin(theta);

        ctx.beginPath();
        let isFirst = true;

        for (let j = 0; j <= 36; j++) {
          const phi = (j / 36) * Math.PI * 2;
          const x = latRadius * Math.cos(phi);
          const z = latRadius * Math.sin(phi);

          let [rx, ry, rz] = rotateY(x, latY, z, state.angleY);
          [rx, ry, rz] = rotateX(rx, ry, rz, state.angleX);

          const proj = project(rx, ry, rz);
          ctx.strokeStyle = `rgba(0, 229, 255, ${rz > 0 ? 0.08 : 0.025})`;

          if (isFirst) {
            ctx.moveTo(proj.x, proj.y);
            isFirst = false;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      }

      // Render wireframe Longitude bands
      const lonBands = 8;
      for (let i = 0; i < lonBands; i++) {
        const phi = (i / lonBands) * Math.PI * 2;

        ctx.beginPath();
        let isFirst = true;

        for (let j = 0; j <= 36; j++) {
          const theta = (j / 36) * Math.PI - Math.PI / 2;
          const x = radius * Math.cos(theta) * Math.cos(phi);
          const z = radius * Math.cos(theta) * Math.sin(phi);
          const y = radius * Math.sin(theta);

          let [rx, ry, rz] = rotateY(x, y, z, state.angleY);
          [rx, ry, rz] = rotateX(rx, ry, rz, state.angleX);

          const proj = project(rx, ry, rz);
          ctx.strokeStyle = `rgba(0, 229, 255, ${rz > 0 ? 0.08 : 0.025})`;

          if (isFirst) {
            ctx.moveTo(proj.x, proj.y);
            isFirst = false;
          } else {
            ctx.lineTo(proj.x, proj.y);
          }
        }
        ctx.stroke();
      }

      // Render marker pins on globe
      marker3DPoints.forEach((m) => {
        let [rx, ry, rz] = rotateY(m.x, m.y, m.z, state.angleY);
        [rx, ry, rz] = rotateX(rx, ry, rz, state.angleX);

        // Render front-facing markers (visible side of globe)
        if (rz > -10) {
          const proj = project(rx, ry, rz);
          const isHovered = state.hoveredMarker && state.hoveredMarker.label === m.label;
          
          // Draw coordinate pin dot
          ctx.fillStyle = m.color;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, isHovered ? 6 : 4, 0, Math.PI * 2);
          ctx.fill();

          // Glowing projection ring
          ctx.strokeStyle = m.color;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, isHovered ? 12 : 8, 0, Math.PI * 2);
          ctx.stroke();

          if (isHovered) {
            // Draw a futuristic pointer line to a floating text billboard
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(proj.x, proj.y);
            ctx.lineTo(proj.x + 15, proj.y - 15);
            ctx.lineTo(proj.x + 50, proj.y - 15);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center select-none py-6 px-4 hud-panel border-accent-blue/15 bg-space-950/70 relative">
      <div className="absolute top-3 left-3 text-[8px] font-mono text-accent-blue/60 tracking-widest uppercase">
        LOCATION SUMMARY
      </div>
      <div className="absolute top-3 right-3 text-[8px] font-mono text-gray-500 tracking-widest uppercase animate-pulse">
        DRAG TO EXPLORE
      </div>

      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing pointer-events-auto" style={{ cursor: 'none' }} />

      {/* Floating Info panel at bottom */}
      <div className="h-10 w-full flex items-center justify-center border-t border-white/5 mt-4">
        {hoveredInfo ? (
          <div className="text-[10px] font-mono text-center animate-fade-in text-accent-teal">
            <span className="text-white font-bold">{hoveredInfo.label}</span>
            <span className="text-gray-500 mx-2">//</span>
            <span className="text-accent-blue">{hoveredInfo.location}</span>
          </div>
        ) : (
          <div className="text-[9px] font-mono text-gray-500 tracking-wider">
            DRAG TO EXPLORE LOCATIONS
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveGlobe;
