import { getWritingById } from "@/api/writings";
import PostDetail, { WritingWithBodies } from "./post";
import ErrorView from "@/app/components/error-view";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const writing: WritingWithBodies = await getWritingById(id);

  if (!writing) {
    return (
      <ErrorView
        code="404"
        title="Page not found ..."
        message="The page you're looking for doesn't exist or has been moved."
      >
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://linkedin.com/in/camariabevavy"
          className="inline-flex gap-2 items-center justify-center rounded-full bg-sky-400 px-7 py-3 text-sm font-semibold text-[#040B14] transition-all hover:scale-[1.03] hover:bg-sky-300"
        >
          Checkout my posts on LinkedIn
          <ExternalLink className="h-4 w-4" />
        </Link>
      </ErrorView>
    );
  }

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 ">
      <PostDetail post={writing} />
    </section>
  );
}
