import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// High-precision 3D Lat/Lon Earth Continent Points Generator (~2000 points)
const WORLD_LAT_LON_POINTS = (() => {
  function isLandLatLon(lat, lon) {
    // Greenland
    if (lat >= 60 && lat <= 83 && lon >= -73 && lon <= -12) {
      if ((lon - -73) + (lat - 60) * 1.5 <= 75) return true;
    }
    // North America
    if (lat >= 55 && lat <= 72 && lon >= -170 && lon <= -130) return true; // Alaska
    if (lat >= 48 && lat <= 75 && lon >= -140 && lon <= -60) { // Canada
      if (lat >= 51 && lat <= 64 && lon >= -95 && lon <= -78) return false; // Hudson Bay
      return true;
    }
    if (lat >= 25 && lat <= 49 && lon >= -125 && lon <= -67) return true; // US
    if (lat >= 15 && lat <= 32 && lon >= -117 && lon <= -86) return true; // Mexico
    if (lat >= 8 && lat <= 18 && lon >= -92 && lon <= -77) return true; // Central America
    if (lat >= 10 && lat <= 25 && lon >= -85 && lon <= -60) return true; // Caribbean

    // South America
    if (lat >= -56 && lat <= 13 && lon >= -82 && lon <= -34) {
      if (lat >= 0 && lon >= -80 && lon <= -50) return true; // N SA
      if (lat < 0 && lat >= -20 && lon >= -81 && lon <= -34) return true; // Brazil/Peru
      if (lat < -20) { // Southern cone tapering
        const minLon = -76 + (-20 - lat) * 0.2;
        const maxLon = -52 - (-20 - lat) * 0.4;
        if (lon >= minLon && lon <= maxLon) return true;
      }
    }

    // Europe
    if (lat >= 50 && lat <= 60 && lon >= -10 && lon <= 2) return true; // UK/Ireland
    if (lat >= 55 && lat <= 71 && lon >= 4 && lon <= 32) return true; // Scandinavia
    if (lat >= 36 && lat <= 55 && lon >= -10 && lon <= 30) return true; // Western/Central EU
    if (lat >= 45 && lat <= 65 && lon >= 25 && lon <= 50) return true; // Eastern EU

    // Africa
    if (lat >= -35 && lat <= 37 && lon >= -17 && lon <= 51) {
      if (lat >= 15 && lon >= -17 && lon <= 35) return true; // N Africa
      if (lat >= 4 && lat < 15 && lon >= -17 && lon <= 15) return true; // W Africa
      if (lat >= -15 && lat < 15 && lon >= 8 && lon <= 51) return true; // C & E Africa
      if (lat < -15) { // S Africa
        const minLon = 12 + (-15 - lat) * 0.3;
        const maxLon = 36 - (-15 - lat) * 0.3;
        if (lon >= minLon && lon <= maxLon) return true;
      }
    }
    if (lat >= -26 && lat <= -12 && lon >= 43 && lon <= 51) return true; // Madagascar

    // Asia & Russia
    if (lat >= 50 && lat <= 75 && lon >= 30 && lon <= 180) return true; // Russia/Siberia
    if (lat >= 20 && lat <= 50 && lon >= 60 && lon <= 130) return true; // China/C Asia
    if (lat >= 12 && lat <= 42 && lon >= 35 && lon <= 65) return true; // Middle East
    if (lat >= 8 && lat <= 35 && lon >= 68 && lon <= 89) { // India
      if (lat < 20) {
        const minLon = 68 + (20 - lat) * 0.7;
        const maxLon = 89 - (20 - lat) * 0.7;
        if (lon >= minLon && lon <= maxLon) return true;
      }
      return true;
    }
    if (lat >= 8 && lat <= 25 && lon >= 95 && lon <= 110) return true; // SE Asia
    if (lat >= 34 && lat <= 43 && lon >= 124 && lon <= 130) return true; // Korea
    if (lat >= 30 && lat <= 45 && lon >= 129 && lon <= 146) return true; // Japan
    if (lat >= -10 && lat <= 18 && lon >= 95 && lon <= 140) return true; // Indonesia/Philippines

    // Australia
    if (lat >= -39 && lat <= -11 && lon >= 113 && lon <= 154) {
      if (lat >= -18 && lat <= -11 && lon >= 130 && lon <= 142) return false; // Gulf
      return true;
    }
    if (lat >= -44 && lat <= -40 && lon >= 144 && lon <= 149) return true; // Tasmania
    if (lat >= -47 && lat <= -34 && lon >= 166 && lon <= 179) return true; // NZ

    return false;
  }

  const points = [];
  const latStep = 3.2;
  const lonStep = 3.2;

  for (let lat = -75; lat <= 75; lat += latStep) {
    for (let lon = -180; lon <= 180; lon += lonStep) {
      if (isLandLatLon(lat, lon)) {
        points.push([Number(lat.toFixed(1)), Number(lon.toFixed(1))]);
      }
    }
  }
  return points;
})();

const CoinBadge = ({ className, children, haloColor = 'rgba(124,102,148,0.3)', size = 'w-16 sm:w-20 h-16 sm:h-20', rotateClass = '' }) => (
  <div className={`absolute ${className}`}>
    <div 
      className={`relative ${size} rounded-full bg-[#211A2D] flex items-center justify-center transform ${rotateClass} transition-transform`}
      style={{
        border: '1.5px solid rgba(255, 255, 255, 0.2)',
        boxShadow: `
          inset 0 4px 6px rgba(255,255,255,0.2), 
          inset 0 -5px 15px rgba(0,0,0,0.8), 
          0 15px 35px ${haloColor}
        `
      }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  </div>
);

// High-Performance True 3D Spherical Canvas Globe Renderer
const InteractiveCanvasGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let rotation = 0;

    const render = () => {
      rotation += 0.25; // Smooth 3D rotation velocity
      if (rotation >= 360) rotation -= 360;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = width / 2 - 24; // Sphere radius inside canvas bounds

      const tilt = 18 * (Math.PI / 180); // Earth axial tilt (18 deg)

      // Render 3D dotted landmass points
      for (let i = 0; i < WORLD_LAT_LON_POINTS.length; i++) {
        const [lat, lon] = WORLD_LAT_LON_POINTS[i];

        const radLat = lat * (Math.PI / 180);
        const radLon = (lon + rotation) * (Math.PI / 180);

        // 3D Cartesian coordinates on sphere
        const x3d = radius * Math.cos(radLat) * Math.sin(radLon);
        const y3d = radius * Math.sin(radLat);
        const z3d = radius * Math.cos(radLat) * Math.cos(radLon);

        // Apply Axial Tilt (around X axis)
        const y3d_tilted = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
        const z3d_tilted = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);

        // Render only front-facing hemisphere
        if (z3d_tilted > 0) {
          const screenX = centerX + x3d;
          const screenY = centerY - y3d_tilted;

          // Spherical foreshortening & depth scaling
          const depthScale = z3d_tilted / radius; // 0 at horizon, 1 at center
          const dotRadius = 2.0 + 2.8 * depthScale; // Crisp white dots
          const alpha = 0.45 + 0.55 * depthScale;

          ctx.beginPath();
          ctx.arc(screenX, screenY, dotRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.95)';
          ctx.shadowBlur = 6 * depthScale;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1200}
      height={1200}
      className="w-full h-full pointer-events-none drop-shadow-[0_0_25px_rgba(255,255,255,0.85)] z-10 relative"
    />
  );
};

export default function GlobalReach() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Hovering floating animations for the 9 mode badges
    const coins = gsap.utils.toArray('.coin-badge');
    coins.forEach((coin, i) => {
      gsap.to(coin, {
        y: '-=15',
        duration: 3 + (i % 3) * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.15,
      });
    });

    // Master Scroll Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=2500",
        scrub: 1,
        pin: true,
      }
    });

    // Initial setups
    gsap.set('.social-card', { xPercent: -50, yPercent: -50, scale: 0, opacity: 0, x: 0, y: 0 });

    // Phase 1: Badges submerge and text fades out
    tl.to(coins, {
      y: 500,
      opacity: 0,
      stagger: 0.05,
      duration: 2,
      ease: "power2.in"
    }, 0);

    tl.to('.hero-text', {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, 0);

    // Phase 2: Center and Shrink the Globe
    const windowHeight = window.innerHeight;
    const isMobile = window.innerWidth < 640;
    const globeHeight = isMobile ? 900 : 1500;
    const marginTopVal = isMobile ? -300 : -280;
    
    const initialCenterY = windowHeight + marginTopVal + (globeHeight / 2);
    const targetCenterY = windowHeight / 2;
    const yTranslation = targetCenterY - initialCenterY;

    tl.to('.globe-container', {
      y: yTranslation,
      scale: isMobile ? 0.4 : 0.35,
      duration: 3,
      ease: "power2.inOut"
    }, 1.5);

    // Phase 3: Radial Pop Out
    tl.to('.social-card', {
      x: (index, target) => parseInt(target.dataset.x),
      y: (index, target) => parseInt(target.dataset.y),
      scale: 1,
      opacity: 1,
      stagger: 0.15,
      duration: 2.5,
      ease: "back.out(1.2)"
    }, 4);

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen bg-gradient-to-b from-[#F5F1F9] via-[#E8E0F0] to-[#D8CBE4] overflow-hidden flex flex-col items-center pt-24 font-sans select-none"
    >
      {/* Background Floating Soft Lavender Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-[#7C6694]/25 rounded-full blur-[0.5px]" />
        <div className="absolute top-[25%] right-[12%] w-2.5 h-2.5 bg-[#7C6694]/30 rounded-full blur-[0.5px]" />
        <div className="absolute top-[60%] left-[5%] w-2 h-2 bg-[#7C6694]/20 rounded-full blur-[0.5px]" />
        <div className="absolute top-[70%] right-[7%] w-1.5 h-1.5 bg-[#7C6694]/25 rounded-full blur-[0.5px]" />
      </div>

      {/* Typography */}
      <div className="hero-text relative z-30 text-center max-w-4xl px-4">
        <h2 className="text-5xl sm:text-7xl font-light tracking-tight text-[#1A1224] leading-[1.1] mb-6 font-heading">
          One Companion. <br />
          <span className="text-[#7C6694] font-semibold">No Waitlists.</span> <span className="font-light">No Judgment.</span>
        </h2>
        <p className="text-sm sm:text-lg text-[#5E546C] font-normal max-w-xl mx-auto leading-relaxed font-sans">
          Through structured assessments and always-on support, SoulNest lets you check in, reflect, and track your progress anytime — no appointments, no waiting rooms.
        </p>
      </div>

      {/* Floating Mode Badges Arc */}
      <div className="relative z-30 w-full max-w-6xl mt-4 sm:mt-8 h-[250px] sm:h-[500px] mx-auto pointer-events-none">
        
        {/* 1. Heart — Emotional Support */}
        <CoinBadge className="coin-badge left-[2%] sm:left-[2%] top-[70%] sm:top-[72%]" rotateClass="-rotate-12" haloColor="rgba(244, 63, 94, 0.4)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-rose-400" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </CoinBadge>

        {/* 2. Brain/thought bubble — CBT */}
        <CoinBadge className="coin-badge left-[11.5%] sm:left-[11.5%] top-[55%] sm:top-[51%]" rotateClass="-rotate-6" haloColor="rgba(124, 102, 148, 0.5)">
          <svg className="w-8 sm:w-10 h-8 sm:h-10 fill-[#A78BFA]" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 10h-4v-2h4v2zm2-4H8V6h8v2z"/>
          </svg>
        </CoinBadge>

        {/* 3. Target/arrow — Behavioral Coaching */}
        <CoinBadge className="coin-badge left-[23.5%] sm:left-[23.5%] top-[40%] sm:top-[35%]" rotateClass="-rotate-3" haloColor="rgba(16, 185, 129, 0.4)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="9"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          </svg>
        </CoinBadge>
        
        {/* 4. Leaf — Mindfulness */}
        <CoinBadge className="coin-badge left-[36%] sm:left-[36%] top-[25%] sm:top-[25%]" rotateClass="rotate-6" haloColor="rgba(34, 197, 94, 0.4)">
          <svg className="w-8 sm:w-10 h-8 sm:h-10 fill-green-400" viewBox="0 0 24 24">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.42 1.42c.45-.45.98-.83 1.55-1.13C12.75 19 21 11.25 21 3c0 0-2 2-4 5z"/>
          </svg>
        </CoinBadge>

        {/* 5. CENTER BADGE: SoulNest App Icon */}
        <CoinBadge className="coin-badge left-[50%] -translate-x-1/2 top-[10%] sm:top-[19%]" size="w-20 sm:w-28 h-20 sm:h-28" rotateClass="-rotate-6" haloColor="rgba(124, 102, 148, 0.6)">
          <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-gradient-to-br from-[#9B82B8] via-[#7C6694] to-[#594472] border border-white/40 shadow-[inset_0_2px_5px_rgba(255,255,255,0.4)] flex items-center justify-center text-white font-bold text-xl sm:text-2xl tracking-tight">
            <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-white drop-shadow-md" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </CoinBadge>

        {/* 6. Two overlapping circles — Relationship Reflection */}
        <CoinBadge className="coin-badge right-[36%] sm:right-[36%] top-[25%] sm:top-[25%]" rotateClass="rotate-12" haloColor="rgba(147, 51, 234, 0.4)">
          <svg className="w-8 sm:w-10 h-8 sm:h-10 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="12" r="6"/>
            <circle cx="15" cy="12" r="6"/>
          </svg>
        </CoinBadge>

        {/* 7. Dove/candle — Grief Support */}
        <CoinBadge className="coin-badge right-[23.5%] sm:right-[23.5%] top-[40%] sm:top-[35%]" rotateClass="rotate-3" haloColor="rgba(245, 158, 11, 0.4)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-amber-400" viewBox="0 0 24 24">
            <path d="M12 2c1.1 0 2 .9 2 2 0 2.5-3.5 6-4 8 1-.5 2.5-1 3.5-1 2 0 3.5 1.5 3.5 3.5 0 2-1.5 3.5-3.5 3.5S10 16.5 10 14.5c0-1.5.5-2.5 1.5-3.5-1-1.5-2-3-2-5.5 0-1.1.9-2 2.5-3.5zm-3 18h6v2H9v-2z"/>
          </svg>
        </CoinBadge>

        {/* 8. Open book — Story Therapy */}
        <CoinBadge className="coin-badge right-[11.5%] sm:right-[11.5%] top-[55%] sm:top-[51%]" rotateClass="-rotate-6" haloColor="rgba(14, 165, 233, 0.4)">
          <svg className="w-8 sm:w-10 h-8 sm:h-10 fill-sky-400" viewBox="0 0 24 24">
            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.45-.75-2.5-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
          </svg>
        </CoinBadge>

        {/* 9. Shield — Crisis Support */}
        <CoinBadge className="coin-badge right-[2%] sm:right-[2%] top-[70%] sm:top-[72%]" rotateClass="rotate-12" haloColor="rgba(239, 68, 68, 0.4)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-red-400" viewBox="0 0 24 24">
            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"/>
          </svg>
        </CoinBadge>
      </div>

      {/* Realistic 3D Dotted World Globe (Light Purple Palette Style) */}
      <div className="globe-container absolute left-1/2 -translate-x-1/2 top-[100%] mt-[-300px] sm:mt-[-280px] w-[900px] sm:w-[1500px] h-[900px] sm:h-[1500px] rounded-full z-20 overflow-hidden bg-gradient-to-b from-[#A58EC1] via-[#7C6694] to-[#4E3965] shadow-[0_0_100px_rgba(124,102,148,0.4),inset_0_0_60px_rgba(255,255,255,0.7),inset_0_-20px_50px_rgba(50,32,70,0.8)] flex items-center justify-center p-8 sm:p-14">
        
        {/* Interactive True 3D Spherical Canvas Globe */}
        <InteractiveCanvasGlobe />

        {/* Specular Top Lighting Highlight Overlay */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.2)_40%,transparent_70%)] pointer-events-none z-20" />

        {/* Outer Soft Rim Atmosphere Halo */}
        <div className="absolute inset-0 rounded-full border-2 border-white/50 shadow-[inset_0_0_80px_rgba(255,255,255,0.6)] pointer-events-none z-30" />
      </div>

      {/* Social Elements Pop-out Container */}
      <div className="absolute left-1/2 top-1/2 w-0 h-0 z-30 pointer-events-none">
        
        {/* Top pill (floating, above sphere) */}
        <div className="social-card absolute flex items-center justify-center bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 border border-[#7C6694]/20 shadow-xl whitespace-nowrap text-[#1A1224] text-xs sm:text-sm font-semibold" data-x="0" data-y="-400">
          Join our SoulNest community!
        </div>

        {/* Top-left card: Daily Reflection */}
        <div className="social-card absolute w-[260px] sm:w-[280px] bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#7C6694]/20 shadow-2xl text-left" data-x="-420" data-y="-220">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 rounded-full bg-[#7C6694] flex items-center justify-center text-white shadow-md shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.42 1.42c.45-.45.98-.83 1.55-1.13C12.75 19 21 11.25 21 3c0 0-2 2-4 5z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-[#1A1224] text-sm leading-tight font-heading">Daily Reflection</h4>
              <p className="text-xs text-[#5E546C] font-medium font-sans">@MindfulMoments</p>
            </div>
          </div>
          <p className="text-xs text-[#2D243B] font-medium mb-3 leading-relaxed font-sans">
            "What step made you feel grounded today?"
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-[#7C6694]/15 text-[10px] font-sans">
            <span className="text-[#5E546C]">Jan 26, 12:28 PM</span>
            <button className="bg-[#7C6694] hover:bg-[#9278B1] text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md transition-transform hover:scale-105 pointer-events-auto">
              Reflect Now
            </button>
          </div>
        </div>

        {/* Mid-right card: SoulNest Insight */}
        <div className="social-card absolute bg-white/95 backdrop-blur-xl rounded-full px-4 py-2.5 border border-[#7C6694]/20 shadow-xl flex items-center gap-3 whitespace-nowrap text-left" data-x="360" data-y="-120">
          <div className="w-9 h-9 rounded-full bg-[#F4F0F8] border border-[#7C6694]/30 flex items-center justify-center text-amber-500 text-base shadow-sm shrink-0">
            💡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-[#1A1224] text-xs sm:text-sm font-heading">SoulNest Insight</h4>
              <span className="text-[10px] text-[#5E546C] font-medium font-sans">Weekly</span>
            </div>
            <p className="text-xs text-[#2D243B] font-medium mt-0.5 font-sans">
              +18% growth in mood balance!
            </p>
          </div>
        </div>

        {/* Bottom-left card: Dr. Aria shared insight */}
        <div className="social-card absolute w-[270px] sm:w-[290px] bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-[#7C6694]/20 shadow-2xl text-left" data-x="-450" data-y="120">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#211A2D] flex items-center justify-center text-[#A78BFA] font-bold text-xs shadow-md shrink-0 font-heading">
              DA
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-bold text-[#1A1224] text-xs sm:text-sm leading-tight font-heading">Dr. Aria shared insight</h4>
                <span className="text-[9px] font-bold text-[#7C6694] bg-[#7C6694]/15 px-2 py-0.5 rounded-full border border-[#7C6694]/30 shrink-0 font-sans">
                  CBT Log
                </span>
              </div>
              <p className="text-xs text-[#2D243B] font-medium mt-2 leading-snug font-sans">
                "You handled direct questions with clarity."
              </p>
              <p className="text-[10px] text-[#5E546C] font-medium mt-3 font-sans">
                Logged · Jan 25, 2026
              </p>
            </div>
          </div>
        </div>

        {/* Bottom-right card: Assessment */}
        <div className="social-card absolute w-[260px] sm:w-[280px] bg-gradient-to-r from-[#7C6694] to-[#594472] text-white rounded-2xl p-4 border border-white/30 shadow-2xl text-left" data-x="380" data-y="240">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-xs shadow-inner shrink-0">
              ✓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white font-heading">Assessment</h4>
                <span className="text-[10px] font-semibold text-emerald-300 font-sans">Completed!</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-white/90 font-normal my-2 font-sans">
            Clinical Framework: CBT & Mindfulness
          </p>
          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-white/80 font-medium font-sans">
            <span>Logged</span>
            <span>Jan 26, 3:42 PM</span>
          </div>
        </div>

      </div>

    </section>
  );
}
