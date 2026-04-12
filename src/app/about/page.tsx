import type { Metadata } from "next";
import { catalogPageShell, heroSectionClass } from "@/features/catalog/utils/catalog-ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about this fan-made Smiski project, privacy practices, and creator details.",
};

export default function AboutPage() {
  return (
    <div className={catalogPageShell}>
      <section className={heroSectionClass} aria-labelledby="about-heading">
        <div
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-smiski-light/70 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 left-1/4 h-48 w-48 rounded-full bg-smiski-light/50 blur-3xl"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-smiski-light/35 to-transparent" />

        <div className="relative flex max-w-2xl flex-col gap-5">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-smiski-primary/25 bg-smiski-light/90 px-3 py-1.5 text-xs font-medium text-smiski-dark">
            <span className="text-smiski-primary" aria-hidden>
              ✦
            </span>
            About Us
          </p>
          <h1
            id="about-heading"
            className="text-3xl font-semibold tracking-tight text-stone-800 sm:text-4xl md:text-[2.65rem] md:leading-[1.12]"
          >
            About This Project
          </h1>
          <div className="max-w-xl space-y-2 text-base leading-relaxed text-stone-500/90">
            <p>This website is a fan-made catalog created for SMISKI collectors.</p>
            <p>
              It is designed to help users explore different SMISKI series, track their collections, and connect with other collectors through trading and showcasing.
            </p>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-smiski-light/90 bg-white shadow-md shadow-stone-300/20">
        <div className="space-y-8 p-6 sm:p-8">
          <article>
            <h2 className="text-xl font-semibold tracking-tight text-smiski-dark">🚨 Disclaimer</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
              This is an unofficial fan project and is not affiliated with or endorsed by the
              official SMISKI brand or its creators. All product images and names belong to their
              respective owners.
            </p>
          </article>

          <div className="h-px w-full bg-smiski-light/80" />

          <article>
            <h2 className="text-xl font-semibold tracking-tight text-smiski-dark">🔒 Privacy</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
              We respect your privacy. This website does not sell, share, or misuse your personal
              data. Any information you provide (such as login or posts) is only used to support
              core features of the platform.
            </p>
          </article>

          <div className="h-px w-full bg-smiski-light/80" />

          <article>
            <h2 className="text-xl font-semibold tracking-tight text-smiski-dark">👩🏻‍💻 About me!</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600 sm:text-base">
              A SMISKI collector and developer who is passionate about building fun and simple tools for the Smiski community.
            </p>
            <div className="mt-4 grid max-w-xl gap-2 rounded-2xl border border-smiski-light/80 bg-smiski-light/20 p-4 text-sm text-stone-700 sm:text-base">
              <p className="font-semibold text-smiski-dark">Find me on:</p>
              <p>
                Instagram:{" "}
                <a
                  href="https://www.instagram.com/chenan_7.9/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-smiski-dark underline decoration-smiski-primary/70 underline-offset-2 transition hover:text-smiski-primary"
                >
                  @chenan_7.9
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:eloise940709@gmail.com"
                  className="font-medium text-smiski-dark underline decoration-smiski-primary/70 underline-offset-2 transition hover:text-smiski-primary"
                >
                  eloise940709@gmail.com
                </a>
              </p>
              <p>
                LinkedIn:{" "}
                <a
                  href="http://linkedin.com/in/chen-an-fang-972a7a227/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-smiski-dark underline decoration-smiski-primary/70 underline-offset-2 transition hover:text-smiski-primary"
                >
                  chen-an-fang-972a7a227
                </a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
