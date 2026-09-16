import React from 'react';

export default function StatsSection() {
  return (
    <section className="relative w-full pt-16 pb-32 bg-gradient-to-b from-[#D8CBE4] via-[#EAE3F2] to-[#F5F1F9] flex items-center justify-center overflow-hidden font-sans border-t border-[#7C6694]/20">
      
      <div className="max-w-6xl mx-auto px-6 w-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 mt-0">
        
        {/* Massive 16 Numeral */}
        <div className="text-[180px] md:text-[280px] font-light leading-none text-[#1A1224] tracking-tighter select-none shrink-0 font-heading">
          16
        </div>

        {/* Descriptive Text */}
        <div className="text-2xl sm:text-3xl md:text-[36px] font-light text-[#4A3F58] leading-[1.25] max-w-2xl font-sans">
          AI therapists: Your support <br className="hidden md:block" />
          becomes a <span className="text-[#7C6694] font-semibold">companion built around</span> <br className="hidden md:block" />
          <span className="text-[#7C6694] font-semibold">you</span> — matched by personality, tone, <br className="hidden md:block" />
          and therapeutic approach, not a <br className="hidden md:block" />
          one-size-fits-all script.
        </div>

      </div>
    </section>
  );
}

