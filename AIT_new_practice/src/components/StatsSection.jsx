import React from 'react';

export default function StatsSection() {
  return (
    <section className="relative w-full pt-0 pb-32 bg-gradient-to-b from-[#bae6fd] via-[#f0f9ff] to-white flex items-center justify-center overflow-hidden font-sans">
      
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mt-0">
        
        {/* Massive 16 Numeral */}
        <div className="text-[180px] md:text-[280px] font-light leading-none text-black tracking-tighter select-none shrink-0">
          16
        </div>

        {/* Descriptive Text */}
        <div className="text-2xl sm:text-3xl md:text-[36px] font-light text-black leading-[1.25] max-w-2xl">
          AI therapists: Your support <br className="hidden md:block" />
          becomes a <span className="text-blue-600 font-normal">companion built around</span> <br className="hidden md:block" />
          <span className="text-blue-600 font-normal">you</span> — matched by personality, tone, <br className="hidden md:block" />
          and therapeutic approach, not a <br className="hidden md:block" />
          one-size-fits-all script.
        </div>

      </div>
    </section>
  );
}
