export default function AdminLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-black/10 border-t-[#f56616]" />
        <p className="text-[11px] font-medium text-black/40">Loading panel…</p>
      </div>
    </div>
  );
}
