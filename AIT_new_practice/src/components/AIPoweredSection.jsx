import React from 'react';

export default function AIPoweredSection() {
  return (
    <section className="bg-[#0B0A0D] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden border-t border-[#211A2D]">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl text-center font-medium mb-16 tracking-tight leading-tight font-heading">
          The world's first <span className="text-[#7C6694]">AI-powered</span><br /> 
          therapy companion.
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:auto-rows-[280px]">
          
          {/* Block 1: Grounded in validated clinical frameworks (Spans 2 columns) */}
          <div className="md:col-span-2 rounded-3xl bg-[#16121E] border border-[#7C6694]/30 p-8 flex flex-col items-center justify-center relative overflow-hidden group min-h-[260px] shadow-xl">
            <h3 className="text-lg font-medium text-[#A5A4AA] mb-8 z-10 text-center font-heading">
              Grounded in validated clinical frameworks.
            </h3>
            
            {/* Clinical Framework Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl z-10">
              <span className="px-4 py-2 rounded-full bg-[#211A2D] border border-[#7C6694]/40 text-xs sm:text-sm font-semibold text-[#A78BFA] shadow-sm backdrop-blur-md hover:border-[#7C6694] transition-colors">
                PHQ-9
              </span>
              <span className="px-4 py-2 rounded-full bg-[#211A2D] border border-[#7C6694]/40 text-xs sm:text-sm font-semibold text-[#A78BFA] shadow-sm backdrop-blur-md hover:border-[#7C6694] transition-colors">
                GAD-7
              </span>
              <span className="px-4 py-2 rounded-full bg-[#211A2D] border border-[#7C6694]/40 text-xs sm:text-sm font-semibold text-[#A78BFA] shadow-sm backdrop-blur-md hover:border-[#7C6694] transition-colors">
                CBT
              </span>
              <span className="px-4 py-2 rounded-full bg-[#211A2D] border border-[#7C6694]/40 text-xs sm:text-sm font-semibold text-[#A78BFA] shadow-sm backdrop-blur-md hover:border-[#7C6694] transition-colors">
                Mindfulness-Based Practice
              </span>
              <span className="px-4 py-2 rounded-full bg-[#211A2D] border border-[#7C6694]/40 text-xs sm:text-sm font-semibold text-[#A78BFA] shadow-sm backdrop-blur-md hover:border-[#7C6694] transition-colors">
                ACT
              </span>
              <span className="px-4 py-2 rounded-full bg-[#211A2D] border border-[#7C6694]/40 text-xs sm:text-sm font-semibold text-[#A78BFA] shadow-sm backdrop-blur-md hover:border-[#7C6694] transition-colors">
                Person-Centered Therapy
              </span>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#7C6694]/15 blur-3xl rounded-full pointer-events-none" />
            
            {/* Subtle Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(rgba(124,102,148,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(124,102,148,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          {/* Block 4: AI Companion Phone Mockup (Right Column, Spans 1 col, 2 rows) */}
          <div className="md:col-span-1 md:row-span-2 rounded-3xl bg-[#16121E] border border-[#7C6694]/30 p-6 sm:p-8 flex flex-col items-center justify-between relative overflow-hidden group shadow-xl">
            
            {/* Background Glow */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-[#7C6694]/30 blur-[80px] pointer-events-none rounded-full" />
            
            {/* Phone Mockup */}
            <div className="relative w-[230px] h-[370px] border-[6px] border-[#211A2D] rounded-[40px] bg-[#0B0A0D] shadow-2xl flex flex-col items-center pt-5 px-3 z-10 overflow-hidden">
              <div className="text-[10px] text-[#A5A4AA] mb-0.5 font-medium">Hello, Joel</div>
              <div className="text-xs text-white mb-4 font-semibold font-heading">How can I help you?</div>
              
              {/* Soft Glowing Orb */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7C6694] via-[#9278B1] to-[#211A2D] shadow-[0_0_35px_rgba(124,102,148,0.6)] mb-5" />
              
              {/* Action Chips */}
              <div className="w-full flex flex-col gap-1.5 mb-auto text-[9px]">
                <div className="flex justify-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full border border-[#7C6694]/40 text-[#A5A4AA] bg-[#211A2D]/80 backdrop-blur-xs whitespace-nowrap">
                    Log a mood
                  </span>
                  <span className="px-2.5 py-1 rounded-full border border-[#7C6694]/40 text-[#A5A4AA] bg-[#211A2D]/80 backdrop-blur-xs whitespace-nowrap">
                    Talk to Dr. Aria
                  </span>
                </div>
                <div className="flex justify-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full border border-[#7C6694]/40 text-[#A5A4AA] bg-[#211A2D]/80 backdrop-blur-xs whitespace-nowrap">
                    View my insights
                  </span>
                  <span className="px-2.5 py-1 rounded-full border border-[#7C6694]/40 text-[#A5A4AA] bg-[#211A2D]/80 backdrop-blur-xs whitespace-nowrap">
                    Start Check-In
                  </span>
                </div>
              </div>
              
              {/* Input Bar */}
              <div className="w-[92%] h-9 bg-[#211A2D] rounded-full flex items-center px-1.5 mb-3 border border-[#7C6694]/40">
                <div className="w-6 h-6 flex items-center justify-center text-[#A5A4AA] text-xs">+</div>
                <div className="flex-1 text-[9px] text-[#A5A4AA] pl-1 font-medium">Ask me anything…</div>
                <div className="w-6 h-6 rounded-full bg-[#7C6694] flex items-center justify-center shadow-md">
                  <svg className="w-3 h-3 text-white transform -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                  </svg>
                </div>
              </div>
              
              {/* Home Indicator */}
              <div className="w-20 h-1 bg-[#7C6694]/40 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2" />
            </div>
            
            {/* Description Text */}
            <div className="text-center mt-6 z-10">
              <h3 className="text-lg font-bold text-white mb-2 leading-snug font-heading">
                Let AI hold space for you.
              </h3>
              <p className="text-[11px] text-[#A5A4AA] leading-relaxed px-1 font-normal font-sans">
                SoulNest comes with a companion that evolves with you. From daily check-ins to deeper reflection, it learns your patterns — growing alongside you, one conversation at a time.
              </p>
            </div>
          </div>

          {/* Block 2: Check-ins that feel like texting (Bottom Left, Spans 1 column) */}
          <div className="md:col-span-1 rounded-3xl bg-gradient-to-br from-[#7C6694]/20 via-[#0B0A0D] to-[#0B0A0D] border border-[#7C6694]/30 p-6 flex flex-col justify-between relative overflow-hidden group shadow-xl">
            <h3 className="text-lg font-medium text-white text-center mb-6 relative z-10 w-full font-heading">
              Check-ins that feel like texting.
            </h3>
            
            {/* Reflection Card Mockup */}
            <div className="relative z-10 w-full bg-[#211A2D] text-white rounded-2xl p-4 shadow-2xl border border-[#7C6694]/40 text-left">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#7C6694] flex items-center justify-center text-white text-xs shadow-md shrink-0">
                  🌱
                </div>
                <div>
                  <h4 className="font-bold text-xs leading-tight font-heading">Daily Reflection</h4>
                  <p className="text-[10px] text-[#A5A4AA] font-sans">@MindfulMoments</p>
                </div>
              </div>
              <p className="text-xs text-white/90 font-medium mb-3 leading-snug font-sans">
                "What step made you feel grounded today?"
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#7C6694]/30 text-[10px] font-sans">
                <span className="text-[#A5A4AA]">Jan 26, 12:28 PM</span>
                <button className="bg-[#7C6694] text-white text-[10px] font-semibold px-3 py-1 rounded-full shadow-md hover:bg-[#9278B1] transition-colors">
                  Reflect Now
                </button>
              </div>
            </div>

            <div className="absolute bottom-6 left-4 w-32 h-32 bg-[#7C6694]/25 blur-3xl pointer-events-none rounded-full" />
          </div>

          {/* Block 3: Safety-first, by design (Bottom Middle, Spans 1 column) */}
          <div className="md:col-span-1 rounded-3xl bg-[#16121E] border border-[#7C6694]/30 p-6 flex flex-col items-center text-center relative overflow-hidden group shadow-xl">
            <h3 className="text-lg font-medium text-white mb-auto relative z-10 w-4/5 mx-auto font-heading">
              Safety-first, by design.
            </h3>
            
            {/* Glowing Safety Motif */}
            <div className="relative w-48 h-48 mt-4 flex justify-center items-center">
              <div className="absolute inset-0 bg-[#7C6694]/30 blur-3xl rounded-full" />
              
              {/* Circular Shield Arc */}
              <div className="relative w-36 h-36 border-[14px] border-[#7C6694] rounded-full border-r-transparent border-t-transparent transform rotate-45 z-10 shadow-[0_0_30px_rgba(124,102,148,0.6)]">
                <div className="absolute top-[45%] right-[-45%] w-[110%] h-[14px] bg-[#7C6694] transform -rotate-45 shadow-[0_0_20px_rgba(124,102,148,0.6)]" />
              </div>
              
              {/* Center Soft Shield Emblem */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-12 h-12 rounded-2xl bg-[#7C6694] border border-white/40 shadow-[0_0_25px_rgba(124,102,148,0.8)] flex items-center justify-center text-white">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
