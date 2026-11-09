import Link from "next/link";
import ErrorView from "./components/error-view";

export default function NotFound() {
  return (
    <ErrorView
      code="404"
      title="Page not found ..."
      message="The page you're looking for doesn't exist or has been moved."
    >
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
      >
        Back to home
      </Link>
    </ErrorView>
  );
}