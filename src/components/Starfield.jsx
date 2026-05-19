import { useEffect, useState } from 'react';

const Starfield = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Subtle, professional colors for ambient particles
    const particleColors = [
      'rgba(255, 255, 255, 0.7)', 
      'rgba(255, 255, 255, 0.4)', 
      'rgba(200, 210, 230, 0.5)', 
    ];

    const generateStars = () => {
      // Create 80 subtle ambient particles (reduced from 200)
      const newStars = Array.from({ length: 80 }).map((_, i) => {
        const size = Math.random() * 2 + 0.5; // 0.5px to 2.5px
        const maxOpacity = Math.random() * 0.4 + 0.2; // 0.2 to 0.6
        const xDrift = (Math.random() - 0.5) * 30; // -15px to 15px drift
        const yDrift = (Math.random() - 0.5) * 30; // -15px to 15px drift
        const duration = Math.random() * 15 + 10; // 10s to 25s duration for very slow float
        const color = particleColors[Math.floor(Math.random() * particleColors.length)];
        
        return {
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: `${size}px`,
          duration: `${duration}s`,
          delay: `${Math.random() * 5}s`,
          maxOpacity,
          xDrift: `${xDrift}px`,
          yDrift: `${yDrift}px`,
          color
        };
      });
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="stars-container">
      {/* Very slow, subtle background gradient effect */}
      <div className="galaxy-overlay"></div>

      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: `floatAndTwinkle ${star.duration} ease-in-out infinite alternate`,
            animationDelay: star.delay,
            backgroundColor: star.color,
            '--max-opacity': star.maxOpacity,
            '--x-drift': star.xDrift,
            '--y-drift': star.yDrift,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-space-900/50 to-space-900 z-10 pointer-events-none"></div>
    </div>
  );
};

export default Starfield;
