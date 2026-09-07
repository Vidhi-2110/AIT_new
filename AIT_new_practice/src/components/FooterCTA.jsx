import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function FooterCTA() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate normalized mouse position (-1 to 1)
      const xPos = (e.clientX / innerWidth - 0.5) * 2;
      const yPos = (e.clientY / innerHeight - 0.5) * 2;

      // Animate all parallax coins based on their data-speed attribute
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
    <section ref={sectionRef} className="relative w-full bg-gradient-to-b from-white via-[#e8f5ff] to-[#2b88ff] overflow-hidden flex flex-col items-center pt-32 font-sans select-none">
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', 
          backgroundSize: '80px 80px' 
        }} 
      />
      
      {/* Header */}
      <h2 className="text-5xl sm:text-7xl font-medium text-black text-center tracking-tight mb-8 relative z-10 leading-[1.1]">
        Welcome to the <br /> 
        Future of Payments.
      </h2>
      
      {/* App Store / Google Play Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-32 relative z-10">
        
        {/* App Store Button Mockup */}
        <button className="flex items-center bg-black text-white px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg border border-white/10">
          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.19 2.31-.88 3.5-.8 1.56.03 2.88.54 3.92 1.44-2.5 1.59-2.05 4.96.48 6.13-1.02 2.66-2.58 5.17-2.98 5.4zm-4.78-14.4c.5-1.78-.65-3.46-2.34-3.88-.65 2.1 1.25 3.9 2.34 3.88z"/>
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-tight text-gray-300">Download on the</div>
            <div className="text-lg font-semibold leading-tight">App Store</div>
          </div>
        </button>

        {/* Google Play Button Mockup */}
        <button className="flex items-center bg-black text-white px-5 py-2.5 rounded-xl hover:scale-105 transition-transform shadow-lg border border-white/10">
          <svg className="w-8 h-8 mr-3" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M3.6 2.2L13.7 12 3.6 21.8c-.4-.4-.6-.9-.6-1.5V3.7c0-.6.2-1.1.6-1.5z" />
            <path fill="#FBBC04" d="M17.1 8.7l-3.4 3.3 3.4 3.3 3.9-2.2c1.1-.6 1.1-1.6 0-2.2l-3.9-2.2z" />
            <path fill="#4285F4" d="M3.6 2.2L13.7 12 17.1 8.7 5.7 2.2c-.6-.3-1.4-.3-2.1 0z" />
            <path fill="#34A853" d="M3.6 21.8l2.1 1.2c.7.4 1.5.4 2.1 0l11.4-6.5-3.4-3.3L3.6 21.8z" />
          </svg>
          <div className="text-left">
            <div className="text-[10px] leading-tight text-gray-300">GET IT ON</div>
            <div className="text-lg font-semibold leading-tight">Google Play</div>
          </div>
        </button>
      </div>
      
      {/* 3D Graphics Composition */}
      <div className="relative w-full max-w-5xl h-[350px] mt-10">
        
        {/* Floating Silver Card */}
        <div className="absolute bottom-[-120px] right-[10%] md:right-[20%] w-[320px] h-[210px] bg-gradient-to-br from-gray-100 to-gray-400 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] transform rotate-[15deg] origin-bottom-right z-0 p-6 flex flex-col justify-end">
          <div className="w-12 h-16 border border-gray-400/50 rounded-md mb-2 bg-gradient-to-br from-gray-200 to-gray-300 opacity-60" />
          <div className="w-full h-8 bg-gray-500/20 rounded mb-2" />
          <div className="w-1/2 h-4 bg-gray-500/20 rounded" />
        </div>
        
        {/* Floating Blue VISA Card */}
        <div className="absolute bottom-[-50px] left-[5%] md:left-[15%] w-[380px] h-[240px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] transform -rotate-[15deg] origin-bottom-left z-10 p-6 flex flex-col justify-between overflow-hidden">
          {/* Faint polygon background shapes */}
          <div className="absolute -top-20 -left-20 w-[150%] h-[150%] opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMCAwbDEwMCA1MC01MCA1MHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] bg-cover" />
          <div className="self-end text-xl font-bold italic text-white/80 tracking-widest mt-2 z-10 transform rotate-90 origin-right">VISA</div>
          <div className="z-10">
            <div className="w-12 h-10 border border-white/30 rounded-md mb-6" />
          </div>
        </div>
        
        {/* Center Phone Mockup (Realistic) */}
        <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[550px] bg-gradient-to-b from-[#434957] via-[#161922] to-[#2c313d] rounded-[52px] p-[6px] border border-slate-400/40 shadow-[0_40px_80px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-1px_2px_rgba(0,0,0,0.9)] z-20">
          
          {/* Inner Screen */}
          <div className="relative w-full h-full bg-[#050608] rounded-[46px] border border-slate-800/80 shadow-[inset_0_0_18px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col pt-3">
            
            {/* Status Bar */}
            <div className="w-full flex justify-between items-center px-6 mb-4 z-20">
              <span className="text-[10px] text-slate-200 font-medium">9:41</span>
              <div className="flex gap-1.5 items-center text-[9px] text-slate-200">
                 <span>📶</span>
                 <span>📡</span>
                 <div className="w-4.5 h-2 border border-slate-300 rounded-[3px] p-[1px] flex items-center"><div className="w-full h-full bg-white rounded-[1px]" /></div>
              </div>
            </div>

            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[90px] h-[24px] bg-black rounded-full z-20" />
            
            {/* Wallet Content */}
            <div className="w-full px-5 mt-2 z-10">
              <div className="flex justify-between items-center mb-8">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex justify-center items-center text-white text-xs font-bold">O</div>
                <div className="flex flex-col items-center">
                  <span className="text-white text-xs font-medium">Helena Brown ▾</span>
                  <span className="text-gray-500 text-[9px]">0x3e8...5xc1</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex justify-center items-center text-white text-[10px]">◷</div>
              </div>
              
              {/* Balance */}
              <div className="text-center mb-10">
                <div className="text-[28px] font-medium text-white mb-2 tracking-tight">$28,832.88</div>
                <div className="text-[10px] font-medium">
                  <span className="text-emerald-400 mr-2">+$2,800.23</span>
                  <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">+88% (24h)</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between px-1 mb-10">
                <div className="flex flex-col items-center gap-2.5"><div className="w-[42px] h-[42px] rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-blue-400 text-lg">↓</div><span className="text-[9px] text-gray-400 font-medium">Receive</span></div>
                <div className="flex flex-col items-center gap-2.5"><div className="w-[42px] h-[42px] rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-blue-400 text-lg">↑</div><span className="text-[9px] text-gray-400 font-medium">Send</span></div>
                <div className="flex flex-col items-center gap-2.5"><div className="w-[42px] h-[42px] rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-blue-400 text-lg">⟲</div><span className="text-[9px] text-gray-400 font-medium">Swap</span></div>
                <div className="flex flex-col items-center gap-2.5"><div className="w-[42px] h-[42px] rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-blue-400 text-lg">+</div><span className="text-[9px] text-gray-400 font-medium">Buy</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Icons/Coins */}
        {/* Polkadot Coin */}
        <div data-speed="1.5" className="parallax-coin absolute top-[5%] left-[20%] md:left-[25%] w-[70px] h-[70px] bg-[#1a1b1e] rounded-full border-4 border-slate-700 shadow-2xl z-30 flex justify-center items-center transform -rotate-[20deg] shadow-black/50">
          <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 flex justify-center items-center">
            <span className="text-black font-bold text-2xl italic">P</span>
          </div>
        </div>
        
        {/* Tether Coin */}
        <div data-speed="-1" className="parallax-coin absolute top-[40%] left-[28%] md:left-[35%] w-[50px] h-[50px] bg-[#1a1b1e] rounded-full border-2 border-slate-600 shadow-xl z-30 flex justify-center items-center transform rotate-[15deg]">
          <div className="w-[36px] h-[36px] rounded-full bg-[#26A17B] flex justify-center items-center">
            <span className="text-white font-bold text-lg">₮</span>
          </div>
        </div>

        {/* USDC Coin */}
        <div data-speed="1.2" className="parallax-coin absolute top-[30%] right-[15%] md:right-[22%] w-[60px] h-[60px] bg-[#1a1b1e] rounded-full border-[3px] border-slate-600 shadow-2xl z-30 flex justify-center items-center transform -rotate-[10deg]">
          <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex justify-center items-center">
            <span className="text-white font-bold text-xl">$</span>
          </div>
        </div>

        {/* Lock Icon */}
        <div data-speed="0.8" className="parallax-coin absolute bottom-[30%] right-[25%] md:right-[30%] w-16 h-20 z-30 transform rotate-[10deg]">
          <div className="w-8 h-10 border-[6px] border-[#222] rounded-t-full mx-auto mb-[-8px] z-0" />
          <div className="w-16 h-14 bg-gradient-to-b from-gray-800 to-black rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.8)] border-t border-gray-600 z-10 relative flex justify-center items-center">
            <div className="w-2 h-4 bg-gray-900 rounded-full" />
          </div>
        </div>

        {/* Unknown Coin (Right) */}
        <div data-speed="-1.2" className="parallax-coin absolute top-[20%] right-[15%] md:right-[20%] w-[60px] h-[60px] bg-[#1a1b1e] rounded-full border-4 border-slate-700 shadow-2xl z-30 flex justify-center items-center transform rotate-[30deg]">
          <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-blue-600 to-purple-500 flex justify-center items-center">
            <span className="text-white font-bold text-xl font-serif">S</span>
          </div>
        </div>
        
      </div>
      
      {/* Dark Footer Block */}
      <div className="relative z-40 w-full bg-[#050608] rounded-t-[40px] px-8 sm:px-16 pt-16 pb-12 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-white mb-16">
          <div className="text-3xl font-medium mb-4 sm:mb-0">Contact Us</div>
          <a href="mailto:ai@facilpay.io" className="text-3xl font-light text-blue-200 underline decoration-blue-500/50 underline-offset-8 hover:text-white hover:decoration-white transition-colors">
            ai@facilpay.io
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white/50 text-xs">
          
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6 md:mb-0">
            <span>© Copyright 2025 FacilPay inc. All rights reserved</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {/* Twitter (X) */}
            <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1b1e] hover:bg-[#2c2d30] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1b1e] hover:bg-[#2c2d30] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1b1e] hover:bg-[#2c2d30] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            {/* Telegram */}
            <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1b1e] hover:bg-[#2c2d30] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.894-16.481l-1.927 9.07c-.145.653-.533.813-1.077.508l-2.975-2.194-1.435 1.383c-.159.159-.292.292-.598.292l.213-3.05 5.549-5.011c.241-.215-.052-.334-.374-.119l-6.853 4.316-2.956-.924c-.643-.201-.655-.643.134-.954l11.536-4.444c.535-.198 1.002.124.843 1.033z"/></svg>
            </a>
            {/* Medium */}
            <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1b1e] hover:bg-[#2c2d30] flex items-center justify-center transition-colors">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M6.866 17.525c3.791 0 6.865-3.074 6.865-6.866S10.657 3.793 6.866 3.793 0 6.867 0 10.659s3.075 6.866 6.866 6.866zM17.433 3.99c-1.859 0-3.366 2.986-3.366 6.67 0 3.682 1.507 6.668 3.366 6.668s3.366-2.986 3.366-6.669c0-3.684-1.507-6.67-3.366-6.67zm5.54 1.258c-.567 0-1.027 2.422-1.027 5.41 0 2.989.46 5.411 1.027 5.411s1.027-2.422 1.027-5.41c0-2.988-.46-5.41-1.027-5.41z"/></svg>
            </a>
            {/* Discord */}
            <a href="#" className="w-10 h-10 rounded-lg bg-[#1a1b1e] hover:bg-[#2c2d30] flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            </a>
          </div>

        </div>
      </div>
      
    </section>
  );
}
