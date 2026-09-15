import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CoinBadge = ({ className, children, haloColor = 'rgba(59,130,246,0.4)', size = 'w-16 sm:w-20 h-16 sm:h-20', rotateClass = '' }) => (
  <div className={`absolute ${className}`}>
    <div 
      className={`relative ${size} rounded-full bg-[#050814] flex items-center justify-center transform ${rotateClass} transition-transform`}
      style={{
        border: '1.5px solid rgba(255, 255, 255, 0.15)',
        boxShadow: `
          inset 0 4px 6px rgba(255,255,255,0.2), 
          inset 0 -5px 15px rgba(0,0,0,0.9), 
          0 15px 35px ${haloColor}
        `
      }}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      <div 
        className="absolute inset-0 rounded-full opacity-20 pointer-events-none mix-blend-screen"
        style={{ 
          backgroundImage: 'radial-gradient(circle at center, #ffffff 0.5px, transparent 1px)', 
          backgroundSize: '12px 12px',
          backgroundPosition: '0 0, 6px 6px'
        }}
      />
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  </div>
);

export default function GlobalReach() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Globe / Background continuous subtle drift
    gsap.to('.dotted-globe', {
      backgroundPositionX: '100px',
      backgroundPositionY: '-20px',
      duration: 10,
      repeat: -1,
      ease: 'none',
    });

    // Hovering animations for the 9 mode badges
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
      className="relative w-full h-screen bg-gradient-to-b from-[#FFFFFF] via-[#e0f2fe] to-[#bae6fd] overflow-hidden flex flex-col items-center pt-24 font-sans select-none"
    >
      
      {/* Typography */}
      <div className="hero-text relative z-30 text-center max-w-4xl px-4">
        <h2 className="text-5xl sm:text-7xl font-light tracking-tight text-black leading-[1.1] mb-6">
          One Companion. <br />
          <span className="text-blue-600 font-normal">No Waitlists.</span> <span className="font-light">No Judgment.</span>
        </h2>
        <p className="text-sm sm:text-lg text-gray-700 font-light max-w-xl mx-auto leading-relaxed">
          Through structured assessments and always-on support, SoulNest lets you check in, reflect, and track your progress anytime — no appointments, no waiting rooms.
        </p>
      </div>

      {/* Floating Mode Badges Arc */}
      <div className="relative z-30 w-full max-w-6xl mt-4 sm:mt-8 h-[250px] sm:h-[500px] mx-auto pointer-events-none">
        
        {/* 1. Heart — Emotional Support */}
        <CoinBadge className="coin-badge left-[2%] sm:left-[2%] top-[70%] sm:top-[72%]" rotateClass="-rotate-12" haloColor="rgba(244, 63, 94, 0.4)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-rose-500" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </CoinBadge>

        {/* 2. Brain/thought bubble — CBT */}
        <CoinBadge className="coin-badge left-[11.5%] sm:left-[11.5%] top-[55%] sm:top-[51%]" rotateClass="-rotate-6" haloColor="rgba(99, 102, 241, 0.4)">
          <svg className="w-8 sm:w-10 h-8 sm:h-10 fill-indigo-400" viewBox="0 0 24 24">
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

        {/* 5. CENTER BADGE: SoulNest App Icon (Slightly larger & elevated) */}
        <CoinBadge className="coin-badge left-[50%] -translate-x-1/2 top-[10%] sm:top-[19%]" size="w-20 sm:w-28 h-20 sm:h-28" rotateClass="-rotate-6" haloColor="rgba(59, 130, 246, 0.6)">
          <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 via-indigo-600 to-sky-400 border border-white/40 shadow-[inset_0_2px_5px_rgba(255,255,255,0.4)] flex items-center justify-center text-white font-bold text-xl sm:text-2xl tracking-tight">
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

      {/* Dotted Globe */}
      <div className="globe-container absolute left-1/2 -translate-x-1/2 top-[100%] mt-[-300px] sm:mt-[-280px] w-[900px] sm:w-[1500px] h-[900px] sm:h-[1500px] rounded-full z-20 overflow-hidden bg-gradient-to-br from-blue-300 via-[#3b82f6] to-[#1e3a8a] shadow-[0_0_120px_rgba(30,64,138,0.5)] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.7),transparent_60%,rgba(0,0,0,0.6))]" />
        
        <div 
          className="dotted-globe absolute inset-0 rounded-full opacity-80"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 2px, transparent 2.5px)',
            backgroundSize: '22px 22px',
            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 80%)',
            maskImage: 'radial-gradient(circle at center, black 50%, transparent 80%)',
          }}
        />

        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_120px_rgba(255,255,255,0.5)] pointer-events-none" />
      </div>

      {/* Social Elements Pop-out Container */}
      <div className="absolute left-1/2 top-1/2 w-0 h-0 z-30 pointer-events-none">
        
        {/* Top pill (floating, above sphere) */}
        <div className="social-card absolute flex items-center justify-center bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 border border-slate-100 shadow-xl whitespace-nowrap text-slate-800 text-xs sm:text-sm font-semibold" data-x="0" data-y="-400">
          Join our SoulNest community!
        </div>

        {/* Top-left card: Daily Reflection */}
        <div className="social-card absolute w-[260px] sm:w-[280px] bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-slate-100 shadow-2xl text-left" data-x="-420" data-y="-220">
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-sky-400 flex items-center justify-center text-white shadow-md shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.42 1.42c.45-.45.98-.83 1.55-1.13C12.75 19 21 11.25 21 3c0 0-2 2-4 5z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm leading-tight">Daily Reflection</h4>
              <p className="text-xs text-slate-500 font-medium">@MindfulMoments</p>
            </div>
          </div>
          <p className="text-xs text-slate-700 font-medium mb-3 leading-relaxed">
            "What step made you feel grounded today?"
          </p>
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-[10px] text-slate-400 font-medium">Jan 26, 12:28 PM</span>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-md transition-transform hover:scale-105 pointer-events-auto">
              Reflect Now
            </button>
          </div>
        </div>

        {/* Mid-right card: SoulNest Insight */}
        <div className="social-card absolute bg-white/95 backdrop-blur-xl rounded-full px-4 py-2.5 border border-slate-100 shadow-xl flex items-center gap-3 whitespace-nowrap text-left" data-x="360" data-y="-120">
          <div className="w-9 h-9 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-amber-500 text-base shadow-sm shrink-0">
            💡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">SoulNest Insight</h4>
              <span className="text-[10px] text-slate-400 font-medium">Weekly</span>
            </div>
            <p className="text-xs text-slate-700 font-medium mt-0.5">
              +18% growth in mood balance!
            </p>
          </div>
        </div>

        {/* Bottom-left card: Dr. Aria shared insight */}
        <div className="social-card absolute w-[270px] sm:w-[290px] bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-slate-100 shadow-2xl text-left" data-x="-450" data-y="120">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center text-indigo-300 font-bold text-xs shadow-md shrink-0">
              DA
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-1">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">Dr. Aria shared insight</h4>
                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 shrink-0">
                  CBT Log
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-2 leading-snug">
                "You handled direct questions with clarity."
              </p>
              <p className="text-[10px] text-slate-400 font-medium mt-3">
                Logged · Jan 25, 2026
              </p>
            </div>
          </div>
        </div>

        {/* Bottom-right card: Assessment */}
        <div className="social-card absolute w-[260px] sm:w-[280px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-4 border border-blue-400/30 shadow-2xl text-left" data-x="380" data-y="240">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-xs shadow-inner shrink-0">
              ✓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-white">Assessment</h4>
                <span className="text-[10px] font-semibold text-emerald-300">Completed!</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-blue-100 font-normal my-2">
            Clinical Framework: CBT & Mindfulness
          </p>
          <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-blue-100 font-medium">
            <span>Logged</span>
            <span>Jan 26, 3:42 PM</span>
          </div>
        </div>

      </div>

    </section>
  );
}
