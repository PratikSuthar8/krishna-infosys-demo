export default function Loading() {
  return (
    <div
      className="flex min-h-[70vh] items-center justify-center bg-[#f3f1ec]"
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border border-dashed border-[#f56616]/40"
          style={{ animation: "spin 10s linear infinite" }}
        />
        <span
          aria-hidden
          className="absolute inset-3 rounded-full border border-black/10"
          style={{ animation: "spin 16s linear infinite reverse" }}
        />
        <span
          aria-hidden
          className="absolute inset-[-10px] rounded-full border border-black/[0.06]"
          style={{ animation: "spin 22s linear infinite" }}
        />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ animation: "spin 10s linear infinite" }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#f56616]" />
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/KI-Icon.png"
          alt=""
          width={56}
          height={56}
          className="relative z-[1] h-14 w-14 object-contain"
        />
      </div>
    </div>
  );
}
