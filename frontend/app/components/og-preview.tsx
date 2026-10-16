import Image from "next/image";

export default function OgPreview() {
  return (
    <div className="flex h-[630px] w-[1200px] overflow-hidden bg-[#040B14] text-white">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[120px] top-[80px] h-[260px] w-[260px] rounded-full bg-sky-500/10 blur-[90px]" />
        <div className="absolute right-[140px] top-[120px] h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[110px]" />
        <div className="absolute bottom-[60px] left-1/2 h-[220px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative flex h-full w-full flex-col justify-between px-20 py-16">
        {/* Top branding */}
        <div className="flex items-center gap-6">
          <div className="flex h-[92px] w-[92px] items-center justify-center rounded-[24px] bg-[#0B2740]">
            <Image
              src="/moon.png"
              alt="Restless Moon Studio logo"
              width={92}
              height={92}
              priority
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-[54px] font-semibold leading-none tracking-tight text-white">
              Restless Moon
            </h1>
            <p className="mt-4 text-[22px] font-medium uppercase tracking-[0.42em] text-sky-400">
              Software Studio
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-[920px]">
          <p className="mb-5 text-[18px] font-semibold uppercase tracking-[0.28em] text-sky-300">
            Apps • SaaS • Custom Software
          </p>

          <h2 className="max-w-[900px] text-[72px] font-bold leading-[1.05] tracking-tight text-white">
            Turning Ideas Into Real Products.
          </h2>

          <p className="mt-8 text-[28px] font-medium leading-relaxed text-slate-300">
            Web &amp; Mobile Apps • SaaS • AI Integration
          </p>
        </div>

        {/* Bottom URL */}
        <div className="flex items-center justify-between border-t border-sky-900/60 pt-8">
          <span className="text-[24px] font-medium tracking-[0.08em] text-slate-300">
            restlessmoonstudio.com
          </span>

          <div className="h-[10px] w-[10px] rounded-full bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.8)]" />
        </div>


          <div className="flex flex-col">
            <h2 className="text-[40px] font-semibold leading-none tracking-tight text-white">
              Restless
            </h2>
            <h2 className="text-[40px] font-semibold leading-none tracking-tight text-white">
              Moon
            </h2>
            <p className="mt-0 text-[12px] font-medium uppercase tracking-[0.42em] text-sky-400">
              Studio
            </p>
          </div>
        </div>
    </div>
  );
}
