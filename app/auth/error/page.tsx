import Link from "next/link";

export default function AuthErrorPage() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-xl font-semibold text-smiski-dark">Sign-in issue</h1>
      <p className="text-sm text-stone-600">
        Something went wrong while signing in. Please try again.
      </p>
      <Link
        href="/"
        className="rounded-full border border-smiski-primary/30 bg-smiski-light/60 px-4 py-2 text-sm font-medium text-smiski-dark"
      >
        Back to catalog
      </Link>
    </div>
  );
}
