import React from 'react';

export default function StatsSection() {
  return (
    <section className="relative w-full pt-0 pb-32 bg-gradient-to-b from-[#bae6fd] via-[#f0f9ff] to-white flex items-center justify-center overflow-hidden">
      
      <div className="max-w-5xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 mt-0">
        
        {/* Massive 182 Number */}
        <div className="text-[180px] md:text-[280px] font-light leading-none text-black tracking-tighter">
          182
        </div>

        {/* Descriptive Text */}
        <div className="text-3xl md:text-[36px] font-light text-black leading-[1.25]">
          countries: Your wallet <br className="hidden md:block" />
          becomes a <span className="text-blue-600 font-normal">global crypto</span> <br className="hidden md:block" />
          <span className="text-blue-600 font-normal">debit card</span> — accepted at <br className="hidden md:block" />
          partner merchants and <br className="hidden md:block" />
          <span className="text-blue-600 font-normal">locations worldwide.</span>
        </div>

      </div>
    </section>
  );
}
