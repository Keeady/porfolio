import { getWritingById } from "@/api/writings";
import ErrorState from "@/app/components/error";
import PostDetail, { WritingWithBodies } from "./post";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const writing: WritingWithBodies = await getWritingById(id);

  if (!writing) {
    return (
      <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
        <ErrorState
          title={"Post Not Found ..."}
          message="Check out my posts on LinkedIn."
          redirect="https://linkedin.com/in/camariabevavy"
        />
      </section>
    );
  }

  return (
    <section className="relative flex flex-col items-center overflow-hidden bg-[#040B14] px-6 pb-24 pt-20 text-center">
      <PostDetail post={writing} />
    </section>
  );
}
