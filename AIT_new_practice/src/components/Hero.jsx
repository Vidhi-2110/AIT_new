import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const percentRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Page Load Entrance Animation — smooth, staggered reveal
    const entranceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    entranceTl
      .fromTo(phoneRef.current,
        { y: 520, scale: 2.5, opacity: 0 },
        { y: 520, scale: 2.5, opacity: 1, duration: 1.6, ease: 'power2.out' }
      )
      .fromTo('.dynamic-island',
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
      .to({ val: 1 }, {
        val: 100,
        duration: 2.0,
        ease: 'power2.out',
        onUpdate: function () {
          if (percentRef.current) {
            percentRef.current.innerText = Math.round(this.targets()[0].val) + "%";
          }
        }
      }, "-=0.6")
      .fromTo('.hero-subtitle',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-headline',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-badges',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      );

    // 2. Scroll-driven timeline — silky smooth scrub
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=6400',
        scrub: 2.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    // --- PHASE 1: Smooth zoom out to full phone ---
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
        boxShadow: '0 0 85px rgba(124,102,148,0.5), 0 0 25px rgba(124,102,148,0.3)',
        borderColor: 'rgba(124,102,148,0.5)',
        ease: 'sine.inOut',
        duration: 2.0,
      }, 0)
      .fromTo('.hero-landing-content', { opacity: 1, scale: 1, immediateRender: false }, { opacity: 0, scale: 0.97, duration: 0.8, ease: 'sine.inOut' }, 1.4)
      .fromTo('.hero-chat-screen', { opacity: 0, scale: 0.97, immediateRender: false }, { opacity: 1, scale: 1, duration: 0.8, ease: 'sine.out' }, 1.6)
      .fromTo('.horizon-glow', { opacity: 0.8, immediateRender: false }, { opacity: 0.15, duration: 1.2, ease: 'sine.inOut' }, 0.3)
      .fromTo('.coin-left-top, .coin-left-bottom, .coin-right', { opacity: 1, scale: 1, immediateRender: false }, { opacity: 0, scale: 0.6, duration: 1.2, ease: 'sine.inOut' }, 0.4)

      // --- PHASE 2: Chat messages — gentle staggered reveals ---
      .to('.bg-chat-text', { opacity: 0.7, x: 0, duration: 0.8, ease: 'sine.out' }, 1.8)
      .to('.chat-bubble-1', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 1.9)
      .to('.chat-bubble-2', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 2.4)

      // --- PHASE 3: Cross-fade to Confirm & Receipt ---
      .to('.bg-chat-text', { opacity: 0, y: -15, duration: 0.8, ease: 'sine.inOut' }, 2.6)
      .to('.bg-confirm-text', { opacity: 0.85, y: 0, duration: 0.9, ease: 'power2.out' }, 2.7)
      .to('.chat-receipt', { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' }, 2.8)
      .to('.chat-bubble-3', { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 3.2)

      // --- PHASE 4: Phone recedes gracefully ---
      .fromTo(phoneRef.current, { scale: 1.0, opacity: 1 }, { scale: 0.72, opacity: 0.5, duration: 1.0, ease: 'sine.inOut' }, 3.8)
      .fromTo('.bg-confirm-text', { opacity: 0.85 }, { opacity: 0.3, duration: 0.9, ease: 'sine.inOut' }, 3.8)
      .fromTo(phoneRef.current, { scale: 0.72, opacity: 0.5 }, { scale: 0.3, opacity: 0, duration: 1.0, ease: 'sine.in' }, 4.5)
      .fromTo('.bg-confirm-text', { opacity: 0.3 }, { opacity: 0, duration: 0.8, ease: 'sine.in' }, 4.5)

      // --- PHASE 5: Statement reveal — fluid scale and color shift ---
      .to('.closing-statement', { opacity: 0.35, scale: 0.96, duration: 0.6, ease: 'sine.out' }, 4.3)
      .to('.closing-statement', { opacity: 1, scale: 1.12, duration: 1.1, ease: 'power2.out' }, 4.7)
      .to('.closing-text-grey', { color: '#F8FAFC', duration: 0.8, ease: 'sine.inOut' }, 4.7)
      .to('.closing-text-purple', { color: '#7C6694', duration: 0.8, ease: 'sine.inOut' }, 4.7)

      // --- PHASE 6: Cards deck — elegant emergence ---
      .to('.closing-statement', { opacity: 0, scale: 1.2, duration: 1.0, ease: 'sine.in' }, 5.4)
      .to('.perspective-grid', { opacity: 0.6, duration: 0.8, ease: 'sine.out' }, 5.6)
      .to('.cards-deck-wrapper', { opacity: 1, duration: 0.8, ease: 'sine.out' }, 5.7)

      // Card 1 rises smoothly
      .to('.feature-card-1', { scale: 1, opacity: 1, y: 0, rotateY: 4, rotateX: 3, duration: 1.1, ease: 'power2.out' }, 5.8)

      // Card 2 glides left
      .to('.feature-card-2', { scale: 0.96, opacity: 0.85, x: -160, y: 18, rotateY: 10, rotateX: 4, duration: 1.1, ease: 'power2.out' }, 6.3)

      // Card 3 glides right
      .to('.feature-card-3', { scale: 0.96, opacity: 0.85, x: 160, y: 18, rotateY: -10, rotateX: 4, duration: 1.1, ease: 'power2.out' }, 6.8)

      // Cards settle into final fan layout
      .to('.feature-card-1', { scale: 1, y: 0, x: 0, rotation: 5, rotateY: 0, rotateX: 0, zIndex: 30, duration: 1.4, ease: 'sine.inOut' }, 7.3)
      .to('.feature-card-2', { scale: 0.96, opacity: 1, x: -260, y: 18, rotation: -10, rotateY: 4, rotateX: 0, zIndex: 20, duration: 1.4, ease: 'sine.inOut' }, 7.3)
      .to('.feature-card-3', { scale: 0.96, opacity: 1, x: 260, y: 22, rotation: 3, rotateY: -4, rotateX: 0, zIndex: 20, duration: 1.4, ease: 'sine.inOut' }, 7.3)

      // Hold final deck view
      .to({}, { duration: 1.2 });

    // 3. Gentle floating loops for coins — slow, organic drift
    gsap.to('.coin-left-top', {
      y: '-=10',
      rotation: 4,
      duration: 4.0,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.to('.coin-left-bottom', {
      y: '-=12',
      rotation: -5,
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.6,
    });

    gsap.to('.coin-right', {
      y: '-=14',
      rotationY: 10,
      duration: 4.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.3,
    });

    // 4. Slow-moving perspective grid
    gsap.to('.grid-lines', {
      backgroundPositionY: '4rem',
      duration: 4.0,
      repeat: -1,
      ease: 'none',
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#0B0A0D] text-[#F8FAFC] flex flex-col justify-between overflow-clip select-none font-sans"
    >
      {/* Purple Atmospheric Horizon Glow Effect */}
      <div className="horizon-glow absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none z-0 flex items-center justify-center transition-opacity">
        <div className="w-[85%] h-[260px] bg-gradient-to-b from-[#7C6694]/40 via-[#211A2D]/20 to-transparent rounded-t-[50%] blur-3xl opacity-80" />
        <div className="absolute top-12 w-[70%] h-[2px] bg-gradient-to-r from-transparent via-[#7C6694] to-transparent opacity-90 blur-[1px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7C6694]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 3D Perspective Grid Background */}
      <div className="perspective-grid absolute inset-0 pointer-events-none z-0 opacity-0 transition-opacity duration-700">
        <div className="grid-lines absolute inset-0 bg-[linear-gradient(to_right,#7C669415_1px,transparent_1px),linear-gradient(to_bottom,#7C669415_1px,transparent_1px)] bg-[size:4rem_4rem] [transform:perspective(1000px)_rotateX(60deg)] [transform-origin:top_center]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0D] via-transparent to-[#0B0A0D]" />
      </div>

      {/* Top Navbar Header */}
      <nav className="relative z-30 max-w-7xl w-full mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex flex-col tracking-tight cursor-pointer">
          <span className="text-2xl font-extrabold tracking-tight text-white leading-none font-heading">
            SoulNest
          </span>
          <span className="text-[9px] font-bold tracking-[0.35em] text-[#A5A4AA] uppercase leading-none mt-1">
            C O M P A N I O N
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#A5A4AA]">
          <button className="text-white hover:text-[#7C6694] transition-colors cursor-pointer">EN</button>
          <span>ES</span>
        </div>
      </nav>

      {/* Background Large Text 1: "Talk." (Left Side) */}
      <div className="bg-chat-text absolute left-8 sm:left-24 top-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-0 -translate-x-12 will-change-transform">
        <h2 className="text-[clamp(5rem,14vw,11rem)] font-bold text-[#211A2D] tracking-tight leading-none select-none font-heading">
          Talk.
        </h2>
      </div>

      {/* Background Large Text 2: "Grow." (Bottom Center) */}
      <div className="bg-confirm-text absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-0 translate-y-8 will-change-transform">
        <h2 className="text-[clamp(4rem,11vw,8.5rem)] font-bold text-[#211A2D] tracking-tight leading-none select-none font-heading">
          Grow.
        </h2>
      </div>

      {/* Final Headline Statement Reveal */}
      <div className="closing-statement absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0 scale-90 px-6 will-change-transform">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold tracking-tight text-center max-w-5xl leading-[1.15] font-heading">
          <span className="closing-text-grey text-[#A5A4AA] transition-colors duration-500 block sm:inline">
            The easiest way to{' '}
          </span>
          <br className="hidden sm:block" />
          <span className="closing-text-grey text-[#A5A4AA] transition-colors duration-500">
            feel heard.{' '}
          </span>
          <span className="closing-text-purple text-[#7C6694] transition-colors duration-500 font-bold">
            Ever.
          </span>
        </h2>
      </div>

      {/* 3D Feature Cards Stacked Deck */}
      <div className="cards-deck-wrapper absolute inset-0 z-25 flex items-center justify-center pointer-events-none opacity-0 [perspective:1200px]">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] h-[400px] flex items-center justify-center">
          {/* Card 2 (Left Card - Security & Encryption) */}
          <div className="feature-card-2 absolute inset-0 bg-gradient-to-b from-[#211A2D] via-[#16121E] to-[#0D0A13] border border-[#7C6694]/30 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 scale-75 transform-gpu transition-all">
            <div className="w-14 h-14 rounded-2xl bg-[#7C6694]/20 border border-[#7C6694]/40 flex items-center justify-center text-[#7C6694] text-2xl mb-5 shadow-inner">
              <svg className="w-6 h-6 fill-current text-[#7C6694]" viewBox="0 0 24 24">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.92V12H5V6.3L12 3.19V11.99Z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug font-heading">
              Private, encrypted conversations.
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A4AA] leading-relaxed font-light">
              Privacy built in. Every session stays yours — we never read your conversations or sell your data.
            </p>
          </div>

          {/* Card 3 (Right Card - Switch Modes) */}
          <div className="feature-card-3 absolute inset-0 bg-gradient-to-b from-[#211A2D] via-[#16121E] to-[#0D0A13] border border-[#7C6694]/30 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] opacity-0 scale-75 transform-gpu transition-all flex flex-col items-end text-right">
            <div className="relative w-14 h-14 mb-5">
              <div className="absolute inset-0 rounded-full bg-[#7C6694]/20 border border-[#7C6694]/40 flex items-center justify-center text-[#7C6694] shadow-inner">
                <svg className="w-6 h-6 fill-current text-[#7C6694]" viewBox="0 0 24 24">
                  <path d="M6.99 11L3 15L6.99 19V16H14V14H6.99V11ZM21 9L17.01 5V8H10V10H17.01V13L21 9Z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug font-heading">
              Switch modes, anytime.
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A4AA] leading-relaxed font-light">
              Move between CBT, mindfulness, grief support, and more — fast, seamless, whenever you need.
            </p>
          </div>

          {/* Card 1 (Center Card - 16 Therapists & Personalization) */}
          <div className="feature-card-1 absolute inset-0 bg-gradient-to-b from-[#2A2038] via-[#1A1426] to-[#0F0B17] border border-[#7C6694]/50 rounded-3xl p-6 sm:p-7 shadow-[0_25px_60px_rgba(124,102,148,0.25)] opacity-0 scale-75 transform-gpu transition-all">
            <div className="relative w-full h-36 mb-5 rounded-2xl bg-gradient-to-b from-[#7C6694]/30 to-[#0B0A0D]/60 border border-[#7C6694]/30 p-4 overflow-hidden flex items-center justify-center">
              <div className="relative flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#211A2D] border border-[#7C6694]/40 shadow-lg flex items-center justify-center text-[#A78BFA] font-bold text-xs transform -rotate-12">
                  CBT
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C6694] to-[#A78BFA] border border-white/40 shadow-[0_0_25px_rgba(124,102,148,0.6)] flex items-center justify-center text-white font-extrabold text-base transform rotate-6">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#211A2D] border border-[#7C6694]/40 shadow-lg flex items-center justify-center text-[#A78BFA] font-bold text-xs transform rotate-12">
                  AI
                </div>
              </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug font-heading">
              16 therapists, your personality, your language.
            </h3>
            <p className="text-xs sm:text-sm text-[#A5A4AA] leading-relaxed font-light">
              SoulNest moves with you — across every mode, every therapist style, and every way you process things.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-4 pb-10 sm:pb-16 max-w-6xl mx-auto w-full">
        {/* Floating Coin 1 (Left Top) */}
        <div className="coin-left-top absolute left-4 sm:left-12 top-16 z-10 pointer-events-none opacity-80 blur-[1px]">
          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-tr from-[#0B0A0D] via-[#211A2D] to-[#7C6694] border border-[#7C6694]/40 shadow-[0_0_20px_rgba(124,102,148,0.4)] flex items-center justify-center text-white font-bold text-lg transform -rotate-12">
            ✕
          </div>
        </div>

        {/* Floating Coin 2 (Left Bottom) */}
        <div className="coin-left-bottom absolute left-6 sm:left-16 bottom-20 z-20 pointer-events-none">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-b from-[#211A2D] via-[#14101B] to-[#0B0A0D] border-2 border-[#7C6694]/50 shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-center text-[#7C6694] text-2xl transform -rotate-12">
            <div className="relative w-full h-full rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(124,102,148,0.35),transparent_70%)]">
              <svg className="w-8 h-8 fill-[#7C6694] drop-shadow-[0_0_8px_rgba(124,102,148,0.6)]" viewBox="0 0 320 512">
                <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating Coin 3 (Right Center) */}
        <div className="coin-right absolute right-4 sm:left-auto sm:right-12 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <div className="w-18 sm:w-24 h-18 sm:h-24 rounded-full bg-gradient-to-tr from-[#0B0A0D] via-[#211A2D] to-[#7C6694] border-2 border-[#7C6694]/80 shadow-[0_0_40px_rgba(124,102,148,0.5)] flex items-center justify-center text-white text-3xl transform rotate-6">
            <div className="relative w-full h-full rounded-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_30%,rgba(124,102,148,0.45),transparent_70%)]">
              <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full border border-white/60 flex items-center justify-center font-bold font-heading text-white drop-shadow-[0_0_10px_rgba(124,102,148,0.8)]">
                ♡
              </div>
            </div>
          </div>
        </div>

        {/* Realistic iPhone Mockup Frame */}
        <div
          ref={phoneRef}
          className="hero-phone relative z-20 w-[310px] sm:w-[350px] h-[550px] sm:h-[580px] mb-4 sm:mb-8 bg-gradient-to-b from-[#2D243B] via-[#16121E] to-[#0D0A13] rounded-[52px] p-[6px] sm:p-[7px] border border-[#7C6694]/40 shadow-[0_0_85px_rgba(124,102,148,0.35),inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.9)] flex flex-col justify-between transition-all duration-300 will-change-transform group"
        >
          {/* Metallic Side Hardware Buttons */}
          <div className="absolute -left-[5px] top-[18%] w-[5px] h-6 bg-gradient-to-b from-[#7C6694] to-[#211A2D] rounded-l-[3px] border-r-0 border border-[#7C6694]/40 shadow-md z-30" />
          <div className="absolute -left-[5px] top-[30%] w-[5px] h-11 bg-gradient-to-b from-[#7C6694] to-[#211A2D] rounded-l-[3px] border-r-0 border border-[#7C6694]/40 shadow-md z-30" />
          <div className="absolute -left-[5px] top-[44%] w-[5px] h-11 bg-gradient-to-b from-[#7C6694] to-[#211A2D] rounded-l-[3px] border-r-0 border border-[#7C6694]/40 shadow-md z-30" />
          <div className="absolute -right-[5px] top-[34%] w-[5px] h-16 bg-gradient-to-b from-[#7C6694] to-[#211A2D] rounded-r-[3px] border-l-0 border border-[#7C6694]/40 shadow-md z-30" />

          {/* Inner Black Bezel & Screen Display Container */}
          <div className="relative w-full h-full bg-[#0B0A0D] rounded-[46px] border border-[#211A2D] shadow-[inset_0_0_18px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden p-4 sm:p-5">
            {/* VIEW 1: HERO LANDING CONTENT */}
            <div className="hero-landing-content absolute inset-0 p-5 flex flex-col items-center text-center z-10">
              {/* Dynamic Island Header Notch */}
              <div className="dynamic-island mt-2 mb-4 bg-[#16121E] border border-[#7C6694]/40 px-2 py-1 rounded-full flex items-center gap-2 shadow-2xl">
                <span className="text-[11px] font-medium text-[#A5A4AA] tracking-wide pl-1.5">
                  Talk. Reflect. Grow.
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#0B0A0D] border border-[#7C6694]/50" />
                <div ref={percentRef} className="relative w-7 h-7 rounded-full border-[1.5px] border-[#7C6694] flex items-center justify-center text-[8px] font-bold text-[#7C6694]">
                  1%
                </div>
              </div>

              {/* Subtitle, Headline & Badges Group */}
              <div className="mt-2 sm:mt-3 w-full px-2 flex flex-col items-center">
                <p className="hero-subtitle text-[#A5A4AA] text-[9px] sm:text-[10px] font-medium mb-2.5">
                  Powered by AI and evidence-based clinical frameworks.
                </p>
                <h1 className="hero-headline text-[14px] sm:text-[16px] font-medium tracking-tight text-[#F8FAFC] leading-[1.15] mb-5 font-heading">
                  Your mind deserves a companion,<br />
                  not just an app.
                </h1>

                {/* App Store Badges */}
                <div className="hero-badges flex flex-row items-center justify-center gap-2 w-full px-1">
                  <a
                    href="#app-store"
                    className="flex-1 bg-[#16121E] text-white border border-[#7C6694]/40 rounded-xl px-2 py-1.5 flex items-center justify-center gap-1.5 hover:scale-105 transition-all shadow-md"
                  >
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.64-.78 1.08-1.85.96-2.92-.93.04-2.07.62-2.74 1.4-.59.68-1.11 1.77-.97 2.83 1.04.08 2.11-.53 2.75-1.31z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[7px] uppercase tracking-wider text-[#A5A4AA]">Download on the</div>
                      <div className="text-[11px] font-semibold text-white">App Store</div>
                    </div>
                  </a>

                  <a
                    href="#google-play"
                    className="flex-1 bg-[#16121E] text-white border border-[#7C6694]/40 rounded-xl px-2 py-1.5 flex items-center justify-center gap-1.5 hover:scale-105 transition-all shadow-md"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M3.6 2.2L13.7 12 3.6 21.8c-.4-.4-.6-.9-.6-1.5V3.7c0-.6.2-1.1.6-1.5z" />
                      <path fill="#FBBC04" d="M17.1 8.7l-3.4 3.3 3.4 3.3 3.9-2.2c1.1-.6 1.1-1.6 0-2.2l-3.9-2.2z" />
                      <path fill="#4285F4" d="M3.6 2.2L13.7 12 17.1 8.7 5.7 2.2c-.6-.3-1.4-.3-2.1 0z" />
                      <path fill="#34A853" d="M3.6 21.8l2.1 1.2c.7.4 1.5.4 2.1 0l11.4-6.5-3.4-3.3L3.6 21.8z" />
                    </svg>
                    <div className="text-left leading-tight">
                      <div className="text-[7px] uppercase tracking-wider text-[#A5A4AA]">GET IT ON</div>
                      <div className="text-[11px] font-semibold text-white">Google Play</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* VIEW 2: PORTRAIT IPHONE CHAT SCREEN */}
            <div className="hero-chat-screen absolute inset-0 p-3.5 flex flex-col justify-between opacity-0 scale-95 z-20 pointer-events-none">
              <div className="flex items-center justify-between text-[11px] text-[#A5A4AA] font-medium px-2 pt-1">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 text-[9px]">
                  <span>📶</span>
                  <span>📡</span>
                  <div className="w-4.5 h-2 border border-[#7C6694]/50 rounded-sm p-[1px] flex items-center">
                    <div className="w-full h-full bg-white rounded-xs" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-[#211A2D] px-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#A5A4AA] text-xs cursor-pointer">‹</span>
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#7C6694]/50 bg-[#211A2D] flex items-center justify-center text-[10px] font-bold">
                    👩🏻
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-[#0B0A0D]" />
                  </div>
                  <span className="text-xs font-semibold text-white">Dr. Aria</span>
                </div>
                <span className="text-[#A5A4AA] text-xs cursor-pointer">⋮</span>
              </div>

              {/* Chat Messages Area */}
              <div className="flex-1 my-2 flex flex-col gap-2 px-1 justify-start pt-1 overflow-hidden text-left text-[10px]">
                <div className="chat-bubble-1 opacity-0 translate-y-3 p-2.5 bg-[#1C1726] text-[#F8FAFC] rounded-2xl rounded-tl-xs max-w-[90%] border border-[#7C6694]/30 shadow-md">
                  <p className="leading-snug text-[10px] font-normal text-[#A5A4AA]">
                    That's worth sitting with for a second — what part of it won't let go?
                  </p>
                  <div className="text-[8px] text-[#A5A4AA]/70 text-right mt-1 font-medium">12:30 PM</div>
                </div>

                <div className="chat-bubble-2 opacity-0 translate-y-3 p-2.5 bg-[#7C6694] text-white rounded-2xl rounded-tr-xs max-w-[85%] ml-auto shadow-md shadow-[#7C6694]/40">
                  <p className="leading-snug text-[10px] font-medium">
                    I think it's that I froze when they asked me a direct question.
                  </p>
                  <div className="text-[8px] text-purple-200 text-right mt-0.5 flex items-center justify-end gap-1">
                    <span>12:31 PM</span>
                    <span className="text-[9px]">✓</span>
                  </div>
                </div>

                <div className="chat-receipt opacity-0 translate-y-3 scale-95 p-2.5 bg-[#16121E] rounded-2xl border border-[#7C6694]/40 text-white shadow-lg my-0.5">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-[#7C6694]/30 border border-[#7C6694]/60 flex items-center justify-center text-[#7C6694] text-[8px] font-bold">
                        ✓
                      </div>
                      <span className="font-bold text-[10px]">Action Item</span>
                    </div>
                    <span className="text-[8px] font-semibold text-[#7C6694]">Captured</span>
                  </div>
                  <div className="font-bold text-[10px] text-white my-1 leading-snug">
                    Prepare one honest answer for next time.
                  </div>
                  <div className="pt-1.5 border-t border-[#211A2D] flex justify-between items-center text-[8px] text-[#A5A4AA]">
                    <span>Mode</span>
                    <span className="text-white font-medium">CBT · Dr. Aria</span>
                  </div>
                  <div className="flex justify-between items-center text-[8px] text-[#A5A4AA] mt-0.5">
                    <span>Logged</span>
                    <span className="text-white font-medium">Jan 25, 12:32 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button className="w-7 h-7 rounded-full bg-[#211A2D] text-[#A5A4AA] flex items-center justify-center text-sm hover:bg-[#7C6694] hover:text-white transition-colors">
                  +
                </button>

                <div className="flex-1 bg-[#16121E] border border-[#211A2D] rounded-full px-3 py-1.5 flex items-center justify-between">
                  <span className="text-[10px] text-[#A5A4AA]">Write a message</span>
                  <span className="text-xs text-[#A5A4AA] cursor-pointer">😊</span>
                </div>

                <button className="w-7 h-7 rounded-full bg-[#7C6694] text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-[#7C6694]/40 hover:bg-[#9278B1] transition-colors">
                  ➔
                </button>
              </div>

              <div className="w-24 h-1 bg-[#7C6694]/40 rounded-full mx-auto mt-1.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
