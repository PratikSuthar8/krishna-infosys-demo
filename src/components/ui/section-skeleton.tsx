export function SectionSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-[40vh] items-center justify-center bg-[#f3f1ec] ${className}`}
      aria-hidden
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span
          className="absolute inset-0 rounded-full border border-dashed border-[#f56616]/35"
          style={{ animation: "spin 10s linear infinite" }}
        />
        <span
          className="absolute inset-2 rounded-full border border-black/10"
          style={{ animation: "spin 14s linear infinite reverse" }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/KI-Icon.png"
          alt=""
          width={36}
          height={36}
          className="relative z-[1] h-9 w-9 object-contain opacity-90"
        />
      </div>
    </div>
  );
}
