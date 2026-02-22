import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white selection:bg-zinc-800">
      <div className="relative flex flex-col items-center space-y-8 px-6 text-center">
        {/* Glow effect */}
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-zinc-800/20 blur-[120px]" />

        {/* Branding */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
            <svg
              className="h-6 w-6 text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-light tracking-[0.2em] uppercase text-zinc-200">
            DecoyPhrase
          </h1>
        </div>

        {/* Status indicator */}
        <div className="flex flex-col items-center space-y-2">
          <div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-[10px] sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="font-medium tracking-wide text-zinc-300 uppercase">
              Secure API Gateway Operational
            </span>
          </div>
          <p className="max-w-[280px] text-xs leading-relaxed text-zinc-500">
            Authenticated endpoints for decentralized Arweave & Turbo operations
            encrypted with L7 security standards.
          </p>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-12 text-[10px] tracking-widest text-zinc-600 uppercase">
          &copy; 2026 DecoyPhrase Private Layer
        </div>
      </div>
    </main>
  );
}
