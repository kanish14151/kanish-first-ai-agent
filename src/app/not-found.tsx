import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-container px-6 text-center">
      <h1 className="text-primary">Page not found</h1>
      <p className="text-secondary max-w-md">
        The page you requested does not exist or is no longer available.
      </p>
      <Link href="/" className="text-primary underline underline-offset-4">
        Return to search
      </Link>
    </main>
  );
}