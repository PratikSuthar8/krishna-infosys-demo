export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="flex min-h-screen items-center pt-[110px]">
        <div className="container-main">
          <div className="max-w-4xl">
            <span className="eyebrow">Website Foundation</span>

            <h1 className="display-heading mt-7 text-balance">
              Engineering a smarter
              <span className="text-brand"> connected world.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-muted sm:text-xl">
              The Krishna Infosys digital experience is now ready to be built.
              Modern, responsive, precise and engineered around a complete ELV
              solutions ecosystem.
            </p>

            <div className="mt-12 flex flex-wrap gap-3">
              {[
                "Next.js 16",
                "Tailwind CSS",
                "Shadcn",
                "GSAP",
                "Lenis",
                "Framer Motion",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="h-screen bg-surface" aria-hidden="true" />
    </main>
  );
}
