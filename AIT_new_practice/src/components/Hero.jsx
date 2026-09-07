import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Page Load Entrance Animation (Zoomed-in portrait view)
    const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    entranceTl
      .fromTo(phoneRef.current, 
        { y: 520, scale: 2.5, opacity: 0 },
        { y: 520, scale: 2.5, opacity: 1, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo('.dynamic-island', 
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }, 
        '-=0.5'
      )
      .fromTo('.hero-subtitle', 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 
        '-=0.3'
      )
      .fromTo('.hero-headline', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }, 
        '-=0.3'
      )
      .fromTo('.hero-badges', 
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }, 
        '-=0.3'
      );

    // 2. Comprehensive GSAP ScrollTrigger Timeline:
    // Zoom out -> Chat Messages -> Transaction Receipt & "Confirm." -> Statement Reveal -> 3D Perspective Grid & Feature Cards Deck
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=6400',
        scrub: 1.8,
        pin: true,
        anticipatePin: 1,
      },
    });

    // --- PHASE 1: Zoom Out from half-visible close-up to Full Portrait iPhone ---
    // Phone starts at scale 2.5 pushed down (y:520) so only top half visible with headroom
    // Scrolling reveals the full phone centered on screen
    scrollTl
      .fromTo(phoneRef.current, {
        scale: 2.5,
        y: 520,
        opacity: 1,
        immediateRender: false,
      }, {
        scale: 1.0,
        y: 0,
        opacity: 1,
        boxShadow: '0 0 85px rgba(59,130,246,0.85), 0 0 25px rgba(37,99,235,0.5)',
        borderColor: 'rgba(59,130,246,0.7)',
        ease: 'power2.inOut',
        duration: 1.5,
      }, 0)
      .fromTo('.hero-landing-content', { opacity: 1, scale: 1, immediateRender: false }, { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.inOut' }, 1.2)
      .fromTo('.hero-chat-screen', { opacity: 0, scale: 0.95, immediateRender: false }, { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }, 1.5)
      .fromTo('.horizon-glow', { opacity: 0.8, immediateRender: false }, { opacity: 0.15, duration: 0.8, ease: 'sine.inOut' }, 0.5)
      .fromTo('.coin-left-top, .coin-left-bottom, .coin-right', { opacity: 1, scale: 1, immediateRender: false }, { opacity: 0, scale: 0.4, duration: 0.8, ease: 'power2.inOut' }, 0.6)

      // --- PHASE 2: "Chat." Background Text & Chat Messages 1 & 2 ---
      .to('.bg-chat-text', { opacity: 0.8, x: 0, duration: 0.6, ease: 'sine.out' }, 1.6)
      .to('.chat-bubble-1', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.7)
      .to('.chat-bubble-2', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 2.2)

      // --- PHASE 3: Seamless Cross-fade to "Confirm." Text & Receipt Card ---
      .to('.bg-chat-text', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.in' }, 2.4)
      .to('.bg-confirm-text', { opacity: 0.9, y: 0, duration: 0.7, ease: 'power3.out' }, 2.5)
      .to('.chat-receipt', { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.2)' }, 2.6)
      .to('.chat-bubble-3', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 3.0)

      // --- PHASE 4: Phone Shrinks & Soft Fades into Atmosphere ---
      .fromTo(phoneRef.current, { scale: 1.0, opacity: 1 }, { scale: 0.68, opacity: 0.55, duration: 0.8, ease: 'sine.inOut' }, 3.7)
      .fromTo('.bg-confirm-text', { opacity: 0.9 }, { opacity: 0.35, duration: 0.7, ease: 'sine.inOut' }, 3.7)
      .fromTo(phoneRef.current, { scale: 0.68, opacity: 0.55 }, { scale: 0.25, opacity: 0, duration: 0.8, ease: 'power2.in' }, 4.4)
      .fromTo('.bg-confirm-text', { opacity: 0.35 }, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 4.4)

      // --- PHASE 5: Zoom-in Statement Reveal: "The easiest way to / send crypto. Ever." ---
      .to('.closing-statement', { opacity: 0.4, scale: 0.95, duration: 0.5, ease: 'power2.out' }, 4.2)
      .to('.closing-statement', { opacity: 1, scale: 1.15, duration: 0.9, ease: 'power3.out' }, 4.6)
      .to('.closing-text-grey', { color: '#f8fafc', duration: 0.6, ease: 'sine.inOut' }, 4.6)
      .to('.closing-text-blue', { color: '#38bdf8', duration: 0.6, ease: 'sine.inOut' }, 4.6)

      // --- PHASE 6: 3D Grid & Feature Cards Deck Reveal (Images 1 - 5) ---
      // Statement fades out into darkness
      .to('.closing-statement', { opacity: 0, scale: 1.25, duration: 0.8, ease: 'power2.in' }, 5.3)

      // 3D Wireframe Grid fades in + Cards container activates
      .to('.perspective-grid', { opacity: 0.7, duration: 0.6 }, 5.5)
      .to('.cards-deck-wrapper', { opacity: 1, duration: 0.6 }, 5.6)

      // Step 1: Card 1 floats forward out of depth
      .to('.feature-card-1', { scale: 1, opacity: 1, y: 0, rotateY: 5, rotateX: 4, duration: 0.9, ease: 'power3.out' }, 5.7)

      // Step 2: Card 2 emerges to the left
      .to('.feature-card-2', { scale: 0.95, opacity: 0.85, x: -160, y: 20, rotateY: 12, rotateX: 5, duration: 0.9, ease: 'power3.out' }, 6.2)

      // Step 3: Card 3 emerges to the right
      .to('.feature-card-3', { scale: 0.95, opacity: 0.85, x: 160, y: 20, rotateY: -12, rotateX: 5, duration: 0.9, ease: 'power3.out' }, 6.7)

      // Step 4: Cards fan out into final overlapping deck layout
      .to('.feature-card-1', { scale: 1, y: 0, x: 0, rotation: 6, rotateY: 0, rotateX: 0, zIndex: 30, duration: 1.2, ease: 'power2.inOut' }, 7.2)
      .to('.feature-card-2', { scale: 0.95, opacity: 1, x: -260, y: 20, rotation: -12, rotateY: 5, rotateX: 0, zIndex: 20, duration: 1.2, ease: 'power2.inOut' }, 7.2)
      .to('.feature-card-3', { scale: 0.95, opacity: 1, x: 260, y: 25, rotation: 4, rotateY: -5, rotateX: 0, zIndex: 20, duration: 1.2, ease: 'power2.inOut' }, 7.2)

      // Hold final 3D deck view pinned comfortably
      .to({}, { duration: 1.0 });

    // 3. Continuous Floating Loops for 3D Coins
    gsap.to('.coin-left-top', {
      y: '-=14',
      rotation: 6,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.coin-left-bottom', {
      y: '-=18',
      rotation: -8,
      duration: 3.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.4,
    });

    gsap.to('.coin-right', {
      y: '-=20',
      rotationY: 15,
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.2,
    });

    // 4. Continuous Moving Perspective Grid (Chex Animation)
    gsap.to('.grid-lines', {
      backgroundPositionY: '4rem',
      duration: 2.5,
      repeat: -1,
      ease: 'none',
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#050608] text-white flex flex-col justify-between overflow-clip select-none font-sans"
    >
      {/* Blue Atmospheric Horizon Glow Effect */}
      <div className="horizon-glow absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none z-0 flex items-center justify-center transition-opacity">
        <div className="w-[85%] h-[260px] bg-gradient-to-b from-blue-500/40 via-blue-600/20 to-transparent rounded-t-[50%] blur-3xl opacity-80" />
        <div className="absolute top-12 w-[70%] h-[2px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-90 blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-300/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 3D Perspective Grid Background (Images 3, 4, 5) */}
      <div className="perspective-grid absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-700">
        <div className="grid-lines absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(1000px)_rotateX(60deg)] [transform-origin:top_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-[#050608]" />
      </div>

      {/* Top Navbar Header */}
      <nav className="relative z-30 max-w-7xl w-full mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex flex-col tracking-tight cursor-pointer">
          <span className="text-2xl font-extrabold tracking-tight text-white leading-none font-heading">
            facil
          </span>
          <span className="text-[9px] font-bold tracking-[0.35em] text-slate-400 uppercase leading-none mt-1">
            P A Y
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <button className="text-white hover:text-cyan-400 transition-colors cursor-pointer">EN</button>
          <span>ES</span>
        </div>
      </nav>

      {/* Background Large Text 1: "Chat." (Left Side) */}
      <div className="bg-chat-text absolute left-8 sm:left-24 top-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-0 -translate-x-12 will-change-transform">
        <h2 className="text-[clamp(5rem,14vw,11rem)] font-bold text-slate-400 tracking-tight leading-none select-none">
          Chat.
        </h2>
      </div>

      {/* Background Large Text 2: "Confirm." (Bottom Center) */}
      <div className="bg-confirm-text absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-0 translate-y-8 will-change-transform">
        <h2 className="text-[clamp(4.5rem,13vw,10rem)] font-bold text-slate-300 tracking-tight leading-none select-none">
          Confirm.
        </h2>
      </div>

      {/* Final Headline Statement Reveal (2-Line Zoomed View) */}
      <div className="closing-statement absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0 scale-90 px-6 will-change-transform">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight text-center max-w-5xl leading-[1.15] font-sans">
          <span className="closing-text-grey text-slate-500 transition-colors duration-500 block sm:inline">
            The easiest way to{' '}
          </span>
          <br className="hidden sm:block" />
          <span className="closing-text-grey text-slate-500 transition-colors duration-500">
            send crypto.{' '}
          </span>
          <span className="closing-text-blue text-blue-900 transition-colors duration-500 font-bold">
            Ever.
          </span>
        </h2>
      </div>

      {/* 3D Feature Cards Stacked Deck (Images 4 & 5) */}
      <div className="cards-deck-wrapper absolute inset-0 z-25 flex items-center justify-center pointer-events-none opacity-0 [perspective:1200px]">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[400px] flex items-center justify-center">
          {/* Card 2 (Behind Card 1 - Security & Encrypted) */}
          <div className="feature-card-2 absolute inset-0 bg-gradient-to-b from-[#131926] via-[#0d121c] to-[#07090e] border border-blue-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 scale-75 transform-gpu transition-all">
            {/* Top Shield Header Visual */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-2xl mb-5 shadow-inner">
              <svg className="w-6 h-6 fill-current text-cyan-400" viewBox="0 0 24 24">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.92V12H5V6.3L12 3.19V11.99Z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              End-to-end encrypted messaging and transactions.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Privacy built in. Security by default. We never hold your keys, see your chats, or touch your funds.
            </p>
          </div>

          {/* Card 3 (Behind Card 1 - Swap and Bridge) */}
          <div className="feature-card-3 absolute inset-0 bg-gradient-to-b from-[#131926] via-[#0d121c] to-[#07090e] border border-blue-500/30 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 scale-75 transform-gpu transition-all flex flex-col items-end text-right">
            {/* Top Swap Visual */}
            <div className="relative w-14 h-14 mb-5">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
                {/* Swap Arrows Icon */}
                <svg className="w-6 h-6 fill-current text-cyan-400" viewBox="0 0 24 24">
                  <path d="M6.99 11L3 15L6.99 19V16H14V14H6.99V11ZM21 9L17.01 5V8H10V10H17.01V13L21 9Z" />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-[7px] text-slate-300">
                ETH
              </div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-[7px] text-slate-300">
                SOL
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              Swap and Bridge Your Crypto.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Move assets across chains — fast, secure, and seamless.
            </p>
          </div>

          {/* Card 1 (Front Card - Support Your Chain) */}
          <div className="feature-card-1 absolute inset-0 bg-gradient-to-b from-[#161f33] via-[#0f1626] to-[#090d17] border border-blue-400/50 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(37,99,235,0.25)] opacity-0 scale-75 transform-gpu transition-all">
            {/* Top Visual: 3D Blocks Cubes (X, S, FacilPay Logo) */}
            <div className="relative w-full h-36 mb-5 rounded-2xl bg-gradient-to-b from-blue-900/30 to-slate-900/60 border border-blue-500/20 p-4 overflow-hidden flex items-center justify-center">
              <div className="relative flex items-center justify-center gap-3">
                {/* Cube 1: X */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 shadow-lg flex items-center justify-center text-slate-300 font-bold text-sm transform -rotate-12">
                  ✕
                </div>
                {/* Cube 2: Main FacilPay Logo */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 border border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center text-white font-extrabold text-base transform rotate-6">
                  fp
                </div>
                {/* Cube 3: Token */}
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-900 to-slate-950 border border-cyan-500/40 shadow-lg flex items-center justify-center text-cyan-300 font-bold text-xs transform rotate-12">
                  $
                </div>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
              We support your chain, your language, your lifestyle.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              FacilPay moves with you — across every chain, every language, and every way of life.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-4 pb-10 sm:pb-16 max-w-6xl mx-auto w-full">
        {/* Floating Coin 1 (Left Top) */}
        <div className="coin-left-top absolute left-4 sm:left-12 top-16 z-10 pointer-events-none opacity-80 blur-[2px]">
          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-slate-900 via-blue-900 to-cyan-500 border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center text-cyan-300 font-bold text-lg transform -rotate-12">
            ✕
          </div>
        </div>

        {/* Floating Coin 2 (Left Bottom) */}
        <div className="coin-left-bottom absolute left-6 sm:left-16 bottom-20 z-20 pointer-events-none">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-b from-slate-800 via-slate-900 to-black border-2 border-slate-700/80 shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-center text-cyan-400 text-2xl transform -rotate-12">
            <div className="relative w-full h-full rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.25),transparent_70%)]">
              <svg className="w-8 h-8 fill-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" viewBox="0 0 320 512">
                <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating Coin 3 (Right Center) */}
        <div className="coin-right absolute right-4 sm:left-auto sm:right-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="w-18 sm:w-24 h-18 sm:h-24 rounded-full bg-gradient-to-tr from-slate-900 via-blue-950 to-cyan-900 border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(6,182,212,0.5)] flex items-center justify-center text-cyan-300 text-3xl transform rotate-6">
            <div className="relative w-full h-full rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.35),transparent_70%)]">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full border border-cyan-400/60 flex items-center justify-center font-bold font-heading text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                $
              </div>
            </div>
          </div>
        </div>

        {/* Realistic iPhone Mockup Frame in Vertical Portrait Orientation */}
        <div
          ref={phoneRef}
          className="hero-phone relative z-20 w-[330px] sm:w-[355px] h-[630px] sm:h-[670px] mb-4 sm:mb-8 bg-gradient-to-b from-[#434957] via-[#161922] to-[#2c313d] rounded-[52px] p-[6px] sm:p-[7px] border border-slate-400/40 shadow-[0_0_85px_rgba(37,99,235,0.35),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.9)] flex flex-col justify-between transition-all duration-300 will-change-transform group"
        >
          {/* Metallic Side Hardware Buttons */}
          {/* Action / Mute Switch (Left Top) */}
          <div className="absolute -left-[5px] top-[18%] w-[5px] h-6 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-600 rounded-l-[3px] border-r-0 border border-slate-400/60 shadow-md z-30" />
          {/* Volume Up Button (Left) */}
          <div className="absolute -left-[5px] top-[30%] w-[5px] h-11 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-600 rounded-l-[3px] border-r-0 border border-slate-400/60 shadow-md z-30" />
          {/* Volume Down Button (Left) */}
          <div className="absolute -left-[5px] top-[44%] w-[5px] h-11 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-600 rounded-l-[3px] border-r-0 border border-slate-400/60 shadow-md z-30" />
          {/* Power / Side Key (Right) */}
          <div className="absolute -right-[5px] top-[34%] w-[5px] h-16 bg-gradient-to-b from-slate-300 via-slate-500 to-slate-600 rounded-r-[3px] border-l-0 border border-slate-400/60 shadow-md z-30" />

          {/* Metallic Chassis Antenna Band Ticks */}
          <div className="absolute -left-[1px] top-12 w-[2px] h-[3px] bg-slate-900/90 z-30" />
          <div className="absolute -right-[1px] top-12 w-[2px] h-[3px] bg-slate-900/90 z-30" />
          <div className="absolute -left-[1px] bottom-12 w-[2px] h-[3px] bg-slate-900/90 z-30" />
          <div className="absolute -right-[1px] bottom-12 w-[2px] h-[3px] bg-slate-900/90 z-30" />

          {/* Inner Black Bezel & Screen Display Container */}
          <div className="relative w-full h-full bg-[#050608] rounded-[46px] border border-slate-800/80 shadow-[inset_0_0_18px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden p-4 sm:p-5">
            {/* VIEW 1: HERO LANDING CONTENT (Initial View) */}
            <div className="hero-landing-content absolute inset-0 p-5 flex flex-col items-center justify-between text-center z-10">
              {/* Dynamic Island Header Notch */}
              <div className="dynamic-island mt-2 mb-3 bg-black border border-slate-800/90 px-3.5 py-1.5 rounded-full flex items-center gap-2.5 shadow-2xl">
                <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-white text-[9px]">
                  🤍
                </div>
                <span className="text-[11px] font-medium text-slate-300 tracking-wide">
                  Accepting payment...
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-700" />
                <div className="relative w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center text-[8px] font-bold text-cyan-300">
                  82%
                </div>
              </div>

              {/* Subtitle & Headline */}
              <div className="my-auto max-w-[290px]">
                <p className="hero-subtitle text-slate-400 text-xs sm:text-sm font-light tracking-wide max-w-[270px] mx-auto mb-3">
                  Powered by AI and user-intent blockchain technology.
                </p>
                <h1 className="hero-headline text-2xl sm:text-3xl font-medium tracking-tight text-white leading-tight font-sans">
                  Send and receive crypto like a text message.
                </h1>
              </div>

              {/* App Store Badges */}
              <div className="hero-badges flex flex-col sm:flex-row items-center justify-center gap-2 mb-2 w-full px-2">
                <a
                  href="#app-store"
                  className="w-full sm:w-auto bg-black/90 text-white border border-white/20 rounded-xl px-3 py-1.5 flex items-center justify-center gap-2 hover:scale-105 transition-all text-xs"
                >
                  <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.64-.78 1.08-1.85.96-2.92-.93.04-2.07.62-2.74 1.4-.59.68-1.11 1.77-.97 2.83 1.04.08 2.11-.53 2.75-1.31z"/>
                  </svg>
                  <div className="text-left leading-tight">
                    <div className="text-[7px] uppercase tracking-wider text-slate-400">Download on the</div>
                    <div className="text-[11px] font-semibold text-white">App Store</div>
                  </div>
                </a>

                <a
                  href="#google-play"
                  className="w-full sm:w-auto bg-black/90 text-white border border-white/20 rounded-xl px-3 py-1.5 flex items-center justify-center gap-2 hover:scale-105 transition-all text-xs"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M3.6 2.2L13.7 12 3.6 21.8c-.4-.4-.6-.9-.6-1.5V3.7c0-.6.2-1.1.6-1.5z" />
                    <path fill="#FBBC04" d="M17.1 8.7l-3.4 3.3 3.4 3.3 3.9-2.2c1.1-.6 1.1-1.6 0-2.2l-3.9-2.2z" />
                    <path fill="#4285F4" d="M3.6 2.2L13.7 12 17.1 8.7 5.7 2.2c-.6-.3-1.4-.3-2.1 0z" />
                    <path fill="#34A853" d="M3.6 21.8l2.1 1.2c.7.4 1.5.4 2.1 0l11.4-6.5-3.4-3.3L3.6 21.8z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <div className="text-[7px] uppercase tracking-wider text-slate-400">GET IT ON</div>
                    <div className="text-[11px] font-semibold text-white">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            {/* VIEW 2: PORTRAIT IPHONE CHAT SCREEN */}
            <div className="hero-chat-screen absolute inset-0 p-3.5 flex flex-col justify-between opacity-0 scale-95 z-20 pointer-events-none">
              {/* iPhone Status Bar */}
              <div className="flex items-center justify-between text-[11px] text-slate-200 font-medium px-2 pt-1">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-[9px]">
                  <span>📶</span>
                  <span>📡</span>
                  <div className="w-4.5 h-2 border border-slate-300 rounded-sm p-[1px] flex items-center">
                    <div className="w-full h-full bg-white rounded-xs" />
                  </div>
                </div>
              </div>

              {/* Chat Header: Helena Brown */}
              <div className="flex items-center justify-between py-1.5 border-b border-slate-800/80 px-1">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-xs cursor-pointer">‹</span>
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                    👩🏻
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-slate-900" />
                  </div>
                  <span className="text-xs font-semibold text-white">Helena Brown</span>
                </div>
                <span className="text-slate-400 text-xs cursor-pointer">⋮</span>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 my-2 flex flex-col gap-2 px-1 justify-start pt-1 overflow-hidden text-left text-[10px]">
                {/* Bubble 1: Incoming message from Helena */}
                <div className="chat-bubble-1 opacity-0 translate-y-3 p-2.5 bg-[#1b1d24] text-slate-200 rounded-2xl rounded-tl-xs max-w-[90%] border border-slate-800/80 shadow-md">
                  <p className="leading-snug text-[10px] font-normal text-slate-300">
                    Just booked our flights for the offsite. Can you send over your share when you get a sec?
                  </p>
                  <div className="text-[8px] text-slate-500 text-right mt-1 font-medium">12:30 PM</div>
                </div>

                {/* Bubble 2: Outgoing blue response message */}
                <div className="chat-bubble-2 opacity-0 translate-y-3 p-2.5 bg-blue-600 text-white rounded-2xl rounded-tr-xs max-w-[82%] ml-auto shadow-md shadow-blue-600/30">
                  <p className="leading-snug text-[10px] font-medium">
                    On it. Sending 250 USDC now.
                  </p>
                  <div className="text-[8px] text-blue-200 text-right mt-0.5 flex items-center justify-end gap-1">
                    <span>12:31 PM</span>
                    <span className="text-[9px]">✓</span>
                  </div>
                </div>

                {/* Transaction Receipt Card (Sent Confirmed! -250 USDC) */}
                <div className="chat-receipt opacity-0 translate-y-3 scale-95 p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl border border-blue-400/40 text-white shadow-lg shadow-blue-600/20 my-0.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-[9px]">
                        $
                      </div>
                      <div className="leading-tight">
                        <div className="font-bold text-[10px]">Sent</div>
                        <div className="text-[8px] text-emerald-300 font-semibold">Confirmed!</div>
                      </div>
                    </div>
                    <div className="text-right leading-tight">
                      <div className="font-bold text-xs text-white">-250 USDC</div>
                      <div className="text-[8px] text-blue-200">$250</div>
                    </div>
                  </div>
                  <div className="pt-1.5 border-t border-white/20 flex justify-between items-center text-[8px] text-blue-100">
                    <span>Transaction Hash</span>
                    <span className="font-mono text-cyan-200">84a327...</span>
                  </div>
                  <div className="flex justify-between items-center text-[8px] text-blue-100 mt-0.5">
                    <span>When</span>
                    <span>Jan 25, 12:32 PM</span>
                  </div>
                </div>

                {/* Bubble 3: Helena's follow-up message */}
                <div className="chat-bubble-3 opacity-0 translate-y-3 p-2.5 bg-[#1b1d24] text-slate-200 rounded-2xl rounded-tl-xs max-w-[85%] border border-slate-800/80 shadow-md">
                  <p className="leading-snug text-[10px] font-normal text-slate-300">
                    Received. Fast and flawless — thanks!
                  </p>
                  <div className="text-[8px] text-slate-500 text-right mt-1 font-medium">12:33 PM</div>
                </div>
              </div>

              {/* Bottom Message Input Bar */}
              <div className="flex items-center gap-2 pt-1">
                <button className="w-7 h-7 rounded-full bg-slate-800/90 text-slate-300 flex items-center justify-center text-sm hover:bg-slate-700">
                  +
                </button>

                <div className="flex-1 bg-slate-900 border border-slate-800 rounded-full px-3 py-1.5 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Write a message</span>
                  <span className="text-xs text-slate-400 cursor-pointer">😊</span>
                </div>

                <button className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-blue-600/40 hover:bg-blue-500">
                  ➔
                </button>
              </div>

              {/* Bottom Home Indicator Line */}
              <div className="w-24 h-1 bg-slate-300 rounded-full mx-auto mt-1.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
