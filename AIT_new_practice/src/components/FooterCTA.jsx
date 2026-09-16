import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function FooterCTA() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      gsap.utils.toArray(".parallax-coin").forEach(coin => {
        const speed = parseFloat(coin.dataset.speed || 1);
        gsap.to(coin, {
          x: xPos * 40 * speed,
          y: yPos * 40 * speed,
          duration: 1,
          ease: "power2.out",
          overwrite: "auto"
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-[#0B0A0D] via-[#16121E] to-[#211A2D] overflow-hidden flex flex-col items-center pt-32 font-sans select-none border-t border-[#211A2D]">
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(124,102,148,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,102,148,0.3) 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />
      
      {/* Headline */}
      <h2 className="text-5xl sm:text-7xl font-medium text-white text-center tracking-tight mb-8 relative z-10 leading-[1.1] font-heading">
        Welcome to a <br /> 
        calmer way to check in.
      </h2>
      
      {/* App Store / Google Play Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-28 relative z-10">
        
        {/* App Store Button */}
        <a href="#app-store" className="flex items-center bg-[#16121E] text-white px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg border border-[#7C6694]/40">
          <svg className="w-8 h-8 mr-3 fill-current text-white" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.56.03 2.88.54 3.92 1.44-2.5 1.59-2.05 4.96.48 6.13-1.02 2.66-2.58 5.17-2.98 5.4zm-4.78-14.4c.5-1.78-.65-3.46-2.34-3.88-.65 2.1 1.25 3.9 2.34 3.88z"/>
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-tight text-[#A5A4AA] uppercase tracking-wider">Download on the</div>
            <div className="text-lg font-semibold leading-tight font-heading">App Store</div>
          </div>
        </a>

        {/* Google Play Button */}
        <a href="#google-play" className="flex items-center bg-[#16121E] text-white px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg border border-[#7C6694]/40">
          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M3.6 2.2L13.7 12 3.6 21.8c-.4-.4-.6-.9-.6-1.5V3.7c0-.6.2-1.1.6-1.5z" />
            <path fill="#FBBC04" d="M17.1 8.7l-3.4 3.3 3.4 3.3 3.9-2.2c1.1-.6 1.1-1.6 0-2.2l-3.9-2.2z" />
            <path fill="#4285F4" d="M3.6 2.2L13.7 12 17.1 8.7 5.7 2.2c-.6-.3-1.4-.3-2.1 0z" />
            <path fill="#34A853" d="M3.6 21.8l2.1 1.2c.7.4 1.5.4 2.1 0l11.4-6.5-3.4-3.3L3.6 21.8z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-tight text-[#A5A4AA] uppercase tracking-wider">GET IT ON</div>
            <div className="text-lg font-semibold leading-tight font-heading">Google Play</div>
          </div>
        </a>
      </div>
      
      {/* 3D Graphics Composition */}
      <div className="relative w-full max-w-5xl h-[350px] mt-6">
        
        {/* Floating Background Card 1 (Purple Accent) */}
        <div className="absolute bottom-[-120px] right-[10%] md:right-[20%] w-[320px] h-[210px] bg-gradient-to-br from-[#211A2D] to-[#16121E] border border-[#7C6694]/40 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] transform rotate-[15deg] origin-bottom-right z-0 p-6 flex flex-col justify-between">
          <div className="w-12 h-12 rounded-xl bg-[#7C6694]/30 flex items-center justify-center text-[#7C6694] font-bold text-lg">
            🌱
          </div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-[#7C6694]/20 rounded" />
            <div className="w-2/3 h-3 bg-[#7C6694]/20 rounded" />
          </div>
        </div>
        
        {/* Floating Background Card 2 (Dark Violet Accent) */}
        <div className="absolute bottom-[-50px] left-[5%] md:left-[15%] w-[380px] h-[240px] bg-gradient-to-br from-[#7C6694] via-[#4A3961] to-[#211A2D] border border-white/20 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] transform -rotate-[15deg] origin-bottom-left z-10 p-6 flex flex-col justify-between overflow-hidden">
          <div className="self-end text-sm font-bold text-white/90 tracking-widest uppercase font-heading">SoulNest</div>
          <div className="z-10 text-white font-medium text-lg leading-snug font-heading">
            "Your companion for daily support & growth."
          </div>
        </div>
        
        {/* Center Phone Mockup */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[550px] bg-gradient-to-b from-[#2D243B] via-[#16121E] to-[#0D0A13] rounded-[52px] p-[6px] border border-[#7C6694]/40 shadow-[0_40px_80px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-1px_2px_rgba(0,0,0,0.9)] z-20">
          
          {/* Inner Screen Display */}
          <div className="relative w-full h-full bg-[#0B0A0D] rounded-[46px] border border-[#211A2D] shadow-[inset_0_0_18px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col pt-3">
            
            {/* Status Bar */}
            <div className="w-full flex justify-between items-center px-6 mb-4 z-20">
              <span className="text-[10px] text-[#A5A4AA] font-medium">9:41</span>
              <div className="flex gap-1.5 items-center text-[9px] text-[#A5A4AA]">
                 <span>📶</span>
                 <span>📡</span>
                 <div className="w-4.5 h-2 border border-[#7C6694]/50 rounded-[3px] p-[1px] flex items-center"><div className="w-full h-full bg-white rounded-[1px]" /></div>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-20" />
            
            {/* Phone Screen Dashboard Content */}
            <div className="w-full px-5 mt-2 z-10">
              
              {/* Header: Dr. Aria ▾ + subtext + timer clock icon */}
              <div className="flex justify-between items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-[#7C6694] flex justify-center items-center text-white text-xs font-bold shadow-sm font-heading">
                  DA
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-white text-xs font-semibold font-heading">Dr. Aria ▾</span>
                  <span className="text-[#A78BFA] text-[9px] font-medium">Session 12 · CBT</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#211A2D] border border-[#7C6694]/40 flex justify-center items-center text-[#A5A4AA] text-xs">
                  ⏱
                </div>
              </div>
              
              {/* Large Centered Stat: 18-day streak + green pill */}
              <div className="text-center mb-8">
                <div className="text-[26px] font-bold text-white mb-2 tracking-tight font-heading">18-day streak</div>
                <div className="text-[10px] font-medium inline-block">
                  <span className="text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 font-semibold">
                    +18% mood balance (30d)
                  </span>
                </div>
              </div>
              
              {/* Four Action Buttons Row */}
              <div className="flex justify-between px-1 mb-6">
                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-[42px] h-[42px] rounded-xl bg-[#211A2D] border border-[#7C6694]/40 flex items-center justify-center text-[#7C6694] text-base font-bold shadow-sm group-hover:bg-[#7C6694] group-hover:text-white transition-colors">
                    ↓
                  </div>
                  <span className="text-[9px] text-[#A5A4AA] font-semibold">Check In</span>
                </div>

                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-[42px] h-[42px] rounded-xl bg-[#211A2D] border border-[#7C6694]/40 flex items-center justify-center text-[#7C6694] text-base shadow-sm group-hover:bg-[#7C6694] group-hover:text-white transition-colors">
                    💬
                  </div>
                  <span className="text-[9px] text-[#A5A4AA] font-semibold">Talk</span>
                </div>

                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-[42px] h-[42px] rounded-xl bg-[#211A2D] border border-[#7C6694]/40 flex items-center justify-center text-[#7C6694] text-base shadow-sm group-hover:bg-[#7C6694] group-hover:text-white transition-colors">
                    ✎
                  </div>
                  <span className="text-[9px] text-[#A5A4AA] font-semibold">Journal</span>
                </div>

                <div className="flex flex-col items-center gap-2 cursor-pointer group">
                  <div className="w-[42px] h-[42px] rounded-xl bg-[#211A2D] border border-[#7C6694]/40 flex items-center justify-center text-[#7C6694] text-base font-bold shadow-sm group-hover:bg-[#7C6694] group-hover:text-white transition-colors">
                    +
                  </div>
                  <span className="text-[9px] text-[#A5A4AA] font-semibold">New Session</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Floating Accent Icons around Phone */}
        
        {/* Left: Leaf icon */}
        <div data-speed="1.5" className="parallax-coin absolute top-[5%] left-[20%] md:left-[25%] w-[64px] h-[64px] bg-[#16121E] rounded-full border-4 border-[#7C6694]/40 shadow-2xl z-30 flex justify-center items-center transform -rotate-[20deg] shadow-black/80">
          <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#7C6694] to-[#211A2D] flex justify-center items-center shadow-inner">
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.42 1.42c.45-.45.98-.83 1.55-1.13C12.75 19 21 11.25 21 3c0 0-2 2-4 5z"/>
            </svg>
          </div>
        </div>
        
        {/* Lower-left: Heart icon */}
        <div data-speed="-1" className="parallax-coin absolute top-[40%] left-[28%] md:left-[34%] w-[52px] h-[52px] bg-[#16121E] rounded-full border-2 border-[#7C6694]/40 shadow-xl z-30 flex justify-center items-center transform rotate-[15deg]">
          <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex justify-center items-center shadow-inner">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>

        {/* Right: Sprout/Lotus icon */}
        <div data-speed="1.2" className="parallax-coin absolute top-[22%] right-[16%] md:right-[22%] w-[60px] h-[60px] bg-[#16121E] rounded-full border-[3px] border-[#7C6694]/40 shadow-2xl z-30 flex justify-center items-center transform -rotate-[10deg]">
          <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#7C6694] to-[#A78BFA] flex justify-center items-center shadow-inner text-white font-bold text-lg">
            🌱
          </div>
        </div>

        {/* Lower-right: Soft Shield Badge */}
        <div data-speed="0.8" className="parallax-coin absolute bottom-[30%] right-[25%] md:right-[30%] w-14 h-14 bg-[#16121E] rounded-full border-2 border-[#7C6694]/40 shadow-xl z-30 flex justify-center items-center transform rotate-[10deg]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C6694] to-[#211A2D] flex justify-center items-center text-white shadow-inner">
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"/>
            </svg>
          </div>
        </div>
        
      </div>
      
      {/* Dark Footer Block */}
      <div className="relative z-40 w-full bg-[#0B0A0D] rounded-t-[40px] px-8 sm:px-16 pt-16 pb-12 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.8)] border-t border-[#211A2D]">
        
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-white mb-16">
          <div className="text-3xl font-medium mb-4 sm:mb-0 font-heading">Contact Us</div>
          <a href="mailto:support@soulnest.ai" className="text-3xl font-light text-[#A78BFA] underline decoration-[#7C6694]/50 underline-offset-8 hover:text-white hover:decoration-white transition-colors font-sans">
            support@soulnest.ai
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[#211A2D] mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#A5A4AA] text-xs font-sans">
          
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 md:mb-0">
            <span>© Copyright 2026 SoulNest Inc. All rights reserved</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            <a href="#" className="w-10 h-10 rounded-lg bg-[#16121E] border border-[#7C6694]/30 hover:bg-[#211A2D] flex items-center justify-center transition-colors text-[#A5A4AA] hover:text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-[#16121E] border border-[#7C6694]/30 hover:bg-[#211A2D] flex items-center justify-center transition-colors text-[#A5A4AA] hover:text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-lg bg-[#16121E] border border-[#7C6694]/30 hover:bg-[#211A2D] flex items-center justify-center transition-colors text-[#A5A4AA] hover:text-white">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>

        </div>
      </div>
      
    </section>
  );
}
