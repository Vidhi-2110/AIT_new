import React from 'react';

export default function AIPoweredSection() {
  return (
    <section className="bg-[#050608] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl text-center font-medium mb-16 tracking-tight leading-tight">
          The world's first <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">AI-powered</span><br /> 
          messaging wallet.
        </h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:auto-rows-[280px]">
          
          {/* Card 1: Web3 Leaders (Spans 2 columns) */}
          <div className="md:col-span-2 rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 p-8 flex flex-col items-center relative overflow-hidden group">
            <h3 className="text-lg font-medium text-slate-300 mb-8 z-10">Powered by Web3 Industry Leaders.</h3>
            
            {/* Logos Grid Mockup */}
            <div className="grid grid-cols-3 gap-x-12 gap-y-8 w-full max-w-lg opacity-40 z-10">
              <div className="flex items-center gap-2 font-bold text-xl tracking-widest"><div className="w-6 h-6 rounded-sm bg-white" /> SOLIDUS</div>
              <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">IBC</div>
              <div className="flex items-center gap-2 font-bold text-xl"><div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-white rotate-90" /> DMAIL</div>
              <div className="flex items-center gap-2 font-light text-xl tracking-widest"><div className="w-5 h-6 border-2 border-white rounded-b-full" /> CERTIK</div>
              <div className="flex items-center gap-2 font-bold text-xl"><span className="text-2xl font-serif italic pr-1">W</span> Webflow</div>
              <div className="flex items-center gap-2 font-bold text-xl"><div className="w-6 h-6 rounded-full border-[3px] border-white" /> eesee</div>
            </div>
            
            {/* Subtle glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 blur-3xl rounded-full pointer-events-none" />
            
            {/* Subtle grid lines background overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
          </div>

          {/* Card 4: AI Phone Mockup (Spans 1 column, 2 rows) - Placed here to fit in 3-col grid flow */}
          <div className="md:col-span-1 md:row-span-2 rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 p-8 flex flex-col items-center justify-between relative overflow-hidden group">
            
            {/* Background Glow */}
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[50%] bg-blue-600/30 blur-[80px] pointer-events-none rounded-full" />
            
            {/* Phone Mockup */}
            <div className="relative w-[220px] h-[340px] border-[6px] border-[#1a1b1e] rounded-[40px] bg-[#050608] shadow-2xl flex flex-col items-center pt-6 px-3 z-10 overflow-hidden">
              <div className="text-[10px] text-slate-500 mb-1">Hello, Joel</div>
              <div className="text-sm text-slate-200 mb-6">How can I help you?</div>
              
              {/* Glowing Orb */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white via-slate-400 to-black shadow-[0_0_30px_rgba(255,255,255,0.3)] mb-8" />
              
              {/* Chips */}
              <div className="w-full flex justify-center gap-2 mb-2">
                <div className="px-3 py-1.5 rounded-full border border-white/10 text-[9px] text-slate-400">Send crypto</div>
                <div className="px-3 py-1.5 rounded-full border border-white/10 text-[9px] text-slate-400">Switch to Ethereum</div>
              </div>
              <div className="w-full flex justify-center gap-2 mb-auto">
                <div className="px-3 py-1.5 rounded-full border border-white/10 text-[9px] text-slate-400">My wallet balance</div>
                <div className="px-3 py-1.5 rounded-full border border-white/10 text-[9px] text-slate-400">Transaction fee</div>
              </div>
              
              {/* Input bar */}
              <div className="w-[90%] h-10 bg-white/10 rounded-full flex items-center px-1 pb-0 mb-4 border border-white/10">
                <div className="w-8 h-8 flex items-center justify-center text-slate-400">+</div>
                <div className="flex-1 text-[10px] text-slate-500 pl-1">Ask me anything...</div>
                <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center mr-0.5 shadow-lg">
                  <svg className="w-3 h-3 text-white transform -rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                </div>
              </div>
              
              {/* Home bar */}
              <div className="w-20 h-1 bg-white/20 rounded-full absolute bottom-2 left-1/2 -translate-x-1/2" />
            </div>
            
            {/* Description Text */}
            <div className="text-center mt-8 z-10">
              <h3 className="text-lg font-medium text-white mb-3">Let AI power your <br /> payments.</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed px-2">
                FacilPay comes with an AI assistant that evolves with you. From chat to checkout, it personalizes your experience — like growing your own intelligent companion, one tap at a time.
              </p>
            </div>
          </div>

          {/* Card 2: Payment Requests (Spans 1 column) */}
          <div className="md:col-span-1 rounded-3xl bg-gradient-to-br from-blue-400/20 via-[#050608] to-[#050608] border border-white/10 p-6 flex flex-col relative overflow-hidden group">
            <h3 className="text-lg font-medium text-slate-200 text-center mb-8 relative z-10 w-4/5 mx-auto">Payment requests that feel like texting.</h3>
            
            {/* Background Glow */}
            <div className="absolute bottom-10 left-4 w-32 h-32 bg-blue-500/40 blur-3xl pointer-events-none rounded-full" />
            
            {/* Telegram Icon */}
            <div className="absolute left-6 bottom-16 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 z-20">
              <svg className="w-5 h-5 text-white transform -translate-x-0.5 translate-y-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 12l20-9-4 18-5-6-3.5 3.5.5-5.5L2 12z" />
              </svg>
            </div>
            
            {/* Payment Card Mockup */}
            <div className="absolute right-4 bottom-12 w-56 bg-[#1a1c23] rounded-2xl p-3 border border-white/10 shadow-2xl z-10">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-purple-500 rounded-sm" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">Request</div>
                    <div className="text-[9px] text-slate-500">@melania</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium text-white">+1.081 SOL</div>
                  <div className="text-[9px] text-slate-500">$200.00</div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div className="text-[8px] text-slate-500">Jan 25, 12:28 PM</div>
                <div className="bg-blue-500 text-white text-[10px] font-medium px-4 py-1 rounded-full">Pay now</div>
              </div>
            </div>
          </div>

          {/* Card 3: Layer 2 Reliability (Spans 1 column) */}
          <div className="md:col-span-1 rounded-3xl bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 p-6 flex flex-col items-center text-center relative overflow-hidden group">
            <h3 className="text-lg font-medium text-slate-200 mb-auto relative z-10 w-4/5 mx-auto">Layer 2 reliability with battle-tested protection.</h3>
            
            {/* Glowing E Logo */}
            <div className="relative w-48 h-48 mt-8 flex justify-center items-end">
              <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full" />
              
              {/* E Shape */}
              <div className="relative w-40 h-40 border-[16px] border-blue-500 rounded-full border-r-transparent border-t-transparent transform rotate-45 z-10 shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                {/* Horizontal bar of the E */}
                <div className="absolute top-[45%] right-[-50%] w-[120%] h-[16px] bg-blue-500 transform -rotate-45 shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
              </div>
              
              {/* Lens Flare Star */}
              <div className="absolute top-[25%] left-[25%] w-16 h-16 z-20">
                <div className="absolute inset-0 bg-white blur-[4px] rounded-full scale-50" />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-300 blur-[1px] transform -translate-y-1/2" />
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-300 blur-[1px] transform -translate-x-1/2" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white transform -translate-y-1/2 shadow-[0_0_10px_#fff]" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white transform -translate-x-1/2 shadow-[0_0_10px_#fff]" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
