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
    // Globe continuous rotation
    gsap.to('.dotted-globe', {
      backgroundPositionX: '100px',
      backgroundPositionY: '-20px',
      duration: 10,
      repeat: -1,
      ease: 'none',
    });

    // Hovering animations for the 9 coins
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
        end: "+=2500", // Scroll length for the animation
        scrub: 1,
        pin: true, // Pin the entire section
      }
    });

    // Initial setups
    gsap.set('.social-card', { xPercent: -50, yPercent: -50, scale: 0, opacity: 0, x: 0, y: 0 });

    // Phase 1: Coins submerge and text fades out
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
      className="relative w-full h-screen bg-gradient-to-b from-[#FFFFFF] via-[#e0f2fe] to-[#bae6fd] overflow-hidden flex flex-col items-center pt-28 font-sans select-none"
    >
      
      {/* Typography */}
      <div className="hero-text relative z-30 text-center max-w-4xl px-4">
        <h2 className="text-5xl sm:text-7xl font-light tracking-tight text-black leading-[1.1] mb-6">
          One App. <br />
          <span className="text-blue-600 font-normal">No Borders.</span> <span className="font-light">No Banks.</span>
        </h2>
        <p className="text-sm sm:text-lg text-gray-700 font-light max-w-xl mx-auto leading-relaxed">
          Through our integration with MoneyGram, the FacilPay app allows <br className="hidden sm:block" /> 
          users to perform cash-out transactions worldwide.
        </p>
      </div>

      {/* Floating Coins Arc */}
      <div className="relative z-10 w-full max-w-6xl mt-4 sm:mt-8 h-[250px] sm:h-[500px] mx-auto pointer-events-none">
        
        <CoinBadge className="coin-badge left-[2%] sm:left-[2%] top-[70%] sm:top-[72%]" rotateClass="-rotate-12" haloColor="rgba(20, 241, 149, 0.3)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-[#14F195]" viewBox="0 0 24 24"><path d="M4 17h12l-2.5 3H1.5L4 17zm16-8H8l2.5-3h12L20 9zm-2.5 4H5.5L8 10h12l-2.5 3z" /></svg>
        </CoinBadge>

        <CoinBadge className="coin-badge left-[11.5%] sm:left-[11.5%] top-[55%] sm:top-[51%]" rotateClass="-rotate-6" haloColor="rgba(59, 130, 246, 0.4)">
          <svg className="w-8 sm:w-10 h-8 sm:h-10 fill-[#627eea]" viewBox="0 0 320 512"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"/></svg>
        </CoinBadge>

        <CoinBadge className="coin-badge left-[23.5%] sm:left-[23.5%] top-[40%] sm:top-[35%]" rotateClass="-rotate-3" haloColor="rgba(0, 51, 173, 0.4)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-[#3468d1]" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="3" /><circle cx="12" cy="4" r="2" /><circle cx="12" cy="20" r="2" />
            <circle cx="4" cy="12" r="2" /><circle cx="20" cy="12" r="2" /><circle cx="6" cy="6" r="1.5" />
            <circle cx="18" cy="18" r="1.5" /><circle cx="6" cy="18" r="1.5" /><circle cx="18" cy="6" r="1.5" />
          </svg>
        </CoinBadge>
        
        <CoinBadge className="coin-badge left-[36%] sm:left-[36%] top-[25%] sm:top-[25%]" rotateClass="rotate-6" haloColor="rgba(34, 211, 238, 0.3)">
          <svg className="w-8 sm:w-10 h-8 sm:h-10 fill-white" viewBox="0 0 24 24">
            <path d="M22 21.6L16.2 16L19 13.2L22 16.2V21.6ZM13.2 19L16 21.8H10.4L13.2 19ZM7.8 16L2 21.8V16.2L4.8 13.4L7.8 16.4V16ZM4.8 10.6L2 7.8V2.4L7.8 8.2L4.8 11.2V10.6ZM10.8 5L8 2.2H13.6L10.8 5ZM16.2 8L22 2.2V7.8L19.2 10.6L16.2 7.6V8Z" />
          </svg>
        </CoinBadge>

        <CoinBadge className="coin-badge left-[50%] -translate-x-1/2 top-[10%] sm:top-[19%]" size="w-20 sm:w-28 h-20 sm:h-28" rotateClass="-rotate-6" haloColor="rgba(59, 130, 246, 0.6)">
          <div className="w-10 sm:w-14 h-10 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 border border-white/30 shadow-[inset_0_2px_5px_rgba(255,255,255,0.4)] flex items-center justify-center text-white font-normal text-xl sm:text-2xl tracking-tighter">fp</div>
        </CoinBadge>

        <CoinBadge className="coin-badge right-[36%] sm:right-[36%] top-[25%] sm:top-[25%]" rotateClass="rotate-12" haloColor="rgba(147, 197, 253, 0.4)">
          <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full border-[1.5px] border-[#2775ca] text-[#2775ca] flex items-center justify-center font-normal text-xl sm:text-2xl font-sans">$</div>
        </CoinBadge>

        <CoinBadge className="coin-badge right-[23.5%] sm:right-[23.5%] top-[40%] sm:top-[35%]" rotateClass="rotate-3" haloColor="rgba(38, 161, 123, 0.3)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-[#26a17b]" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 7.5H13v9h-2v-9H7.5v-2h10v2z" /></svg>
        </CoinBadge>

        <CoinBadge className="coin-badge right-[11.5%] sm:right-[11.5%] top-[55%] sm:top-[51%]" rotateClass="-rotate-6" haloColor="rgba(249, 115, 22, 0.3)">
          <svg className="w-8 sm:w-10 h-8 sm:h-10 fill-[#f7931a]" viewBox="0 0 512 512">
            <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-141.651-35.33c4.937-32.999-20.196-50.739-54.55-62.573l11.146-44.702-27.275-6.789-11.276 45.228c-7.182-1.789-14.593-3.486-21.875-5.122l11.31-45.361-27.277-6.79-11.146 44.702c-5.918-1.396-11.693-2.73-17.202-4.148l.006-.027-37.525-9.35-7.234 29.049s20.194 4.604 19.78 4.908c11.018 2.744 13.011 10.021 12.678 15.75l-12.723 51.042c.712.178 1.62.43 2.656.79-.863-.215-1.785-.444-2.766-.69l-17.822 71.503c-1.127 3.197-3.993 7.986-10.373 6.398.318.396-19.78-4.93-19.78-4.93l-13.435 31.066 35.297 8.795c6.549 1.63 12.986 3.328 19.336 4.93l-11.252 45.163 27.275 6.789 11.146-44.702c7.409 1.942 14.621 3.737 21.642 5.422l-11.109 44.538 27.277 6.79 11.252-45.132c46.745 8.795 81.93 5.3 96.969-36.732 12.112-33.861-1.341-53.308-25.045-66.079 17.75-4.08 31.096-15.656 34.806-39.539zm-69.589 71.189c-9.458 37.947-73.473 17.502-94.27 12.321l16.897-67.798c20.796 5.182 87.26 15.733 77.373 55.477zm7.653-88.741c-8.587 34.455-61.95 16.326-79.28 12.012l15.263-61.233c17.329 4.316 73.018 12.879 64.017 49.221z"/>
          </svg>
        </CoinBadge>

        <CoinBadge className="coin-badge right-[2%] sm:right-[2%] top-[70%] sm:top-[72%]" rotateClass="rotate-12" haloColor="rgba(243, 186, 47, 0.3)">
          <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-[#F3BA2F]" viewBox="0 0 24 24"><path d="M12 0L5.5 6.5 12 13l6.5-6.5L12 0zm0 18l-6.5-6.5-2.5 2.5L12 24l9-10-2.5-2.5L12 18zm0-9l-3.5 3.5 3.5 3.5 3.5-3.5L12 9z" /></svg>
        </CoinBadge>
      </div>

      {/* Dotted Globe */}
      <div className="globe-container absolute left-1/2 -translate-x-1/2 top-[100%] mt-[-300px] sm:mt-[-280px] w-[900px] sm:w-[1500px] h-[900px] sm:h-[1500px] rounded-full z-20 overflow-hidden bg-gradient-to-br from-blue-300 via-[#3b82f6] to-[#1e3a8a] shadow-[0_0_120px_rgba(30,64,138,0.5)] flex items-center justify-center">
        
        {/* Overlay gradient for sphere 3D depth */}
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.7),transparent_60%,rgba(0,0,0,0.6))]" />
        
        {/* Animated dotted layer */}
        <div 
          className="dotted-globe absolute inset-0 rounded-full opacity-80"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.9) 2px, transparent 2.5px)',
            backgroundSize: '22px 22px',
            WebkitMaskImage: 'radial-gradient(circle at center, black 50%, transparent 80%)',
            maskImage: 'radial-gradient(circle at center, black 50%, transparent 80%)',
          }}
        />

        {/* Glow / Edge rim lighting */}
        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_120px_rgba(255,255,255,0.5)] pointer-events-none" />
      </div>

      {/* Social Elements Pop-out Container */}
      <div className="absolute left-1/2 top-1/2 w-0 h-0 z-30 pointer-events-none">
        
        {/* Group Chat Invite */}
        <div className="social-card absolute flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-full px-4 py-2 border border-white/40 shadow-xl whitespace-nowrap" data-x="-0" data-y="-400">
          <div className="flex -space-x-2">
            <img src="https://i.pravatar.cc/100?img=5" className="w-6 h-6 rounded-full border border-white shadow-sm" alt="" />
            <img src="https://i.pravatar.cc/100?img=9" className="w-6 h-6 rounded-full border border-white shadow-sm" alt="" />
          </div>
          <span className="text-sm font-medium text-slate-800">Join our group chat!</span>
        </div>

        {/* SHIBA Request */}
        <div className="social-card absolute w-[260px] bg-white/40 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-2xl" data-x="-420" data-y="-220">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-xl shadow-inner border border-white/50">🐕</div>
              <div>
                <div className="font-semibold text-slate-900 leading-tight">Request</div>
                <div className="text-xs text-slate-600">@NoahK</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-slate-900">900 SHIBA</div>
              <div className="text-xs text-slate-600">$0.0121</div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-[10px] text-slate-600 font-medium">Jan 26, 12:28 PM</div>
            <button className="bg-blue-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg hover:bg-blue-600 pointer-events-auto transition-transform hover:scale-105">Pay now</button>
          </div>
        </div>

        {/* Michael Johnson Receipt */}
        <div className="social-card absolute w-[280px] bg-white/60 backdrop-blur-xl rounded-2xl p-4 border border-white/50 shadow-2xl" data-x="-450" data-y="120">
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              <img src="https://i.pravatar.cc/100?img=33" className="w-10 h-10 rounded-full border border-white shadow-sm" alt="" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#627eea] rounded-full border border-white flex items-center justify-center shadow-sm">
                <svg className="w-2 h-2 fill-white" viewBox="0 0 320 512"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8z"/></svg>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="font-semibold text-slate-900 text-sm">Michael Johnson paid you</div>
                <div className="font-bold text-emerald-600 text-sm">+$75.00</div>
              </div>
              <div className="flex justify-between items-end mt-1">
                <div className="text-[11px] text-slate-600 leading-tight pr-4">Here's my share for the Airbnb.</div>
                <div className="text-[11px] text-slate-500 font-medium">0.15 ETH</div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 font-medium">Dec 23, 2024</div>
            </div>
          </div>
        </div>

        {/* Helen Young Message */}
        <div className="social-card absolute bg-white/70 backdrop-blur-xl rounded-full pl-2 pr-5 py-2 border border-white/50 shadow-2xl flex items-center gap-3 whitespace-nowrap" data-x="300" data-y="-120">
          <img src="https://i.pravatar.cc/100?img=47" className="w-10 h-10 rounded-full border border-white shadow-sm" alt="" />
          <div className="py-1">
            <div className="flex items-center justify-between gap-4">
              <div className="font-semibold text-slate-900 text-[13px]">Helen Young</div>
              <div className="text-[10px] text-slate-400 font-medium">10:30</div>
            </div>
            <div className="text-[11px] text-slate-600 flex items-center gap-2 mt-0.5">
              Thanks for covering the tickets!
              <span className="bg-blue-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">3</span>
            </div>
          </div>
        </div>

        {/* XLM Transaction */}
        <div className="social-card absolute w-[260px] bg-blue-500/70 backdrop-blur-xl rounded-2xl p-4 border border-blue-300/30 shadow-2xl text-white" data-x="380" data-y="240">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-white/20 shadow-inner">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 0L24 12L12 24L0 12L12 0ZM12 2L2 12L12 22L22 12L12 2Z"/></svg>
              </div>
              <div>
                <div className="font-semibold text-sm leading-tight text-white">Received</div>
                <div className="text-[10px] text-emerald-300 font-medium">Confirmed!</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm text-white">+245 XLM</div>
              <div className="text-xs text-blue-100">+$69.34</div>
            </div>
          </div>
          <div className="flex justify-between items-center text-[10px] text-blue-100 border-b border-blue-400/50 pb-2 mb-2">
            <span>Transaction Hash</span>
            <span className="font-mono text-white underline cursor-pointer pointer-events-auto hover:text-blue-200">D9f61A2...</span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-blue-100">
            <span>When</span>
            <span className="text-white font-medium">Jan 26, 3:42 PM</span>
          </div>
        </div>

        {/* Tether 3D Icon */}
        <div className="social-card absolute" data-x="350" data-y="-350">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#50AF95] to-[#1F624C] shadow-2xl flex items-center justify-center border border-white/30 transform rotate-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
            <svg className="w-8 h-8 fill-white drop-shadow-md z-10" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 7.5H13v9h-2v-9H7.5v-2h10v2z" /></svg>
          </div>
        </div>

        {/* XRP 3D Icon */}
        <div className="social-card absolute" data-x="-320" data-y="300">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-800 to-black shadow-2xl flex items-center justify-center border border-white/20 transform -rotate-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <svg className="w-8 h-8 fill-white drop-shadow-md z-10" viewBox="0 0 24 24"><path d="M22 21.6L16.2 16L19 13.2L22 16.2V21.6ZM13.2 19L16 21.8H10.4L13.2 19ZM7.8 16L2 21.8V16.2L4.8 13.4L7.8 16.4V16ZM4.8 10.6L2 7.8V2.4L7.8 8.2L4.8 11.2V10.6ZM10.8 5L8 2.2H13.6L10.8 5ZM16.2 8L22 2.2V7.8L19.2 10.6L16.2 7.6V8Z" /></svg>
          </div>
        </div>

        {/* Paper Airplane SVG */}
        <div className="social-card absolute" data-x="500" data-y="20">
          <svg className="w-10 h-10 text-white drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)] transform -rotate-12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12l20-9-4 18-5-6-3.5 3.5.5-5.5L2 12z" />
          </svg>
        </div>
        
      </div>

    </section>
  );
}
